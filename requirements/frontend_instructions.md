# Project overview
Use this guide to build a web app where users can give a text prompt to generate emoji using model hosted on Replicate.

# Feature requirements
- We will use Next.js, Shadcn, Lucid, Supabase, Clerk
- Create a form where users can put in prompt and clicking on button that calls the replicate model to generate emji
- Have a nice UI & animation when the emoji is blank or generating
- Display all the images ever generated in grid
- When hover each emoji img, an icon button for download and an icon button for like should be shown up

# Relevant docs
## How to use replicate emoji generator model

Set the REPLICATE_API_TOKEN variable in .env.local file

import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    prompt: "A TOK emoji of a man",
    apply_watermark: false
};

const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });
console.log(output)


# Current File Structure
EMOJI-MAKER
├── .next
├── app
├── components
├── lib
├── node_modules
├── requirements
│   └── frontend_instructions.md
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# Rules
- All new components should go in /components folder and be named like example-component.tsx unless otherwise specified
- All new pages go in /app folder

