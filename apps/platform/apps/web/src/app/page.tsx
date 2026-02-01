import { Search, MapPin, Calendar, Users, Star } from 'lucide-react'
import { Button } from '@ntos/ui'
import { SearchForm } from '@/components/search-form'
import { FeaturedListings } from '@/components/featured-listings'
import { StateShowcase } from '@/components/state-showcase'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1920")',
            }}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover the Real Malaysia
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Authentic stays, local experiences, trusted by Malaysians
          </p>
          
          {/* Search Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 text-gray-900">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MapPin className="w-8 h-8" />}
              title="Verified Local Stays"
              description="Every property is verified by our field officers. No ghost listings, no surprises."
            />
            <FeatureCard 
              icon={<Star className="w-8 h-8" />}
              title="Best Price Guarantee"
              description="Book directly with local operators. No hidden fees, no global aggregator markup."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8" />}
              title="MyDigitalID Verified"
              description="Secure bookings with Malaysia's national digital identity platform."
            />
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <FeaturedListings />

      {/* State Showcase */}
      <StateShowcase />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Are you a tourism operator?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Malaysian businesses on our platform. Get free ERP tools, 
            reach millions of travelers, and keep more of your earnings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              List Your Property
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
