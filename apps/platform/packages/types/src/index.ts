// ============================================
// USER TYPES
// ============================================

export interface User {
  id: string
  myDigitalId?: string
  email: string
  phone?: string
  fullName?: string
  icNumber?: string
  passportNumber?: string
  nationality: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  isMyIdVerified: boolean
  verificationLevel: number
  avatarUrl?: string
  preferences?: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  language: 'en' | 'ms' | 'zh'
  currency: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

// ============================================
// MERCHANT TYPES
// ============================================

export type BusinessType = 
  | 'SOLE_PROPRIETOR' 
  | 'PARTNERSHIP' 
  | 'SDN_BHD' 
  | 'ENTERPRISE' 
  | 'COOPERATIVE' 
  | 'ASSOCIATION'

export type State = 
  | 'JOHOR' | 'KEDAH' | 'KELANTAN' | 'MELAKA' | 'NEGERI_SEMBILAN'
  | 'PAHANG' | 'PERAK' | 'PERLIS' | 'PULAU_PINANG' | 'SABAH'
  | 'SARAWAK' | 'SELANGOR' | 'TERENGGANU' | 'KUALA_LUMPUR' | 'LABUAN' | 'PUTRAJAYA'

export type VerificationStatus = 
  | 'PENDING' 
  | 'IN_REVIEW' 
  | 'VERIFIED' 
  | 'REJECTED' 
  | 'SUSPENDED'

export interface Merchant {
  id: string
  businessName: string
  registrationNumber: string
  businessType: BusinessType
  myDigitalId?: string
  state: State
  district: string
  address: string
  postcode: string
  latitude?: number
  longitude?: number
  email: string
  phone: string
  website?: string
  bankName?: string
  bankAccountNumber?: string
  bankAccountName?: string
  verificationStatus: VerificationStatus
  isActive: boolean
  onboardedBy?: string
  onboardedAt?: Date
  commissionRate: number
  createdAt: Date
  updatedAt: Date
}

// ============================================
// INVENTORY TYPES
// ============================================

export type InventoryCategory = 'ACCOMMODATION' | 'TRANSPORTATION' | 'EXPERIENCE'

export type InventoryType = 
  // Accommodation
  | 'HOTEL' | 'RESORT' | 'HOMESTAY' | 'BOUTIQUE_HOTEL' | 'HOSTEL' | 'APARTMENT'
  // Transportation
  | 'CAR_RENTAL' | 'BUS' | 'FERRY' | 'PRIVATE_DRIVER'
  // Experience
  | 'TOUR' | 'ACTIVITY' | 'EVENT' | 'WORKSHOP'

export interface Inventory {
  id: string
  merchantId: string
  category: InventoryCategory
  type: InventoryType
  state: State
  district: string
  name: string
  description: string
  shortDescription?: string
  address?: string
  latitude?: number
  longitude?: number
  images: string[]
  coverImage?: string
  basePrice: number
  currency: string
  availabilityRules?: AvailabilityRules
  pricingRules?: PricingRules
  metadata?: AccommodationMetadata | CarMetadata | ExperienceMetadata
  gpsDeviceId?: string
  isActive: boolean
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AvailabilityRules {
  advanceBookingDays?: number
  minStay?: number
  maxStay?: number
  checkInTime?: string
  checkOutTime?: string
  blockedDates?: string[]
}

export interface PricingRules {
  seasonalPricing?: SeasonalPrice[]
  weekendRate?: number // Percentage multiplier
  monthlyDiscount?: number
  weeklyDiscount?: number
}

export interface SeasonalPrice {
  startDate: string
  endDate: string
  multiplier: number
}

// Accommodation Metadata
export interface AccommodationMetadata {
  bedrooms: number
  bathrooms: number
  maxGuests: number
  amenities: string[]
  houseRules?: string[]
  starRating?: number
  propertyType?: string
  floorSize?: string
}

// Car Rental Metadata
export interface CarMetadata {
  make: string
  model: string
  year: number
  color: string
  transmission: 'Manual' | 'Automatic'
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'
  seats: number
  luggageCapacity: number
  features: string[]
  requirements?: string[]
  mileageLimit?: number
  extraMileageCharge?: number
}

// Experience Metadata
export interface ExperienceMetadata {
  duration: string
  groupSize: { min: number; max: number }
  difficulty?: 'EASY' | 'MODERATE' | 'CHALLENGING'
  included: string[]
  notIncluded: string[]
  meetingPoint: string
  requirements?: string[]
  cancellationPolicy: string
}

export interface AvailabilitySlot {
  id: string
  inventoryId: string
  date: Date
  isAvailable: boolean
  priceOverride?: number
  quantity: number
  blockedBy?: string
}

// ============================================
// GPS TYPES
// ============================================

export interface GpsDevice {
  id: string
  deviceImei: string
  serialNumber: string
  latitude?: number
  longitude?: number
  altitude?: number
  speed?: number
  heading?: number
  lastUpdated?: Date
  isActive: boolean
  batteryLevel?: number
  signalStrength?: number
  isImmobilized: boolean
  geofenceConfig?: GeofenceConfig
  createdAt: Date
  updatedAt: Date
}

export interface GeofenceConfig {
  center: { lat: number; lng: number }
  radius: number // meters
  name: string
}

export interface GpsLocationHistory {
  id: string
  deviceId: string
  latitude: number
  longitude: number
  altitude?: number
  speed?: number
  heading?: number
  recordedAt: Date
  eventType?: GpsEventType
}

export type GpsEventType = 
  | 'GEOFENCE_ENTER' 
  | 'GEOFENCE_EXIT' 
  | 'SPEEDING' 
  | 'SUDDEN_STOP' 
  | 'TOWING' 
  | 'POWER_CUT'

// ============================================
// BOOKING TYPES
// ============================================

export type BookingStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'CANCELLED_BY_GUEST' 
  | 'CANCELLED_BY_MERCHANT' 
  | 'NO_SHOW' 
  | 'COMPLETED' 
  | 'REFUNDED'

export type PaymentStatus = 
  | 'PENDING' 
  | 'PROCESSING' 
  | 'COMPLETED' 
  | 'FAILED' 
  | 'REFUNDED' 
  | 'PARTIALLY_REFUNDED'

export type EInvoiceStatus = 
  | 'NOT_REQUIRED' 
  | 'PENDING' 
  | 'SUBMITTED' 
  | 'VALIDATED' 
  | 'REJECTED' 
  | 'CANCELLED'

export interface Booking {
  id: string
  bookingReference: string
  userId: string
  inventoryId: string
  merchantId: string
  checkInDate: Date
  checkOutDate: Date
  checkInTime?: string
  checkOutTime?: string
  status: BookingStatus
  baseAmount: number
  serviceFee: number
  taxAmount: number
  discountAmount: number
  totalAmount: number
  currency: string
  merchantEarning: number
  platformCommission: number
  stateContribution?: number
  paymentStatus: PaymentStatus
  paymentMethod?: string
  paymentIntentId?: string
  paidAt?: Date
  myDigitalIdSignature?: string
  eInvoiceNumber?: string
  eInvoiceStatus: EInvoiceStatus
  eInvoiceSubmittedAt?: Date
  eInvoiceResponse?: unknown
  guestName?: string
  guestPhone?: string
  guestEmail?: string
  guestCount: number
  specialRequests?: string
  metadata?: BookingMetadata
  createdAt: Date
  updatedAt: Date
}

export interface BookingMetadata {
  flightNumber?: string
  arrivalTime?: string
  pickupLocation?: string
  dropoffLocation?: string
  driverNotes?: string
  carCondition?: {
    fuelLevel: number
    mileage: number
    damages: string[]
  }
}

// ============================================
// ERP TYPES
// ============================================

// Offline Booking
export interface OfflineBooking {
  id: string
  merchantId: string
  inventoryId: string
  guestName: string
  guestPhone?: string
  checkInDate: Date
  checkOutDate: Date
  totalAmount: number
  currency: string
  isSynced: boolean
  syncedAt?: Date
  syncError?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

// HR Module
export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN'

export interface Employee {
  id: string
  merchantId: string
  fullName: string
  icNumber: string
  position: string
  department?: string
  phone?: string
  email?: string
  address?: string
  employmentType: EmploymentType
  startDate: Date
  endDate?: Date
  basicSalary: number
  epfRate: number
  socsoCategory: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PayrollRecord {
  id: string
  employeeId: string
  year: number
  month: number
  basicSalary: number
  allowances: number
  overtime: number
  bonuses: number
  grossPay: number
  epfEmployee: number
  epfEmployer: number
  socsoEmployee: number
  socsoEmployer: number
  eisEmployee: number
  eisEmployer: number
  pcb: number
  otherDeductions: number
  totalDeductions: number
  netPay: number
  isProcessed: boolean
  processedAt?: Date
}

// Accounting Module
export type AccountingType = 'REVENUE' | 'EXPENSE'

export interface AccountingEntry {
  id: string
  merchantId: string
  entryType: AccountingType
  category: string
  subcategory?: string
  amount: number
  currency: string
  description: string
  reference?: string
  transactionDate: Date
  bookingId?: string
  eInvoiceNumber?: string
  eInvoiceStatus: EInvoiceStatus
  attachments: string[]
  createdAt: Date
  updatedAt: Date
}

// Legal Module
export type DocumentType = 
  | 'RENTAL_AGREEMENT' 
  | 'SERVICE_CONTRACT' 
  | 'EMPLOYMENT_CONTRACT' 
  | 'TERMS_OF_SERVICE' 
  | 'PRIVACY_POLICY'

export type DocumentStatus = 'DRAFT' | 'PENDING_SIGNATURE' | 'SIGNED' | 'EXPIRED' | 'TERMINATED'

export interface LegalDocument {
  id: string
  merchantId: string
  documentType: DocumentType
  title: string
  partyA: string
  partyB: string
  content: string
  partyASigned: boolean
  partyASignedAt?: Date
  partyASignature?: string
  partyBSigned: boolean
  partyBSignedAt?: Date
  partyBSignature?: string
  stampDutyPaid: boolean
  stampDutyAmount?: number
  stampCertificateNo?: string
  status: DocumentStatus
  effectiveDate?: Date
  expiryDate?: Date
  createdAt: Date
  updatedAt: Date
}

// ============================================
// FIELD OFFICER TYPES
// ============================================

export type VisitType = 
  | 'MERCHANT_ONBOARDING' 
  | 'VERIFICATION_VISIT' 
  | 'GPS_INSTALLATION' 
  | 'TRAINING' 
  | 'FOLLOW_UP' 
  | 'QUALITY_CHECK'

export interface FieldOfficer {
  id: string
  fullName: string
  email: string
  phone: string
  employeeId: string
  assignedState: State
  assignedDistricts: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FieldVisit {
  id: string
  officerId: string
  latitude: number
  longitude: number
  address?: string
  visitType: VisitType
  merchantId?: string
  notes?: string
  photos: string[]
  outcome?: string
  followUpDate?: Date
  visitDate: Date
}

// ============================================
// REVIEW TYPES
// ============================================

export interface Review {
  id: string
  bookingId: string
  userId: string
  inventoryId: string
  overallRating: number
  cleanliness?: number
  service?: number
  location?: number
  value?: number
  title?: string
  comment: string
  images: string[]
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: PaginationMeta
}

export interface ApiError {
  code: string
  message: string
  details?: unknown
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

// ============================================
// SEARCH/FILTER TYPES
// ============================================

export interface SearchFilters {
  state?: State
  district?: string
  category?: InventoryCategory
  type?: InventoryType
  checkIn?: Date
  checkOut?: Date
  guests?: number
  minPrice?: number
  maxPrice?: number
  amenities?: string[]
}

export interface SearchResult {
  inventory: Inventory
  availability: AvailabilitySlot[]
  totalPrice: number
  isAvailable: boolean
}
