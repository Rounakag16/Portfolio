*Draft starter post — replace this note and personalize the details below before publishing.*

FriendFi started as a simple question during a 24-hour hackathon: what if conflict resolution between people online didn't have to feel like reporting a comment into a void? We wanted something closer to mediation than moderation.

## The idea

The core concept was an anti-bullying DAO platform, where disputes between users are worked through with the help of real-time, multi-AI mediation rather than a one-sided report button. On top of that sits a karma system — matchmaking, token staking, and DAO-style voting — so the community itself has a stake in how conflicts get resolved.

## What I actually built

My focus was the backend: a Node.js, Express, and MongoDB service that could keep up with a live product built in a day. I integrated Socket.io so mediation sessions update in real time instead of relying on page refreshes, which mattered a lot once we started testing multi-party conversations.

On the product side, I worked on the core game mechanics — karma matchmaking, token staking, and the DAO voting logic — and contributed to the Figma UI/UX for the MVP alongside the rest of the team.

## What a 24-hour sprint actually teaches you

A few things stuck with me more than the code itself:

- **Scope is a design decision, not a compromise.** Cutting features fast, without cutting the *idea*, is its own skill.
- **Real-time systems fail differently than request/response ones.** Socket.io made the demo feel alive, but it also meant thinking about state and reconnects far earlier than I would have on a normal timeline.
- **Cross-functional pressure makes you a better collaborator.** Ideating, architecting, and shipping in an agile team, all in the same day, forces a kind of communication shorthand you don't build any other way.

## What's next

FriendFi is still a hackathon MVP, not a finished product — but the mediation-first framing is something I'd like to keep exploring. If you want to see the code, it's on [GitHub](https://github.com/Pratyaksh-Saxena018/ff).
