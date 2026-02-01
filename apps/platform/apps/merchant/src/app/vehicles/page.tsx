'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Car, MapPin, Navigation, Battery, Signal } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@ntos/ui'

interface Vehicle {
  id: string
  name: string
  make: string
  model: string
  year: number
  gpsDeviceId?: string
  gpsData?: {
    latitude: number
    longitude: number
    speed: number
    batteryLevel: number
    signalStrength: number
    lastUpdated: string
  }
}

export default function VehiclesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const res = await fetch('/api/vehicles')
      if (!res.ok) throw new Error('Failed to fetch vehicles')
      return res.json()
    },
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Vehicle Fleet</h1>
          <p className="text-gray-500">Manage your vehicles and GPS tracking</p>
        </div>
        <Button>
          <Car className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle List */}
        <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : vehicles?.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Car className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No vehicles in your fleet yet</p>
              </CardContent>
            </Card>
          ) : (
            vehicles?.map((vehicle: Vehicle) => (
              <Card 
                key={vehicle.id}
                className={`cursor-pointer transition-colors ${
                  selectedVehicle === vehicle.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Car className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{vehicle.name}</h3>
                        <p className="text-sm text-gray-500">
                          {vehicle.make} {vehicle.model} ({vehicle.year})
                        </p>
                        {vehicle.gpsDeviceId ? (
                          <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center text-sm text-green-600">
                              <Signal className="w-4 h-4 mr-1" />
                              GPS Active
                            </span>
                            {vehicle.gpsData && (
                              <span className="flex items-center text-sm text-gray-500">
                                <Navigation className="w-4 h-4 mr-1" />
                                {vehicle.gpsData.speed} km/h
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-yellow-600">GPS Not Installed</span>
                        )}
                      </div>
                    </div>
                    
                    {vehicle.gpsData && (
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                          <Battery className="w-4 h-4" />
                          <span>{vehicle.gpsData.batteryLevel}%</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Last updated: {new Date(vehicle.gpsData.lastUpdated).toLocaleTimeString()}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* GPS Tracking Panel */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Live Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedVehicle ? (
                <div className="space-y-4">
                  {/* Map Placeholder */}
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-50">
                      {/* Simple grid pattern to simulate map */}
                      <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>
                    <div className="relative z-10 text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                        <Navigation className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm font-medium">Tracking Active</p>
                      <p className="text-xs text-gray-500">GPS coordinates updating</p>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Latitude</span>
                      <span className="font-mono">6.4414° N</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Longitude</span>
                      <span className="font-mono">100.1986° E</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Speed</span>
                      <span>0 km/h (Stationary)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Signal</span>
                      <span className="text-green-600">Excellent</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <Button variant="outline" className="w-full">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                      Immobilize Vehicle
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Select a vehicle to view location</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
