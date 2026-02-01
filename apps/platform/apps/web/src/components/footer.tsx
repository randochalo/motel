import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-white">TAMU House</span>
            </div>
            <p className="text-sm">
              Malaysia's National Tourism Operating System. Connecting travelers 
              with authentic local experiences.
            </p>
          </div>

          {/* For Travelers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Travelers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search" className="hover:text-white">Search Accommodations</Link></li>
              <li><Link href="/cars" className="hover:text-white">Car Rentals</Link></li>
              <li><Link href="/experiences" className="hover:text-white">Experiences</Link></li>
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
            </ul>
          </div>

          {/* For Merchants */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Merchants</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/merchant" className="hover:text-white">List Your Property</Link></li>
              <li><Link href="/merchant/erp" className="hover:text-white">ERP Software</Link></li>
              <li><Link href="/merchant/resources" className="hover:text-white">Resources</Link></li>
              <li><Link href="/merchant/support" className="hover:text-white">Support</Link></li>
            </ul>
          </div>

          {/* Government */}
          <div>
            <h4 className="text-white font-semibold mb-4">Government Partners</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/state-portals" className="hover:text-white">State Portals</Link></li>
              <li><Link href="/about" className="hover:text-white">About NTOS</Link></li>
              <li><Link href="/transparency" className="hover:text-white">Transparency</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} TAMU House. A National Tourism Operating System initiative.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
