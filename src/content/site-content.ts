export type LinkItem = {
  href: string;
  label: string;
  children?: LinkItem[];
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

export type DownloadItem = {
  label: string;
  title: string;
  body: string;
  href: string;
};

export type ServiceDetailPage = {
  title: string;
  intro: string;
  heroCta: LinkItem;
  secondaryCta?: LinkItem;
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
  descriptor: "AI lessons for leaders and practical team advisory",
  brand: "Good Transformer",
  primaryCta: {
    label: "Book a discovery call",
    href: "/book",
  },
  heroSecondaryCta: {
    label: "Book a discovery call for leaders",
    href: "/book/personal",
  },
  personalCta: {
    label: "Book a discovery call for leaders",
    href: "/book/personal",
  },
  businessCta: {
    label: "Book a discovery call for teams",
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
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/ai-lessons-for-leaders", label: "AI Lessons for Leaders" },
      { href: "/services/ai-advisory-for-teams", label: "AI Advisory for Teams" },
    ],
  },
  { href: "/insights", label: "Insights" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/patrick", label: "Patrick" },
  { href: "/about", label: "About" },
];

export const insightsPage = {
  title: "Insights",
  intro:
    "Practical writing on using AI with judgement: adoption, leadership, and the ethical questions that come with it, plus useful guides and templates you can take away.",
  workCta: {
    eyebrow: "Work with Good Transformer",
    heading: "Turn this thinking into working practice.",
    cta: { label: "Explore team advisory", href: "/services/ai-advisory-for-teams" },
  },
};

export const newsletterPage = {
  eyebrow: "The Good Transformer digest",
  title: "Stay clear-headed about AI.",
  intro:
    "A short, regular briefing for leaders: the newest Insights writing, plus the handful of AI stories that actually matter, read with judgement, not hype. Pick a weekly round-up or a quick note each weekday.",
  form: {
    heading: "Get the digest",
    body: "Choose your rhythm, add your email, done. No spam, and one-click unsubscribe in every issue.",
  },
  inside: {
    eyebrow: "What lands in your inbox",
    heading: "Less noise. More judgement.",
    items: [
      {
        title: "New Insights, as they publish",
        body: "Practical writing on using AI with judgement, sent the moment each piece goes live. No need to keep checking the site.",
      },
      {
        title: "The AI stories that matter",
        body: "A curated read of the biggest developments for leaders: five each week, or three each weekday. A considered shortlist, not a firehose.",
      },
      {
        title: "Calm, never breathless",
        body: "The same plain, sceptical-where-it-counts voice as the rest of Good Transformer. No engagement-bait, no sponsored filler, no spam.",
      },
    ],
  },
  recent: {
    eyebrow: "A taste of recent issues",
    heading: "The kind of thinking that lands in every digest.",
  },
  faqs: [
    {
      question: "How often will you email me?",
      answer:
        "As often as you choose: a weekly round-up, or a short note each weekday. You pick when you subscribe, and you can switch or stop whenever you like.",
    },
    {
      question: "What's actually in it?",
      answer:
        "The newest Insights writing, plus a curated read of the biggest AI stories for leaders. Nothing else: no sponsored filler and no upsells.",
    },
    {
      question: "Will my email be safe?",
      answer:
        "Yes. Your address is only ever used to send the digest you asked for. It is never shared or sold, and every email carries a one-click unsubscribe.",
    },
    {
      question: "Can I unsubscribe easily?",
      answer:
        "Always. Every issue has a one-click unsubscribe that takes effect immediately. No forms, no friction.",
    },
  ],
};

export const aboutPage = {
  title: "About",
  intro:
    "I'm Patrick Hussey, and I started Good Transformer as a new kind of consultancy, built to help individuals and companies deal with AI clearly and practically. The goal is to make people genuinely better equipped for the changes ahead.",
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
    line: "Use-case choices, priorities, governance judgement.",
  },
  {
    name: "Embed",
    line: "Workflow redesign, pilots, measures, tool choices.",
  },
  {
    name: "Enable",
    line: "Champion support, team habits, safe use.",
  },
];

export const offers: Offer[] = [
  {
    name: "AI Reality Check Sprint",
    duration: "2 weeks",
    purpose: "Fast clarity on where AI pays off and what to do next.",
    outputs: [
      "AI direction brief",
      "Use-case scorecard",
      "90-day practice plan",
    ],
    fit: "Best when AI use is uneven and the next safe, useful steps are unclear.",
    cadence: [
      "Leadership and function interviews",
      "Current-use and risk triage",
      "Board-ready decision brief",
    ],
  },
  {
    name: "90-Day Adoption Build",
    duration: "12 weeks",
    purpose: "The defined project: turn scattered AI into working practice.",
    outputs: [
      "Two workflow pilots",
      "Team playbooks",
      "Simple guardrails pack",
    ],
    fit: "Best when AI matters, but real workflows have not changed yet.",
    cadence: [
      "Weekly working session",
      "Champion support rhythm",
      "Monthly sponsor checkpoint",
    ],
  },
  {
    name: "Embedded AI Lead",
    duration: "3-month minimum",
    purpose: "An embedded, fractional AI lead without a full-time hire.",
    outputs: [
      "Monthly executive session",
      "Team operating rhythm",
      "Plain-English progress note",
    ],
    fit: "Best when several teams need priority, guardrails, and steady follow-through.",
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
      "Practical 1-to-1 AI lessons for leaders, plus senior AI advisory for teams.",
    support:
      "Learn to use AI with confidence and judgement, and see what it means for your work. Patrick Hussey coaches leaders and helps organisations turn scattered AI use into safe, useful working practice.",
    routes: [
      {
        label: "For leaders",
        title: "AI Lessons for Leaders",
        body: "1-to-1 coaching for leaders, founders and solo operators.",
        href: "/book/personal",
        tone: "light",
      },
      {
        label: "For teams",
        title: "AI Advisory for Teams",
        body: "Help your whole team use AI better in real work.",
        href: "/book/business",
        tone: "dark",
      },
    ],
    signals: [
      {
        title: "Leader lessons",
        body: "Build clear understanding and AI vision.",
      },
      {
        title: "Practical and real",
        body: "Built on real workflows, not slideware.",
      },
      {
        title: "Pilots to practice",
        body: "Turn scattered AI into real work.",
      },
    ],
  },
  role: {
    heading: "AI is easier to learn when the lesson starts with your real work.",
    support:
      "Good Transformer is built around calm, practical coaching. For leaders, that means one-to-one lessons shaped around your tools, tasks and AI questions. For organisations, it means an embedded, fractional AI lead who connects use cases, workflows, guardrails and team habits.",
  },
  services: {
    heading: "Two clear routes into better AI use.",
    intro:
      "Start with the support that fits the moment: personal confidence or team working practice.",
    note: "Most work starts with the smallest engagement that can create real momentum.",
  },
  teamAdvisory: {
    heading: "A 90-day project, or an embedded AI lead.",
    body:
      "Patrick embeds with leadership and teams to choose the right use cases, redesign real workflows, set guardrails, and leave a rhythm the business can keep using.",
  },
  patrick: {
    heading: "Patrick Hussey",
    body:
      "Patrick works between leadership, operations and teams. The job is to choose the right use cases, redesign real workflows and leave safe, useful AI practice inside the business. Good Transformer is the umbrella brand. The judgement you hire is Patrick's.",
    frame: {
      label: "How the work shows up",
      heading: "Work that becomes part of how the business runs",
      body:
        "The job is not just to set direction, but to leave working structures behind. These are the documents teams use to decide, act, and stay aligned.",
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
        "It means a defined senior cadence rather than a full-time hire: leadership decisions, weekly or fortnightly workflow work, short triage when needed, and a clear next step.",
    },
    {
      question: "Is the team work strategy or training?",
      answer:
        "Neither on its own. It connects strategy to working practice: choose use cases, redesign workflows, set guardrails and support the people expected to keep it going.",
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
      "Choose 1-to-1 lessons if you want personal confidence with AI. Choose team advisory if the challenge is scattered AI use, workflow change or safe guardrails.",
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
    href: "/services/ai-lessons-for-leaders",
  },
  {
    name: "AI Advisory for Teams",
    label: "For teams",
    purpose:
      "An embedded, fractional AI lead who turns scattered AI use into working practice.",
    points: [
      "Choose where AI really pays off",
      "Pilot it in real workflows",
      "Leave a rhythm the team can keep",
    ],
    href: "/services/ai-advisory-for-teams",
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
    "Two ways to work together: AI lessons for leaders, or AI Advisory for Teams.",
  personalSection: {
    heading: "AI Lessons for Leaders",
    intro:
      "For leaders short on time: build the practical AI skills to use it well, and the clarity to set your own AI direction for the business.",
    cta: { label: "Explore leader lessons", href: "/services/ai-lessons-for-leaders" },
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
          "The core offer: calm 1-to-1 AI coaching built around your real work and leadership judgement.",
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
        label: "Corporate finance",
        title: "AI for finance leaders",
        body:
          "Synthesis, preparation and diligence support for judgement-heavy advisory work.",
        href: "/downloads/ai-for-corporate-finance.pdf",
      },
      {
        label: "Wealth & financial planning",
        title: "AI for wealth leaders",
        body:
          "Meeting prep, research, suitability notes and client letters, with the advice still yours.",
        href: "/downloads/ai-for-wealth-and-financial-planning.pdf",
      },
      {
        label: "Property & real estate",
        title: "AI for property leaders",
        body:
          "Listings, market research, comparables and client updates, with local judgement kept yours.",
        href: "/downloads/ai-for-property-and-real-estate.pdf",
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
      "Two shapes of engagement: a defined 90-day project, or an embedded, fractional AI lead, with a short sprint as the way in.",
    cta: { label: "Explore team advisory", href: "/services/ai-advisory-for-teams" },
  },
  sampleArc: [
    {
      phase: "Weeks 1-2",
      body: "Choose where AI pays off and what the leadership team should do next.",
    },
    {
      phase: "Weeks 3-6",
      body: "Redesign two real workflows with ownership, measures and guardrails.",
    },
    {
      phase: "Weeks 7-10",
      body: "Support champions, playbooks and the habits that make the work stick.",
    },
    {
      phase: "Weeks 11-12",
      body: "A steadier rhythm, clear guardrails and a visible next 30 days.",
    },
  ],
  close:
    "If the sprint is enough to create real momentum, that is the recommendation.",
};

export const leaderLessonsPage: ServiceDetailPage & {
  overview: {
    label: string;
    heading: string;
    body: string;
    points: string[];
    download: DownloadItem;
  };
  sectorSection: {
    label: string;
    heading: string;
    intro: string;
    items: DownloadItem[];
  };
  lessonSection: {
    heading: string;
    intro: string;
  };
  proof: {
    heading: string;
    body: string;
  };
} = {
  title: "AI Lessons for Leaders",
  intro:
    "Practical 1-to-1 AI coaching for leaders who want to understand AI, use it well, and see what it means for their role, their people and their business.",
  heroCta: { label: "Book a discovery call for leaders", href: "/book/personal" },
  secondaryCta: { label: "View all services", href: "/services" },
  overview: {
    label: "Start here",
    heading: "What the lessons are",
    body:
      "The core lessons are not a generic tool demo. They are practical sessions built around the work you already do: decisions, meetings, writing, research, planning, team questions and the judgement calls AI now touches.",
    points: [
      "Understand AI in relation to your own role and responsibilities.",
      "Turn real tasks into calmer, repeatable workflows.",
      "See how AI could help your staff without losing judgement, safety or voice.",
      "Leave with a useful action plan, not a pile of abstract possibilities.",
    ],
    download: {
      label: "General overview",
      title: "Practical AI Lessons for Leaders",
      body:
        "A short PDF explaining the offer, who it is for, what happens in a lesson and what leaders leave with.",
      href: "/downloads/practical-ai-lessons-for-leaders.pdf",
    },
  },
  sectorSection: {
    label: "Sector notes",
    heading: "Pick the version closest to your work",
    intro:
      "The lesson shape stays practical, but the use cases change by sector. These short notes show how the same leadership lessons apply in different professional services contexts.",
    items: [
      {
        label: "Accountancy & advisory",
        title: "AI for accountancy leaders",
        body:
          "Client prep, research, drafting and internal knowledge-sharing with human judgement still in charge.",
        href: "/downloads/ai-for-accountancy-and-advisory.pdf",
      },
      {
        label: "Recruitment",
        title: "AI for recruitment leaders",
        body:
          "Candidate prep, market research, adverts, summaries and follow-ups, without losing the human touch.",
        href: "/downloads/ai-for-recruitment.pdf",
      },
      {
        label: "Agency & marketing",
        title: "AI for agency leaders",
        body:
          "Client preparation, reporting, content and search shifts, with creative judgement kept visible.",
        href: "/downloads/ai-for-agency-leaders.pdf",
      },
      {
        label: "Corporate finance",
        title: "AI for finance leaders",
        body:
          "Synthesis, meeting prep and first-pass diligence support for judgement-heavy advisory work.",
        href: "/downloads/ai-for-corporate-finance.pdf",
      },
      {
        label: "Property & real estate",
        title: "AI for property leaders",
        body:
          "Listings, market research, comparables and client updates, with local judgement kept yours.",
        href: "/downloads/ai-for-property-and-real-estate.pdf",
      },
      {
        label: "Legal & risk-aware services",
        title: "AI with verification built in",
        body:
          "Preparation, first drafts and knowledge work with confidentiality, accuracy and verification in view.",
        href: "/downloads/ai-for-legal-and-risk-aware-professional-services.pdf",
      },
    ],
  },
  lessonSection: {
    heading: "Lessons shaped around the leader in front of me",
    intro:
      "Some leaders need a first confident hour. Some need a short run of sessions to build habits. Some need an ongoing rhythm as the tools and business questions keep changing.",
  },
  proof: {
    heading: "Experience without the theatre",
    body:
      "Patrick has worked with leaders at Google, Microsoft, SAP, Adobe, Vodafone, OneAdvanced and Sana Commerce, and written on AI for Fast Company and The Guardian. The lessons bring that context back to the practical work in front of you.",
  },
};

export const teamAdvisoryPage: ServiceDetailPage & {
  fit: {
    heading: string;
    intro: string;
    points: string[];
  };
  operating: {
    heading: string;
    intro: string;
  };
  offerSection: {
    heading: string;
    intro: string;
  };
  arcSection: {
    heading: string;
    intro: string;
  };
} = {
  title: "AI Advisory for Teams",
  intro:
    "An embedded, fractional AI lead working with your leadership and teams to turn scattered AI use into safe, useful working practice.",
  heroCta: siteConfig.businessCta,
  secondaryCta: { label: "View all services", href: "/services" },
  fit: {
    heading: "For teams with scattered AI use",
    intro:
      "This is for organisations where AI is already being discussed, tested or used unevenly, but has not yet become safe, useful working practice.",
    points: [
      "Leadership needs to know where AI should and should not be used.",
      "Teams are experimenting, but habits and guardrails are patchy.",
      "Promising pilots need to become repeatable working practice.",
      "The business needs a fractional AI lead, not a full-time hire.",
    ],
  },
  operating: {
    heading: "Use cases, workflows and guardrails",
    intro:
      "The work connects leadership priorities with the jobs people actually do: choose the right use cases, redesign real workflows, set guardrails, support champions and leave a cadence the business can keep using.",
  },
  offerSection: {
    heading: "A way in, a project, an embedded role",
    intro:
      "Start with a short sprint to see where AI pays off, then run a defined 90-day project or bring in an embedded, fractional lead, only when there is a clear reason to go further.",
  },
  arcSection: {
    heading: "A simple 90-day arc",
    intro:
      "The core 90-day build moves from clarity to workflow pilots to a practical rhythm the team can keep using.",
  },
};

export const patrickPage = {
  title: "Patrick Hussey",
  intro:
    "I work with leaders who want personal AI confidence, and with organisations that need scattered AI use to become safe, useful working practice. Either way, my approach is practical, calm and not interested in hype.",
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
        "I try to be honest about what AI can and cannot do. Whether the work is a first lesson or a team advisory engagement, the job is to meet you where you are and leave you with something that works in the real world.",
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
        "I help leaders build personal confidence and help teams turn AI into safe working practice. I am not selling a software platform or a hidden engineering bench.",
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
      "It starts with a short discovery call: a working conversation about where AI is scattered, useful or risky inside your team.",
    body:
      "You will be asked for a work email, organisation size, sector, current AI use, tools in play, and what should change in 90 days. The brief is handed over before scheduling so the call starts with real context.",
    routeSummary:
      "Team advisory for organisations ready to turn AI use into working practice.",
  },
};

export const bookingSuccessPage = {
  personal: {
    title: "Success, your 1-to-1 discovery call is booked",
    intro:
      "Your 1-to-1 discovery call is in the diary. You should receive a calendar invite and joining link by email shortly.",
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
    title: "Success, your team advisory call is booked",
    intro:
      "Your team advisory call is confirmed. You should receive a calendar invite and joining link by email shortly.",
    body:
      "If the invite does not appear within a few minutes, check spam or promotions, then reply to the booking email if you need help.",
    steps: [
      "Look out for the calendar invite and meeting link in your inbox.",
      "Bring the real AI questions, blockers or workflow pressures you are facing.",
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
    "AI use is happening, but unevenly",
    "Leadership needs direction and guardrails",
    "Promising pilots are not becoming practice",
    "Workshops have not changed team habits",
    "Tool sprawl or shadow AI is a risk",
  ],
  nextSteps: [
    "Fill in the short brief.",
    "Review the summary and handoff.",
    "Continue to scheduling when you are ready.",
  ],
};

export const seoContent = {
  siteName: "Good Transformer",
  siteUrl: "https://goodtransformer.ai",
  defaultDescription:
    "AI lessons for leaders and AI advisory for teams from Patrick Hussey at Good Transformer.",
  openGraphTitle: "Good Transformer - Get confident with AI.",
  openGraphDescription:
    "AI lessons for leaders and senior advisory for teams. Patrick Hussey helps organisations turn scattered AI use into safe, useful working practice.",
  ogImageAlt:
    "Good Transformer - Get confident with AI. AI lessons for leaders and AI advisory for teams.",
  personName: "Patrick Hussey",
  personJobTitle: "AI Coach and Fractional AI Adviser",
  pages: {
    home: {
      path: "/",
      title: "Good Transformer",
      description:
        "AI lessons for leaders and AI advisory for teams from Patrick Hussey at Good Transformer.",
    },
    services: {
      path: "/services/",
      title: "Services",
      description:
        "AI lessons for leaders and AI Advisory for Teams. Engagements: AI Reality Check Sprint, 90-Day Adoption Build, and Embedded AI Lead.",
    },
    insights: {
      path: "/insights/",
      title: "Insights",
      description:
        "Practical writing from Patrick Hussey on using AI with judgement: adoption, leadership and ethics, plus useful guides and templates for leaders and teams.",
    },
    newsletter: {
      path: "/newsletter/",
      title: "Newsletter",
      description:
        "Stay clear-headed about AI. A short digest for leaders from Patrick Hussey: the newest Insights writing plus the AI stories that actually matter, weekly or daily. No hype, no spam.",
    },
    leaderLessons: {
      path: "/services/ai-lessons-for-leaders/",
      title: "AI Lessons for Leaders",
      description:
        "Practical 1-to-1 AI lessons for leaders with Patrick Hussey. Understand AI, apply it to your own work, and see what it means for your role, staff and business.",
    },
    teamAdvisory: {
      path: "/services/ai-advisory-for-teams/",
      title: "AI Advisory for Teams",
      description:
        "AI Advisory for Teams: an embedded, fractional AI lead who turns scattered AI use into safe, useful working practice, for a 90-day project or the long run.",
    },
    about: {
      path: "/about/",
      title: "About",
      description:
        "About Good Transformer - a consultancy built to help individuals and organisations use AI with judgement. Named for the Transformer architecture that started the AI boom.",
    },
    patrick: {
      path: "/patrick/",
      title: "Patrick Hussey",
      description:
        "Patrick Hussey is an AI coach and fractional adviser. He helps leaders build AI confidence and helps teams turn scattered AI use into working practice.",
    },
    book: {
      path: "/book/",
      title: "Book a Session",
      description:
        "Two ways to work with Patrick Hussey: 1-to-1 AI lessons for leaders, or AI Advisory for Teams. Book a short discovery call to start either.",
    },
    bookPersonal: {
      path: "/book/personal/",
      title: "AI Lessons for Leaders",
      description:
        "1-to-1 AI lessons for leaders with Patrick Hussey. Start with a short discovery call to work out what you need. No experience required.",
    },
    bookBusiness: {
      path: "/book/business/",
      title: "AI Advisory for Teams",
      description:
        "AI Advisory for Teams with Patrick Hussey. Submit a short brief and book a call to discuss use cases, workflows, guardrails and the right next step.",
    },
    personalSuccess: {
      path: "/book/personal/success/",
      title: "Success, Your 1-to-1 Discovery Call Is Booked",
      description:
        "Confirmation page for 1-to-1 discovery calls booked with Patrick Hussey at Good Transformer.",
    },
    businessSuccess: {
      path: "/book/business/success/",
      title: "Success, Your Team Advisory Call Is Booked",
      description:
        "Confirmation page for team advisory calls booked with Patrick Hussey at Good Transformer.",
    },
    notFound: {
      title: "Page not found",
      description:
        "This page could not be found on Good Transformer. Return to the homepage or book a session with Patrick Hussey.",
    },
  },
};
