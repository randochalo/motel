# NTOS - National Tourism Operating System
## Product Requirements Document (PRD)

## 1. Vision Statement

NTOS is a transformative G2B2C (Government-to-Business-to-Consumer) digital infrastructure that consolidates Malaysia's fragmented tourism sector. It establishes an **"Invisible Monopoly"** through a centralized backend with decentralized state-specific frontends, empowering local SMEs while giving state governments digital sovereignty.

We are not building a booking engine — we are building the sovereign operating system for Malaysian hospitality.

---

## 2. The Problem

1. **Global Aggregator Tax:** Booking.com, Airbnb, Klook extract 15-30% commissions; data and capital flow out of Malaysia
2. **Rural Digital Divide:** Thousands of operators (homestays, car rentals, experience guides) operate via WhatsApp and logbooks — invisible to global search
3. **Compliance Paralysis:** LHDN e-Invoicing mandates threaten non-digitized SMEs who can't afford ERP systems

---

## 3. The Solution: "Invisible Monopoly" Strategy

### A. Multi-Frontend Strategy (The Funnel)
- **National Brand:** `tamuhouse.my` — premium aggregator experience
- **State Proxies:** `perlistourism.com`, `visitmelaka.com.my`, etc. — government-endorsed local portals
- **SEO Moat:** State domains capture hyper-local search traffic
- **Illusion of Choice:** All frontends feed into one centralized backend

### B. Trojan Horse ERP (The Lock-in)
Free all-in-one business suite for merchants:
- HR Module (payroll, EPF/SOCSO)
- Accounting (P&L, cash flow, LHDN e-Invoicing gateway)
- Legal (digital rental agreements, e-stamping)
- Inventory Control (walk-in bookings instantly delist online availability)

Once merchants use the ERP, switching costs are prohibitively high.

---

## 4. Core Features

### 4.1 Multi-Tenant Architecture (Hub-and-Spoke Model)

**The Hub (Centralized Backend):**
- Single Master Database for all inventory
- Every asset has unique ID + metadata tags: `[State]`, `[District]`, `[Category]`, `[Merchant]`
- Global Availability Engine: syncs ERP bookings across all frontends instantly
- MyDigitalID Auth Service: unified user identity across all state/national sites
- Unified Payment Gateway with automatic commission splitting

**The Spokes (Frontends):**

| Feature | State Frontend (e.g., perlistourism.com) | National Frontend (tamuhouse.my) |
|---------|------------------------------------------|----------------------------------|
| **Goal** | Trust & Local Authority | Scale & Premium Branding |
| **UI/UX** | State colors, landmarks, official branding | Modern, high-conversion (Airbnb-style) |
| **Content Filter** | Hardcoded to specific state | Cross-state discovery, bundles |
| **Marketing** | State Gov funded | Platform revenue funded |
| **SEO** | Long-tail local keywords | Broad Malaysia keywords |
| **Checkout** | Unified API (same backend) | Unified API (same backend) |

### 4.2 Inventory Categories (Beyond Just Rooms)

**Accommodation:**
- Hotels, resorts, urban apartments
- Kampung-stays (rural homestays)
- Boutique guesthouses

**Transportation:**
- Car rentals (GPS-enabled fleet)
- Bus tickets (inter-city)
- Ferry tickets
- Private drivers

**Experiences:**
- Guided tours (heritage, food, nature)
- Activity bookings (watersports, hiking)
- Event tickets
- Farm/agritourism experiences

### 4.3 Intermodal Bundling Engine

Users can book multi-segment journeys in one checkout:
- **Example:** Bus ticket (TBS → Kuala Perlis) + GPS car rental (terminal pickup) + rural homestay
- Dynamic pricing for bundles
- Unified itinerary view

### 4.4 MyDigitalID Integration

**For Merchants:**
- Biometric verification (no ghost listings)
- Digital business registration validation

**For Travelers:**
- Seamless KYC for rentals (no manual passport upload)
- Legally binding digital signatures on contracts
- Trust badges on verified profiles

### 4.5 Trojan Horse ERP (Free for Merchants)

**Dashboard Module:**
- Real-time bookings from all channels
- Availability calendar with offline booking input
- Revenue analytics

**HR Module:**
- Employee management
- Payroll calculation
- EPF/SOCSO auto-calculation
- Payslip generation

**Accounting Module:**
- Income/expense tracking
- P&L statements
- Cash flow reports
- **LHDN e-Invoicing auto-submission** (critical for 2024/2025 compliance)

**Legal Module:**
- Digital rental agreement templates
- E-stamping integration
- MyDigitalID-signed contracts

**Inventory Module:**
- Multi-category asset management
- GPS tracking dashboard (for vehicles)
- Maintenance scheduling

### 4.6 GPS-Enabled Vehicle Fleet

- Pre-installed GPS units for car rental partners
- Real-time location display for travelers (e-hailing app experience)
- Remote immobilization for security
- Geofencing alerts

### 4.7 Commission & Revenue Split Engine

Automatic calculation on each transaction:
1. **Merchant Cut** → Direct to operator's bank account
2. **Platform Commission** (8-15% vs global giants' 15-30%)
3. **State Marketing Contribution** (optional, for state-endorsed bookings)

### 4.8 Field Officer Management

**Internal Tools:**
- Field officer mobile app for merchant onboarding
- GPS tracking of field visits
- Photo documentation of merchant locations/assets
- Training completion tracking
- Quality assurance checklists

---

## 5. User Stories

### Story 1: State Portal Discovery
**As a** traveler planning a trip to Perlis  
**I want** to find official, verified accommodations and activities  
**So that** I can trust the bookings are legitimate and support local businesses

**Acceptance Criteria:**
- [ ] State portal shows official government endorsement
- [ ] All listings are MyDigitalID verified
- [ ] Search filters by district (Arau, Kangar, etc.)
- [ ] "Harumanis farm tour" and other state-hero products featured
- [ ] Checkout uses MyDigitalID for KYC
- [ ] Mobile-responsive for on-trip booking

**Complexity:** Complex

---

### Story 2: Intermodal Booking
**As a** traveler from KL visiting Perlis  
**I want** to book my entire journey (bus + car + stay) in one transaction  
**So that** I don't need to coordinate multiple bookings

**Acceptance Criteria:**
- [ ] Can search by destination and dates
- [ ] System shows available transport options to reach destination
- [ ] Can add car rental at destination terminal
- [ ] Can add accommodation near activities
- [ ] Unified checkout with single payment
- [ ] Single itinerary with all confirmation codes
- [ ] Cancellation policy clearly stated per segment

**Complexity:** Complex

---

### Story 3: Merchant ERP Onboarding
**As a** car rental operator in Kangar  
**I want** free software to manage my business and comply with LHDN e-Invoicing  
**So that** I can digitize without expensive ERP costs

**Acceptance Criteria:**
- [ ] Field officer creates merchant account
- [ ] Can add vehicles with details and GPS unit pairing
- [ ] Can input offline (walk-in) bookings
- [ ] Automatic e-Invoice generation for each sale
- [ ] Payroll calculation for drivers/staff
- [ ] Real-time sync: offline bookings hide vehicle from online portals
- [ ] Commission reports and payouts visible

**Complexity:** Complex

---

### Story 4: MyDigitalID Authentication
**As a** traveler  
**I want** to use my national digital identity to book and check-in  
**So that** I don't need to repeatedly upload documents

**Acceptance Criteria:**
- [ ] Login via MyDigitalID
- [ ] Identity auto-populated in booking forms
- [ ] Digital signature on rental agreements via MyDigitalID
- [ ] Verification badge on profile
- [ ] One-time verification works across all state/national portals

**Complexity:** Medium

---

### Story 5: GPS Vehicle Tracking
**As a** traveler arriving at Kuala Perlis terminal  
**I want** to see exactly where my rental car is parked  
**So that** I can find it easily without calling the operator

**Acceptance Criteria:**
- [ ] Booking confirmation shows live car location
- [ ] Map view with walking directions from terminal
- [ ] Car unlock/lock via app (if supported)
- [ ] Emergency contact button
- [ ] Return location guidance

**Complexity:** Medium

---

### Story 6: National Platform Discovery
**As an** international traveler  
**I want** to discover top experiences across Malaysia  
**So that** I can plan a multi-state itinerary

**Acceptance Criteria:**
- [ ] Homepage shows curated "Top Picks" from all states
- [ ] Search by activity type (adventure, food, heritage)
- [ ] "Malaysia Heritage Trail" bundle suggestions
- [ ] Cross-state itinerary builder
- [ ] Multi-currency display
- [ ] Reviews and ratings from verified travelers

**Complexity:** Medium

---

### Story 7: Field Officer Dashboard
**As a** field officer  
**I want** to onboard merchants and track my visits  
**So that** I can expand the platform's supply base

**Acceptance Criteria:**
- [ ] Mobile app for field use
- [ ] GPS check-in at merchant location
- [ ] Photo upload of premises/assets
- [ ] Merchant registration form (offline-capable, sync later)
- [ ] GPS unit installation tracking
- [ ] Training completion certification
- [ ] Commission tracking for referrals

**Complexity:** Medium

---

## 6. Technical Architecture

### 6.1 Backend (The Hub)

**Database Schema (Multi-tenant):**

```
Merchants
├── id, myDigitalId, businessName, registrationNumber
├── state, district, address, geoLocation
├── contactInfo, bankAccountDetails
├── verificationStatus, onboardedBy (fieldOfficerId)
└── createdAt, updatedAt

Inventory (Unified Pool)
├── id, merchantId, category (accommodation|transport|experience)
├── type (hotel|homestay|car|bus|tour|activity)
├── metadata JSONB (state, district, tags)
├── availabilityRules
├── pricingRules
├── gpsDeviceId (for vehicles)
└── isActive

Bookings
├── id, bookingReference, userId
├── inventoryId, merchantId
├── checkIn/DateTime, checkOut/DateTime
├── status (confirmed|cancelled|completed)
├── totalAmount, currency
├── commissionSplit (platform, state, merchant)
└── myDigitalIdSignature

Users
├── id, myDigitalId, email, phone
├── profileData, verificationLevel
├── bookings[]
└── preferences

ERP Modules
├── HrRecords (employees, payroll, epfSocso)
├── AccountingEntries (income, expenses, eInvoiceData)
├── LegalDocuments (agreements, signatures)
└── OfflineBookings (syncs to availability)

FieldOfficers
├── id, name, territory (state/district)
├── visits[] (gps, merchantId, timestamp)
├── onboardingStats
└── commissionEarnings
```

**APIs:**
- `/api/v1/inventory` — Search, filter, availability check
- `/api/v1/bookings` — CRUD operations, payment hooks
- `/api/v1/bundles` — Intermodal package creation
- `/api/v1/merchants/erp/*` — Full ERP API suite
- `/api/v1/myid/*` — MyDigitalID integration proxy
- `/api/v1/field/*` — Field officer operations
- `/api/v1/admin/*` — Platform administration

### 6.2 Frontends (The Spokes)

**Shared Components:**
- Design system (Tailwind-based)
- Component library (shadcn/ui or similar)
- State-specific theming (CSS variables)

**State Frontend:**
- Hardcoded state filter on all API calls
- Localized content (state attractions, blog)
- Government badge integration
- State-specific SEO meta

**National Frontend:**
- Dynamic location selection
- Cross-state search
- Bundle builder UI
- Premium branding
- Multi-language support

**Merchant ERP Frontend:**
- Dashboard-focused design
- Mobile-first for on-the-go management
- Offline-capable PWA features
- Printer support for receipts/invoices

**Field Officer App:**
- React Native or PWA
- GPS integration
- Camera access
- Offline sync

### 6.3 Integrations

**MyDigitalID:**
- OAuth/SSO flow
- Identity verification API
- Digital signature API

**Payment:**
- FPX (Malaysian online banking)
- Credit/Debit cards
- E-wallets (Touch n Go, GrabPay)
- Split payout system

**LHDN e-Invoicing:**
- MyInvois API integration
- Auto-submission on transaction
- Validation and error handling

**GPS Tracking:**
- Third-party GPS provider API
- Real-time location streaming
- Geofencing webhooks

---

## 7. Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL (via Railway) |
| **ORM** | Prisma |
| **Auth** | MyDigitalID + NextAuth.js fallback |
| **State Mgmt** | Zustand / React Query |
| **Deployment** | Railway (Docker) |
| **File Storage** | AWS S3 / Cloudflare R2 |
| **Queue** | BullMQ (Redis) for async jobs |
| **Search** | Meilisearch / Algolia |

---

## 8. MVP Scope (Phase 1)

**Core Infrastructure:**
1. Multi-tenant backend with state-tagging
2. National frontend (tamuhouse.my)
3. One state frontend pilot (Perlis)
4. MyDigitalID authentication
5. Basic ERP (inventory + offline booking sync)

**Inventory Types (MVP):**
- Accommodations (hotels, homestays)
- Car rentals (with GPS integration)

**Booking Flow:**
- Search → Select → Checkout → Confirmation
- Unified payment with commission split
- Basic e-Invoice generation

**Merchant Tools:**
- Registration portal
- Inventory management
- Simple dashboard

**Post-MVP (Future Phases):**
- Bus/ferry ticket integration
- Experience/activity bookings
- Full ERP (HR, Accounting)
- Field officer mobile app
- Intermodal bundling engine
- All 13 state frontends
- AI-powered recommendations

---

## 9. Success Metrics

**Platform Metrics:**
- Total GMV (Gross Merchandise Value)
- Active merchants by state
- Booking conversion rate
- Average commission per booking

**Merchant Metrics:**
- % of inventory digitized
- ERP adoption rate
- e-Invoice compliance rate
- Repeat booking rate

**User Metrics:**
- MyDigitalID adoption
- Cross-state booking rate
- Bundle booking rate
- NPS score

**Government Metrics:**
- State portal traffic
- Local SME digitalization rate
- Tax revenue visibility (LHDN)

---

## 10. Definition of Done

- [ ] Backend supports multi-tenant state tagging
- [ ] National frontend (tamuhouse.my) deployed
- [ ] One pilot state frontend (Perlis) deployed with official endorsement
- [ ] MyDigitalID integration functional
- [ ] Merchant ERP with inventory + offline sync operational
- [ ] GPS vehicle tracking functional
- [ ] Payment gateway with automatic commission splitting
- [ ] LHDN e-Invoicing auto-submission working
- [ ] Field officer can onboard a merchant end-to-end
- [ ] All MVP user stories verified against deployed platform

---

## 11. Notes for Development

1. **Regulatory:** Ensure TOBTAB license compliance for tourism operations
2. **Security:** All merchant data encrypted at rest; PCI-DSS for payments
3. **Scalability:** Design for 10,000+ merchants, 100,000+ daily transactions
4. **Localization:** Support Malay, English, Chinese for frontends
5. **Offline-First:** ERP must work offline in rural areas with poor connectivity
6. **Data Sovereignty:** All data hosted in Malaysia (Awan Kita / local cloud)

---

*This PRD represents the blueprint for Malaysia's National Tourism Operating System — the infrastructure that ensures Malaysian tourism value stays within the Malaysian ecosystem.*
