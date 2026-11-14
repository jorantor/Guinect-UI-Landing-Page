# Webflow UIGOV migration — Review branch only

Imported from owner-provided original Webflow export (`uigov.webflow(4).zip`).

- Original Home and Funcionalidades HTML copied into `index.html` and `f-qs-es.html`. Only CSS/JS paths changed to independently named copies, plus one broken Webflow icon URL corrected.
- Original CSS and JS preserved under `uigov-export-*` filenames to avoid affecting unrelated pages.
- Existing compressed images are reused from `images/` on the user’s GitHub push (no new image folder).
- Original exported Spanish footer copied to 10 existing public pages; unrelated page content preserved.
- Footer styling extracted from the Webflow export and scoped to avoid altering other pages.
- No changes to `main`, or to the separate programmers’ `jorantor/GUINECT` repository, and no deployment.

**Review before merging:** visually check desktop/mobile typography, all icons, menu, forms and images. The Webflow registration button has no verified backend handler; page fidelity does not imply working registration.

**Do not delete old images:** other pages might still link to PNG/JPG files; perform a separate dependency audit and obtain owner approval before removal.
