'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import { Button } from '@ntos/ui'
import { State } from '@ntos/types'

const states: { value: State; label: string }[] = [
  { value: 'PERLIS', label: 'Perlis' },
  { value: 'KEDAH', label: 'Kedah' },
  { value: 'PULAU_PINANG', label: 'Pulau Pinang' },
  { value: 'PERAK', label: 'Perak' },
  { value: 'SELANGOR', label: 'Selangor' },
  { value: 'KUALA_LUMPUR', label: 'Kuala Lumpur' },
  { value: 'PUTRAJAYA', label: 'Putrajaya' },
  { value: 'NEGERI_SEMBILAN', label: 'Negeri Sembilan' },
  { value: 'MELAKA', label: 'Melaka' },
  { value: 'JOHOR', label: 'Johor' },
  { value: 'PAHANG', label: 'Pahang' },
  { value: 'TERENGGANU', label: 'Terengganu' },
  { value: 'KELANTAN', label: 'Kelantan' },
  { value: 'SABAH', label: 'Sabah' },
  { value: 'SARAWAK', label: 'Sarawak' },
  { value: 'LABUAN', label: 'Labuan' },
]

export function SearchForm() {
  const router = useRouter()
  const [state, setState] = useState<State>('PERLIS')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')
  const [category, setCategory] = useState('ACCOMMODATION')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      state,
      checkIn,
      checkOut,
      guests,
      category,
    })
    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      {/* Category Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { value: 'ACCOMMODATION', label: 'Stays' },
          { value: 'TRANSPORTATION', label: 'Cars' },
          { value: 'EXPERIENCE', label: 'Experiences' },
        ].map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* State Select */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={state}
            onChange={(e) => setState(e.target.value as State)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {states.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Check-in */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            placeholder="Check-in"
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Check-out */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            placeholder="Check-out"
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Guests */}
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} Guest{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        <Search className="w-5 h-5 mr-2" />
        Search
      </Button>
    </form>
  )
}
