'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { MapPin, Filter, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { Button, Badge } from '@ntos/ui'
import { Inventory, State } from '@ntos/types'

interface SearchResponse {
  listings: Inventory[]
  total: number
  filters: {
    state?: State
    category?: string
    district?: string
  }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const state = searchParams.get('state') as State | null
  const category = searchParams.get('category') || 'ACCOMMODATION'

  const { data, isLoading } = useQuery<SearchResponse>({
    queryKey: ['search', state, category],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (state) params.set('state', state)
      if (category) params.set('category', category)
      
      const res = await fetch(`/api/inventory/search?${params.toString()}`)
      if (!res.ok) throw new Error('Search failed')
      return res.json()
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {state ? `${state.replace('_', ' ')}` : 'All Destinations'}
              </h1>
              <p className="text-gray-500">
                {data?.total || 0} properties found
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Under RM 100
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    RM 100 - RM 200
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    RM 200 - RM 500
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    RM 500+
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Property Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Homestay
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Hotel
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Resort
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Boutique Hotel
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Amenities</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    WiFi
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Air Conditioning
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Pool
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Parking
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : data?.listings.length === 0 ? (
              <div className="text-center py-16">
                <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data?.listings.map((listing) => (
                  <SearchResultCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchResultCard({ listing }: { listing: Inventory }) {
  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-72 h-48 md:h-auto shrink-0">
            <img
              src={listing.coverImage || listing.images[0] || '/placeholder.jpg'}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{listing.type.replace('_', ' ')}</Badge>
                  {listing.isVerified && (
                    <Badge className="bg-emerald-100 text-emerald-700">Verified</Badge>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-1">{listing.name}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  {listing.district}, {listing.state}
                </p>
                <p className="text-gray-600 line-clamp-2">{listing.shortDescription || listing.description}</p>
              </div>
              
              <div className="text-right shrink-0 ml-4">
                <div className="text-2xl font-bold">RM{listing.basePrice}</div>
                <div className="text-gray-500 text-sm">per night</div>
                <Button className="mt-4" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
