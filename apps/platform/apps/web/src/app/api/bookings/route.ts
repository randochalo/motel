import { NextResponse } from 'next/server'
import { auth } from '@ntos/auth'
import { prisma } from '@ntos/database'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const bookings = await prisma.booking.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
      include: {
        inventory: {
          select: {
            name: true,
            images: true,
            category: true,
          },
        },
        merchant: {
          select: {
            businessName: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
