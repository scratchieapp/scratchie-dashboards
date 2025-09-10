# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application called "scratchie-dashboards" - a workplace safety and recognition platform with multiple dashboard views for administrators, companies, and individual sites. The application features interactive data visualizations, maps, and a comprehensive award system.

## Commands

### Development
- `npm run dev` - Start the Vite development server with hot module replacement
- `npm run build` - Run TypeScript compiler and build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint on the codebase

### TypeScript
- Type checking is performed as part of the build process via `tsc -b`
- The project uses TypeScript ~5.8.3 with separate configs for app and node environments

## Architecture

### Build System
- **Vite** (v7.1.2) - Fast build tool with HMR support
- **React** (v19.1.1) - UI framework with React DOM
- **TypeScript** - Type safety with separate tsconfig files for app and node environments

### Key Dependencies
- **recharts** (v3.1.2) - Charting library for data visualization dashboards
- **lucide-react** (v0.540.0) - Icon library for UI components
- **shadcn/ui** - Component library built on Radix UI and Tailwind CSS
- **@radix-ui** - Unstyled, accessible UI primitives (dialog, checkbox, label, etc.)
- **react-map-gl** (v7.1.7) - React wrapper for Mapbox GL JS
- **mapbox-gl** (v3.9.0) - Interactive map library
- **tailwindcss** (v3.4.20) - Utility-first CSS framework
- **class-variance-authority** - Utility for managing component variants
- **clsx** & **tailwind-merge** - Utilities for conditional class names

### Project Structure
- `/src` - React components and application code
  - `main.tsx` - Application entry point
  - `App.tsx` - Root component with routing between dashboards
  - `/components` - React components
    - `AdminDashboard.tsx` - Admin dashboard with team performance metrics
    - `CompanyDashboard.tsx` - Company-level dashboard (McDonald's Westside QSR)
    - `SiteDashboard.tsx` - Site-specific dashboard (McDonald's Chisholm)
    - `MapView.tsx` - Reusable Mapbox component for location visualization
    - `ScratchieModal.tsx` - Multi-step award creation wizard
    - `WalletView.tsx` - Company-level wallet management for multiple sites
    - `SiteWalletView.tsx` - Individual site wallet management with PayTo integration
    - `/ui` - shadcn/ui components (dialog, input, textarea, checkbox, label, select, table, etc.)
  - `/lib` - Utility functions
    - `utils.ts` - Class name utility functions
- `/public` - Static assets served directly
  - McDonald's logo and other brand assets
- `/admin` - HTML mockups (reference only)
- TypeScript configuration split between:
  - `tsconfig.app.json` - Application TypeScript config
  - `tsconfig.node.json` - Node/build tooling TypeScript config
- `tailwind.config.js` - Tailwind CSS configuration
- `components.json` - shadcn/ui configuration

### Development Workflow
- ESLint configured with React hooks and React refresh plugins
- Vite plugin for React with Fast Refresh support
- Module-based package structure (type: "module" in package.json)

## Features

### Dashboard Views
1. **Admin Dashboard** (`/admin`)
   - Team performance overview
   - Recognition activity metrics
   - Store engagement tracking
   - Budget utilization

2. **Company Dashboard** (`/company`)
   - Multi-site overview with interactive Mapbox
   - Recognition trends (stacked column charts)
   - Cost analysis and budget tracking
   - Site performance comparison
   - Wallet management for all sites with editable limits

3. **Site Dashboard** (`/site`)
   - Individual site metrics
   - Awards management system
   - Cost tracking and analysis
   - Comprehensive reporting tools
   - Team engagement metrics
   - Site-specific wallet management with PayTo integration

### Key Components
- **Scratchie Modal**: 5-step wizard for creating recognition awards
  - Award type selection (Scratchie/Turbo Scratchie)
  - Category selection (Safety, Team Collaboration, Guest Satisfaction, etc.)
  - Participant selection with search
  - Winner configuration
  - Recognition message with voice recording option

- **Interactive Maps**: Mapbox integration showing:
  - Head office locations
  - Active/inactive sites
  - Site details in popups

- **Reporting System**: Comprehensive reports including:
  - Monthly site reports
  - Performance vs targets
  - Financial summaries
  - Safety metrics
  - Downloadable PDF/Excel exports

- **Wallet Management**:
  - **Company Wallet View**: 
    - Overview of all site wallets with balance tracking
    - Dual payment methods: PayTo (direct debit) and Credit Card
    - Payment method selection with visual comparison of fees and benefits
    - Editable monthly spending limits, minimum balances, and top-up amounts
    - Payment status indicators (green for PayTo, purple for Credit Card)
    - Quick Top-Up feature for sites with critical balances via credit card
    - Change payment method capability after initial setup
    - Pagination and search for managing multiple sites
    - Low balance alerts and status indicators
    - Bulk import/export functionality
  - **Site Wallet View**:
    - Three payment options: Inherit from Company (default), Site PayTo, or Site Credit Card
    - Individual site wallet with instant payment integration
    - Manual Top-up button for emergency credit card funding
    - Sawtooth balance pattern visualization showing auto top-ups
    - Combined monthly budget status showing spent vs remaining
    - Transaction history with categorized spending
    - Automatic top-up configuration when balance hits minimum
    - Real-time balance tracking with $150-$450 operating range
    - Visual payment method indicators aligned with action buttons

- **Payment System Components**:
  - **PaymentMethodSelectionModal**: 
    - Choose between PayTo, Credit Card, or Inherit from Company (sites only)
    - Visual comparison with pros/cons for each payment method
    - Color-coded recommendations (green for PayTo, purple for Credit Card)
  - **CompanyBankAccountModal**:
    - 3-step PayTo setup process for companies
    - Company-wide monthly cap ceiling configuration
    - Default site cap settings ($1500 default)
    - Blue-themed UI for company-level operations
  - **SiteBankConsentModal**:
    - 2-step PayTo consent for individual sites
    - Inherits company bank details
    - Site-specific monthly cap configuration
    - Green-themed UI for site-level operations
  - **CreditCardPaymentModal**:
    - Full credit card form with validation
    - 3DS verification simulation
    - Quick Top-Up mode for urgent funding
    - Recurring payment options
    - Transaction fee warnings (2.9% + $0.30)
  - **Payment Method Indicators**:
    - Green badges/buttons for PayTo
    - Purple badges/buttons for Credit Card
    - Blue badges for inherited company payment
    - Amber for configuration needed

### Environment Variables
- Mapbox API tokens should be configured for map functionality
- Public token: `pk.eyJ1IjoiamFtZXNrZWxsIiwiYSI6ImNtNTJ4M28yZzAyczUycnB0c2xjd2gxdWQifQ.E7BFtiI2JdgCH91Eb2yctw`

## Product Requirements Document (PRD)

### Payment System Overview

#### Problem Statement
Scratchie needs a flexible payment system that allows both companies and individual sites to manage their wallet funding efficiently. Companies need centralized control while sites require autonomy for urgent situations.

#### Solution Architecture

**1. Hierarchical Payment Structure**
- Company level: Establishes primary payment method (PayTo or Credit Card)
- Site level: Can inherit company payment or establish independent payment
- Default behavior: Sites inherit from company (no additional setup required)

**2. Payment Methods**

**PayTo (Recommended)**
- Lower transaction fees
- Automated weekly direct debit from bank account
- Best for regular, predictable spending
- Requires one-time bank authorization
- Company-wide ceiling caps to prevent overspending

**Credit Card**
- Higher transaction fees (2.9% + $0.30)
- Instant setup and activation
- Perfect for urgent or one-time top-ups
- Flexible payment timing
- Stored securely via Airwallex tokenization

**3. User Flows**

**Company Setup Flow:**
1. Click "Set Up Payment Method"
2. Choose between PayTo or Credit Card
3. Complete setup wizard (3 steps for PayTo, single form for Credit Card)
4. Payment method stored and applied to all sites by default

**Site Payment Flow:**
1. Default: Automatically inherits company payment method
2. Override option: "Change to Site Payment" to establish independent payment
3. Can choose own PayTo or Credit Card setup
4. Visual indicators show payment source (Company vs Site)

**Emergency Top-Up Flow:**
1. Sites with low balance see "Quick Top-Up" or "Manual Top-up" button
2. Opens credit card modal with suggested amount
3. Processes immediate payment to restore wallet balance
4. No impact on regular payment schedule

**4. Visual Design System**

**Color Coding:**
- Green: PayTo active/available
- Purple: Credit Card active/available
- Blue: Company-level operations or inherited payment
- Amber: Configuration needed or warnings
- Red: Critical status or errors

**UI Patterns:**
- Payment status badges positioned next to action buttons
- Edit vs Change Method clearly differentiated
- Modal wizards for complex flows (PayTo setup)
- Single forms for simple flows (Credit Card)
- Inline validation and helpful error messages

**5. Technical Implementation**

**State Management:**
- Payment method stored in localStorage for persistence
- Payment details cached for editing without re-entry
- Separate storage for company vs site preferences

**Security:**
- No storage of full card numbers or CVV
- Airwallex handles PCI compliance
- PayTo uses bank-level authorization
- 3DS verification for credit cards

**6. Business Rules**

**Company Level:**
- Must establish payment before sites can operate
- Can change payment method at any time
- Sets default caps for all sites ($1500/month default)
- Company-wide ceiling prevents overspending ($9000 for 6 sites)

**Site Level:**
- Inherits company payment by default (no action required)
- Can override with independent payment if needed
- Monthly caps enforced regardless of payment source
- Automatic top-ups when balance < minimum threshold
- Manual top-ups available for emergencies

**7. Success Metrics**
- Reduced time to payment setup (<2 minutes)
- Decreased support tickets for payment issues
- Higher adoption of automated payments (PayTo)
- Faster emergency top-up response (<30 seconds)
- Clear payment source visibility (no confusion about who pays)

## Important Instruction Reminders
- Do what has been asked; nothing more, nothing less.
- NEVER create files unless they're absolutely necessary for achieving your goal.
- ALWAYS prefer editing an existing file to creating a new one.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.