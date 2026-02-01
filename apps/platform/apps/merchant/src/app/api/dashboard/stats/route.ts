import { NextResponse } from 'next/server'
import { prisma } from '@ntos/database'

export async function GET() {
  try {
    // Mock merchant ID for now - in production get from session
    const merchantId = 'merchant-1'

    const [
      totalBookings,
      totalRevenue,
      pendingBookings,
      recentBookings,
    ] = await Promise.all([
      prisma.booking.count({
        where: { merchantId },
      }),
      prisma.booking.aggregate({
        where: { 
          merchantId,
          status: 'COMPLETED',
        },
        _sum: { totalAmount: true },
      }),
      prisma.booking.count({
        where: { 
          merchantId,
          status: 'PENDING',
        },
      }),
      prisma.booking.findMany({
        where: { merchantId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          inventory: {
            select: { name: true },
          },
        },
      }),
    ])

    return NextResponse.json({
      totalBookings,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      pendingBookings,
      occupancyRate: 75, // Calculate based on availability
      recentBookings,
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
