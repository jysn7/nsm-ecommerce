Project Overview
A high-performance C2C (Customer-to-Customer) Marketplace MVP built using Next.js 15 (App Router), Supabase, and Shadcn/UI.

Core Principles
Styling: Simple styling, no italics or bold in UI text. Center-aligned content.

Tone: Commercial, normal language.

Aesthetic: Rounded bento-style grid with micro-interactions and spotlight hover effects.

Scaling: Optimized for high performance (indexing, connection pooling, and eventual search optimization).

1. Directory Structure (Source of Truth)
Plaintext
root/
├── app/                  # Routes & Layouts
│   ├── (auth)/           # Login, Signup, Reset Password
│   ├── (buyer)/          # Search, Product Detail, Cart, Checkout
│   ├── (seller)/         # Seller Dashboard, Inventory, Payouts
│   ├── (admin)/          # User Management, Store Verification, Audits
│   └── api/              # Webhooks (Stripe, Courier updates)
├── features/             # Business Logic (Modular Domain)
│   ├── products/         # Listing, filtering, and stock logic
│   ├── orders/           # Purchasing and tracking logic
│   ├── stores/           # Seller profiles and settings
│   └── admin/            # Platform governance (Admin Brain)
├── components/           # UI Layer
│   ├── ui/               # RAW Shadcn components (Don't modify manually)
│   ├── shared/           # Layouts, Menus, Global Search
│   └── charts/           # Sales graphs
├── lib/                  # Infrastructure
│   ├── supabase/         # Server, Client, and Middleware config
│   ├── stripe.ts         # Payment config
│   └── utils.ts          # Tailwind/Shadcn helpers
├── types/                # TypeScript definitions
└── hooks/                # Custom hooks (useCart, useAuth)
2. Database Schema (Supabase)
Tables
users: Profiles, wallet_balance, and role (customer/admin).

stores: Linked to users.id via sellerId. Represents the seller's business identity.

products: Linked to stores.id and categories.id.

orders: Tracks buyerId (user) and storeId (seller).

order_items: Snapshots of productId and price at time of purchase.

payouts: Tracks money owed/paid to stores.

admin_audit: Tracks all administrative actions.

3. Tech Stack & Implementation Details
Framework: Next.js 15 (React 19).

Database: PostgreSQL (Supabase).

Auth: Supabase Auth (Cookie-based).

Styling: Tailwind CSS + Shadcn/UI.

Performance: Use idx_ prefixed indexes on all Foreign Keys. Use Server Actions for all mutations.