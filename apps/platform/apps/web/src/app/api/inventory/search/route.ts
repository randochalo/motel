import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@ntos/database'
import { InventoryCategory, State } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const state = searchParams.get('state') as State | undefined
    const category = searchParams.get('category') as InventoryCategory | undefined
    const district = searchParams.get('district') || undefined
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const guests = searchParams.get('guests')

    const where: any = {
      isActive: true,
      isVerified: true,
    }

    if (state) where.state = state
    if (category) where.category = category
    if (district) where.district = district

    if (minPrice || maxPrice) {
      where.basePrice = {}
      if (minPrice) where.basePrice.gte = parseFloat(minPrice)
      if (maxPrice) where.basePrice.lte = parseFloat(maxPrice)
    }

    const listings = await prisma.inventory.findMany({
      where,
      include: {
        merchant: {
          select: {
            state: true,
            district: true,
            businessName: true,
          },
        },
        availabilitySlots: {
          where: {
            isAvailable: true,
          },
          take: 30,
        },
      },
      orderBy: {
        basePrice: 'asc',
      },
    })

    return NextResponse.json({
      listings,
      total: listings.length,
      filters: {
        state,
        category,
        district,
        minPrice,
        maxPrice,
        guests,
      },
    })
  } catch (error) {
    console.error('Error searching inventory:', error)
    return NextResponse.json(
      { error: 'Failed to search inventory' },
      { status: 500 }
    )
  }
}
