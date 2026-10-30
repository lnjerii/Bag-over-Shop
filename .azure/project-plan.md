# Bag Over Shop

**Status: Approved**

## Project overview

Build a polished, responsive, single-page storefront for Bag Over Shop. Customers browse a small editable bag catalog, manage a cart, and place orders by sending a prefilled order summary to WhatsApp. This is a browser-only storefront: no customer accounts, backend, database, or online payment processing.

## Approved scope

- **Name:** Bag Over Shop
- **Stack:** React, TypeScript, Vite, and Tailwind CSS.
- **Visual direction:** Minimal premium fashion boutique; warm cream, charcoal, soft tan, refined serif headings, clean sans-serif body, generous whitespace, subtle hover and scroll-reveal effects.
- **Layout:** One page with smooth-scroll section links; responsive navigation that starts transparent and becomes solid on scroll; cart icon and live item count.
- **Sections, in order:** Lifestyle-photo hero with “Shop Now”; six category cards (Handbags, Backpacks, Tote Bags, Crossbody, Travel Bags, Laptop Bags); featured/new arrivals; four benefit icons (quality materials, affordable prices, fast delivery, easy returns); testimonial slider; Instagram-style gallery; newsletter; contact/order; footer.
- **Catalog:** 8–12 editable sample products with names, descriptions, categories, KES prices, real bag photographs, available colors, and alt text. Keep product and image data together in a clearly labeled data module. Include category filtering, price sorting, wishlist controls, and product quick-view.
- **Cart:** Slide-out drawer with add/remove/update quantity, live totals, and browser-local cart persistence. Checkout opens WhatsApp at `+254741363694` with an encoded summary of the items, quantities, prices, and total.
- **Contact and payment:** Online-only shop; inquiries and order handoff use WhatsApp. Do not claim a physical address or fixed working hours; direct customers to WhatsApp for current availability. Show M-Pesa and card as accepted payment methods coordinated during order confirmation; do not collect payment details in the site.
- **Policy copy:** Explain that delivery timing and return options are confirmed directly on WhatsApp until the shop provides final policy terms.
- **Photography:** Real free-to-use product/lifestyle bag photography from Unsplash or Pexels only. Use consistent square or 4:5 crops, `object-fit: cover`, lazy loading, and meaningful alt text. Do not use generated images, illustrations, or placeholder blocks.
- **Other interactions:** Benefits icons, star-rated review slider, newsletter form with honest client-side feedback (no mailing-list integration), WhatsApp-enabled contact/order form, back-to-top control, and responsive footer with social links.

## Data, privacy, and integrations

- No Azure resources, database, authentication, or backend are necessary for the requested flow.
- Product and image URLs are static, centralized editable data.
- Cart state is stored in the visitor's browser only.
- WhatsApp checkout is an external handoff; the storefront does not process payments.
- Newsletter submission is client-side only until an email provider is configured.

## Acceptance criteria

1. All sections appear on one responsive page and navigation scrolls to them.
2. The catalog displays 8–12 products in KES and supports category filtering and price sorting.
3. Product quick-view, wishlist, and cart quantity/removal controls work.
4. Cart count and totals update immediately, survive refresh in the same browser, and an empty cart cannot be checked out.
5. WhatsApp checkout opens a correctly encoded message to `+254741363694` containing the order summary.
6. Every product/gallery visual is real photography, has descriptive alt text, and loads lazily where appropriate.
7. Newsletter and contact interactions provide honest feedback without implying data was stored or transmitted where no integration exists.
8. Mobile, tablet, and desktop layouts are usable, with no horizontal overflow.

## Approval

Approved by the user on 2026-10-30.
