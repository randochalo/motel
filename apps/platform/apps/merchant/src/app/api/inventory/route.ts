import { NextResponse } from 'next/server'
import { prisma } from '@ntos/database'
import { InventoryCategory } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as InventoryCategory | undefined
    
    const where: any = {}
    if (category) where.category = category

    const inventory = await prisma.inventory.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(inventory)
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const inventory = await prisma.inventory.create({
      data: body,
    })

    return NextResponse.json(inventory, { status: 201 })
  } catch (error) {
    console.error('Error creating inventory:', error)
    return NextResponse.json(
      { error: 'Failed to create inventory' },
      { status: 500 }
    )
  }
}
