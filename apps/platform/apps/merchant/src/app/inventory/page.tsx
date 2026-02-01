'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from 'lucide-react'
import { Button, Badge } from '@ntos/ui'
import { Inventory, InventoryCategory } from '@ntos/types'

export default function InventoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<InventoryCategory>('ACCOMMODATION')
  const queryClient = useQueryClient()

  const { data: inventory, isLoading } = useQuery({
    queryKey: ['inventory', selectedCategory],
    queryFn: async () => {
      const res = await fetch(`/api/inventory?category=${selectedCategory}`)
      if (!res.ok) throw new Error('Failed to fetch inventory')
      return res.json()
    },
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-gray-500">Manage your accommodations and rentals</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { value: 'ACCOMMODATION', label: 'Accommodations' },
          { value: 'TRANSPORTATION', label: 'Vehicles' },
          { value: 'EXPERIENCE', label: 'Experiences' },
        ].map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value as InventoryCategory)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === cat.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : inventory?.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">No {selectedCategory.toLowerCase()} found</p>
            <Button>Add your first {selectedCategory.toLowerCase().slice(0, -1)}</Button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Item</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {inventory?.map((item: Inventory) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={item.coverImage || item.images[0] || '/placeholder.jpg'}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.district}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary">{item.type.replace('_', ' ')}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    RM {item.basePrice}/night
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
