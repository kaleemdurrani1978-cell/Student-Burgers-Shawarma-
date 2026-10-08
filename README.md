# STUDENT BURGERS & SHAWARMA — COMPLETE PROJECT FROM SCRATCH

You are a senior full-stack engineer, UI/UX designer, database architect and restaurant ordering-system developer.

Build a complete, professional, mobile-first restaurant ordering web application for Student Burgers & Shawarma / Student Fastfood.

This is a fresh development project on my NEW Vercel/v0 account. Do not depend on any previous v0 conversation, previous v0 session, generated files or old account credits.

## 1. GITHUB REPOSITORY — MANDATORY

Use this exact existing GitHub repository:

https://github.com/kaleemdurrani1978-cell/Student-Burgers-Shawarma-

This repository is the permanent source-code destination.

First, connect the GitHub integration and inspect the repository.

If it is empty, initialize the application in this repository.

If it contains existing code, inspect it and preserve anything useful. Do not delete existing work blindly.

Do not create a different repository.

Use a development branch and keep production changes safe.

Make sure the completed code can be committed and pushed to the specified repository through the authorized GitHub integration.

Do not claim that code has been pushed unless the commit actually exists in GitHub.

If the repository cannot be accessed, explain exactly which permission or connection is required.

## 2. STRICT IMAGE AND CREDIT RULE

We have limited AI credits.

**Do not generate any images. Do not call image-generation tools.**

Do not spend credits generating:

* Food photography
* Burger or shawarma images
* Logos
* Banners
* Background graphics
* Illustrations
* Decorative images

Instead, create a professional interface using CSS, typography, layout, existing assets and lightweight reusable image placeholders.

I will upload real food images later through the Admin Panel.

Build a working image upload, preview, replacement and removal system for every product and deal.

Use a persistent image storage provider and save image references in the database.

If Supabase is selected, configure Supabase Storage and the required secure upload permissions.

Never pretend that image uploads work if storage is not configured.

## 3. ORIGINAL BRAND AND MENU

The physical menu consists of two reference photographs:

1. Yellow menu.
2. Black Student Deals menu.

Use these as the source of truth for the business logo, product names, prices, deal numbers and deal contents.

The Facebook business page is:

https://www.facebook.com/p/Student-pizza-Fastfood-100089295146903/

Extract publicly available business information where possible, but do not invent missing details.

Do not invent product names, prices, deal contents, addresses, phone numbers, opening hours or reviews.

Any menu entry that cannot be read reliably must be marked for manual verification.

The original Student brand must remain recognizable. Do not replace its logo with a new AI-generated logo.

If the original menu photographs are not attached to this v0 session, ask me to upload them before finalizing the menu data. Do not guess the complete menu.

## 4. TECHNOLOGY STACK

Use:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui where appropriate
* Supabase PostgreSQL
* Supabase Auth
* Supabase Storage
* Vercel deployment

Use compatible current stable dependencies and the existing repository's package manager where applicable.

Keep the architecture simple and maintainable.

Avoid unnecessary dependencies and complex infrastructure.

## 5. CUSTOMER WEBSITE

Build a polished mobile-first restaurant website with:

* Home page
* Menu page
* Menu categories
* Search
* Deals section
* Cart
* Checkout
* Contact section
* WhatsApp ordering
* Dine-in QR ordering
* Responsive footer

Use a modern visual style inspired by the original menu's yellow, black, red and white branding.

The interface should be clean and professional rather than resembling a scanned printed menu.

Use CSS-based placeholders for missing product images. Each placeholder must display the product name or category and automatically disappear when an uploaded image is available.

## 6. MENU MANAGEMENT

Create database-driven categories, products and deals.

Products must support:

* English name
* Optional Urdu name
* Category
* Price in PKR
* Description
* Image reference
* Availability
* Featured status
* Display order

Deals must support:

* Name and deal number
* Included items and quantities
* Price
* Description
* Image reference
* Availability

Never hard-code prices in UI components.

Use actual database prices and server-side total calculations.

## 7. ADMIN PANEL

Create a secure, authenticated `/admin` dashboard.

Admin must be able to:

* Add, edit and deactivate products
* Change prices
* Manage categories
* Create and edit deals
* Upload product images
* Replace and remove images
* Preview images
* Mark products out of stock
* View orders
* Update order status
* Manage tables and QR codes
* Change WhatsApp number
* Update restaurant contact details
* Configure opening hours
* Configure delivery charges
* Configure delivery availability
* Update restaurant settings

All changes must persist in the database.

Protect every administrative operation with authentication and authorization. Hiding the admin page link is not sufficient.

## 8. CART AND ORDERING

Support:

* Delivery
* Takeaway
* Dine-in

Cart functionality:

* Add and remove products
* Change quantities
* Display prices
* Calculate subtotal
* Apply configured delivery charges
* Display the final total

Delivery checkout must collect:

* Customer name
* Phone number
* Complete address
* Area
* Landmark
* Delivery instructions

Takeaway checkout must collect the customer's name and phone number.

Dine-in checkout must collect the customer's name and support an optional table number.

Allow customers without a table to order using their name.

Do not require online payment for the first version.

## 9. WHATSAPP ORDERING

Generate a complete WhatsApp order message using the restaurant's configurable WhatsApp number.

Include:

* Order ID
* Customer name
* Phone number
* Order type
* Table number when applicable
* Delivery address when applicable
* All items
* Quantities
* Actual prices
* Subtotal
* Delivery charges
* Total
* Customer notes

Use a properly URL-encoded WhatsApp deep link.

Create a persistent order record before presenting the WhatsApp action.

Explain that the customer must send the prepared message through WhatsApp.

Do not claim that the restaurant has accepted the order until the restaurant actually confirms it.

## 10. QR TABLE ORDERING

Implement dynamic QR-based ordering.

Example:

`/order?table=5`

The application must detect the table number and preserve it throughout the customer's session and checkout.

Admin must be able to:

* Create tables
* Edit tables
* Deactivate tables
* Generate QR codes
* Download QR codes
* Print branded QR cards

QR codes must use the configured deployed application URL rather than localhost.

Validate table IDs on the server.

Support dine-in orders without tables.

## 11. DATABASE AND SECURITY

Use persistent Supabase tables for:

* Admin profiles
* Categories
* Products
* Deals
* Deal items
* Orders
* Order items
* Tables
* Restaurant settings

Create reproducible database migrations or setup scripts.

Use Row Level Security and appropriate permissions.

Public customers must not be able to read private customer records or modify administrative data.

Never expose Supabase service-role keys or other secrets in client-side code.

Provide a safe `.env.example` file.

If Supabase configuration is missing, identify the exact setup steps and required variables.

Do not use fake data persistence or frontend-only admin controls as a substitute for a working backend.

## 12. CUSTOMER ORDER STATUS

Provide order statuses:

* New
* Confirmed
* Preparing
* Ready
* Out for Delivery
* Completed
* Cancelled

Admin changes must persist.

Clearly distinguish order totals from actual payments received.

## 13. SEO AND PERFORMANCE

Implement:

* Page metadata
* Open Graph metadata
* Sitemap
* robots.txt
* Appropriate restaurant structured data
* Responsive images
* Lazy loading
* Accessible controls
* Fast mobile loading

Use only verified business information in public SEO metadata.

Do not fabricate Google reviews or ratings.

## 14. DEVELOPMENT AND TESTING

Build the project in logical stages.

First create the application foundation and customer interface.

Then implement the database and admin authentication.

Next implement menu management and image uploads.

Then implement cart, checkout, WhatsApp ordering and QR table ordering.

Finally, test the complete application.

Check:

* Production build
* TypeScript errors
* Broken routes
* Image placeholders
* Upload validation
* Database persistence
* Admin access control
* Correct prices and totals
* WhatsApp message contents
* QR table detection
* Mobile responsiveness

Do not claim that a feature works unless it has been tested or its unverified status has been clearly stated.

## 15. GITHUB DELIVERY AND VERCEL DEPLOYMENT

Push the completed source code to:

https://github.com/kaleemdurrani1978-cell/Student-Burgers-Shawarma-

Use a development branch and a pull request if appropriate.

Prepare the project for deployment on Vercel.

Do not commit credentials or secret environment files.

If the GitHub integration cannot push, provide the exact steps needed to authorize it.

If deployment requires configuration, explain the missing settings rather than claiming the website is live.

## FINAL REQUIREMENTS

* Start from scratch in the new v0 account.
* Use the specified GitHub repository.
* Generate zero images.
* Keep the original Student brand.
* Do not invent menu data.
* Build an actual database-backed admin system.
* Allow the owner to upload images later.
* Implement real WhatsApp ordering.
* Implement dine-in QR ordering.
* Preserve data securely.
* Optimize for low credit consumption.
* Reuse components and avoid unnecessary redesigns.
* Test before reporting completion.

Begin by connecting to the repository and building the application foundation. Continue implementing the project rather than stopping at a static mockup.

