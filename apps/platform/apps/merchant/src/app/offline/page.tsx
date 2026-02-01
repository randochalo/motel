'use client'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Calendar, User, Phone, Save } from 'lucide-react'
import { Button } from '@ntos/ui'
import { format } from 'date-fns'

interface OfflineBookingFormData {
  inventoryId: string
  guestName: string
  guestPhone: string
  checkInDate: string
  checkOutDate: string
  totalAmount: string
  notes?: string
}

export default function OfflineBookingsPage() {
  const [showForm, setShowForm] = useState(false)
  const queryClient = useQueryClient()

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['offline-bookings'],
    queryFn: async () => {
      const res = await fetch('/api/offline-bookings')
      if (!res.ok) throw new Error('Failed to fetch offline bookings')
      return res.json()
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data: OfflineBookingFormData) => {
      const res = await fetch('/api/offline-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create booking')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offline-bookings'] })
      setShowForm(false)
    },
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Offline Bookings</h1>
          <p className="text-gray-500">Record walk-in and phone bookings</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Offline Booking
        </Button>
      </div>

      {/* Sync Status Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-blue-900">Sync Status</h3>
            <p className="text-sm text-blue-700">
              Offline bookings are automatically synced with the main platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-blue-700">Auto-sync enabled</span>
          </div>
        </div>
      </div>

      {/* Add Booking Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="font-semibold mb-4">New Offline Booking</h3>
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              createMutation.mutate({
                inventoryId: formData.get('inventoryId') as string,
                guestName: formData.get('guestName') as string,
                guestPhone: formData.get('guestPhone') as string,
                checkInDate: formData.get('checkInDate') as string,
                checkOutDate: formData.get('checkOutDate') as string,
                totalAmount: formData.get('totalAmount') as string,
                notes: formData.get('notes') as string,
              })
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Inventory</label>
              <select name="inventoryId" className="w-full border rounded-lg px-3 py-2" required>
                <option value="">Select item...</option>
                <option value="room1">Traditional Malay Homestay</option>
                <option value="room2">Padi View Resort</option>
                <option value="car1">Perodua Myvi</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Guest Name</label>
              <input
                type="text"
                name="guestName"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Enter guest name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="guestPhone"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="+60 XX-XXX-XXXX"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Total Amount (RM)</label>
              <input
                type="number"
                name="totalAmount"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="0.00"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Check-in Date</label>
              <input
                type="date"
                name="checkInDate"
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Check-out Date</label>
              <input
                type="date"
                name="checkOutDate"
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                name="notes"
                rows={2}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Any special requests or notes..."
              />
            </div>
            
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {createMutation.isPending ? 'Saving...' : 'Save Booking'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Bookings List */}
      <div className="bg-white rounded-lg shadow">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : bookings?.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">No offline bookings yet</p>
            <p className="text-sm text-gray-400">Record your first walk-in booking above</p>
          </div>
        ) : (
          <div className="divide-y">
            {bookings?.map((booking: any) => (
              <div key={booking.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    booking.isSynced ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {booking.isSynced ? '✓' : '⏳'}
                  </div>
                  <div>
                    <p className="font-medium">{booking.guestName}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(booking.checkInDate), 'MMM d')} - {format(new Date(booking.checkOutDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">RM {booking.totalAmount}</p>
                  <p className={`text-sm ${booking.isSynced ? 'text-green-600' : 'text-yellow-600'}`}>
                    {booking.isSynced ? 'Synced' : 'Pending sync'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
