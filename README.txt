ZENORA SHOPPING SITE — STARTER FILES

Included:
- index.html: customer-facing shop
- admin.html: local demo administration dashboard
- styles.css: responsive black/gold/ivory design
- app.js: demo catalogue, search, category browsing, cart, wishlist, product details, coupon demo, newsletter, support form, checkout preview
- admin.js: add/edit/delete products, categories, demo order status updates, CSV exports
- supabase-config.js: safe placeholder configuration (no secret keys)

LOGO
1. Put your logo image inside the assets folder.
2. Name the image exactly: zenora-logo.png
3. Keep the logo as a PNG/JPG/WebP image. If the file is missing, the site displays a text-based ZENORA logo.

HOW TO RUN
- Extract the ZIP.
- Upload all files and the assets folder to the same GitHub repository.
- Keep index.html, admin.html, styles.css, app.js, admin.js and supabase-config.js in the repository root.
- Open index.html through GitHub Pages or another static host.
- Open admin.html to see the dashboard.
- Demo products, cart, categories, coupons, newsletter signups and demo orders are stored in localStorage in that browser. They are NOT shared across devices.

IMPORTANT LIMITS BEFORE A REAL LAUNCH
This is a working front-end prototype, not a complete production e-commerce backend.
- The admin page is NOT secured by login or server-side permissions. Anyone with the page can inspect or change browser-local data.
- LocalStorage is not a shared database and can be edited by visitors.
- Checkout saves a demo order only. It does not accept payment.
- Never put Paystack secret keys or Supabase service-role keys in frontend files.
- For real sales, implement Supabase Auth, PostgreSQL tables, strict Row Level Security policies, server-side/Edge Function order creation and price validation, inventory transactions, Paystack initialize + server-side verification, webhook signature verification, idempotency, secure refunds, and protected admin role checks.
- The product image field accepts a publicly reachable image URL. Secure uploads require Supabase Storage policies or another backend.
- Image search, AI recommendations, push notifications, live chat, email delivery, verified-purchase reviews, returns/refunds and real carrier tracking require service/backend integrations.
- Test on a staging project before accepting real customer data or money.

Starter demo coupons:
- ZENORA10: 10% off
- WELCOME500: ₦500 off orders of at least ₦5,000
- FREESHIP: removes the estimated delivery fee
These are browser-side demo rules only. Enforce all real promotions on the backend.

Supabase docs: https://supabase.com/docs
Paystack developer docs: https://paystack.com/docs
GitHub Pages docs: https://docs.github.com/pages
