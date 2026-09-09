# The Capelli Group, LLC: concept redesign

An **unsolicited concept redesign** of the website for The Capelli Group, LLC, a behavioral health clinic in El Paso, Texas (court-ordered BIPP, anger management, and clinical psychotherapy). It is a design preview only. **It is not the official website and is not affiliated with, commissioned by, or endorsed by The Capelli Group, LLC.** Nobody at the clinic asked for it.

**Source site being redesigned:** thecapelligroup.com (a GoDaddy Website Builder 7.0 page, audited 2026-09-09).

## Files

| File | Purpose |
|---|---|
| `index.html` | The rebuilt site. One self-contained page. |
| `findings.html` | Plain-language audit of the current site and what the rebuild fixes. For the buyer, not for patients. **Not linked from the visitor navigation.** |
| `SOURCE-FACTS.md` | Every verified fact pulled from the clinic's live site. The only source of facts for the build. |
| `scripts/verify.mjs` | Playwright render check: horizontal scroll at 375px and 1440px, heading counts, alt text, robots and viewport tags, link targets, em dashes. |

## What it is

- Single self-contained HTML files with inline CSS and a few lines of inline script for the mobile menu. No build step, no framework, no dependencies beyond Google Fonts.
- `<meta name="robots" content="noindex, nofollow">` on both pages so the preview never competes with the real site in search.
- Mobile-first. Verified by rendering at 375px and 1440px with no horizontal scroll, exactly one `h1`, semantic landmarks, skip link, visible focus rings, and `prefers-reduced-motion` respected.
- Every link lands inside the preview, or is a `tel:`, `sms:`, or `mailto:` link. No link points at thecapelligroup.com.
- A MedicalBusiness JSON-LD block carrying only facts the clinic already publishes.

## Provenance

**Every load-bearing fact on `index.html` comes from `SOURCE-FACTS.md`**, which was compiled from the clinic's live pages on 2026-09-09. That includes:

- Legal name, founding history (EPIC Association, 2004; renamed October 2014), address, phone, email, hours of operation, founders.
- BIPP provider number **071-021**, TDCJ-CJAD accreditation, National NCTI Court Approved Programs, El Paso County court approval, CEU provider status.
- Service area (El Paso, Hudspeth, and Culberson Counties, Fort Bliss) and the Military Veteran Safe Zone statement.
- BIPP program length (18 weeks, 36 hours), the four-step intake, group schedule, participant requirements, reporting to referral sources, and the "BIPP is not an anger management program" distinction.
- Anger management program hours, Saturday session time, and certificate.
- Psychotherapy rate ($180 per session), discount categories, ages served, modalities, telehealth states, payment methods, and the thirteen accepted insurance plans.
- Team members, credential strings, and license numbers exactly as the clinic lists them.
- All testimonials, verbatim, attributed exactly as the clinic attributes them.
- The referral-source list.

**Crisis numbers** (988, Crisis Text Line 741741, Veterans Crisis Line 988 then 1) are the current national standards and replace the retired 1-800-273-8255 number the live site publishes. See the safety correction in `SOURCE-FACTS.md`. No local crisis or shelter number was added because none was verified.

**The Spanish summary block** is a translation of facts already on the page. It adds nothing.

**Audit numbers on `findings.html`** were measured 2026-09-09 against the live site with Playwright and Chromium. They are reported exactly as measured.

## Deliberately omitted

- BIPP and anger management fees. The clinic does not publish them.
- The "Professor Vasquez" testimonial. That name appears nowhere else on the site.
- The misspelled "Intitute" footer mark, the GoDaddy placeholder text, and the orphaned "8:30" list item.
- Any local El Paso crisis or shelter number.

## Placeholders

**All photography is placeholder.** The four team portraits and the map are labeled placeholder blocks drawn in CSS, each with a text description. They are to be replaced with the practice's own imagery, and each replacement needs a written alt text.

## Before this could ever go live

- The clinic confirms phone, hours, schedule, fees, insurance list, and license numbers are current.
- Replace the placeholder portraits and map.
- Decide whether to publish BIPP and anger management fees.
- Remove the `noindex, nofollow` tag and add a canonical link.
