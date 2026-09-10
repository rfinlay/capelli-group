# The Capelli Group, LLC
## Website Concept, Findings, and Scope of Work

**Prepared:** September 9, 2026
**Prepared for:** Prof. Samuel Capelli
**Scope:** The public website only. Nothing touching patient records, intake data, or protected health information.
**Method:** Direct measurement of the live site on September 9, 2026. Read-only throughout. No systems were accessed, no forms submitted, no contact made with any vendor.

**Concept site:** *(link added at delivery)*
**This document:** *(link added at delivery)*

---

## 1. What This Is

A working replacement for thecapelligroup.com, built and ready to look at, not a mockup.

Every word on it came from your own site. No service, credential, price, hour, or phone number was invented. Where your published material was thin, the new page stays thin rather than filling the gap with something that sounds good.

Two items are flagged separately below because they are worth knowing regardless of what you decide about a website.

---

## 2. Two Things Worth Knowing First

### 2.1 The crisis number on the psychotherapy page was retired

The site currently publishes **1-800-273-8255** as a crisis line.

That number was the National Suicide Prevention Lifeline. It was replaced by **988**, the Suicide and Crisis Lifeline, in July 2022.

**The old number still forwards**, so nobody calling it is stranded. This is not an emergency. But 988 is the current published national standard, and on a behavioral health practice's website the current number is the one that should appear.

The concept site uses **988**, plus the **Crisis Text Line** (text HOME to 741741) and the **Veterans Crisis Line** (988, then press 1). The veterans line is there because of the Fort Bliss caseload and the Military Veteran Safe Zone.

No local El Paso crisis number was added. One was not verified, and an incorrect crisis number would be worse than the problem it solves. National numbers only, because those are verifiable and stable.

### 2.2 The site does not work correctly on a phone

This one is visible in about ten seconds and worth seeing firsthand.

The page is missing a single line of code that tells a phone how wide it is. Without it, phones assume a desktop-sized window and shrink the entire page to roughly **40 percent scale**.

Measured directly: on an iPhone-width screen of 390 pixels, the browser reports the page as **980 pixels wide**. Text renders at about 40 percent of its intended size. The navigation is cut off at the left edge and the logo runs off the right.

**Why it matters here specifically.** A person with a court order, or someone deciding at 11pm whether to call about a family violence situation, is on a phone. That is the moment the site has to work, and it is the moment it currently does not.

**How to check it yourself:** open thecapelligroup.com on your phone and try to read the navigation without zooming.

---

## 3. The Evidence

Measured on the live site, September 9, 2026.

| Finding | Measurement |
|---|---|
| Mobile viewport instruction | **absent** (page renders at 980px on a 390px phone) |
| Time until the page stops loading | **48 seconds** |
| Tappable phone links (`tel:`) | **0** |
| Phone number on the homepage | **not present** |
| Machine-readable business information for search engines | **none** |
| Images carrying descriptions for screen readers | **0 of 14** |
| Heading structure | 14 top-level headings, no subheadings |

### 3.1 Nobody can tap to call

There is no phone number on the homepage at all, and no tappable number anywhere on the site. The number exists on the contact page as plain text. On a phone, a visitor has to memorize it or copy it by hand.

For a practice whose intake begins with "call 915-799-0614 to schedule your evaluation," this is the single most direct thing to fix.

### 3.2 Search engines have no machine-readable record of the practice

Modern sites carry a hidden block of structured information: business type, address, hours, phone, service area. It is how Google knows what a business is and where it is.

The site has none. For a practice whose referrals come from local courts, probation officers, and attorneys searching by name and location, that information is worth publishing.

### 3.3 Unedited placeholder text is live on the homepage

The homepage currently displays the website builder's own sample text:

> "You can add HTML directly into this element to render on the page. Just edit this element to add your own HTML."

It sits over the logo area and is publicly visible.

### 3.4 The page title has a typo

The browser tab and the Google search result read "Anger **Managment**." That string is what appears in search results.

### 3.5 The credentials that matter most are the hardest to find

**Battering Intervention and Prevention Provider # 071-021.** TDCJ-CJAD accreditation. National NCTI court approval. El Paso County court approval.

For a probation officer or an attorney deciding where to send someone, that provider number is the entire decision. On the current site it is buried in body text on a page whose address reads `-alternative-dispute-resolution--adr-.html`.

### 3.6 Spanish-speaking clients have no Spanish page

You run a Men's Spanish Group on Tuesdays and offer all four BIPP phases in Spanish. The website is entirely in English.

---

## 4. What The Concept Site Does

### Built for the two people who actually arrive

**The person who has to be here.** Court-ordered, often anxious, usually on a phone. They get one screen that answers: is this the right place, is it court-approved, what is the number, and what happens first. The four-step intake, Register, Evaluation, Orientation, Groups, is shown as a sequence rather than a paragraph.

**The person deciding where to send them.** Probation, parole, federal pre-trial, attorneys, judges, CPS, the VA, Fort Bliss. They get provider **# 071-021** displayed as a credential, TDCJ-CJAD accreditation stated plainly, the 18-week and 36-hour requirements, the monthly progress reporting commitment, and the group schedule.

### Specific changes

| Change | What it buys |
|---|---|
| Correct mobile rendering | The page works at full size on a phone, where the visitor actually is |
| Phone number tappable in four places, plus a fixed bar on mobile | A person ready to call can call with one tap |
| 988 and current crisis resources, pinned above everything | The current national standard, first thing on the page |
| Provider # 071-021 and TDCJ-CJAD shown as credentials | The referral source finds the one thing they need |
| Machine-readable business record added | Google can state what the practice is, where it is, and when it is open |
| Full Spanish section | Serves the Tuesday Spanish group and a heavily Spanish-speaking city |
| Group schedule as a readable table | Days, times, language, and gender legible at a glance |
| Screen reader support, keyboard navigation, reduced motion | The site works for people with disabilities, which for a clinical practice is the right default |
| Printable | A referral source can print the credentials page and put it in a file |

### What it deliberately does not do

- **No stock photography.** No pictures of models pretending to be clients. Illustration and typography only, until real photographs are supplied.
- **No contact form.** Deliberate. A form on a behavioral health site invites people to type things that should not travel by email. The site routes to the phone instead.
- **Nothing invented.** No price, credential, hour, or outcome appears that was not already published.
- **No testimonial that could not be verified.** One testimonial on the live site names a person who appears nowhere else on it. It was left out rather than reproduced.

---

## 5. One Detail To Confirm

The current site lists **"Years in Practice: 14"** while also stating the practice was founded as EPIC Association in **2004**.

Those do not reconcile. Rather than pick one, the concept site omits the figure. Whichever is correct is easy to publish once confirmed.

---

## 6. Hosting: What The Current Setup Allows

This part changes what the work involves, so it is stated plainly.

The site runs on **GoDaddy Website Builder 7.0**, a closed page builder. Confirmed from the page's own source code.

**A hand-built site cannot be uploaded into it.** Website Builder has no file access. GoDaddy's own documentation says that for full control of a site's code, a different product is required. The custom-code box inside the builder runs in an isolated frame and cannot supply the parts of a page that make the improvements above work.

So a new site means moving where the site is hosted. The domain, thecapelligroup.com, stays exactly where it is.

### The recommended path

**Host the new site on Netlify. Leave the domain and DNS at GoDaddy. Change only the two records that point to the website.**

| | |
|---|---|
| Hosting cost | **$0** |
| Domain | unchanged, roughly $23/year, already being paid |
| Reversible | Yes. Change two records back and the current site returns |

### If the practice would rather stay entirely with GoDaddy

**That option exists and it works.** It is stated here so the recommendation above is a choice rather than the only door.

GoDaddy sells a separate product, **Web Hosting with cPanel**, which is not the same thing as Website Builder. It allows files to be uploaded directly and supports the permanent page forwards this project needs. The finished site would be delivered into that account, under the practice's own login, hosted and billed by GoDaddy exactly as the domain is today.

| | Recommended path | Stay entirely with GoDaddy |
|---|---|---|
| Where the site lives | Netlify | GoDaddy Web Hosting with cPanel |
| Who bills the practice | Nobody, hosting is free | GoDaddy, one provider for everything |
| Hosting cost | **$0** | **Whatever GoDaddy charges for the plan chosen** |
| Domain | Unchanged at GoDaddy | Unchanged at GoDaddy |
| Email protected the same way | Yes | Yes |
| Page forwards supported | Yes | Yes |

**The cost is GoDaddy's to quote, not this document's.** Their published pricing renews at a higher rate than the first year, and the current figure should be read from the practice's own GoDaddy cart rather than taken from here. The work of building and delivering the site is the same either way, and **the price does not change based on which of these is chosen.**

**The tradeoff, stated honestly:** the recommended path costs nothing and the GoDaddy path costs a monthly fee for the convenience of keeping one provider and one bill. That convenience is a legitimate reason to choose it. It is not a technical improvement, and the site behaves identically on both.

### The reason this path and not another

**The practice has working Microsoft 365 email on this domain.** Verified by direct DNS lookup on September 9, 2026. That is separate from the gmail address published on the site.

Some hosting arrangements require moving the domain's entire configuration to a new provider, and email settings move with it. For a practice receiving court and probation correspondence, losing email is not an inconvenience.

**The recommended path never touches the email settings.** Only the two records that point to the website change. Website records and mail records are independent, so editing one cannot affect the other. That constraint chose the hosting path, not preference.

**One sequencing rule matters:** the current Website Builder subscription gets cancelled **last**, after the new site is live and email is confirmed working. Not first. If the Microsoft 365 mailbox is bundled with the website subscription, cancelling in the wrong order could take the email with it. Whether it is bundled needs checking inside the GoDaddy account.

### The existing page addresses

The current site has ten pages. Some are linked from outside, possibly in court referral packets.

Those addresses are not obvious. The BIPP content, for example, lives at `-alternative-dispute-resolution--adr-.html`.

Each existing address gets a permanent forward to the right place on the new page, so an old link in a referral packet still works. The list has to be captured before the current site is switched off, because a Website Builder site cannot be exported once it is gone.

---

## 7. Why Do This At All

A website is easy to treat as decoration. For this practice specifically, it is doing four jobs, and right now it cannot do any of them.

### 7.1 The referral source is the real audience

Probation officers, parole, federal pre-trial, attorneys, judges, CPS, the VA, and Fort Bliss decide where people go. They check one thing before they refer: **is this provider accredited, and is the program court-approved.**

**Provider # 071-021 and the TDCJ-CJAD accreditation are the most valuable facts the practice publishes.** On the current site they are buried on a page whose address reads `-alternative-dispute-resolution--adr-.html`.

A referral source who cannot confirm accreditation in fifteen seconds refers elsewhere. That is the single clearest line between the website and revenue.

### 7.2 The person arriving is on a phone, and the phone is where it fails

Court-ordered clients are not researching at a desk. They are standing outside a courthouse with a piece of paper, or deciding at 11pm whether to call about a family violence situation.

**The site currently renders at roughly 40 percent scale on a phone, and the phone number is not tappable anywhere.** Someone ready to call has to zoom, find a number, memorize it, and dial it manually. Some fraction of them stop there.

### 7.3 Search engines have no record of what the practice is

There is no machine-readable business record on the site, so Google is inferring the practice's category, address, and hours rather than being told.

**Local ranking is driven by relevance, distance, and prominence.** Relevance is the one a website affects, and it is the one currently left to guesswork. This does not promise rankings. It removes a handicap.

### 7.4 The Spanish-speaking client currently has nothing

The practice runs a **Men's Spanish Group** and serves a city where a large share of residents speak Spanish at home. **The site is entirely in English.**

A Spanish-speaking client with a court order has no way to confirm from the website that the program is available in their language.

### What a fix is worth

The BIPP program runs **18 weeks**. The math on the referral question is not complicated: **one additional referral that would otherwise have gone elsewhere covers the cost of this work several times over.**

That is the argument. Not that the site looks dated, but that the credential a referral source needs is currently hard to find, and the phone number a client needs is currently untappable.

---

## 8. Scope of Work and Price

### The honest number first

**This work prices at $1,850.** That figure is stated plainly because a discount only means something if the real number is visible next to it.

| | |
|---|---|
| Website, built and finished | **$1,200** |
| Migration and launch | **$650** |
| **Full price** | **$1,850** |
| **Price for you** | **$1,200** |

**$1,200 covers everything, migration included.**

### Payment

**$600 to begin, $600 at thirty days.**

Work starts and the site goes live on the first payment. The second is due thirty days after launch.

### Why the site is $1,200 and not $500

In conversation, three tiers were described: **around $500 for a simple revamp, $800 for a medium one, and $1,200 for a complex one.** Those numbers stand, and this is the complex tier. What follows is why, so the figure is not just an assertion.

**A simple revamp means the existing site stays where it is and gets reworked.** New look, same platform, same page addresses, same host. Nothing else in the practice is affected. That is a real category of work, and $500 is a fair price for it.

**That option does not exist here**, and the reason is specific rather than a matter of taste:

| | Simple revamp | This project |
|---|---|---|
| Existing site can be edited | Yes | **No. The builder has no file access.** |
| Platform | Stays | **Has to change** |
| Page addresses | Stay | **Ten need permanent forwards** |
| Anything else at risk | No | **Live business email on the domain** |
| Build method | Rework the existing pages | **Written from nothing** |

**Every page on the concept site was written by hand.** No template was purchased or adapted. That covers the mobile layout, the Spanish section, the machine-readable business record, the accessibility work, the print layout, and the crisis resources, each built specifically for this practice rather than configured in a builder.

**What actually moved this out of the simple tier was not effort. It was the platform.** The current site cannot be modified, so there was no version of this that was a revamp. Once it is a rebuild, the complex tier is the honest description of it.

### A correction, stated plainly

In conversation, migration and launch were quoted at **around $100**. That number was wrong, and it was wrong because it was given before the current site had been examined.

The estimate assumed changing a single setting to point the domain at a new site. That is genuinely a ten-minute job, and $100 would have been fair for it.

**What the work actually turned out to be:**

- The current site runs on a closed builder with no file access, so there is no way to modify it. The site has to be rebuilt elsewhere and the domain repointed. This is a platform migration, not an edit.
- Ten existing page addresses need permanent forwards, and their addresses are builder-generated strings that have to be captured before the old site is switched off, because that platform has no export.
- **The domain carries live Microsoft 365 email.** Working around it safely is the majority of the care involved.

The migration is a **17-step sequence across four phases**, with a 48-hour waiting period built in and verification steps on either side of the one change that matters. It is not an afternoon.

**The $1,200 absorbs the entire $650 rather than passing the correction along.** The mis-estimate was on this end, and it is not the practice's cost to carry.

### What $1,200 includes

- The site as built, refined to final quality
- All content verified against published material, nothing invented
- Correct rendering on phones, tablets, and desktop
- Tappable phone numbers, current crisis resources, provider credentials displayed
- Full Spanish section
- Machine-readable business record for search engines
- Screen reader and keyboard support
- Print layout
- **The full migration:** deployment, domain repointed, all ten page addresses permanently forwarded, email verified working before and after
- **Nothing to manage.** The move is handled end to end, with the practice logging in only for the steps that require its own account
- One round of revisions
- Written handover: every account in the practice's name, with access

### Changes after launch

Not included above, and priced separately so it stays optional. **There are two ways to handle changes, and the practice can use either or neither.**

**Option one, pay only when something is needed:**

| | |
|---|---|
| Change request, quoted per request | **$80 to $100 per hour** |

Send what needs changing. It gets quoted first, at that rate, and no work starts until the quote is approved. **Most single changes are well under an hour.** Nothing is owed between requests, and there is no ongoing commitment.

**Option two, a standing arrangement:**

| | |
|---|---|
| Content updates, as needed | **$75/month** or **$150/quarter** |

Schedule changes, staff changes, new services, fee updates. Better value if changes are frequent, and it means small edits do not need a quote each time.

**Declining both is a perfectly good answer.** They are offered here so the option exists in writing rather than arriving later as an upsell. Without something like this, small changes have no home and tend to accumulate.

### Not included, stated so there are no surprises

- **Photography.** Real photographs of the practice and staff, if wanted, are supplied by the practice.
- **Copywriting.** The site uses published material. New writing is separate.
- **Ongoing changes after launch.** Schedule updates, staff changes, new services. Available separately, either per request at $80 to $100 per hour or on the standing arrangement above.
- **Email support.** The Microsoft 365 mailbox is the practice's own, through GoDaddy. It is protected during the move, and confirmed working before the old site is switched off, but ongoing email issues are between the practice and GoDaddy.
- **Search rankings.** The site is built correctly for search: proper structure, machine-readable business record, fast loading. Where the practice ranks depends mostly on proximity to the searcher and review volume, which no website change controls.
- **A Notice of Privacy Practices**, if one is required for the site. That is the practice's document. It gets published once supplied.

### What the practice pays after launch

**Domain renewal, roughly $23 per year.** Already being paid.

Hosting is free at the recommended provider, and the certificate that makes the site secure renews automatically at no cost. If the current Website Builder subscription is cancelled after the move, that cost goes away.

**If the practice chooses to keep hosting with GoDaddy instead**, add whatever GoDaddy charges for the plan chosen. That figure is theirs to quote and should be read from the practice's own account. Everything else on this page is unchanged.

### Where $1,850 sits against the market

Published 2026 ranges, for context rather than persuasion:

| Scope | Published range |
|---|---|
| El Paso, template-based | $700 – $2,000 |
| El Paso, custom-built | $4,000 – $8,000 |
| Small business site, independent developer | $1,000 – $3,000 |

This one is hand-built rather than assembled from a template, which places it above the template range, and it carries a platform migration and a redirect map that a template project does not.

**$1,200 is a 35 percent discount, and it is a decision about who is asking rather than a market rate.** It is stated here so the scope above is clearly the whole of it, and so any later work is understood as separate rather than assumed.

---

## 9. What This Document Does Not Claim

- **Not a ranking promise.** No rankings, Business Profile, or directory listings were measured.
- **Not a criticism of anyone's work.** Every finding here is a normal consequence of a closed website builder. None of it indicates neglect.
- **Not a compliance opinion.** Nothing in the concept touches intake, patient communication, or protected health information. The site has no forms and no tracking of any kind.
- **Not a finished product.** Photographs are placeholders. Facts, though drawn from published material, should be confirmed by the practice before the site goes live.
- **Not a claim about the practice's accounts.** No GoDaddy or Microsoft account was accessed. Everything about the current setup was determined from public information.

---

## 10. Path Forward

1. **Look at the concept site on a phone**, then open the current site on the same phone. That comparison is the whole argument, and it takes under a minute.
2. **Confirm the facts.** Hours, fees, insurance list, credentials, license numbers, and the years-in-practice figure. This is the one input that has to come from the practice.
3. **Decide about photography.** Real photographs of the office and staff would replace the placeholders. Consent for any staff photograph is the practice's to obtain.
4. **Confirm inside the GoDaddy account** whether the domain, the website subscription, and the Microsoft 365 email bill separately. This determines the safe order of operations.
5. **Set a launch date.** The technical work is short. Confirming content is what determines the schedule.

---

*The concept site carries instructions telling search engines not to index it, so it cannot compete with the live site while it is under review. Those instructions are removed only at launch.*
