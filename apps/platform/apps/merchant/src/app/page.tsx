'use client'

import { useQuery } from '@tanstack/react-query'
import {
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@ntos/ui'

interface DashboardStats {
  totalBookings: number
  totalRevenue: number
  occupancyRate: number
  pendingBookings: number
  recentBookings: any[]
}

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/stats')
      if (!res.ok) throw new Error('Failed to fetch stats')
      return res.json()
    },
  })

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="font-medium">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Bookings"
          value={stats?.totalBookings || 0}
          change="+12%"
          trend="up"
          icon={Calendar}
        />
        <StatCard
          title="Revenue (MTD)"
          value={`RM ${(stats?.totalRevenue || 0).toLocaleString()}`}
          change="+8.5%"
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          title="Occupancy Rate"
          value={`${stats?.occupancyRate || 0}%`}
          change="-2%"
          trend="down"
          icon={TrendingUp}
        />
        <StatCard
          title="Pending Bookings"
          value={stats?.pendingBookings || 0}
          change="+3"
          trend="up"
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentBookings?.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No recent bookings</p>
              ) : (
                stats?.recentBookings?.map((booking: any) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{booking.guestName || 'Guest'}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">RM {booking.totalAmount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === 'CONFIRMED' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <QuickActionButton
                title="Add Offline Booking"
                description="Record walk-in bookings"
                href="/offline/new"
              />
              <QuickActionButton
                title="Update Availability"
                description="Manage room/car availability"
                href="/inventory"
              />
              <QuickActionButton
                title="Generate e-Invoice"
                description="Create LHDN e-Invoice"
                href="/invoices/new"
              />
              <QuickActionButton
                title="View Reports"
                description="Financial summaries"
                href="/reports"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon 
}: { 
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down'
  icon: any
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              <span>{change}</span>
              <span className="text-gray-400 ml-1">vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function QuickActionButton({ title, description, href }: { 
  title: string
  description: string
  href: string
}) {
  return (
    <a 
      href={href}
      className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
    >
      <h4 className="font-medium text-blue-600">{title}</h4>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </a>
  )
}
