---
title: "Every AI agent needs a job description"
description: "An AI agent is a delegated role, not a feature. Give it what you would give a new hire: a remit, limits, a quality bar, an escalation route, and a named human owner."
date: 2026-06-04
type: post
tags: ["ai-agents", "governance", "ai-adoption"]
cover: /insights/ai-agent-job-description/cover.jpg
coverAlt: "Dark teal cover with a node-and-edge motif and the Good Transformer wordmark, marking an article on giving AI agents a job description."
coverQuote: "An agent without an owner is a liability with a login."
featured: false
draft: false
---

When a business brings someone into an operational role, it writes a job description. The remit, the limits of their authority, the standard expected, who they report to, what they escalate. Nobody thinks this is bureaucracy; it is just how you hand real responsibility to someone safely. Then the same business deploys an AI agent to do comparable work, gives it access to live systems and the freedom to act, and writes nothing at all. It simply switches it on.

That asymmetry is where most agent trouble begins. An agent is not a feature you enable. It is a role you delegate, and a role without a definition is a problem waiting for a quiet afternoon.

## Why an agent is a delegated role, not a tool

The distinction matters because of what an agent actually is. Anthropic, which builds the Claude models, draws a careful line in its engineering guidance [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents): a workflow follows a path you defined, while an agent, in Anthropic's framing, is a system where "LLMs dynamically direct their own processes and tool usage." That is the whole point and the whole risk. With an agent, you are not just handing over the task. You are handing over the judgement about how to do it, which is exactly what you delegate to a person in a role, and exactly what a job description exists to bound.

The serious governance frameworks treat it this way too. The NIST [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) asks organisations to manage risk in proportion to a system's autonomy and context, which is impossible if the remit was never written down. The [OECD AI Principles](https://oecd.ai/en/ai-principles) keep accountability with humans, and where an agent acts on people in ways that matter, [Article 22 of the UK GDPR](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/rights-related-to-automated-decision-making-including-profiling/) requires genuine human involvement, not a rubber stamp. All of that needs a named owner and a defined scope. All of that is a job description.

## The agent job card

Here is the shape we use. It fits on a page, and an agent should not go live until every line is filled.

- **Purpose.** The one job this agent exists to do, in a sentence. If it needs a paragraph, the scope is too wide.
- **Tasks.** The specific things it does, listed. Anything not on the list is out of scope by default.
- **Tools and data.** Exactly what systems and information it can reach. Read access and write access are different jobs; be explicit.
- **Permitted actions.** What it may do on its own, with no human in the loop. Keep this list honest and short.
- **Actions requiring approval.** What it may only do once a person has approved it: anything irreversible, costly, or affecting an individual.
- **Quality standard.** What "good" looks like for its output, and how that is checked. An agent with no quality bar simply produces volume.
- **Escalation conditions.** When it must stop and hand to a human: uncertainty, an edge case, anything outside the remit.
- **Logging.** What it records, so that what it did can be reviewed after the fact. An action with no trail cannot be audited.
- **Human owner.** One named person accountable for this agent. Not a team, a person. Ownership that is shared is ownership that is absent.
- **Shutdown procedure.** How to turn it off quickly, and who can. If you cannot say how to stop it, you are not ready to start it.

> An agent without an owner is a liability with a login.

## What this looks like in practice

Take a recruitment agency that wants an agent to triage inbound CVs. Switched on without a job card, it quietly starts emailing candidates, booking interviews and updating the applicant system, and when one of those emails goes wrong, no one can say who was responsible or how to stop it.

Written as a job card, the same agent is a different proposition. Its purpose is to triage and summarise new applications. Its permitted actions are reading CVs and drafting structured summaries. Contacting a candidate sits firmly under actions requiring approval, because it is hard to take back and it affects a person. Its quality standard names what a good summary contains; its escalation condition is anything ambiguous or borderline. It logs every summary it produces, a named consultant owns it, and there is a one-click way to switch it off. Same technology, completely different risk, and the difference is a page of writing. (An illustrative example, not a specific agency.)

## The honest limits

A few cautions. First, a job card does not make a bad idea safe. Some work should not be delegated to an agent at all, not because the document is missing but because the judgement involved cannot be safely separated from a human. The card helps you see that clearly; it does not license you to ignore it.

Second, proportion matters. A trivial, fully reversible agent that drafts internal text does not need the same ceremony as one with access to client systems and the power to act. Match the rigour to the autonomy and the stakes. The point of the job card is not paperwork for its own sake; it is to make the delegation deliberate, so that what an agent can do is a decision someone made, not an accident of what it was able to reach.

A third point follows from both. A job card is not a one-time document. Agents tend to accumulate access and responsibility over time, the way a useful colleague quietly picks up more work, and a remit can drift well past what anyone last agreed to. Re-reading the card on a set rhythm, and re-checking what the agent can actually reach against what it is supposed to do, is how you catch that drift before it becomes an incident rather than after.

## What to do next

Take any agent you already run, or are about to, and try to fill in the ten lines. The gaps you cannot complete are precisely your exposure: an action with no owner, a power with no approval step, a system it can reach that nobody decided it should. Closing those gaps is most of the safety, and it costs an hour and a page.

## The tool

To make that easy, we have built the **AI Agent Job Card**: a fillable, one-page template covering all ten lines, with a completed example for a realistic business workflow so you can see what a well-defined agent looks like before you write your own.

[Download the AI Agent Job Card (PDF)](/insights/assets/ai-agent-job-card.pdf)

Defining agents well is part of the practical governance an [AI Advisory engagement](/services/ai-advisory-for-teams) leaves behind. It follows directly from deciding [how much to hand to AI in the first place](/insights/assistant-automation-or-ai-agent/), and it sits alongside a [workable AI policy](/insights/simple-ai-policy-for-small-business/) as the operational detail underneath it.

## Sources and further reading

- [Anthropic, Building Effective Agents](https://www.anthropic.com/research/building-effective-agents), December 2024. Vendor guidance from a model developer. Source for the workflow-versus-agent distinction and the nature of agent autonomy.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework). Independent US standards body. Source for managing risk in proportion to autonomy and context.
- [OECD AI Principles](https://oecd.ai/en/ai-principles). Adopted 2019, updated 2024. Source for accountability remaining with humans.
- [ICO, Rights related to automated decision-making including profiling](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/rights-related-to-automated-decision-making-including-profiling/). UK regulator. Source for genuine human involvement where an agent affects people.
