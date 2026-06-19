---
title: "Assistant, automation or agent: what does your business actually need?"
socialTitle: "Assistant, automation or agent: which do you need?"
socialSubtitle: "A four-level test for how much to hand to AI: Answer, Assist, Automate, Act."
description: "Assistant, automation or agent? A four-level test for deciding how much to hand to AI, and how much to keep: Answer, Assist, Automate, Act."
date: 2026-06-12
type: post
tags: ["ai-adoption", "ai-agents", "leadership"]
cover: /insights/assistant-automation-or-ai-agent/cover.jpg
coverAlt: "Dark teal cover with a node-and-edge motif and the Good Transformer wordmark, marking an article on choosing between AI assistants, automations and agents."
coverQuote: "Act is not the goal. The lowest level that does the job is."
featured: false
draft: false
---

The word "agent" is doing a great deal of work in sales decks at the moment. It promises a system that quietly gets on with things while you sleep, and occasionally that is exactly what a business needs. Far more often, the task in front of you would be done better, more cheaply and more safely by something much less autonomous, and the only real reason to reach for an agent is that the word sounds like the future.

So the useful question for a leader is rarely "should we use AI here?" It is "how much of this should we actually hand over?" Get that wrong in the ambitious direction and you have bought complexity, cost and risk you did not need. Get it wrong in the timid direction and you leave obvious gains on the table. Either way, the decision deserves more than a vibe.

It helps to know that even the people building these systems argue for restraint. Anthropic, which makes the Claude models, says so plainly in its engineering guidance [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) (December 2024): it recommends "finding the simplest solution possible, and only increasing complexity when needed." For many tasks, the same guidance notes, a single well-set-up model call is enough. That is a vendor telling you to buy less autonomy than you might assume, which is worth listening to.

## Four levels of AI delegation

We find it clearer to think in four levels rather than three product categories. Each hands over a little more, and each should be earned, not assumed.

**Answer.** You ask, the model responds, you decide what to do with it. A one-off question, a draft, a summary, an explanation. You are fully in control and nothing happens in the world without you. This is where most useful AI use actually lives, and it is badly underrated because it is not impressive.

**Assist.** A reusable helper set up for a recurring task: a saved assistant with standing instructions, your house style, your definitions. It still works inside the task, with you driving, but you are no longer starting from scratch each time. A recruitment consultant who has built an assistant that turns rough interview notes into a consistent candidate summary is working at this level. It is a force multiplier with the human firmly in the seat.

**Automate.** Here the work runs without a person triggering each step. Crucially, it still follows a fixed, predefined path. Anthropic draws exactly this line: workflows are "systems where LLMs and tools are orchestrated through predefined code paths." When a CV lands in the inbox, fields are extracted and written to your applicant system; when an invoice arrives, it is categorised and queued. Predictable inputs, predictable route, predictable outputs. The intelligence is in the design, not in the running.

**Act.** Only at this level do you have an agent in the strong sense: a system where, in Anthropic's words, "LLMs dynamically direct their own processes and tool usage," deciding the steps itself and taking actions that land in the real world. It might message a candidate, move money, change a record, or reply to a customer on its own initiative. This is genuinely powerful and genuinely the most demanding to govern, because you are delegating not just the work but the judgement about how to do it.

The mistake we see most often is treating these as a ladder you are supposed to climb, with "Act" as the prize. It is not. The goal is the lowest level that does the job well.

> Act is not the goal. The lowest level that does the job is.

## Five tests before you hand anything over

Whichever level you are considering, run it through five questions. They are deliberately blunt.

**Autonomy.** How much is the system deciding for itself, rather than following a path you set? More autonomy means more capability and more ways to be surprised.

**Access.** What systems and data can it actually touch? A model that can only read is in a different risk category from one that can send, post, pay or delete.

**Reversibility.** If it gets something wrong, can you quietly undo it? Drafting an email is reversible. Sending it to a client is not. The harder something is to take back, the more you should hesitate to automate or hand it to an agent.

**Risk.** What is the cost of a confident error? A clumsy internal summary is an annoyance. A wrong figure in a filing, or an inappropriate message to a candidate, is not.

**Human approval.** Is there a person in the loop before the consequences land, and is their involvement real? This last point has legal weight in the UK. Where a decision is made solely by automated means and has a legal or similarly significant effect on someone, such as a job offer or a loan, [Article 22 of the UK GDPR](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/rights-related-to-automated-decision-making-including-profiling/) imposes extra obligations. The Information Commissioner's Office is explicit that human involvement must be "active rather than tokenistic" to count. A person rubber-stamping a queue is not oversight.

Two illustrative cases show how the same task moves between levels. A property firm using AI to draft listing copy that an agent edits is at Assist, low risk, fully reversible. The same firm letting an agent answer buyer enquiries on its own is at Act, where a wrong commitment about a property is hard to walk back, and a human approval step earns its keep. An accountancy practice automating client reminders is sensible; letting a system act on a filing without sign-off is a different conversation entirely.

## The honest limits

None of this is an argument against agents. They are improving quickly, and there are real workflows, particularly high-volume, low-stakes, easily-reversible ones, where genuine autonomy already pays off. The point is proportionality, which is also how the serious governance frameworks treat it. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) asks you to map a system's context and manage risk in proportion to it, and the [OECD's AI Principles](https://oecd.ai/en/ai-principles) keep accountability and human oversight at the centre. Match the controls to the consequences. A reversible, low-risk task does not need the governance of an irreversible, high-risk one, and pretending otherwise just slows good work down.

The other limit is that these levels are not permanent labels. A task can start at Assist while you learn its failure modes, then move to Automate once the path is genuinely predictable and the errors are understood. Earning your way down the list is exactly the right instinct.

## What to do next

Take your most tempting AI idea and name the level it honestly needs, not the level that sounds best. Run it through the five tests. When two levels seem plausible, default to the lower one and let evidence, not enthusiasm, move you up. Most teams discover that what they were calling an "agent project" is really an assistant or an automation, which is good news: it is cheaper, faster and far easier to trust.

## The tool

To make that call in the room, we have built the **AI Delegation Decision Tree**: a single page that walks a task from "Answer" to "Act" through the five tests, so a leader can decide in minutes whether something needs a prompt, a reusable assistant, a fixed automation or a genuine agent, and what oversight each demands.

[Download the AI Delegation Decision Tree (PDF)](/insights/assets/ai-delegation-decision-tree.pdf)

If you are weighing several of these decisions at once across a team, that is the work of [AI Advisory for Teams](/services/ai-advisory-for-teams): choosing where AI genuinely pays off, what level of automation is safe, and what guardrails the workflow needs. It also pairs naturally with [AI literacy for leaders](/insights/ai-literacy-for-leaders/), since judging the level is itself a literacy skill, and with the lesson behind [why so many AI pilots never scale](/insights/why-your-ai-pilot-didnt-scale/).

## Sources and further reading

- [Anthropic, Building Effective Agents](https://www.anthropic.com/research/building-effective-agents), December 2024. Vendor guidance from a model developer. Source for the workflow-versus-agent distinction and the "simplest solution possible" principle.
- [ICO, Rights related to automated decision-making including profiling](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/rights-related-to-automated-decision-making-including-profiling/). UK regulator. Source for Article 22 obligations and the "active rather than tokenistic" standard for human involvement.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework). Independent US standards body. Source for proportional, context-based risk management.
- [OECD AI Principles](https://oecd.ai/en/ai-principles). Adopted 2019, updated 2024. Source for accountability and human oversight as core commitments.
