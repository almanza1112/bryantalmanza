/**
 * Single source of truth for the Work and Testimonials sections.
 *
 * VERIFICATION POLICY — this is a portfolio, so overstating a project is worse
 * than omitting it. Every claim below is one of:
 *   - verified from repo source on this machine,
 *   - verified against a live URL or the iTunes Lookup API, or
 *   - stated directly by Bryant (marked `source: "bryant"`).
 * Anything still unconfirmed is marked TODO and must not ship as fact.
 *
 * `tier: 1` renders as a featured card with expandable detail.
 * `tier: 2` renders as a compact row (no screenshot required).
 */

// 700w and 1400w WebP pairs, served via srcset.
import ambe700 from "../assets/ambe-ss-700.webp";
import ambe1400 from "../assets/ambe-ss-1400.webp";
import nextplay700 from "../assets/nextplay-ss-700.webp";
import nextplay1400 from "../assets/nextplay-ss-1400.webp";
import chinesepod700 from "../assets/chinesepod-ss-700.webp";
import chinesepod1400 from "../assets/chinesepod-ss-1400.webp";
import persyst700 from "../assets/persyst-ss-700.webp";
import persyst1400 from "../assets/persyst-ss-1400.webp";
import curzonrelo700 from "../assets/curzonrelo-ss-700.webp";
import curzonrelo1400 from "../assets/curzonrelo-ss-1400.webp";
import salesgong700 from "../assets/salesgong-ss-700.webp";
import salesgong1400 from "../assets/salesgong-ss-1400.webp";
import djohwoww700 from "../assets/djohwoww-ss-700.webp";
import djohwoww1400 from "../assets/djohwoww-ss-1400.webp";
import almanzatech700 from "../assets/almanzatech-ss-700.webp";
import almanzatech1400 from "../assets/almanzatech-ss-1400.webp";

const img = (small, large, alt) => ({ small, large, alt });

export const PROJECTS = [
  // ---------------------------------------------------------------- tier 1
  {
    id: "nextplay",
    tier: 1,
    builtSite: true,
    name: "NextPlay Nutrition",
    role: "Full-stack — platform architecture, backend, web, mobile",
    year: "2025 – present",
    status: "live",
    oneLiner:
      "A multi-tenant nutrition-coaching platform that provisions an isolated AWS stack for every corporate client.",
    detail: [
      "Members are matched with registered dietitians and chefs for coaching driven by bloodwork, wearables, and intake questionnaires. It runs as two product lines — direct-to-consumer and a white-label enterprise product — sharing one control plane across six repositories.",
      "The part I am proudest of is the tenant provisioning. An operator creates an enterprise client in the admin console, which triggers a Lambda that kicks off a CodeBuild job to deploy a dedicated stack for that customer: its own Cognito pool, API Gateway, DynamoDB table, S3 bucket, and subdomain. One shared Next.js frontend then serves every tenant, resolving which Cognito pool and API to talk to from the subdomain at request time, with a host-keyed CloudFront cache policy so no tenant is ever served another's cached response.",
    ],
    highlights: [
      "6 repositories, ~507 commits, still shipping",
      "200+ role-scoped API routes behind purpose-built Lambda authorizers",
      "Per-tenant AWS stacks provisioned programmatically",
      "WebAuthn passkeys and TOTP MFA; DynamoDB single-table design",
    ],
    stack: ["TypeScript", "Next.js", "React", "Flutter", "AWS Lambda", "DynamoDB", "Cognito", "SST", "CloudFront", "Stripe"],
    links: [{ label: "Live site", href: "https://nextplaynutrition.com" }],
    image: img(nextplay700, nextplay1400, "The NextPlay Nutrition marketing site"),
    verified: "repo source + nextplaynutrition.com returns 200",
  },
  {
    id: "chinesepod",
    tier: 1,
    builtSite: false,
    name: "ChinesePod",
    role: "Backend rewrite and mobile technical lead",
    year: "Jan – Jun 2024",
    status: "live",
    oneLiner:
      "Rebuilt the API behind a long-running Chinese language-learning platform and led technical decisions on its native apps.",
    detail: [
      "ChinesePod has been teaching Mandarin since long before I joined it, which is the interesting constraint: the rewrite had to serve an existing audience and an existing content library without disrupting either.",
      "I built version 2 of the API in Node.js and led the critical technical decisions on the app side, working alongside distributed teams in Pakistan and the Philippines. The apps are native rather than cross-platform — separate iOS and Android codebases against the shared v2 API.",
    ],
    highlights: [
      "Built v2 of the API serving an established product",
      "Led technical decisions across native iOS and Android",
      "Worked with distributed teams in Pakistan and the Philippines",
      "App live on the App Store since 2017, now v2.0.2",
    ],
    stack: ["Node.js", "REST API", "Native iOS", "Native Android"],
    links: [
      { label: "Website", href: "https://www.chinesepod.com/" },
      { label: "App Store", href: "https://apps.apple.com/us/app/chinesepod/id1185380819" },
    ],
    image: img(chinesepod700, chinesepod1400, "The ChinesePod website"),
    source: "bryant",
    verified:
      "iTunes Lookup: Chinesepod Limited, Education, released 2017-01-04, v2.0.2 updated 2025-11-12. chinesepod.com returns 200. Role and stack per Bryant.",
  },
  {
    id: "ambe",
    tier: 1,
    builtSite: true,
    name: "Ambé Wellness",
    role: "Sole developer — backend, mobile, and web",
    year: "2026",
    status: "live",
    oneLiner:
      "A HIPAA-compliant tele-wellness platform pairing members with doctors trained in Ayurvedic medicine.",
    detail: [
      "Ambé connects members with integrative practitioners for consultations, medicine delivery, and ongoing messaging, bundled into a membership. Because it handles protected health information, HIPAA compliance shaped the architecture rather than being bolted on afterwards.",
      "I built all three pieces: the backend on Firebase, the mobile app in Flutter, and the marketing and membership site in Next.js.",
    ],
    highlights: [
      "Built the backend, mobile app, and website single-handedly",
      "HIPAA-compliant handling of protected health information",
      "Shipped to the App Store in May 2026",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Next.js", "React"],
    links: [
      { label: "Website", href: "https://www.ambewellness.com/" },
      { label: "App Store", href: "https://apps.apple.com/us/app/ambe-wellness/id6523417737" },
    ],
    image: img(ambe700, ambe1400, "The Ambé Wellness website"),
    source: "bryant",
    verified:
      "iTunes Lookup: Lakshmi Devi Namaha LLC, Health & Fitness, released 2026-05-20, v1.0.2. ambewellness.com returns 200. Role and stack per Bryant.",
  },
  {
    id: "persyst",
    tier: 1,
    builtSite: false,
    name: "PerSyst Fitness Trainer",
    role: "Mobile developer",
    year: "2023",
    status: "live",
    oneLiner:
      "A tablet app that pairs over Bluetooth LE with a resistance-training machine and drives it in real time.",
    detail: [
      "The app connects to an Arduino-driven training machine over Bluetooth LE, sends exercise and assist-mode selections to the hardware, and renders live lift metrics back on gauges as the user trains.",
      "Hardware is the interesting constraint. The app has to stay responsive to a physical device it does not control, and fail gracefully when the connection drops mid-set rather than leaving someone stuck under a loaded bar.",
    ],
    highlights: [
      "Bluetooth LE integration with custom Arduino hardware",
      "Live lift telemetry rendered on gauge instrumentation",
      "On the App Store since January 2023",
    ],
    stack: ["Flutter", "Dart", "Bluetooth LE", "Arduino"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/persyst-fitness-trainer/id1612292587" },
    ],
    image: img(persyst700, persyst1400, "The PerSyst Fitness Trainer exercise screen"),
    verified:
      "iTunes Lookup: seller Chris OConnor, released 2023-01-26, v1.2 updated 2025-03-28. Card image is the app's own App Store screenshot.",
  },
  {
    id: "curzonrelo",
    tier: 1,
    builtSite: false,
    name: "CurzonRelo",
    role: "Mobile developer — iOS, Android, and admin dashboard",
    year: "2022 – 2025",
    status: "live",
    oneLiner:
      "A relocation platform that lets people move country and pay only for the services they actually need.",
    detail: [
      "Members plan a move — destination, dates, property type, budget — and are matched with a personal relocation advisor who works the brief with them. I rebuilt the app I had originally created, and built the admin dashboard the advisors work from.",
      "Both the member app and the admin dashboard are Flutter, sharing one codebase across iOS and Android. The app has been through a full revamp since its first release and is now on version 3.",
    ],
    highlights: [
      "iOS and Android from a single Flutter codebase",
      "Admin dashboard for relocation advisors, also built in Flutter",
      "Complete revamp of the original app — now at v3.4",
      "On the App Store since November 2022",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Google Maps"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/curzonrelo/id1636041231" },
    ],
    image: img(curzonrelo700, curzonrelo1400, "CurzonRelo app screens: destination selection, property brief, and advisor view"),
    source: "bryant",
    verified:
      "iTunes Lookup: seller James Moss, Travel, released 2022-11-12, v3.4 updated 2025-10-30. Repo: Absolute-Relo (the app's former name). Role per Bryant — he built the apps and admin dashboard, NOT curzonrelo.com, so that site is deliberately not linked here.",
    // NOTE: make no security claim on this card. firestore.rules in the repo is
    // `allow read, write` with no conditions.
  },
  {
    id: "salesgong",
    tier: 1,
    builtSite: false,
    // `role` intentionally absent — Bryant listed this as his but has not said
    // what his scope was, and the card renders fine without it.
    name: "The Sales Gong",
    year: "2024",
    status: "live",
    oneLiner:
      "A team celebration app: close a deal, hit the gong, and everyone hears it — wherever they are.",
    detail: [
      // Paraphrased from the App Store listing rather than invented.
      "Sales teams are scattered now, and the moment a deal closes tends to disappear into a chat message. The app gives that moment somewhere to land: you write what you closed, hit the gong, and the rest of the team gets an alert and celebrates with you.",
      "It is a small idea that lives or dies on delivery — the notification has to arrive instantly and reliably, or the moment has already passed.",
    ],
    highlights: ["On the App Store since June 2024", "Push alerts to the whole team in real time"],
    stack: ["Flutter", "Dart", "Firebase"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/the-sales-gong/id6480072420" },
    ],
    image: img(salesgong700, salesgong1400, "The Sales Gong app screens"),
    source: "bryant",
    verified:
      "iTunes Lookup: Techwhale, LLC, Productivity, released 2024-06-05, v1.1.3 updated 2024-10-07. Description paraphrased from the App Store listing. Stack per Bryant. No local repo; scope of his role not stated, hence no `role` field.",
  },
  {
    id: "brickholdem",
    tier: 1,
    builtSite: false,
    name: "Brick Hold'Em",
    role: "Solo — game design, client, server",
    year: "2022 – present",
    status: "in development",
    oneLiner:
      "A real-time multiplayer card game with an original rule set, refereed by a server that never trusts the client.",
    detail: [
      "Up to five players per table with an original combo and ante rule set. The rules are implemented twice — once in Dart on the client for responsiveness, once in JavaScript on the server as the authority — so a modified client cannot invent a winning hand.",
      "The chip economy is zero-sum by design and was audited as such. That audit found four separate paths that could mint chips from nothing, all since closed. Payouts now settle through atomic compare-and-swap so concurrent hands cannot double-pay.",
    ],
    highlights: [
      "~350 commits, ~30k lines of Dart",
      "Server-authoritative rules engine, deliberately implemented twice",
      "Zero-sum chip economy; four chip-minting exploits found and closed",
      "42 callable Cloud Functions",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Cloud Functions"],
    links: [],
    image: null, // TODO: needs a game-table screenshot from Bryant
    verified: "repo source: brick_hold_em (350 commits, last 2026-07-25)",
    // NOTE: NOT released — bundle id is still com.example.brick_hold_em and the
    // release build uses debug signing. Never describe this as shipped.
  },

  // ---------------------------------------------------------------- tier 2
  {
    id: "djohwoww",
    tier: 2,
    builtSite: true,
    name: "DJ OhWoww",
    role: "Design and front-end",
    year: "2026",
    status: "live",
    oneLiner:
      "A promotional site for a live DJ and instrumentalist act, built around scroll-driven motion.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    links: [{ label: "Live site", href: "https://www.djohwoww.com/" }],
    image: img(djohwoww700, djohwoww1400, "The DJ OhWoww website"),
    verified: "repo source + djohwoww.com returns 200",
  },
  {
    id: "gridly",
    tier: 2,
    builtSite: false,
    name: "Gridly",
    role: "Solo",
    year: "2026",
    status: "pre-launch",
    oneLiner:
      "A number-placement puzzle game with a 60-level campaign and a date-seeded daily puzzle.",
    stack: ["Flutter", "Dart", "Firebase"],
    highlights: ["A solver and solution counter guarantee every generated puzzle is deducible"],
    links: [],
    verified: "repo source: box_add_game (15 commits, last 2026-07-26)",
  },
  {
    id: "almanzatech",
    tier: 2,
    builtSite: true,
    name: "AlmanzaTech",
    role: "Solo",
    year: "2022 – 2026",
    status: "live",
    oneLiner: "The site for my own software studio.",
    stack: ["React", "Tailwind CSS"],
    links: [
      { label: "Live site", href: "https://almanzatech.com/" },
      { label: "Code", href: "https://github.com/almanza1112/almanzatech2.0" },
    ],
    image: img(almanzatech700, almanzatech1400, "The AlmanzaTech website"),
    verified: "almanzatech.com returns 200 (image reshot 2026-07-26 after redesign)",
  },
  {
    id: "dellpainting",
    tier: 2,
    builtSite: true,
    name: "Dell Painting",
    role: "Solo",
    year: "2022",
    status: "live",
    oneLiner: "A marketing site for a commercial painting contractor.",
    stack: ["React", "Tailwind CSS"],
    links: [
      // The "Live site" link is parked until dellpainting.com resolves again —
      // still unreachable as of 2026-08-03; Bryant is fixing the DNS. Restore:
      // { label: "Live site", href: "https://dellpainting.com/" },
      { label: "Code", href: "https://github.com/almanza1112/dellpainting2.0" },
    ],
    verified:
      "repo is public. dellpainting.com unreachable (ports 80/443 closed) — checked 2026-07-26 and again 2026-08-03.",
  },
  {
    id: "madeinvestment",
    tier: 2,
    builtSite: true,
    name: "Made Investment Group",
    role: "Solo",
    year: "2026",
    status: "live",
    oneLiner: "A marketing site for an investment firm.",
    stack: ["HTML", "Tailwind CSS"],
    links: [{ label: "Live site", href: "https://madeinvestmentgroup.com/" }],
    verified: "repo source + madeinvestmentgroup.com returns 200",
  },
  {
    id: "portfolio",
    tier: 2,
    builtSite: true,
    name: "This site",
    role: "Solo",
    year: "2022 – 2026",
    status: "live",
    oneLiner: "The portfolio you are reading.",
    stack: ["React", "Tailwind CSS"],
    links: [{ label: "Code", href: "https://github.com/almanza1112/bryantalmanza" }],
    verified: "bryantalmanza.com returns 200",
  },
];

/**
 * Client testimonials, quoted verbatim from Bryant's public Upwork profile.
 * Upwork blocks automated access (HTTP 403), so these were supplied by hand and
 * must not be edited for tone or grammar — they are someone else's words.
 *
 * Reviewers are attributed as "Upwork client" rather than by name.
 */
export const TESTIMONIALS = [
  {
    quote:
      "Bryant has been an absolute angel for my company, can't recommend him enough. He's very caring, trustworthy and competent. Anyone would be lucky to work with him.",
    client: "Upwork client",
    project: "Ambé Wellness",
    projectId: "ambe",
  },
  {
    quote:
      "Bryant did an excellent work! I've hired many freelancers and he is one of the best. Had a can-do attitude and was a pleasure to work with. He went above and beyond fixing an issue that came up. I highly recommend him!!",
    client: "Upwork client",
    project: "PerSyst Fitness Trainer",
    projectId: "persyst",
  },
  {
    quote:
      "Bryant did an incredible job on my DJ website. He was extremely communicative and responded quickly. I highly recommend his work.",
    client: "Upwork client",
    project: "DJ OhWoww",
    projectId: "djohwoww",
  },
  {
    quote:
      "Bryant is amazing at attention to detail and knowing what his clients vision board looks like. He as made this process easy for me to trust is skills and knowledge of creating my concept.",
    client: "Upwork client",
    // Deliberately unlinked: this client's projects are not on the site yet.
    project: null,
    projectId: null,
  },
];

export const FEATURED = PROJECTS.filter((p) => p.tier === 1);
export const MORE_WORK = PROJECTS.filter((p) => p.tier === 2);

/**
 * Headline numbers, derived from the list above rather than hardcoded, so they
 * can never drift out of step with the work actually shown on the page.
 *
 * - appsShipped: projects with a live App Store listing.
 * - sitesShipped: projects where Bryant built the website himself. This is why
 *   `builtSite` exists — chinesepod.com and curzonrelo.com are linked or known
 *   but were built by other people, so they must not be counted here.
 * - inDevelopment: anything not yet publicly released.
 */
const hasAppStore = (p) => (p.links || []).some((l) => /app store/i.test(l.label));

export const STATS = {
  appsShipped: PROJECTS.filter(hasAppStore).length,
  sitesShipped: PROJECTS.filter((p) => p.builtSite).length,
  inDevelopment: PROJECTS.filter((p) =>
    ["in development", "pre-launch"].includes(p.status)
  ).length,
};
