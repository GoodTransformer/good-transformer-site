export type LinkItem = {
  href: string;
  label: string;
};

export type LessonTier = {
  name: string;
  price: string;
  duration: string;
  body: string;
};

export type Offer = {
  name: string;
  duration: string;
  purpose: string;
  outputs: string[];
  fit?: string;
  cadence?: string[];
};

export type ProofArtefact = {
  title: string;
  label: string;
  subtitle: string;
  rows: string[];
};

export type ProofOrganisation = {
  name: string;
  slug: string;
  src: string;
  width: number;
  height: number;
  maxWidth: number;
};

export const siteConfig = {
  offerName: "Good Transformer",
  descriptor: "Personal AI lessons and practical business advisory",
  brand: "Good Transformer",
  primaryCta: {
    label: "Book a call",
    href: "/book",
  },
  heroSecondaryCta: {
    label: "Book a personal AI lesson",
    href: "/book/personal",
  },
  personalCta: {
    label: "Book a personal AI lesson",
    href: "/book/personal",
  },
  businessCta: {
    label: "Book a business call",
    href: "/book/business",
  },
  calendarEnvName: "NEXT_PUBLIC_CLARITY_CALL_URL",
  briefEndpointEnvName: "NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT",
  briefEmailEnvName: "NEXT_PUBLIC_BOOKING_BRIEF_EMAIL",
};

export const navigation: LinkItem[] = [
  { href: "/services", label: "Services" },
  { href: "/patrick", label: "Patrick" },
  { href: "/about", label: "About" },
];

export const aboutPage = {
  title: "About",
  intro:
    "I'm Patrick Hussey, and I started Good Transformer as a new kind of consultancy — one built to help individuals and companies become AI ready. The goal is to make people genuinely better equipped for the changes ahead.",
  background: {
    heading: "Where I come from",
    body:
      "My approach is to keep the ethics in view — naming the trade-offs, taking the harder questions seriously, and treating the people who use these tools as the people who matter most. That instinct comes from a career spent translating technology into action: writing for Fast Company and The Guardian, and working with leaders at Google, SAP, Adobe, Microsoft, and Vodafone, alongside startups, charities, and cultural organisations on AI strategy, thought leadership, and the practical business of adoption.",
  },
  ethics: {
    heading: "Where I think we are",
    body:
      "I'll be honest: we are at the beginning of a turbulent transition that will reshape work, organisations, and society faster than most people are prepared for. AI is not a productivity upgrade — it is a structural shift, and the pressure on individuals and businesses to adapt is already real and will only intensify. I am not a booster: faster adoption is not always better. We need people who can think clearly about the trade-offs and pay attention to the ethical questions that come with the technology.",
  },
  talks: {
    heading: "Talks",
    body:
      "I give talks on AI, its societal effects, and the ethical questions that organisations and individuals are going to have to answer whether they are ready or not. Recent themes range from adoption and team capability to AI in education, the future of work, and the democratic guardrails we will need to put in place. If you want something honest, sceptical in the right places, and rooted in what is actually happening rather than the hype cycle, get in touch.",
  },
  name: {
    heading: "Why Good Transformer?",
    body:
      "The name comes from the Transformer — the neural network architecture introduced in the 2017 paper \"Attention Is All You Need\" that quietly started the AI boom we are now living through. Every large language model and AI assistant you have heard of is built on it. The \"Good\" is the work: the hope that with careful application and democratic guidance, the transition can go well for more people — not just the few who are already ahead of it.",
  },
};

export const operatingModel = [
  {
    name: "Lead",
    line: "Direction, prioritisation, governance judgement.",
  },
  {
    name: "Embed",
    line: "Workflow redesign, pilots, coordination, tool choices.",
  },
  {
    name: "Enable",
    line: "Team confidence, champions, habits, safe use.",
  },
];

export const offers: Offer[] = [
  {
    name: "AI Reality Check Sprint",
    duration: "2 weeks",
    purpose: "Fast clarity on where AI fits, and a plan to act on it.",
    outputs: [
      "AI direction brief",
      "Use-case scorecard",
      "90-day adoption plan",
    ],
    fit: "Best when AI use is already happening, but ownership and guardrails are still unclear.",
    cadence: [
      "Leadership and function interviews",
      "Current-use and risk triage",
      "Board-ready decision brief",
    ],
  },
  {
    name: "90-Day Adoption Build",
    duration: "12 weeks",
    purpose: "Embedded advisory to turn AI intent into real team habits.",
    outputs: [
      "Two lighthouse workflow pilots",
      "Team playbooks",
      "Simple governance pack",
    ],
    fit: "Best when the direction exists, but working practice still needs to move.",
    cadence: [
      "Weekly working session",
      "Team enablement rhythm",
      "Monthly sponsor checkpoint",
    ],
  },
  {
    name: "Fractional Retainer",
    duration: "3-month minimum",
    purpose: "Senior AI advisory alongside your team — no full-time hire.",
    outputs: [
      "Monthly executive session",
      "Working cadence across teams",
      "Plain-English progress reporting",
    ],
    fit: "Best when multiple teams need progress, prioritisation, and steadier decision-making.",
    cadence: [
      "Executive direction and guardrails",
      "Operational blocks with teams",
      "Office hours and follow-through",
    ],
  },
];

export const testimonial = {
  quote:
    "Patrick's clarity and depth kickstarted our AI response, helping leadership not only see further but plan.",
  attribution: "Gaynor Finlay, marketing leader",
};

export const proofSignals = {
  label: "Worked with leaders at",
  organisations: [
    {
      name: "OneAdvanced",
      slug: "oneadvanced",
      src: "/logos/oneadvanced.svg",
      width: 640,
      height: 80,
      maxWidth: 8.8,
    },
    {
      name: "Sana Commerce",
      slug: "sana-commerce",
      src: "/logos/sana-commerce.svg",
      width: 92,
      height: 20,
      maxWidth: 6.3,
    },
    {
      name: "Google",
      slug: "google",
      src: "/logos/google.svg",
      width: 74,
      height: 24,
      maxWidth: 5.1,
    },
    {
      name: "Microsoft",
      slug: "microsoft",
      src: "/logos/microsoft.svg",
      width: 216,
      height: 46,
      maxWidth: 5.6,
    },
  ] satisfies ProofOrganisation[],
  artefacts: [
    {
      title: "AI direction brief",
      label: "Leadership direction",
      subtitle: "Priority decisions, sponsor cadence, and the next 90 days.",
      rows: ["Decision themes", "Use-case order", "Sponsor rhythm"],
    },
    {
      title: "Use-case scorecard",
      label: "Portfolio review",
      subtitle: "Scored against value, readiness, and delivery risk.",
      rows: ["Value", "Readiness", "Risk"],
    },
    {
      title: "Team playbook",
      label: "Working practice",
      subtitle: "Workflow patterns, quality checks, and champion support.",
      rows: ["Prompt patterns", "Checks in flow", "Escalation notes"],
    },
    {
      title: "Governance pack",
      label: "Operational guardrails",
      subtitle: "Approved tools, do-not-paste rules, escalation routes, and plain-English guidance.",
      rows: ["Approved tool set", "Sensitive-data handling", "Escalation route"],
    },
  ] satisfies ProofArtefact[],
};

export const homePage = {
  hero: {
    brand: siteConfig.brand,
    title: "Get confident with AI",
    descriptor:
      "Practical 1-to-1 AI lessons for individuals, plus AI advisory for teams and businesses.",
    support:
      "Learn how to use AI with confidence, judgement and practical skill. Patrick Hussey helps individuals get started and helps organisations apply AI to real workflows, adoption and change.",
    routes: [
      {
        label: "For individuals",
        title: "Book a lesson",
        body: "1-to-1 help for beginners and improvers.",
        href: "/book/personal",
        tone: "light",
      },
      {
        label: "For businesses",
        title: "Book a business call",
        body: "AI advisory for teams and businesses.",
        href: "/book/business",
        tone: "dark",
      },
    ],
    signals: [
      {
        title: "Personal lessons",
        body: "Learn at your pace with expert guidance",
      },
      {
        title: "Practical and relevant",
        body: "Real workflows. Real results.",
      },
      {
        title: "Trusted adviser",
        body: "Strategic, adoption and lasting impact.",
      },
    ],
  },
  role: {
    heading: "AI is easier to learn when the lesson starts with your real life.",
    support:
      "Good Transformer is built around calm, practical coaching. For individuals, that means one-to-one lessons shaped around the tools, tasks, and confidence gaps you actually have. For organisations, it means the same practical judgement applied to strategy, adoption, workflows, and guardrails.",
  },
  services: {
    heading: "Two clear routes into better AI use.",
    intro:
      "Start with the support that fits the moment: personal confidence or business change.",
    note: "Most work starts with the smallest engagement that can create real momentum.",
  },
  patrick: {
    heading: "Patrick Hussey",
    body:
      "Patrick works between leadership, operations and teams. The job is to turn AI direction into working practice and leave capability inside the business. Good Transformer is the umbrella brand. The judgement you hire is Patrick’s.",
    frame: {
      label: "How the work shows up",
      heading: "Work that becomes part of how the business runs",
      body:
        "The job is not just to set direction, but to leave working structures behind. These are the documents teams actually use to decide, act, and stay aligned.",
      kicker:
        "Not a deck. Not a one-off plan. Something the business can run on.",
    },
  },
  faqs: [
    {
      question: "Do I need any experience to book a personal lesson?",
      answer:
        "None at all. Sessions are designed for wherever you are — complete beginner, occasional user, or someone who wants to use AI more deliberately. The lesson starts with what you actually need, not a standard syllabus.",
    },
    {
      question: "What does a personal lesson cover?",
      answer:
        "Whatever is most useful to you: ChatGPT basics, writing, research, planning, prompting habits, or getting more from the tools you already have. Sessions are one-to-one, so the focus is entirely on your work and your questions.",
    },
    {
      question: "What does fractional mean in practice?",
      answer:
        "It means a defined senior cadence rather than a full-time hire: usually a monthly executive session, a weekly or fortnightly working block, access for short triage, and a clear view of what changes next.",
    },
    {
      question: "Is the business work strategy or training?",
      answer:
        "It is strategy-to-adoption work. Direction matters, but so do workflow redesign, pilots, and team capability. The point is to connect those layers so AI shows up in day-to-day work, not just in decks or workshops.",
    },
    {
      question: "What happens in the business clarity call?",
      answer:
        "It is a short working conversation, not a generic sales chat. Patrick reviews the current reality, pressure points, tools in use, and desired 90-day outcome, then recommends the smallest credible next step.",
    },
  ],
  finalCta: {
    heading: "Start with the kind of AI help you actually need.",
    body:
      "Book a personal lesson if you want confidence with the tools. Book a business call if the challenge is team adoption, strategy, or workflow change.",
  },
};

export const lessonOffers = [
  {
    name: "Personal AI Lessons",
    label: "For individuals",
    purpose:
      "One-to-one sessions for people who want more confidence, judgement, and speed with AI.",
    points: [
      "Learn the right tools for your tasks",
      "Build better prompting habits",
      "Leave with repeatable workflows",
    ],
    href: "/book/personal",
  },
  {
    name: "Business AI Advisory",
    label: "For teams",
    purpose:
      "Fractional AI advisory for leaders who need to turn scattered experiments into consistent working practice.",
    points: [
      "Clarify the highest-value use cases",
      "Create guardrails and adoption rhythm",
      "Redesign selected workflows with teams",
    ],
    href: "/book/business",
  },
];

export const lessonPricing: {
  heading: string;
  delivery: string;
  tiers: LessonTier[];
} = {
  heading: "What you get",
  delivery:
    "Sessions can be held online or at a co-working space — venue to be agreed at booking.",
  tiers: [
    {
      name: "Intro lesson",
      price: "£75",
      duration: "1 hr",
      body:
        "A single session tailored to your skill level, your tools, and the tasks that matter to you. Leave with something you can use straight away.",
    },
    {
      name: "Starter pack",
      price: "£375",
      duration: "3 × 1 hr",
      body:
        "Three sessions that build in sequence. Go deeper on the tools that suit your work, form habits that stick, and develop a workflow you can keep running.",
    },
    {
      name: "Ongoing rhythm",
      price: "£250 / month",
      duration: "2 × 1 hr + async support",
      body:
        "Two sessions per month plus support between them. For people who want to keep moving — new tools, new challenges, accountability, and someone to think with.",
    },
  ],
};

export const servicesPage = {
  title: "Services",
  intro:
    "Two ways to work together: personal AI lessons for individuals, or fractional advisory for teams and businesses.",
  personalSection: {
    heading: "Personal AI lessons",
    intro:
      "One-to-one sessions tailored to your skill level, your tools, and the work you actually do. No jargon, no generic demos.",
    cta: { label: "Book a personal lesson", href: "/book/personal" },
  },
  businessSection: {
    heading: "Business AI advisory",
    intro:
      "Three ways to work together as a fractional AI adviser — from a focused sprint to an ongoing embedded retainer.",
    cta: { label: "Book a business call", href: "/book/business" },
  },
  sampleArc: [
    {
      phase: "Weeks 1-2",
      body: "Direction, use-case triage, and a plan the leadership team can actually use.",
    },
    {
      phase: "Weeks 3-6",
      body: "Lighthouse workflows redesigned with clearer ownership, quality checks, and tool choices.",
    },
    {
      phase: "Weeks 7-10",
      body: "Team enablement, champion support, and working guidance tied to the real workflow.",
    },
    {
      phase: "Weeks 11-12",
      body: "A sharper operating rhythm, clearer guardrails, and a visible next 30 days.",
    },
  ],
  close:
    "If a smaller starting point can create real momentum, that is the recommendation.",
};

export const patrickPage = {
  title: "Patrick Hussey",
  intro:
    "I work with individuals who want to get better at using AI, and with organisations that need to turn AI intention into working practice. Either way, my approach is the same: practical, calm, and not interested in hype.",
  portrait: {
    src: "/patrick/patrick-portrait.jpg",
    alt: "Patrick Hussey",
    caption:
      "Every personal lesson is delivered by me directly. No course platform, no junior coach, no script — just one-to-one time with the person you are hiring.",
  },
  sections: [
    {
      title: "How I work",
      body:
        "I try to be honest about what AI can and cannot do. Whether the work is a first personal lesson or a multi-team adoption programme, the job is to meet you where you are and leave you with something that works in the real world.",
    },
    {
      title: "Selected experience",
      body:
        "I have worked with enterprise leaders at Google, SAP, Adobe, Microsoft, and Vodafone, alongside startups, charities, cultural organisations, and individuals at every level of AI fluency.",
    },
    {
      title: "Writing and judgement",
      body:
        "My writing has appeared in Fast Company and The Guardian. The tone of the work is the same: clear judgement, practical language, and no interest in inflated AI theatre.",
    },
    {
      title: "Boundary line",
      body:
        "I help individuals build confidence, help leaders shape direction, and help teams adopt AI safely. I am not selling a software platform or a hidden engineering bench.",
    },
  ],
};

export const bookingPage = {
  title: "Book a session",
  intro:
    "Two routes into better AI: one-to-one personal lessons for individuals, or a business call for teams and organisations.",
  body:
    "Both routes start with a short intake so the conversation can deal with the real situation, not a generic AI pitch.",
  personal: {
    title: "Book a personal AI lesson",
    intro:
      "Tell Patrick what you want to feel more confident doing. The lesson can cover ChatGPT basics, everyday workflows, writing, research, planning, or sharper use of the AI tools you already have.",
    body:
      "For individuals: beginners, improvers, freelancers, job-seekers, founders, and professionals who want practical help without hype.",
  },
  business: {
    title: "Book a business call",
    intro:
      "Start with a short intake so the call can deal with the real situation, not a generic AI conversation.",
    body:
      "You will be asked for a work email, organisation size, sector, current AI use, tools in play, and what success should look like in 90 days. The brief is handed over before scheduling so the call starts with the real context.",
  },
};

export const bookingSuccessPage = {
  personal: {
    title: "Success, your lesson is booked",
    intro:
      "Your personal AI lesson is in the diary. You should receive a calendar invite and joining link by email shortly.",
    body:
      "If the invite does not appear within a few minutes, check spam or promotions, then reply to the booking email if you need help.",
    steps: [
      "Look out for the calendar invite and meeting link in your inbox.",
      "Bring a real task, question, or tool you want help with.",
      "No prep deck needed — the session is shaped around what you need.",
    ],
    primaryCta: {
      href: "/",
      label: "Back to home",
    },
    secondaryCta: {
      href: "/patrick",
      label: "About Patrick",
    },
  },
  business: {
    title: "Success, your business call is booked",
    intro:
      "Your business clarity call is confirmed. You should receive a calendar invite and joining link by email shortly.",
    body:
      "If the invite does not appear within a few minutes, check spam or promotions, then reply to the booking email if you need help.",
    steps: [
      "Look out for the calendar invite and meeting link in your inbox.",
      "Bring the real AI questions, blockers, or adoption pressures you are facing.",
      "The short brief you submitted gives Patrick context before the call starts.",
    ],
    primaryCta: {
      href: "/services",
      label: "Review services",
    },
    secondaryCta: {
      href: "/patrick",
      label: "About Patrick",
    },
  },
};

export const bookingForm = {
  orgSizes: [
    "50 to 100 employees",
    "101 to 250 employees",
    "251 to 500 employees",
    "More than 500 employees",
  ],
  sectors: [
    "Professional services",
    "Agency or B2B services",
    "Charity or cultural organisation",
    "Other knowledge-work business",
  ],
  currentState: [
    "AI use is already happening, but unevenly",
    "Leadership wants direction and guardrails",
    "Pilots are not scaling",
    "Training has not changed working habits",
    "Tool sprawl or shadow AI is becoming a risk",
  ],
  nextSteps: [
    "Fill in the short brief.",
    "Review the summary and delivery.",
    "Continue to scheduling when you are ready.",
  ],
};

export const seoContent = {
  siteName: "Good Transformer",
  siteUrl: "https://goodtransformer.ai",
  defaultDescription:
    "Personal 1-to-1 AI lessons and practical business advisory from Patrick Hussey at Good Transformer.",
  openGraphTitle: "Good Transformer - Get confident with AI.",
  openGraphDescription:
    "Personal AI lessons for individuals and fractional advisory for teams. Patrick Hussey helps people and organisations get genuinely useful with AI.",
  ogImageAlt:
    "Good Transformer - Get confident with AI. Personal AI lessons and practical business advisory.",
  personName: "Patrick Hussey",
  personJobTitle: "AI Coach and Fractional AI Adviser",
  pages: {
    home: {
      path: "/",
      title: "Good Transformer",
      description:
        "Personal 1-to-1 AI lessons and practical business advisory from Patrick Hussey at Good Transformer.",
    },
    services: {
      path: "/services/",
      title: "Services",
      description:
        "Personal AI lessons for individuals and fractional advisory for teams. Three engagement tiers: AI Reality Check Sprint, 90-Day Adoption Build, and Fractional Retainer.",
    },
    about: {
      path: "/about/",
      title: "About",
      description:
        "About Good Transformer - a consultancy built to help individuals and organisations become genuinely AI ready. Named for the Transformer architecture that started the AI boom.",
    },
    patrick: {
      path: "/patrick/",
      title: "Patrick Hussey",
      description:
        "Patrick Hussey is an AI coach and fractional adviser. He works with individuals to build practical AI confidence, and with organisations to turn AI intent into real working practice.",
    },
    book: {
      path: "/book/",
      title: "Book a Session",
      description:
        "Book a personal AI lesson or a business call with Patrick Hussey. Two routes: one-to-one coaching for individuals, or fractional advisory for teams and organisations.",
    },
    bookPersonal: {
      path: "/book/personal/",
      title: "Book a Personal AI Lesson",
      description:
        "Book a one-to-one AI lesson with Patrick Hussey. Sessions from GBP 75 - tailored to your tools, tasks, and confidence level. No experience needed.",
    },
    bookBusiness: {
      path: "/book/business/",
      title: "Book a Business Call",
      description:
        "Book a business call with Patrick Hussey. Submit a short brief and schedule a call to discuss AI strategy, adoption, and the right engagement for your team.",
    },
    personalSuccess: {
      path: "/book/personal/success/",
      title: "Success, Your Lesson Is Booked",
      description:
        "Confirmation page for personal AI lessons booked with Patrick Hussey at Good Transformer.",
    },
    businessSuccess: {
      path: "/book/business/success/",
      title: "Success, Your Business Call Is Booked",
      description:
        "Confirmation page for business clarity calls booked with Patrick Hussey at Good Transformer.",
    },
    notFound: {
      title: "Page not found",
      description:
        "This page could not be found on Good Transformer. Return to the homepage or book a session with Patrick Hussey.",
    },
  },
};
