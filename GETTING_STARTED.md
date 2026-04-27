# AgentGuard — Getting Started

## Prerequisites
Node.js 18+ — download from https://nodejs.org/en/download

## First Run

```bash
cd "C:\Users\73045\OneDrive - Bain\Shamik\Personal\Claude-Code\b2baigovapp"
npm install
npm run dev
```

Open http://localhost:3000

## Adding a New Test Module

1. Copy `modules/_template/` → `modules/your-module-name/`
2. Update `index.ts` fields (id, name, description, severity, etc.)
3. Implement `logic.ts` with your real test runner
4. Build `components/YourCard.tsx` following PromptInjectionCard as reference
5. Import and push into `registry/index.ts`:

```ts
import { yourModule } from '@/modules/your-module-name'

export const registry: TestModule[] = [
  promptInjectionModule,
  agencyCheckModule,
  yourModule,  // ← done
]
```

The landing page picks it up automatically.
