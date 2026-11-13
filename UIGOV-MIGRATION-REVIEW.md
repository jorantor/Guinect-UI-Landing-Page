# UIGOV → Guinect personal landing: review checklist

**Repository:** `jorantor/Guinect-UI-Landing-Page` (personal marketing website only). The developers' `jorantor/GUINECT` repository was not touched.
**Status:** Draft review branch. No changes to `main`, Webflow, or the live site.

## Page mappings
- **Inicio:** UIGOV Webflow **Home** (`6a84bc84e99de10422cf3a4e`) → `index.html`.
- **Conoce más:** UIGOV Webflow functionality page currently titled **F&Qs ES** (`6aab1655a0cbc076b2bcef67`) → `f-qs-es.html`.
- **Footer:** UIGOV Webflow `footer-es` component (`5e8d24f2-f752-bb72-5f49-61dff730e6d8`) → `partials/footer-es.html`, stamped into the 12 pages which previously had a footer.
- Shared modern responsive styles: `css/uigov-current-sync.css`.
- Future footer edits: change `partials/footer-es.html` then run `node scripts/sync-footer.mjs` from the repository root.

## Pages whose footer was updated
`index.html`, `f-qs-es.html`, `landing-precandidato.html`, `contacto.html`, `f-qs.html`, `old-home-2.html`, `contact-en.html`, `home-es.html`, `old-home.html`, `use-cases.html`, `candidate-en.html`, `contact.html`.

The remaining prototype/internal HTML pages did **not** contain a matching footer and were not altered.

## Review / QA completed
- All copied pages retain a single H1, and the new Spanish Home has 7 registration fields.
- Latest Webflow image-hosting URLs were used for copied raster assets; optimized images are referenced as WebP/AVIF where available.
- Responsive breakpoint CSS was copied from UIGOV's style data for relevant classes (desktop, tablet, mobile).
- All updated footer pages load `css/uigov-current-sync.css`.
- LinkedIn and YouTube icons restored. Social URLs were `#` in the original Webflow component; they are intentionally **non-clickable** until real profile links are provided.
- Future pages such as Blog, Nuestra historia, Glosario and Aviso de privacidad do not yet have known live destinations; their labels are non-clickable rather than fake links.

## Release blockers (do not deploy without resolving)
1. **Citizen registration:** The UIGOV Home uses 7 `input` fields inside a `div` and a `type=button` CTA. Webflow does not provide a functioning secure registration submission in this design; no production registration endpoint/JS implementation was found. **This branch preserves the visual design but does not claim that account creation works.** The legacy `GET` password form from the old `index.html` was not carried over.
2. **Login and navigation:** Legacy navbar links still include placeholder `#` URLs (e.g., Log In). These are pending known destinations, and the English-language counterpart needs a separate review.
3. **End-to-end testing:** Browser checks at desktop/tablet/mobile, secure form submission with backend, and link validation are still required prior to approval.
4. **Asset hosting:** Some images use Webflow's existing asset-hosted S3 URLs rather than local repository copies. Confirm availability/hosting policy before deployment.
5. **Legal/social destinations:** Add real approved privacy, social and future-content URLs before enabling those controls.

## Deployment
Do not merge or publish this draft PR until the site owner reviews the screenshots and the engineering team confirms that registration works securely.
