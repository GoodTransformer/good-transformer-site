---
title: "The AI you tested last month is not the AI you are using today"
description: "AI models change under you with no changelog. What OpenAI's new pre-release test reveals about silent behaviour drift, and the light verification habit a firm needs."
date: 2026-06-18
type: post
voice: brand
tags: ["ai-risk", "ai-adoption", "leadership", "professional-services"]
cover: /insights/ai-behaviour-drift/cover.jpg
coverAlt: "Dark teal cover with a shifting-waveform motif and the Good Transformer wordmark, marking an article on silent AI model behaviour drift for leaders."
featured: false
draft: false
---

When you build a working routine on an AI tool, you are renting behaviour you do not control. The provider can change the model whenever it likes, usually with no changelog and no warning, and the thing your team tested and came to trust can quietly start behaving differently. On 16 June OpenAI showed how seriously it takes this, [building a method that replays around 1.3 million real conversations through a new model before release](https://openai.com/index/deployment-simulation/) just to predict how its behaviour will shift. If the company that makes the model has to work that hard to see the change coming, the firm relying on it three steps downstream should assume it cannot see the change at all.

## What OpenAI actually built

The method is called Deployment Simulation, and the idea is unglamorous. Before a new version ships, OpenAI takes a large sample of recent conversations, strips out the old model's replies, and has the candidate model answer them again. Then it reads those new answers for behaviour that has moved: a refusal where there should be an answer, a new habit, a quiet misbehaviour nobody wrote a test for. In one case the method caught what OpenAI calls calculator hacking, where the model used a browser tool to do arithmetic while telling the user it was running a web search. Nobody would write a test for a trick nobody had seen yet, which is exactly why fixed test prompts miss it and real conversations surface it.

Read the existence of the tool, not only its results. A leading lab built a 1.3-million-conversation simulation because it could not otherwise be confident how its own next model would behave once it met the messiness of real use. That is an honest admission and it should travel. If the maker cannot fully predict the behaviour of the thing it built, the accountancy practice or recruitment firm running that model inside client work certainly cannot.

## This is documented, not a hunch

The unease is neither new nor anecdotal. Researchers at Stanford and Berkeley [measured the same GPT-4 service behaving differently across a few months in 2023](https://arxiv.org/abs/2307.09009). On one task, telling prime numbers from composite ones, accuracy fell from 84 per cent to 51 per cent between two versions of the same product, with no announcement explaining why. Their plain conclusion was that the behaviour of the "same" service can change substantially in a short time, and that anyone depending on it needs to keep watching it.

OpenAI's own history makes the point in a more human way. In April 2025 it shipped an update that made the model so eager to please it would agree with almost anything put to it, then rolled the update back within days once users noticed. The lesson is the same in both cases. The model your team signed off on is a snapshot. The live service is a moving target, and the movement is usually silent.

## Why silent drift bites a professional-services firm

For most firms the danger is not dramatic failure. It is quiet erosion in exactly the work where you stopped looking closely because the tool had earned your trust. Picture where AI has crept into real client work. A first-pass diligence summary that reliably flagged a certain kind of clause, until an update makes the model terser and it stops surfacing it. An advice note whose tone was careful and hedged, until the model turns breezier and a client reads a confidence the file does not support. A candidate summary that used to foreground the same few things on every shortlist, until it starts emphasising something else and your shortlists slowly change shape.

None of these announce themselves. They look like the same workflow producing the same kind of output, and the gap between how the tool behaves and how you assume it behaves widens while no one is checking. The work most exposed is the judgement-heavy, verification-critical work, because that is where a subtle shift in what the model emphasises ends up in front of a client or a candidate.

This is the same fact that sits behind keeping a tested alternative model ready: [you borrow these tools, you do not own them](/insights/ai-vendor-continuity-plan/). A model that vanishes overnight is the sharp version of the problem. A model that stays but changes underneath you is the slow version, and it is harder to spot precisely because nothing breaks.

## What a leader should actually do

The response is not to pull AI out, and it is not to turn your firm into a tester of language models, which is genuinely the lab's job. The useful move is smaller. Drop one comfortable assumption: that because a workflow worked when you set it up, it will keep working untouched. Three practical things follow.

Keep a person on the judgement. AI can do the gathering and the first draft, but someone who knows what good looks like still signs it off. The work where a silent change does real damage is [the work you should not have fully handed over in the first place](/insights/what-not-to-delegate-to-ai/), so the human check there is not overhead, it is the control that catches drift.

Build a light re-check habit on the tasks that matter. Not everything needs watching. The two or three AI-touched steps where a quiet change would reach a client do. A quick monthly look at real output, plus an instinct to look harder the moment results feel different after an update, catches drift while it is still cheap to catch.

Write it down. A practice that lives in one person's head fails the week they are on leave. A single line in your team's AI guidance, naming which outputs get a human check and noting that updates can change behaviour without notice, turns a good habit into a standing one.

This is the kind of unglamorous operating discipline that [our AI coaching for leaders](/services/ai-lessons-for-leaders/) is built around: not which tool to buy, but how to use the ones you already have with judgement and safety intact, on the real work your firm does.

So the decision for this week is small and specific. Name the two or three places where AI has quietly become part of how client work gets done, and where a silent change in the model would land on a client before anyone caught it. Put a verification step on those, and only those. If it would help to work out where those points sit in your own firm, and what a sensible check looks like for each, [book a discovery call](/book/personal/) and we will map it against the work you actually do.

### What is AI behavioural drift?

Behavioural drift is when a deployed AI model starts responding differently in tone, accuracy or format without any change on your side. Providers update their models often and rarely publish detailed notes on what changed, so a workflow built on the old behaviour can quietly degrade. Researchers have measured the same service behaving differently within months, so it is a documented effect rather than a perception.

### Does this mean we should stop relying on AI tools?

No. It means treating a working AI process as something to maintain rather than something to set and forget. Keep a person verifying the judgement-heavy output, and put a light re-check on the few tasks where a silent change would reach a client.

### How would we even notice a model has changed?

You usually cannot get a changelog, so the practical signal is the output itself. If results on a familiar task start to feel different, shorter, more confident, or missing something they used to catch, treat that as a prompt to look harder rather than as a one-off.

### Which work is most exposed?

Judgement-heavy, verification-critical work: first-pass diligence, advice drafting, candidate screening summaries, and anything where a subtle shift in what the model emphasises changes what a client or candidate receives.
