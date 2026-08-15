# Savoré Website Fixes

## Signature images
- Replaced the placeholder Jollof Royale image with the supplied Savoré-approved Jollof photograph.
- Replaced the placeholder Seafood Pepper Soup image with the supplied seafood photograph.
- Replaced the placeholder Ofada Experience image with the supplied Ofada photograph.
- Left Savoré Suya's existing image unchanged.
- Added local WebP versions with JPEG fallbacks and intrinsic dimensions for faster, more stable loading.

## Bugs and behavior fixes
- Hardened the mobile navigation: correct ARIA state, close behavior after navigation, Escape/outside-click handling, resize reset, and scrollable mobile menu.
- Fixed local-date handling for reservation minimum dates so it no longer depends on UTC.
- Added clearer form validation/status handling without falsely claiming that a message or reservation was actually delivered.
- Added explicit 7+ guest handling for the demo.
- Added menu category URL state (`?category=`) so filtered menu views can be linked and retained.
- Added a no-JavaScript menu fallback.
- Added accessible gallery image previews with keyboard support and focus restoration.
- Added keyboard focus styling and improved image/button semantics.
- Added Open Graph/Twitter metadata and runtime canonical URL generation without inventing a deployment domain.
- Made the home-page phone number directly callable and the directions link open Google Maps directions.
- Added safer external-link attributes where applicable.
- Added image decoding/lazy-loading hints and reduced layout instability for the signature cards.
