'use client'

import { useQuery } from '@tanstack/react-query'
import { MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, Badge } from '@ntos/ui'
import { Inventory } from '@ntos/types'

async function fetchFeaturedListings(): Promise<Inventory[]> {
  const res = await fetch('/api/inventory/featured')
  if (!res.ok) throw new Error('Failed to fetch featured listings')
  return res.json()
}

export function FeaturedListings() {
  const { data: listings, isLoading } = useQuery({
    queryKey: ['featured-listings'],
    queryFn: fetchFeaturedListings,
  })

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Stays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Featured Stays</h2>
        <p className="text-gray-600 mb-8">Handpicked accommodations across Malaysia</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings?.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ListingCard({ listing }: { listing: Inventory }) {
  return (
    <Link href={`/listing/${listing.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={listing.coverImage || listing.images[0] || '/placeholder.jpg'}
            alt={listing.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900">
            {listing.type.replace('_', ' ')}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{listing.name}</h3>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {listing.district}, {listing.state}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="ml-1 text-sm font-medium">4.8</span>
              <span className="text-gray-500 text-sm ml-1">(24)</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-lg">RM{listing.basePrice}</span>
              <span className="text-gray-500 text-sm">/night</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
