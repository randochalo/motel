import { NextResponse } from 'next/server'
import { prisma } from '@ntos/database'

export async function GET() {
  try {
    // Mock merchant ID for now
    const merchantId = 'merchant-1'

    const bookings = await prisma.offlineBooking.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching offline bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch offline bookings' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Mock merchant ID for now
    const merchantId = 'merchant-1'
    
    const booking = await prisma.offlineBooking.create({
      data: {
        ...body,
        merchantId,
        createdBy: 'user-1',
        isSynced: true, // Auto-sync in this implementation
        syncedAt: new Date(),
      },
    })

    // Also create availability block
    await prisma.availabilitySlot.updateMany({
      where: {
        inventoryId: body.inventoryId,
        date: {
          gte: new Date(body.checkInDate),
          lte: new Date(body.checkOutDate),
        },
      },
      data: {
        isAvailable: false,
        blockedBy: booking.id,
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating offline booking:', error)
    return NextResponse.json(
      { error: 'Failed to create offline booking' },
      { status: 500 }
    )
  }
}
