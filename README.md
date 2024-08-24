# Carbonada-front

Svelte-based frontend for our OpenAI Hackathon project [carbonada](https://github.com/aastroza/carbonada).


## Quick Start

After cloning the project, install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn
```

Then start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Game Design: Carbonada - An Educational Carbon Footprint Game

Inspired by the traditional dish carbonada, we've created an engaging educational game where players add ingredients while managing a carbon footprint budget.

### Gameplay

- Each game sets a carbon footprint limit for the *carbonada* dish.
- Players take turns adding ingredients to the dish. These ingredients can be anything the player can imagine and write down.
- The system calculates the carbon footprint of each ingredient based on our carbon footprint estimation model.
- The goal is to avoid exceeding the carbon footprint limit. The player who adds an ingredient that causes the total carbon footprint to surpass the limit loses the game.

### LLM as a Game Judge

- We implemented an AI agent to supervise the game in real-time.
- This agent detects strategies to "cheat" the system, such as multiplying concepts (e.g., "two apples").
- The agent evaluates the validity and originality of each move, blocking unfair or repetitive ones.
- In case of a block, the system asks the player to propose a new concept, keeping the game challenging and educational.

This creates a dynamic, challenging, and educational experience that makes learning about carbon footprints fun!