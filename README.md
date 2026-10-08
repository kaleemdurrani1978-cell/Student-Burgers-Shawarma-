# 🍕 Student Pizza & Fastfood — Web Ordering & Admin Platform

A complete, production-ready, mobile-first food ordering web application, WhatsApp checkout system, contactless QR table dining portal, and mobile-friendly admin control dashboard built for **Student Pizza & Fastfood (Lahore, Pakistan)**.

---

## 📌 Project Overview & Verified Business Information

This application uses the current menu and business information supplied by the restaurant owner:
* **Business Public Name:** Student Pizza & Fastfood
* **Primary Location:** 61 Shalimar Link Road, Ramgarh, Lahore, Punjab, Pakistan
* **Contact & WhatsApp Candidate:** `0309-4222283` (+92 309 4222283)
* **International WhatsApp Format:** `923094222283`
* **Facebook Page:** [Student Pizza & Fastfood](https://www.facebook.com/people/Student-pizza-Fastfood/100089295146903/)
* **Operating Hours:** To be updated
* **Delivery Policy:** Delivery available across Lahore with flat Rs. 100 delivery fee (`Delivery + charge`)
* **Currency:** Pakistani Rupee (PKR / Rs. / روپے)

---

## 🎨 Visual Identity & Authentic Branding

* **Preserved Mascot & Logo:** Reconstructed faithfully from the original printed menu artwork featuring the cartoon student character wearing a red hat, red shirt, and yellow dungarees with the "STUDENT" pocket badge, gesturing toward the fast-food headline.
* **Color Palette:** Rich fast-food amber/yellow (`#F59E0B`, `#FACC15`), dark charcoal/slate foundation (`#0C0A09`, `#18181B`), and crisp red accents (`#DC2626`).
* **Bilingual Typography:** Full support for Urdu Nastaliq typography (`Noto Nastaliq Urdu`, `Jameel Noori Nastaleeq`) with right-to-left layout and verified translations.
* **PWA & Mobile App Support:** Custom `manifest.json`, high-resolution icons (192px, 512px), and responsive mobile bottom-bar navigation for one-thumb smartphone use.

---

## 📋 Authoritative Menu Inventory (100% Fidelity)

Every readable item, price in PKR, and deal bundle was extracted directly from the two printed menu photographs:

### Main Menu (31 Products)
1. **Shawarma (شوارما):**
   * ریگولر شوارما — Regular Shawarma — **Rs. 180**
   * اسپیشل شوارما — Especial Shawarma — **Rs. 250**
   * زنگر شوارما — Zinger Shawarma — **Rs. 300**
2. **Platters & Rolls (پلیٹر اور رول):**
   * پلیٹر شوارما — Platter Shawarma — **Rs. 450**
3. **Zinger Burgers (زنگر برگر):** Zinger Burger — **Rs. 300**; Zinger Burger + Fries — **Rs. 350**; Zinger Lapeta Burger — **Rs. 350**; Zinger Double Tekar + Fries — **Rs. 600**; Zinger Piece — **Rs. 250**.
4. **Shami Burgers (شامی برگر):** Shami Burger — **Rs. 150**; Shami Double Anda Burger — **Rs. 200**; Gol Shami Burger — **Rs. 180**; Student Especial Lapeta Burger — **Rs. 250**.
5. **Chicken Burgers (چکن برگر):** Chicken Patty Burger — **Rs. 250**; Chicken Patty Burger + Fries — **Rs. 300**; Chicken Burger — **Rs. 350**.
6. **Shappatta Roll:** Shappatta Roll — **Rs. 500**; Malai Boti Sandwich — **Rs. 500**; Malai Boti Paratha Roll — **Rs. 400**; Tikka Shawarma — **Rs. 300**.
7. **Paratha Rolls:** Chicken Paratha Roll — **Rs. 350**; Zinger Paratha Roll — **Rs. 350**.
8. **Fries:** Half Fries — **Rs. 150**; Full Fries — **Rs. 300**.
9. **Sandwiches (سینڈوچ):** Chicken Sandwich — **Rs. 400**; Club Sandwich — **Rs. 350**; Chicken Tikka Sandwich — **Rs. 400**.
10. **Soup (سوپ):** Chicken Corn Soup — **Rs. 150**; Hot & Sour Soup — **Rs. 150**.
11. **Extras & Add-ons (ایکسٹرا):** Extra Mayo (Small) — **Rs. 30**; Extra Mayo (Large) — **Rs. 50**.

### Student Deals (14 Bundles)
* **Deal 1:** 1 Zinger Burger + Fries + 1 Regular Drink — **Rs. 400**
* **Deal 2:** 1 Student Special Lapeta Burger + Fries + 1 Regular Drink — **Rs. 350**
* **Deal 3:** 1 Regular Shawarma + Fries + 1 Regular Drink — **Rs. 280**
* **Deal 4:** 1 Special Shawarma + Fries + 1 Regular Drink — **Rs. 350**
* **Deal 5:** 1 Zinger Paratha Roll + Fries + 1 Regular Drink — **Rs. 450**
* **Deal 6:** 1 Zinger Shawarma + Fries + 1 Regular Drink — **Rs. 400**
* **Deal 7:** 1 Shami Burger + Fries + 1 Regular Drink — **Rs. 250**
* **Deal 8:** 1 Chicken Patty Burger + Fries + 1 Regular Drink — **Rs. 350**
* **Deal 9:** 1 Chicken Burger + Fries + 1 Regular Drink — **Rs. 400**
* **Deal 10:** 1 Chicken Sandwich + Fries + 1 Regular Drink — **Rs. 450**
* **Deal 11:** 1 Club Sandwich + Fries + 1 Regular Drink — **Rs. 400**
* **Deal 12:** 1 Chicken Tikka Sandwich + Fries + 1 Regular Drink — **Rs. 450**
* **Deal 13 (Family Deal / فیملی ڈیل):** 5 Zinger Burgers + Half French Fries + 1.5 Liter Bottle — **Rs. 1700**
* **Deal 14 (Combo Feast):** 1 Regular Shawarma + 1 Shami Burger + 1 Zinger Burger + Half French Fries + 1 Liter Bottle — **Rs. 850**

---

## 📸 Food Photography

In accordance with Section 4 of the specification:
* The 31 menu products and 14 deals use local food photography in `/public/images/`; admin can upload a replacement image up to 2 MB per item.
* Automated checks (`scripts/verify-all.ts`) verify every product and deal image exists on disk.

---

## 📲 WhatsApp Click-to-Chat Ordering Flow

1. **Server-Side Price Validation:** The browser never dictates prices. When placing an order, `POST /api/orders` verifies item existence, current availability, re-calculates exact subtotals, and applies delivery fees.
2. **Order Reference:** Generates a standardized order reference (e.g. `SS-2610-8492`).
3. **Structured WhatsApp Message:**
```text
*NEW ORDER — STUDENT PIZZA & FASTFOOD*
Order ID: SS-2610-8492
Order Type: Dine-in / Takeaway / Home Delivery
Customer Name: Ali Ahmed
Phone: 0309-4222283
Table Number: T01 (if dine-in)
Delivery Address: Shalimar Link Road (if delivery)

*ORDER ITEMS*
• Regular Shawarma × 2 — Rs. 360
• Student Deal 3 × 1 — Rs. 280

Items Subtotal: Rs. 640
Delivery Charges: Rs. 0
*Grand Total: Rs. 640*
Special Instructions: Less spicy, pack garlic sauce separately

Please confirm availability and the order total.
```
4. **Official URL:** Opened via `https://wa.me/923094222283?text=...`.
5. **Customer Declaration & Tracking:** The order is tracked initially as `awaiting_whatsapp`. The customer is provided an **"I have sent the WhatsApp order"** button, moving status to `pending` without falsely claiming kitchen confirmation until the restaurant staff explicitly updates the order in the admin portal.

---

## 🍽️ Dine-In QR Table Ordering System

* **URL Routing:** Tables are identified dynamically via `?table=T01` (e.g., `https://your-domain.vercel.app/?table=T01`).
* **Automatic Detection:** The app reads the query parameter, binds the session to the table, displays a persistent top banner `"Dine-In Session: Table T01"`, and pre-fills checkout details.
* **Printable Standees:** Visit `/admin/tables/print/T01` to view a print-ready 4×6" table tent layout featuring the restaurant logo, table badge, high-res QR code, and bilingual instructions.
* **Bulk Printing:** Open `/qr/print-tables` from table management to print unique dine-in QR codes for Tables 1–6 on one sheet.

---

## 🛡️ Full Admin Dashboard (`/admin`)

Designed for the restaurant owner to control operations from a smartphone:
* **Overview:** Real-time today's orders count, recorded sales revenue, pending alerts, and bestsellers.
* **Order Management:** Filter by status, search by customer, filter by dining table, one-click WhatsApp customer reply, kitchen notes, and CSV export.
* **Menu Management:** Add new items, edit PKR prices, update Urdu names, upload images, and toggle "In Stock" / "Sold Out".
* **Deals Management:** Edit deal bundles and bundle component quantities.
* **QR Table Management:** Add tables, generate QR codes, download PNGs, and print standees.
* **Menu Verification Audit:** Side-by-side audit checklist comparing live database records against the original printed cards.
* **Business Settings:** Update phone numbers, WhatsApp click-to-chat recipient, delivery fees, hours, and homepage announcement banners.

---

## 🚀 Deployment to Vercel

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "feat: complete Student Pizza & Fastfood ordering web app and admin platform"
git remote add origin https://github.com/<your-username>/student-shawarma.git
git push -u origin master
```

### Step 2: Import into Vercel
1. Log into [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select your `student-shawarma` repository.
3. In **Environment Variables**, configure:
   * `NEXT_PUBLIC_APP_URL` = `https://your-app-name.vercel.app`
   * `ADMIN_USERNAME` = `admin`
   * `ADMIN_SECRET_KEY` = a strong, private admin login password (never commit it)
   * `ADMIN_SESSION_SECRET` = a separate random 64-character secret for signing admin sessions (never commit it)
   * `NEXT_PUBLIC_DEFAULT_WHATSAPP` = `923094222283`
4. Click **Deploy**. Vercel will build the application using `npm run build` and launch it globally on high-speed CDN.

The built-in JSON database is intended for local development. Before using the online admin to persist menu edits or uploaded images, connect a durable database and image storage service; serverless hosting does not guarantee writable persistent local files. GitHub stores the source code and does not itself deploy or host the app.

---

## 🗄️ Optional Supabase Setup (PostgreSQL)

The application runs out-of-the-box using its built-in local persistent database. To connect external PostgreSQL via Supabase:
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase and run `supabase/schema.sql`.
3. Add your credentials to Vercel Environment Variables:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `SUPABASE_SERVICE_ROLE_KEY`

---

## 🔍 Google Business Profile & Search Console Checklist

To achieve visibility on Google Maps and search results in Lahore:
1. **Google Business Profile:**
   * Go to [business.google.com](https://business.google.com).
   * Claim or create **"Student Pizza & Fastfood"** at **61 Shalimar Link Road, Ramgarh, Lahore**.
   * Set category to *Shawarma Restaurant / Fast Food Restaurant*.
   * Add the deployed website URL as the official Website and Menu link.
   * Add phone number `0309-4222283`.
   * Add the restaurant's confirmed operating hours when available.
2. **Google Search Console:**
   * Add your Vercel domain at [search.google.com/search-console](https://search.google.com/search-console).
   * Submit the automated sitemap: `https://your-domain.vercel.app/sitemap.xml`.

---

## 🧪 Automated Verification Suite

Run the comprehensive test suite locally:
```bash
npx tsx scripts/verify-all.ts
```
Expected output:
```text
✓ PASS: Configured 31 individual menu products
✓ PASS: Configured all 14 Student Deals
✓ PASS: Shawarma menu has only the three requested varieties and prices
✓ PASS: Zinger Burger price is exactly 300/-
✓ PASS: Deal 3 price is exactly 280/-
✓ PASS: Deal 13 is Rs. 1700 with 5 Zinger Burgers, half fries, and a 1.5 Liter bottle
✓ PASS: All 45 products and deals have existing local image files on disk
✓ PASS: Authoritative items subtotal calculated correctly
✓ PASS: Initial order status is strictly "awaiting_whatsapp"
✓ PASS: WhatsApp URL points to verified international recipient number
...
TEST RESULTS: All checks passed (100% SUCCESS)
```
