import { NextResponse } from 'next/server'
import { prisma } from '@ntos/database'

export async function GET() {
  try {
    const listings = await prisma.inventory.findMany({
      where: {
        isActive: true,
        isVerified: true,
      },
      include: {
        merchant: {
          select: {
            state: true,
            district: true,
          },
        },
      },
      take: 8,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error('Error fetching featured listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured listings' },
      { status: 500 }
    )
  }
}
