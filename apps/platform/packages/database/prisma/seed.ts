import { prisma } from '../src'
import { State, InventoryCategory, InventoryType, BusinessType, VerificationStatus } from '@prisma/client'

async function main() {
  console.log('Start seeding...')

  // Create sample merchants
  const merchant1 = await prisma.merchant.create({
    data: {
      businessName: 'Perlis Homestay Sdn Bhd',
      registrationNumber: 'SSM-123456-K',
      businessType: BusinessType.SDN_BHD,
      state: State.PERLIS,
      district: 'Kangar',
      address: '123 Jalan Kangar, 01000 Kangar, Perlis',
      email: 'contact@perlis-homestay.com',
      phone: '+6012-345-6789',
      bankName: 'Maybank',
      bankAccountNumber: '1234567890',
      bankAccountName: 'Perlis Homestay Sdn Bhd',
      verificationStatus: VerificationStatus.VERIFIED,
    },
  })

  const merchant2 = await prisma.merchant.create({
    data: {
      businessName: 'Kangar Car Rental',
      registrationNumber: 'SSM-789012-K',
      businessType: BusinessType.ENTERPRISE,
      state: State.PERLIS,
      district: 'Kangar',
      address: '45 Terminal Bas Kangar, 01000 Kangar, Perlis',
      email: 'info@kangarcar.my',
      phone: '+6019-876-5432',
      verificationStatus: VerificationStatus.VERIFIED,
    },
  })

  console.log(`Created merchants: ${merchant1.id}, ${merchant2.id}`)

  // Create sample inventory - Accommodation
  const room1 = await prisma.inventory.create({
    data: {
      merchantId: merchant1.id,
      category: InventoryCategory.ACCOMMODATION,
      type: InventoryType.HOMESTAY,
      state: State.PERLIS,
      district: 'Kangar',
      name: 'Traditional Malay Homestay',
      description: 'Experience authentic Malaysian hospitality in this traditional wooden house. Features 3 bedrooms, a spacious living area, and a beautiful garden. Perfect for families wanting to experience kampung life.',
      shortDescription: 'Authentic kampung homestay experience',
      address: 'Kampung Sungai Baru, 01000 Kangar, Perlis',
      latitude: 6.4414,
      longitude: 100.1986,
      basePrice: 150.0,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      ],
      coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      metadata: {
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 8,
        amenities: ['wifi', 'aircon', 'kitchen', 'parking', 'garden'],
        houseRules: ['No smoking indoors', 'Check-in after 2 PM', 'Check-out before 12 PM'],
      },
    },
  })

  const room2 = await prisma.inventory.create({
    data: {
      merchantId: merchant1.id,
      category: InventoryCategory.ACCOMMODATION,
      type: InventoryType.BOUTIQUE_HOTEL,
      state: State.PERLIS,
      district: 'Arau',
      name: 'Padi View Resort',
      description: 'Luxury boutique resort overlooking endless padi fields. Experience the serenity of Perlis with modern amenities and traditional architecture.',
      shortDescription: 'Luxury resort with padi field views',
      address: 'Jalan Arau, 02600 Arau, Perlis',
      latitude: 6.4271,
      longitude: 100.2764,
      basePrice: 350.0,
      images: [
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      ],
      coverImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      metadata: {
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        amenities: ['wifi', 'aircon', 'pool', 'spa', 'restaurant', 'minibar'],
        starRating: 4,
      },
    },
  })

  // Create GPS device for car
  const gpsDevice = await prisma.gpsDevice.create({
    data: {
      deviceImei: '355449062345678',
      serialNumber: 'GPS-2024-001',
      latitude: 6.4414,
      longitude: 100.1986,
      lastUpdated: new Date(),
    },
  })

  // Create sample inventory - Car Rental
  const car1 = await prisma.inventory.create({
    data: {
      merchantId: merchant2.id,
      category: InventoryCategory.TRANSPORTATION,
      type: InventoryType.CAR_RENTAL,
      state: State.PERLIS,
      district: 'Kangar',
      name: 'Perodua Myvi (Automatic)',
      description: 'Compact and fuel-efficient car perfect for exploring Perlis. Easy to park and navigate through narrow kampung roads. Includes GPS tracking for your safety.',
      shortDescription: 'Compact car, perfect for city & kampung drives',
      address: 'Terminal Bas Kangar, 01000 Kangar, Perlis',
      latitude: 6.4414,
      longitude: 100.1986,
      basePrice: 80.0,
      images: [
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      ],
      coverImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      gpsDeviceId: gpsDevice.id,
      metadata: {
        make: 'Perodua',
        model: 'Myvi',
        year: 2023,
        color: 'Silver',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        seats: 5,
        luggageCapacity: 2,
        features: ['Air conditioning', 'Bluetooth', 'USB charging', 'GPS tracking'],
        requirements: ['Valid driving license', 'Minimum age 21', 'Security deposit RM200'],
      },
    },
  })

  console.log(`Created inventory: ${room1.id}, ${room2.id}, ${car1.id}`)

  // Create availability slots for next 30 days
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    
    await prisma.availabilitySlot.createMany({
      data: [
        {
          inventoryId: room1.id,
          date: date,
          isAvailable: true,
          quantity: 2, // 2 rooms available
        },
        {
          inventoryId: room2.id,
          date: date,
          isAvailable: true,
          quantity: 5, // 5 rooms available
        },
        {
          inventoryId: car1.id,
          date: date,
          isAvailable: true,
          quantity: 1,
        },
      ],
    })
  }

  console.log('Created availability slots')

  // Create a sample user
  const user = await prisma.user.create({
    data: {
      email: 'traveler@example.com',
      phone: '+6012-987-6543',
      fullName: 'Ahmad Traveler',
      nationality: 'MY',
    },
  })

  console.log(`Created user: ${user.id}`)

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
