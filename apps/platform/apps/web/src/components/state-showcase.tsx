'use client'

import Link from 'next/link'
import { State } from '@ntos/types'

const states: { code: State; name: string; image: string; tagline: string }[] = [
  { 
    code: 'PERLIS', 
    name: 'Perlis', 
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
    tagline: 'The Northern Gem'
  },
  { 
    code: 'KEDAH', 
    name: 'Kedah', 
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800',
    tagline: 'Rice Bowl of Malaysia'
  },
  { 
    code: 'PULAU_PINANG', 
    name: 'Penang', 
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24f2b7af?w=800',
    tagline: 'Pearl of the Orient'
  },
  { 
    code: 'PERAK', 
    name: 'Perak', 
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
    tagline: 'Land of Grace'
  },
  { 
    code: 'SELANGOR', 
    name: 'Selangor', 
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    tagline: 'Gateway to Malaysia'
  },
  { 
    code: 'MELAKA', 
    name: 'Melaka', 
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
    tagline: 'Historic Heritage City'
  },
]

export function StateShowcase() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Explore by State</h2>
        <p className="text-gray-600 mb-8">Discover unique destinations across Malaysia</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {states.map((state) => (
            <Link key={state.code} href={`/state/${state.code.toLowerCase()}`}>
              <div className="group relative h-64 rounded-xl overflow-hidden cursor-pointer">
                <img
                  src={state.image}
                  alt={state.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold">{state.name}</h3>
                  <p className="text-white/80">{state.tagline}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/states" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View all 16 states and territories
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
