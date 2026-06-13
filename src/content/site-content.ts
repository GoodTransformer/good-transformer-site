export type LinkItem = {
  href: string;
  label: string;
};

export type LessonFormat = {
  name: string;
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
  descriptor: "AI lessons for leaders and practical business advisory",
  brand: "Good Transformer",
  primaryCta: {
    label: "Book a call",
    href: "/book",
  },
  heroSecondaryCta: {
    label: "Book a 1-to-1 call",
    href: "/book/personal",
  },
  personalCta: {
    label: "Book a 1-to-1 call",
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

export const serviceContact = {
  prompt: "Skip the form?",
  action: "Email Patrick at",
  email: "hello@goodtransformer.ai",
  subject: "A question for Patrick",
};

export const navigation: LinkItem[] = [
  { href: "/services", label: "Services" },
  { href: "/patrick", label: "Patrick" },
  { href: "/about", label: "About" },
];

export const aboutPage = {
  title: "About",
  intro:
    "I'm Patrick Hussey, and I started Good Transformer as a new kind of consultancy, one built to help individuals and companies become AI ready. The goal is to make people genuinely better equipped for the changes ahead.",
  background: {
    heading: "Where I come from",
    body:
      "My approach is to keep the ethics in view: naming the trade-offs, taking the harder questions seriously, and treating the people who use these tools as the people who matter most. That instinct comes from a career spent translating technology into action: writing for Fast Company and The Guardian, and working with leaders at Google, SAP, Adobe, Microsoft, and Vodafone, alongside startups, charities, and cultural organisations on AI strategy, thought leadership, and the practical business of adoption.",
  },
  ethics: {
    heading: "Where I think we are",
    body:
      "I'll be honest: we are at the beginning of a turbulent transition that will reshape work, organisations, and society faster than most people are prepared for. AI is not a productivity upgrade; it is a structural shift, and the pressure on individuals and businesses to adapt is already real and will only intensify. I am not a booster: faster adoption is not always better. We need people who can think clearly about the trade-offs and pay attention to the ethical questions that come with the technology.",
  },
  talks: {
    heading: "Talks",
    body:
      "I give talks on AI, its societal effects, and the ethical questions that organisations and individuals are going to have to answer whether they are ready or not. Recent themes range from adoption and team capability to AI in education, the future of work, and the democratic guardrails we will need to put in place. If you want something honest, sceptical in the right places, and rooted in what is actually happening rather than the hype cycle, get in touch.",
  },
  name: {
    heading: "Why Good Transformer?",
    body:
      "The name comes from the Transformer, the neural network architecture introduced in the 2017 paper \"Attention Is All You Need\" that quietly started the AI boom we are now living through. Every large language model and AI assistant you have heard of is built on it. The \"Good\" is the work: the hope that with careful application and democratic guidance, the transition can go well for more people, not just the few who are already ahead of it.",
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
    purpose: "A focused two-week start: where AI fits, and a plan to act on it.",
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
    purpose: "The core build: 90 days to make AI part of how the team works.",
    outputs: [
      "Two real workflow pilots",
      "Team playbooks",
      "Simple governance pack",
    ],
    fit: "Best when you know AI matters but it hasn't changed how the team works yet.",
    cadence: [
      "Weekly working session",
      "Team enablement rhythm",
      "Monthly sponsor checkpoint",
    ],
  },
  {
    name: "Fractional Retainer",
    duration: "3-month minimum",
    purpose: "Ongoing senior advisory alongside your team, no full-time hire.",
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
      "Practical 1-to-1 AI lessons for leaders, and a part-time AI adviser for teams.",
    support:
      "Learn to use AI with confidence and judgement, and see how it's reshaping your business. Patrick Hussey coaches leaders and founders, and helps organisations turn AI into real working practice.",
    routes: [
      {
        label: "For leaders",
        title: "AI Lessons for Leaders",
        body: "1-to-1 coaching for leaders, founders and solo operators.",
        href: "/book/personal",
        tone: "light",
      },
      {
        label: "For businesses",
        title: "AI Advisory for Teams",
        body: "A part-time AI adviser to get your team using AI well.",
        href: "/book/business",
        tone: "dark",
      },
    ],
    signals: [
      {
        title: "Leader lessons",
        body: "Build understanding and your own AI vision",
      },
      {
        title: "Practical and relevant",
        body: "Built on real workflows, not slideware.",
      },
      {
        title: "Strategy to adoption",
        body: "From AI direction to working day-to-day.",
      },
    ],
  },
  role: {
    heading: "AI is easier to learn when the lesson starts with your real work.",
    support:
      "Good Transformer is built around calm, practical coaching. For leaders, that means one-to-one lessons shaped around your tools, your tasks, and how AI is changing your business. For organisations, it means the same practical judgement applied to strategy, adoption, workflows, and guardrails.",
  },
  services: {
    heading: "Two clear routes into better AI use.",
    intro:
      "Start with the support that fits the moment: leader confidence or business change.",
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
      question: "Do I need any experience to take AI lessons?",
      answer:
        "None at all. The lessons are shaped around wherever you are: complete beginner, occasional user, or someone who wants to use AI more deliberately. They start with what you actually need, not a standard syllabus.",
    },
    {
      question: "What does a leader lesson cover?",
      answer:
        "Whatever is most useful to you: everyday workflows, writing, research, planning, prompting habits, sharper use of the tools you already have, and what AI means for your business. Sessions are one-to-one, so the focus is entirely on your work.",
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
      question: "What happens on the discovery call?",
      answer:
        "It is a short working conversation, not a generic sales chat. Patrick reviews the current reality, pressure points, tools in use, and desired 90-day outcome, then recommends the smallest credible next step.",
    },
  ],
  finalCta: {
    heading: "Start with the kind of AI help you actually need.",
    body:
      "Choose 1-to-1 lessons if you want personal confidence with AI. Choose fractional advisory if the challenge is team adoption, strategy, or workflow change.",
  },
};

export const lessonOffers = [
  {
    name: "AI Lessons for Leaders",
    label: "For leaders",
    purpose:
      "For leaders short on time: the AI skills to use it well, and a vision for what it means for your business.",
    points: [
      "AI skills that fit your own work",
      "A clear view of AI in your business",
      "1-to-1 coaching around your schedule",
    ],
    href: "/book/personal",
  },
  {
    name: "AI Advisory for Teams",
    label: "For teams",
    purpose:
      "A fractional AI adviser embedded with your team to make AI part of how you work, in about 90 days.",
    points: [
      "Agree where AI actually pays off",
      "Pilot it inside your real workflows",
      "Leave the team able to keep it running",
    ],
    href: "/book/business",
  },
];

export const lessonFormats: {
  heading: string;
  delivery: string;
  formats: LessonFormat[];
} = {
  heading: "Choose the support that fits",
  delivery:
    "Sessions run online, at your office, or at a co-working space. The format is agreed on your discovery call.",
  formats: [
    {
      name: "Intro lesson",
      duration: "1 hr",
      body:
        "A single session tailored to your skill level, your tools, and the work that matters most to you. You leave with something you can use straight away.",
    },
    {
      name: "Starter pack",
      duration: "3 × 1 hr",
      body:
        "Three sessions that build in sequence. Go deeper on the tools that suit your work, form habits that stick, and develop a workflow you can keep running.",
    },
    {
      name: "Ongoing rhythm",
      duration: "2 × 1 hr + async support",
      body:
        "Two sessions per month plus support between them. For leaders who want to keep moving: new tools, new challenges, accountability, and someone to think with.",
    },
  ],
};

export const servicesPage = {
  title: "Services",
  intro:
    "Two ways to work together: AI lessons for leaders, or fractional advisory for teams and businesses.",
  personalSection: {
    heading: "AI Lessons for Leaders",
    intro:
      "For leaders short on time: build the practical AI skills to use it well, and the clarity to set your own AI direction for the business.",
    cta: { label: "Book a 1-to-1 call", href: "/book/personal" },
  },
  resourceSection: {
    label: "Free downloads",
    heading: "A practical way to start the conversation.",
    intro:
      "Use these short overviews before a call, in a leadership conversation, or when you need a plain-English way to explain where AI can help.",
    items: [
      {
        label: "Leader one-pager",
        title: "Practical AI Lessons for Leaders",
        body:
          "The core offer: calm 1-to-1 AI coaching built around real work, leadership judgement and a useful action plan.",
        href: "/downloads/practical-ai-lessons-for-leaders.pdf",
      },
      {
        label: "Checklist",
        title: "5 questions before another AI tool",
        body:
          "A short leadership checklist for deciding whether a tool is useful, owned, safe and measurable.",
        href: "/downloads/5-questions-before-buying-an-ai-tool.pdf",
      },
      {
        label: "Accountancy & advisory",
        title: "AI for accountancy leaders",
        body:
          "Client prep, research, drafting and knowledge-sharing, with judgement kept in the room.",
        href: "/downloads/ai-for-accountancy-and-advisory.pdf",
      },
      {
        label: "Recruitment",
        title: "AI for recruitment leaders",
        body:
          "Sharper prep, faster research, better follow-ups and more confident consultants.",
        href: "/downloads/ai-for-recruitment.pdf",
      },
      {
        label: "Agency & marketing",
        title: "AI for agency leaders",
        body:
          "Research, reporting, content and search shifts, without making client work generic.",
        href: "/downloads/ai-for-agency-leaders.pdf",
      },
      {
        label: "Legal & risk-aware services",
        title: "AI with verification built in",
        body:
          "Preparation, first drafts and knowledge work with confidentiality and verification in view.",
        href: "/downloads/ai-for-legal-and-risk-aware-professional-services.pdf",
      },
    ],
  },
  businessSection: {
    heading: "AI Advisory for Teams",
    intro:
      "Three ways to work together: a sprint to scope what's possible, a 90-day build to embed AI in how the team works, then a retainer to keep going.",
    cta: { label: "Book a business call", href: "/book/business" },
  },
  sampleArc: [
    {
      phase: "Weeks 1-2",
      body: "Agree where AI pays off, and a plan the leadership team can actually act on.",
    },
    {
      phase: "Weeks 3-6",
      body: "Redesign a couple of real workflows with clear ownership and quality checks.",
    },
    {
      phase: "Weeks 7-10",
      body: "Get the team genuinely using it, with champions and guidance for real work.",
    },
    {
      phase: "Weeks 11-12",
      body: "A steadier operating rhythm, clear guardrails, and a visible next 30 days.",
    },
  ],
  close:
    "If a smaller starting point can create real momentum, that is the recommendation.",
};

export const patrickPage = {
  title: "Patrick Hussey",
  intro:
    "I work with leaders who want to get better at using AI, and with organisations that need to turn AI intention into working practice. Either way, my approach is the same: practical, calm, and not interested in hype.",
  portrait: {
    src: "/patrick/patrick-portrait.jpg",
    alt: "Patrick Hussey",
    caption:
      "Every lesson is delivered by me directly. No course platform, no junior coach, no script. Just one-to-one time with the person you are hiring.",
  },
  sections: [
    {
      title: "How I work",
      body:
        "I try to be honest about what AI can and cannot do. Whether the work is a first lesson or a multi-team adoption programme, the job is to meet you where you are and leave you with something that works in the real world.",
    },
    {
      title: "Selected experience",
      body:
        "I have worked with enterprise leaders at Google, SAP, Adobe, Microsoft, and Vodafone, alongside startups, charities, cultural organisations, and leaders at every level of AI fluency.",
    },
    {
      title: "Writing and judgement",
      body:
        "My writing has appeared in Fast Company and The Guardian. The tone of the work is the same: clear judgement, practical language, and no interest in inflated AI theatre.",
    },
    {
      title: "Boundary line",
      body:
        "I help leaders build personal confidence, shape AI direction, and help teams adopt AI safely. I am not selling a software platform or a hidden engineering bench.",
    },
  ],
};

export const bookingPage = {
  title: "Book a session",
  intro:
    "Two routes into better AI, both starting with a short discovery call: one-to-one for you, or advisory for your team.",
  body:
    "Both routes start with a short intake so the conversation can deal with the real situation, not a generic AI pitch.",
  personal: {
    title: "AI Lessons for Leaders",
    intro:
      "It starts with a short, practical call: a chance to talk through where you are with AI and work out the most useful next step. The brief below gives Patrick the context, so you can get straight to it.",
    body:
      "For leaders, founders, and the sole traders and freelancers running their own business: practical help without hype.",
    routeSummary:
      "A short discovery call for leaders, founders and solo operators to work out what would help.",
  },
  business: {
    title: "AI Advisory for Teams",
    intro:
      "It starts with a short discovery call: a working conversation about where your team really is, not a generic AI pitch.",
    body:
      "You will be asked for a work email, organisation size, sector, current AI use, tools in play, and what success should look like in 90 days. The brief is handed over before scheduling so the call starts with the real context.",
    routeSummary:
      "Fractional AI advisory for teams ready to move from intention to working practice.",
  },
};

export const bookingSuccessPage = {
  personal: {
    title: "Success, your 1-to-1 call is booked",
    intro:
      "Your 1-to-1 call is in the diary. You should receive a calendar invite and joining link by email shortly.",
    body:
      "If the invite does not appear within a few minutes, check spam or promotions, then reply to the booking email if you need help.",
    steps: [
      "Look out for the calendar invite and meeting link in your inbox.",
      "Bring the questions, goals, or situation you want to talk through.",
      "No prep needed. The call is shaped around what you need.",
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
    "Fewer than 5 employees",
    "5 to 50 employees",
    "51 to 250 employees",
    "251 to 1,000 employees",
    "More than 1,000 employees",
  ],
  sectors: [
    "Professional services",
    "Technology or SaaS",
    "Agency, marketing or media",
    "Charity or cultural organisation",
    "Other",
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
    "AI lessons for leaders and practical business advisory from Patrick Hussey at Good Transformer.",
  openGraphTitle: "Good Transformer - Get confident with AI.",
  openGraphDescription:
    "AI lessons for leaders and fractional advisory for teams. Patrick Hussey helps people and organisations get genuinely useful with AI.",
  ogImageAlt:
    "Good Transformer - Get confident with AI. AI lessons for leaders and practical business advisory.",
  personName: "Patrick Hussey",
  personJobTitle: "AI Coach and Fractional AI Adviser",
  pages: {
    home: {
      path: "/",
      title: "Good Transformer",
      description:
        "AI lessons for leaders and practical business advisory from Patrick Hussey at Good Transformer.",
    },
    services: {
      path: "/services/",
      title: "Services",
      description:
        "AI lessons for leaders and fractional advisory for teams. Three engagement tiers: AI Reality Check Sprint, 90-Day Adoption Build, and Fractional Retainer.",
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
        "Patrick Hussey is an AI coach and fractional adviser. He works with leaders to build practical AI confidence, and with organisations to turn AI intent into real working practice.",
    },
    book: {
      path: "/book/",
      title: "Book a Session",
      description:
        "Two ways to work with Patrick Hussey: 1-to-1 AI lessons for leaders, or fractional advisory for teams. Book a short call to start either.",
    },
    bookPersonal: {
      path: "/book/personal/",
      title: "AI Lessons for Leaders",
      description:
        "1-to-1 AI lessons for leaders with Patrick Hussey. Start with a short call to work out what you need. No experience required.",
    },
    bookBusiness: {
      path: "/book/business/",
      title: "AI Advisory for Teams",
      description:
        "Fractional AI advisory for teams with Patrick Hussey. Submit a short brief and book a call to discuss AI strategy, adoption, and the right engagement for your team.",
    },
    personalSuccess: {
      path: "/book/personal/success/",
      title: "Success, Your 1-to-1 Call Is Booked",
      description:
        "Confirmation page for 1-to-1 AI calls booked with Patrick Hussey at Good Transformer.",
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
