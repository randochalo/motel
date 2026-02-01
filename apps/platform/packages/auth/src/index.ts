import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@ntos/database'
import type { DefaultSession, NextAuthConfig } from 'next-auth'
import type { State } from '@ntos/types'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      myDigitalId?: string
      verificationLevel: number
      state?: State
    } & DefaultSession['user']
  }

  interface User {
    myDigitalId?: string
    verificationLevel: number
    state?: State
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    myDigitalId?: string
    verificationLevel: number
    state?: State
  }
}

// MyDigitalID OAuth configuration
const myDigitalIdProvider = {
  id: 'mydigitalid',
  name: 'MyDigitalID',
  type: 'oauth' as const,
  authorization: {
    url: process.env.MYDIGITALID_AUTH_URL || 'https://idp.mydigitalid.gov.my/authorize',
    params: {
      scope: 'openid profile email ic_number',
      response_type: 'code',
    },
  },
  token: {
    url: process.env.MYDIGITALID_TOKEN_URL || 'https://idp.mydigitalid.gov.my/token',
  },
  userinfo: {
    url: process.env.MYDIGITALID_USERINFO_URL || 'https://idp.mydigitalid.gov.my/userinfo',
  },
  profile(profile: {
    sub: string
    name: string
    email: string
    ic_number: string
    phone_number?: string
    address?: {
      state: string
    }
  }) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      myDigitalId: profile.sub,
      verificationLevel: 3, // MyDigitalID is highest verification
      state: profile.address?.state?.toUpperCase() as State,
    }
  },
  clientId: process.env.MYDIGITALID_CLIENT_ID,
  clientSecret: process.env.MYDIGITALID_CLIENT_SECRET,
  checks: ['pkce', 'state'],
}

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    myDigitalIdProvider,
    // Fallback credentials provider for testing
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // This is a simplified version for development
        // In production, implement proper password hashing
        if (!credentials?.email) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })
        
        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            myDigitalId: user.myDigitalId || undefined,
            verificationLevel: user.verificationLevel,
          }
        }
        
        return null
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.myDigitalId = user.myDigitalId
        token.verificationLevel = user.verificationLevel
        token.state = user.state
      }
      
      // Refresh user data on every token refresh
      if (account?.provider === 'mydigitalid') {
        token.myDigitalId = user?.myDigitalId
        token.verificationLevel = 3
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.myDigitalId = token.myDigitalId
        session.user.verificationLevel = token.verificationLevel
        session.user.state = token.state
      }
      return session
    },
    async signIn({ user, account }) {
      // Additional sign-in logic can be added here
      // For example, checking if user is allowed to sign in
      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: '/auth/onboarding',
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log(`User ${user.email} signed in via ${account?.provider}`)
      
      if (isNewUser) {
        console.log(`New user created: ${user.email}`)
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

// Helper functions
export async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function requireMerchant() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  
  const merchant = await prisma.merchant.findFirst({
    where: { email: session.user.email! },
  })
  
  if (!merchant) {
    throw new Error('Merchant account required')
  }
  
  return { session, merchant }
}

export async function requireFieldOfficer() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  
  // Additional field officer verification would go here
  return session
}
