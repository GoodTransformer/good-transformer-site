---
title: "Why intelligent people can become slower with AI"
description: "On some tasks AI adds more overhead than it removes, and experts can feel faster while measurably slowing down. A six-part friction test for telling which is which."
date: 2026-06-06
type: post
tags: ["ai-adoption", "productivity", "teams"]
cover: /insights/when-ai-makes-you-slower/cover.jpg
coverAlt: "Dark teal cover with a node-and-edge motif and the Good Transformer wordmark, marking an article on how AI can make experienced people slower."
coverQuote: "Feeling faster and being faster are not the same thing."
featured: false
draft: false
---

Here is a finding that should give any leader pause. In 2025, the research group METR ran a randomised controlled trial with experienced open-source software developers working on code they knew well. Before starting, the developers expected AI tools to cut their task time by 24%. After finishing, they believed AI had sped them up by about 20%. In fact, [allowing AI made them 19% slower](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/). They were not just wrong about the benefit. They were wrong about its direction, and they did not notice.

That gap between feeling faster and being faster is the part worth sitting with. It is easy to assume AI always helps and only argue about how much. The honest picture is messier: on some tasks, for some people, the tool adds more work than it removes, and it does so while feeling helpful the whole time.

## Where the extra work comes from

AI does not just do the task. It adds steps around it. You have to explain what you want, often more carefully than you would brief a colleague. You have to read and inspect what comes back, because it is plausible whether or not it is right. When it is subtly wrong, you carry the cost of the error, sometimes without knowing. And then you have to correct it, which on a fiddly task can take longer than doing the thing yourself.

For a genuine expert on familiar work, those overheads can swamp the benefit. This is consistent with the wider evidence. The "jagged frontier" field experiment found AI helped knowledge workers on tasks suited to it but made them [meaningfully worse on a task just outside its range](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf). And the large customer-support study by Brynjolfsson, Li and Raymond found the [biggest gains went to novices, with little benefit for the most experienced staff](https://www.nber.org/papers/w31161). The pattern repeats: AI lifts the floor more than the ceiling, so the more expert you are at a task, the less it tends to add, and the more its overhead shows.

A fair caveat about the METR study: it was small, sixteen developers on mature codebases they knew intimately, using early-2025 tools. It is not proof that AI slows everyone down. It is strong evidence that on expert, familiar work, it can, and that the people doing it will not feel it happening.

## The AI friction test

Before handing a task to AI out of habit, it is worth a quick check. We use six questions. The more of them point the wrong way, the more likely AI is adding friction rather than removing it.

1. **Time to explain.** How long does it take to brief the AI well? If explaining the task approaches the time to do it, the maths is already poor.
2. **Time to inspect.** How long to check the result properly? Confident, fluent output is expensive to verify precisely because it looks finished.
3. **Cost of hidden errors.** If a subtle mistake slips through, how bad is it? High-stakes work makes the inspection burden non-negotiable, which raises the real cost.
4. **Ease of correction.** When the output is nearly right, is fixing it quick, or is it easier to start again? Editing someone else's near-miss is often slower than writing your own.
5. **Existing competence.** How good are you already at this task? The better you are, the less AI adds, and the more its overhead bites.
6. **Reusability of the context.** Will the briefing you write pay off many times, or just once? A prompt you reuse daily amortises its cost; a one-off rarely does.

> Feeling faster and being faster are not the same thing.

## What this looks like in practice

A senior lawyer drafting a clause they have written a hundred times will usually be faster by hand; explaining it, checking the AI's version and fixing its subtle slips is pure overhead. A junior drafting an unfamiliar clause is in the opposite position, where a good first draft and an explanation genuinely help. Same tool, same firm, opposite result, decided entirely by who is doing what. (Illustrative examples, not specific people.)

The same logic sorts marketing work, analysis and writing. AI tends to help most where the human is less practised, the task is well-suited to it, and the output is cheap to check. It tends to hurt where the human is already expert, the work is subtle, and a wrong answer is costly to catch.

## The honest limits

This is not an argument that AI makes people slower. For a great deal of work, especially for less experienced staff and high-frequency tasks, the gains are real and well-evidenced. The point is narrower and more useful: the benefit is not universal, it varies sharply by task and person, and the feeling of speed is an unreliable guide. The NIST [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) makes measurement a deliberate function for exactly this reason, because intuition about AI's value is easy to get wrong.

The frontier also moves. A task where AI slows an expert today may flip in six months as the tools improve. That is an argument for re-testing occasionally, not for assuming either way.

For a manager, the practical implication is not to mandate AI everywhere, nor to ban it, but to let the people doing expert work make the call task by task, and to treat that as a respected professional judgement rather than a quiet act of rebellion against a tool they were told to adopt. The friction test below gives them a shared language for making it.

## What to do next

Pick one task you reflexively run through AI and time it honestly, once with and once without, paying attention to the correction effort, not just the first draft. Trust the clock over the feeling. You may find AI is earning its place; you may find you have been adding steps to work you were already good at. Either way, you will be deciding on evidence rather than vibes.

## The tool

To run that test properly, we have built the **AI Friction Time Log**: a simple sheet for comparing the same task done with and without AI, capturing time taken, quality, correction effort and your confidence, so you can see where AI genuinely helps and where it quietly costs you.

[Download the AI Friction Time Log (PDF)](/insights/assets/ai-friction-time-log.pdf)

Building this kind of judgement on your own real work is exactly what our [AI lessons for leaders](/services/ai-lessons-for-leaders) are for. It connects directly to the difference between [productivity and business value](/insights/ai-productivity-versus-business-value/), and to the [durable AI literacy](/insights/ai-literacy-for-leaders/) that lets you tell a real gain from a felt one.

## Sources and further reading

- [METR, Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), July 2025. Independent randomised controlled trial. Source for the 19% slowdown and the perception gap. Note the small sample and expert-on-familiar-work context.
- [Dell'Acqua et al., Navigating the Jagged Technological Frontier](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf), Harvard Business School / BCG working paper, 2023. Independent. Source for AI hurting performance on out-of-frontier tasks.
- [Brynjolfsson, Li and Raymond, Generative AI at Work](https://www.nber.org/papers/w31161), NBER Working Paper 31161, 2023. Independent. Source for gains concentrating among less experienced staff.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework). Independent US standards body. Source for treating measurement as a deliberate discipline.
