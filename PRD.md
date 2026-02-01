# Motel - Hotel/Room Booking Management System

## Overview

Motel is a web-based hotel and room booking management system built with Next.js and deployed to Railway. It provides hotel staff with tools to manage rooms, bookings, and customers through an intuitive dashboard interface.

## Goals

### Business Goals
- Streamline room booking operations
- Reduce double-bookings and scheduling conflicts
- Provide real-time availability visibility
- Maintain customer records for repeat business
- Generate insights through booking analytics

### Technical Goals
- Fast, responsive web application
- Real-time availability updates
- Mobile-friendly interface for on-the-go management
- Secure data handling
- Easy deployment and scaling on Railway

## User Stories

### Story 1: Room Management
**As a** hotel manager  
**I want** to add, edit, and view rooms  
**So that** I can maintain an accurate inventory of available accommodations

**Acceptance Criteria:**
- [ ] Can create a room with: name/number, type (single/double/suite), capacity, price per night, amenities, description, photos (optional)
- [ ] Can edit existing room details
- [ ] Can mark rooms as active/inactive (without deleting)
- [ ] Room list displays key info: name, type, price, status
- [ ] Search/filter rooms by type or status

**Complexity:** Medium

---

### Story 2: Booking Creation
**As a** front desk staff  
**I want** to create new bookings for customers  
**So that** I can reserve rooms for guests

**Acceptance Criteria:**
- [ ] Can select date range (check-in, check-out)
- [ ] System shows only available rooms for selected dates
- [ ] Can select customer (existing or create new)
- [ ] Captures: guest count, special requests, total price (auto-calculated)
- [ ] Booking confirmation shown with booking reference number
- [ ] Prevents double-booking through availability validation

**Complexity:** Medium

---

### Story 3: Booking Management
**As a** hotel manager  
**I want** to view, modify, and cancel bookings  
**So that** I can handle changes and manage occupancy

**Acceptance Criteria:**
- [ ] Booking list with filters: upcoming, current, past, cancelled
- [ ] Search bookings by customer name or booking reference
- [ ] Can view full booking details
- [ ] Can modify dates (if new dates available)
- [ ] Can cancel booking with reason capture
- [ ] Cancelled rooms become immediately available

**Complexity:** Medium

---

### Story 4: Customer Management
**As a** hotel staff  
**I want** to manage customer records  
**So that** I can provide personalized service and track repeat guests

**Acceptance Criteria:**
- [ ] Create customer with: name, email, phone, ID/passport, notes
- [ ] View customer booking history
- [ ] Edit customer details
- [ ] Search customers by name, email, or phone
- [ ] Duplicate detection (warn if similar customer exists)

**Complexity:** Simple

---

### Story 5: Availability Calendar
**As a** hotel manager  **I want** to view a calendar showing room availability  **So that** I can quickly assess occupancy and plan accordingly

**Acceptance Criteria:**
- [ ] Monthly calendar view
- [ ] Color-coded: available, booked, blocked
- [ ] Can click date to see which rooms are available
- [ ] Can block/unblock rooms for maintenance
- [ ] Quick navigation (prev/next month, jump to date)

**Complexity:** Complex

---

### Story 6: Dashboard & Analytics
**As a** hotel owner  **I want** to see key metrics and statistics  **So that** I can track business performance

**Acceptance Criteria:**
- [ ] Today's occupancy rate (percentage)
- [ ] Today's expected arrivals and departures
- [ ] Revenue this month vs last month
- [ ] Total bookings this month
- [ ] Quick links to: new booking, room management, today's guests

**Complexity:** Medium

---

## Technical Notes

### Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (via Railway)
- **ORM:** Prisma
- **Deployment:** Railway (Docker)
- **Auth:** NextAuth.js (basic admin auth)

### Data Models

**Room**
- id, roomNumber, type, capacity, pricePerNight, amenities[], description, images[], isActive, createdAt, updatedAt

**Customer**
- id, firstName, lastName, email, phone, idNumber, notes, createdAt, updatedAt

**Booking**
- id, bookingReference, roomId, customerId, checkIn, checkOut, guestCount, totalPrice, specialRequests, status (confirmed/cancelled/completed), cancelledAt, cancellationReason, createdAt, updatedAt

**User (Admin)**
- id, email, name, role (admin/staff), createdAt

### Routes Structure
```
/app
  /dashboard           - Main dashboard
  /rooms
    /page.tsx          - Room list
    /new/page.tsx      - Add room
    /[id]/page.tsx     - Edit room
  /bookings
    /page.tsx          - Booking list
    /new/page.tsx      - Create booking
    /[id]/page.tsx     - View booking
  /customers
    /page.tsx          - Customer list
    /new/page.tsx      - Add customer
    /[id]/page.tsx     - Edit customer
  /calendar            - Availability calendar
  /api                 - API routes
```

### Environment Variables
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL

### Railway Configuration
- Dockerfile for containerized deployment
- Health check endpoint: /api/health
- Automatic deployments on push to main

## Definition of Done

- [ ] All user stories implemented and functional
- [ ] Responsive design works on desktop and tablet
- [ ] Database schema created with Prisma
- [ ] Authentication implemented (basic admin login)
- [ ] All API routes tested
- [ ] Deployed to Railway with custom domain (optional)
- [ ] PRD acceptance criteria verified against deployed app

## MVP Scope

For initial release, prioritize:
1. Room management (Story 1)
2. Booking creation (Story 2)
3. Booking management (Story 3)
4. Basic dashboard (Story 6 - simplified)

Post-MVP:
- Customer management (Story 4)
- Availability calendar (Story 5)
- Advanced analytics
- Email notifications
- Multi-user roles
