# Source log: AI Lessons for Leaders series

Editorial verification record. Every URL was checked live during the QA pass (all
returned 200). Sources are reused across articles, so this is a master log plus a
per-article map. Vendor and non-peer-reviewed sources are flagged; handle their figures
with the stated caution.

## Master source list

| # | Source | Org / author | Date | Type | Main finding used | Key limitation |
|---|---|---|---|---|---|---|
| S1 | [AI Act, Article 4 (AI literacy)](https://artificialintelligenceact.eu/article/4/) | European Union | Applies 2 Feb 2025 | Regulation (reference site) | Providers/deployers must ensure staff AI literacy, defined by role and context, not product | Reference site, not EUR-Lex; literacy duty proposed for softening; EU scope (UK indirect) |
| S2 | [AI Index 2025](https://hai.stanford.edu/ai-index/2025-ai-index-report) | Stanford HAI | Apr 2025 | Independent index | ~40 notable US models in 2024; ~90% of notable models from industry; steep adoption rise | Annual snapshot; some inputs vendor-reported |
| S3 | [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | NIST (US) | Jan 2023 | Independent standards | Govern/Map/Measure/Manage; measurement and oversight by design, proportional to risk | Voluntary, US-centric, non-prescriptive |
| S4 | [AI Principles](https://oecd.ai/en/ai-principles) | OECD | 2019, upd. 2024 | Intergovernmental principles | Accountability and human oversight are core to trustworthy AI | Principles, not binding rules |
| S5 | [AI Opportunities Action Plan](https://www.gov.uk/government/publications/ai-opportunities-action-plan/ai-opportunities-action-plan) | DSIT / Matt Clifford | 13 Jan 2025 | Government policy | "Scan > Pilot > Scale" adoption sequencing | The £400bn figure is attributed to a Google-commissioned report, not a govt estimate; govt-focused |
| S6 | [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) | Anthropic (vendor) | 19 Dec 2024 | Vendor guidance | Workflows (predefined paths) vs agents (direct their own steps); "simplest solution possible" | Vendor source; engineering framing |
| S7 | [Rights re: automated decision-making (Art 22)](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/rights-related-to-automated-decision-making-including-profiling/) | ICO (UK) | Current | Regulator guidance | Solely automated decisions with legal/significant effects restricted; human involvement must be "active rather than tokenistic" | Evolving with Data (Use and Access) Act 2025 |
| S8 | [Guidance on AI and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/) | ICO (UK) | Current | Regulator guidance | UK GDPR duties apply in full to AI; DPIA for higher-risk uses | Guidance, not legal advice; evolving |
| S9 | [AI and cyber security: what you need to know](https://www.ncsc.gov.uk/guidance/ai-and-cyber-security-what-you-need-to-know) | NCSC (UK) | Current | Agency guidance | Prompts visible to provider and may train future models; allow tool access deliberately | Cyber-security framing |
| S10 | [Navigating the Jagged Technological Frontier](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf) | Dell'Acqua et al., HBS/BCG | 2023 | Independent field experiment | 758 consultants: within-frontier +12.2% tasks, 25.1% faster, higher quality; out-of-frontier 19% less likely correct | One cohort, consultancy tasks, 2023 GPT-4 |
| S11 | [Generative AI at Work](https://www.nber.org/papers/w31161) | Brynjolfsson, Li & Raymond (NBER w31161) | 2023 | Independent study | 5,179 support agents: +14% avg productivity, +34% novices, little for experts | Single firm, customer support; generalisation unproven |
| S12 | [The Productivity J-Curve](https://www.nber.org/papers/w25148) | Brynjolfsson, Rock & Syverson (NBER w25148) | 2018 | Independent economics | Payoff from general-purpose tech lags pending intangible complementary investment | Pre-LLM theory, applied by analogy |
| S13 | [The GenAI Divide: State of AI in Business 2025](https://nanda.media.mit.edu/ai_report_2025.pdf) | MIT Media Lab, Project NANDA | Jul 2025 | Industry report | High adoption, ~95% of pilots no measurable P&L impact; gap is learning/integration, not talent | NOT peer-reviewed; interview/survey basis; 95% contested. Always caveat |
| S14 | [Early-2025 AI on experienced developer productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) | METR | Jul 2025 | Independent RCT | 16 devs, 246 tasks: AI made experienced devs 19% slower despite forecasting 24% faster | Small sample; expert-on-familiar work; early-2025 tools; not generalisable |
| S15 | [2024 Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part) | Microsoft + LinkedIn (vendor) | 8 May 2024 | Vendor survey | 75% of knowledge workers use AI; 78% BYOAI (80% in SMEs); 60% of leaders have no AI plan; 79% call AI critical | Vendor survey, self-reported |

## Per-article source map

Each article uses four sources (>=2 primary/independent). "Where it appears" notes the
argument the source supports.

1. **ai-literacy-for-leaders** — S1 (literacy is durable, role-based), S2 (pace of model releases), S3 (evaluation/measure), S4 (accountability), S5 (adoption context + £400bn caveat).
2. **assistant-automation-or-ai-agent** — S6 (workflow vs agent, simplest solution), S7 (Act level needs human approval), S3 (proportional risk), S4 (oversight).
3. **how-to-choose-an-ai-use-case** — S10 (jagged frontier, task selection), S11 (frequency/novice gains), S5 (the "scan" phase), S3 ("Map").
4. **ai-productivity-versus-business-value** — S13 (adoption-value gap, caveated), S11 (real task gain), S12 (J-curve), S5 (macro estimates are potential, caveated).
5. **ai-experiments-versus-ai-strategy** — S13 (high adoption/low transformation, caveated), S12 (org-level complementary change), S3 (Govern), S5 (scan/pilot/scale).
6. **90-day-ai-plan-small-business** — S5 (scan/pilot/scale), S10 (task selection), S11 (where gains come from), S3 (checks by design), S12 (value compounds across cycles).
7. **simple-ai-policy-for-small-business** — S9 (data-in risk, deliberate access), S8 (UK GDPR duties, DPIA), S1 (literacy as a legal bar), S5 (deliberate adoption).
8. **when-ai-makes-you-slower** — S14 (19% slowdown + perception gap, caveated), S10 (out-of-frontier harm), S11 (novices gain, experts less), S3 (measure, don't assume).
9. **ai-skills-gap-leadership** — S15 (60% no plan / 79% critical / 78% BYOAI, vendor), S13 (gap is learning/integration), S1 (literacy is an org duty), S3 (Govern).
10. **ai-agent-job-description** — S6 (agents direct own steps), S3 (manage by autonomy/context), S4 (human accountability), S7 (Art 22 where it affects people).
11. **what-not-to-delegate-to-ai** — S4 (accountability/oversight), S7 (Art 22 restriction), S3 (proportional to consequence), S6 (autonomy = delegated judgement).
12. **shadow-ai-management-signal** — S15 (78%/80% BYOAI, vendor), S9 (data-in risk), S8 (data-protection duties), S13 (gap is learning/integration).
13. **why-ai-training-fails** — S12 (complementary change, not the tool), S13 (learning/integration gap), S11 (gains from in-workflow context), S5 (adoption is a sequence).
14. **ai-one-person-team-management** — S11 (raises the floor, novice gains), S10 (confidently worse out-of-frontier), S13 (value from integration/judgement), S4 (accountability as work restructures).
15. **ai-adoption-impact-gap** — S2 (adoption rising), S15 (75% use AI, vendor), S13 (high adoption/low impact, caveated), S12 (structural lag).
