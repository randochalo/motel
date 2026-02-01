'use client'

import Link from 'next/link'
import { Menu, User, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@ntos/ui'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TAMU House</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/search?category=ACCOMMODATION" className="text-gray-600 hover:text-gray-900">
              Stays
            </Link>
            <Link href="/search?category=TRANSPORTATION" className="text-gray-600 hover:text-gray-900">
              Car Rentals
            </Link>
            <Link href="/experiences" className="text-gray-600 hover:text-gray-900">
              Experiences
            </Link>
            <Link href="/states" className="text-gray-600 hover:text-gray-900">
              Destinations
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Link href="/merchant" className="hidden md:block text-gray-600 hover:text-gray-900">
              List your property
            </Link>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/search?category=ACCOMMODATION" className="block text-gray-600">
              Stays
            </Link>
            <Link href="/search?category=TRANSPORTATION" className="block text-gray-600">
              Car Rentals
            </Link>
            <Link href="/experiences" className="block text-gray-600">
              Experiences
            </Link>
            <Link href="/states" className="block text-gray-600">
              Destinations
            </Link>
            <Link href="/merchant" className="block text-gray-600">
              List your property
            </Link>
            <Button className="w-full">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
