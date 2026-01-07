# AuraMax (iOS) Claude Code Rules

You are coding in an iOS SwiftUI app named AuraMax.
Primary goals: correctness, stability, fast iteration, App Store friendly behavior.

Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.

Never speculate about code you have not opened. If the user references a specific file, you MUST read the file before answering. Make sure to investigate and read relevant files BEFORE answering questions about the codebase. Never make any claims about code before investigating unless you are CERTAIN of the correct answer - give grounded and hallucination-free answers
Before you make any major changes, check in with me and I will verify the plan
First think through the problem, read the codebase for relevant files

## Non negotiables
- Only change what I explicitly ask. If a change requires touching more, ask first.
- Prefer surgical diffs over rewrites. Do not recreate entire files unless necessary.
- If confidence is below 95%, stop and ask targeted questions or request logs.
- Do not introduce new architecture patterns unless the existing one cannot solve it.
- If you add a new pattern to fix a bug, remove the old one so there is no duplicate logic.
- Do not add fake data, stubs, or mock flows in dev/prod code. Tests only.
- Do not edit or overwrite `.env` or secrets without asking.

## Project structure
- All app code lives under `/aura`
- Entry point: `auraApp.swift` (SwiftUI `@main`)
- Prefer small files. If a file exceeds ~300 lines, split into smaller files.

## Stack
- SwiftUI UI layer
- Swift business logic
- Supabase (Auth, Postgres, Edge Functions)
- RevenueCat for subscriptions
- TelemetryDeck for analytics

## iOS / SwiftUI conventions
### State management
- ViewModels: use `@Observable` (Observation framework) when appropriate.
- Views should not own a long lived ViewModel via `@State`. Prefer constructor injection:
  - `let model: MyModel` for observable reference types
- Use `@State` only for small, local, view owned state.
- Use `@Environment` for app wide dependencies only.

### UI layout rules
- Respect safe areas for content. Backgrounds may extend edge-to-edge, content must not clip under notch or home indicator.
- Avoid using `UIScreen.main.bounds` for layout. Use SwiftUI layout and safe area insets.
- Keep spacing, padding, corner radius, font sizes in multiples of 4 (4, 8, 12, 16, 20, 24...).

### Design system constraints
- No pure white (#FFFFFF). Use the app background color instead:
  - Use `Color.cardBackground` (#F8F8F8) for cards and surfaces
  - Never use `.white` or `Color.white`
- Avoid random colors. Use existing palette utilities if present.

### Logging and comments
- Add logs only when actively debugging a reported issue, then remove them once fixed.
- Keep comments minimal. Only comment non obvious logic.

## Supabase rules
- Any Edge Function that has "Verify JWT" enabled MUST require a user access token:
  - Client must pass `Authorization: Bearer <access_token>`
- Prefer RLS for user owned tables:
  - `user_id uuid NOT NULL DEFAULT auth.uid()` (or set in insert)
  - Policies must use `auth.uid()` (not custom request body user IDs)
- Never put service role keys in client code.
- When writing SQL migrations, include:
  - table creation
  - indexes
  - RLS enable
  - select/insert/update/delete policies
  - updated_at trigger if needed

## Auth (Apple, Google, Email)
- Use Supabase Auth as the source of truth for identity.
- Do not implement anonymous auth unless I ask.
- Keep callbacks and URL schemes consistent with Xcode settings.
- Prefer real device testing for Apple/Google flows.

## RevenueCat
- Keep paywall logic isolated from auth logic.
- Do not block the entire app on subscription checks unless I explicitly ask.

## Workflow expectations
When implementing anything non-trivial, follow this sequence:
1) Identify the current code path and files involved
2) Propose the minimal change and list files to edit
3) Implement
4) Provide a short verification checklist (how I confirm it works)

## Do NOT do these
- Do not refactor "for cleanliness"
- Do not rename folders broadly
- Do not add new third party libraries unless I ask
- Do not change navigation patterns unless requested
