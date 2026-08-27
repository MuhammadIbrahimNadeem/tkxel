---
name: master-ui-audit
description: >-
  Master UI & UX Design Audit orchestrator. Subdirects and executes comprehensive design reviews across
  Interface Structure (better-interface.md), UX Writing & Copy (figma-ux-writing-style.md),
  Spacing & Grid (spacing-audit.md), and Typography & Typesetting (typeset.md). Consolidates findings
  into a single prioritized, evidence-based audit verdict.
metadata:
  argument-hint: "[target screen, flow, component, or repository]"
---

# Master UI & UX Design Audit System

This skill serves as the **Parent Master Audit Skill** for interface and user experience design. It subdirects to and orchestrates four domain-specific audit skills:

1. **Interface & Structural Review**: [better-interface.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/better-interface.md)
2. **UX Writing & Copy Style Guide**: [figma-ux-writing-style.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/figma-ux-writing-style.md)
3. **Spacing & Grid Audit**: [spacing-audit.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/spacing-audit.md)
4. **Typography & Typesetting**: [typeset.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/typeset.md)

---

## 1. Audit Principles & Governance

### Evidence Over Taste
- Audit findings must be backed by empirical evidence (code references `path/to/file:line` or exact Figma layer/node identifiers and rendered measurements).
- Pure design preference or subjective style opinions are excluded unless they violate explicit guidelines defined in the sub-skills.

### Subdirector Architecture
Orchestration is owned by this master skill. Specialized domain rules are strictly delegated to their sub-skills:
- **Structure, Accessibility, Colors, & Motion**: Delegated to [better-interface.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/better-interface.md)
- **UX Writing, Copywriting & Text Mechanics**: Delegated to [figma-ux-writing-style.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/figma-ux-writing-style.md)
- **Grid Adherence, Margins, Padding & Spacing Consistency**: Delegated to [spacing-audit.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/spacing-audit.md)
- **Font Choice, Type Scale, Hierarchy, Line-height & Readability**: Delegated to [typeset.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/typeset.md)

---

## 2. Standardized Audit Execution Protocol

Whenever this audit runs, it **MUST** follow this exact 5-step industrial pipeline:

```
┌────────────────────────────────────────────────────────┐
│ Step 1: Scope Resolution & System Reconnaissance       │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ Step 2: Parallel Domain Audit Subdirection            │
│   ├── Sub-Audit A: Spacing & Grid Adherence            │
│   ├── Sub-Audit B: Typography & Typesetting            │
│   ├── Sub-Audit C: UX Copy & Microcopy Mechanics       │
│   └── Sub-Audit D: Interface Structure & Accessibility │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ Step 3: Escalation Filtering & Severity Ranking        │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ Step 4: Remediation Plan (Cheapest Fix Hierarchy)     │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ Step 5: Consolidated Industrial Audit Report Output    │
└────────────────────────────────────────────────────────┘
```

---

### Step 1: Scope Resolution & Reconnaissance

1. **Resolve Scope**: Identify target component, screen, full flow, or code workspace.
   - Include all states: Empty, Loading, Error, Success, and Narrow Viewport / Mobile (320px).
   - If scope exceeds credible manual inspection, narrow to the primary critical user path and explicitly document excluded surfaces.
2. **Reconnaissance**: Read design system tokens, `CONTRIBUTING.md`, `CLAUDE.md`, `AGENTS.md`, CSS/Tailwind configs, or Figma styles.
   - Identify existing font families, spacing scales (e.g. 8px grid tokens), and color variables.
   - Write all fixes in the host project's native idiom.

---

### Step 2: Domain Audit Subdirection Checklist

Execute the following 4 domain audits sequentially or in parallel:

#### Domain A: Spacing & Grid Audit ([spacing-audit.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/spacing-audit.md))
- [ ] **8px Grid Adherence**: Verify all `margin`, `padding`, `gap`, `width`, and `height` values align strictly to an 8px (or 4px sub-grid) step.
- [ ] **Sibling Uniformity**: Check sibling containers (cards, list items, flex columns) for consistent gaps.
- [ ] **Spacing Scale Cap**: Flag interfaces utilizing too many arbitrary spacing steps (e.g., mixing 7px, 11px, 13px, 19px).
- [ ] **Container Padding Symmetry**: Ensure horizontal and vertical padding inside cards/containers maintain structural balance and clear parent-child relationships.

#### Domain B: Typography & Typesetting Audit ([typeset.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/typeset.md))
- [ ] **Font Selection**: Flag invisible default typefaces (Inter, Arial, Roboto, system sans) when brand personality is required; enforce max 2–3 font families.
- [ ] **Type Scale & Hierarchy**: Verify distinct visual jumps between display, heading, body, and captions (avoid 14px vs 15px vs 16px muddy hierarchy). Ensure body text is $\ge 16\text{px}$ / $1\text{rem}$.
- [ ] **Weight Contrast**: Ensure clear weight contrast (e.g., Bold/Semibold vs Regular; avoid Medium vs Regular).
- [ ] **Readability & Line Length**: Ensure line length is constrained to **45–75 characters** (`max-width: 65ch`). Verify line-height ($1.1\text{–}1.2$ for headings, $1.5\text{–}1.7$ for body).
- [ ] **Numeric & Baseline Alignment**: Verify numeric tabular data uses `tabular-nums` and right alignment. Ensure inline mixed-size text aligns to baseline.
- [ ] **Implementation Units**: Confirm `rem` units (or fluid `clamp()` for marketing headings) are used instead of hardcoded `em` in nested UI.

#### Domain C: UX Writing & Copy Audit ([figma-ux-writing-style.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/figma-ux-writing-style.md))
- [ ] **Voice & Tone**: Verify active voice over passive voice (flag sentences using "by [agent]"). Ensure approachability via standard contractions.
- [ ] **Typography Mechanics**: Enforce smart/curly quotes (“ ”) and apostrophes (’), never straight (' "). No ampersands (&) unless in proper nouns/acronyms.
- [ ] **Capitalization**: Enforce sentence-case across headings, labels, buttons, and sublabels. Capitalize after colons only if starting a complete sentence or proper noun.
- [ ] **Dates, Time & Numbers**: Enforce cardinal numbers (Aug 16, not Aug 16th), 3-letter month abbreviations (Jan, Feb), AM/PM without periods, relative time ("2 hours ago") for UI activity, and Oxford commas in lists.
- [ ] **UI Element Microcopy**:
  - *Loading states*: Present tense ("Updating library"), succinct, no ellipses, no "cute" copy.
  - *Placeholders*: No critical instructions inside inputs; use header labels like `Description (Optional)`.
  - *CTAs & Verbs*: Use "Select" for choosing tools, "Click/Double-click" for desktop, "Tap" for mobile, "Press" for keyboard keys.
  - *Punctuation*: No end punctuation on headers or single-sentence list items. Use comma splices over heavy em-dashes in compact toasts/banners.

#### Domain D: Interface Structure & Accessibility Audit ([better-interface.md](file:///Users/ibrahimnadeem/Documents/code/UI-Generator/better-interface.md))
- [ ] **Accessible Control Names**: Check that every interactive element (icon buttons, form inputs) has an accessible name.
- [ ] **Keyboard & Focus State**: Verify every interactive element is keyboard reachable and displays a distinct visible focus indicator.
- [ ] **Contrast Ratios**: Verify body text, controls, and icons meet WCAG AA contrast against their backgrounds.
- [ ] **Color & State**: Ensure state or meaning is not conveyed by color alone (pair with icons, text, or shapes).
- [ ] **Responsiveness & Truncation**: Test layout at 320px width / 200% zoom. Ensure no clipped text without expansion pathways.
- [ ] **Destructive Action Safety**: Confirm destructive actions feature clear confirmation, undo mechanisms, or distinct warning styling.
- [ ] **Motion Sensitivity**: Ensure animations respect `prefers-reduced-motion`.

---

## 3. Severity Classification & Escalation Triggers

Findings must be classified into a single unified severity scale.

### Escalation Triggers (Sight `HIGH` Severity)
If any of these 13 escalation triggers fire, mark as `HIGH` severity immediately:
1. Interactive control missing accessible name.
2. Keyboard-reachable control missing visible focus indicator.
3. Pointer-reachable control not reachable by keyboard.
4. Motion or auto-play ignoring `prefers-reduced-motion`.
5. Content/control clipped or unreachable at 320px width / 200% zoom.
6. Text contrast ratio failing WCAG AA requirements.
7. Meaning or state conveyed by color alone.
8. Destructive action lacking confirmation/undo/warning treatment.
9. Truncated content with no pathway to read full text.
10. Unreachable content behind hidden scroll/disclosure without visual cue.
11. Error message presenting no recovery path.
12. Semantic color used inverse to meaning (e.g. red on positive action).
13. State change conveyed by temporary motion alone with no persistent visual indicator.

### General Severity Scale
- `HIGH`: Blocks task completion, misleads user, hides controls, hazards data loss, or triggers any Escalation Trigger.
- `MEDIUM`: Meaningfully degrades grid adherence, typesetting readability, copy clarity, or component consistency.
- `LOW`: Isolated micro-polish (e.g. minor token mismatch, non-blocking copy suggestion).

---

## 4. Remediation Strategy (Cheapest Fix Hierarchy)

When prescribing remedies, always select the lowest-cost solution:

1. **Delete**: Remove redundant elements, unnecessary dividers, excessive borders, or unused ARIA attributes.
2. **Use Platform Native**: Replace custom interactive re-implementations with native HTML tags (`<button>`, `<details>`, `<select>`).
3. **Reuse Existing Tokens**: Apply established design system variables (spacing scale steps, typography tokens, color variables).
4. **Correct Value**: Adjust line-height, padding step, contrast ratio, or punctuation directly.
5. **Add New Structure**: Add new tokens, wrappers, or media queries only when steps 1–4 are insufficient.

---

## 5. Consolidated Audit Output Format

The final audit output must strictly adhere to the following industrial report format:

```markdown
# Master UI & UX Design Audit Report

## 1. Executive Summary & Verdict

- **Audit Scope**: [e.g., Checkout Flow / Dashboard Component]
- **Evaluated Surfaces**: [Primary View, Mobile Viewport (320px), Empty State, Error State]
- **Audit Verdict**: [ APPROVED | APPROVED WITH CONDITIONS | REJECTED ]
- **Total Findings**: [Count] (Cap: 15 max) | **HIGH**: [X] | **MEDIUM**: [Y] | **LOW**: [Z]

---

## 2. Domain Coverage Matrix

| Audit Domain | Sub-Skill Source | Status | Key Coverage Focus |
| :--- | :--- | :--- | :--- |
| **Interface & Structure** | `better-interface` | [Reviewed / Not Reviewed] | Focus, contrast, responsiveness, states |
| **Spacing & Grid** | `spacing-audit` | [Reviewed / Not Reviewed] | 8px grid, gap consistency, container padding |
| **Typography & Typesetting** | `typeset` | [Reviewed / Not Reviewed] | Font scale, line-height, line length, weight |
| **UX Writing & Copy** | `figma-ux-writing-style` | [Reviewed / Not Reviewed] | Sentence case, mechanics, CTAs, dates, loading |

---

## 3. Escalation Triggers Check

> [!IMPORTANT]
> - Escalation Triggers Fired: [None / List Triggers]

---

## 4. Prioritized Audit Findings

| ID | Domain | Severity | Location (`file:line` or Node) | Current Implementation | Finding & Impact | Recommended Fix (Cheapest Fix Hierarchy) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **F-01** | Spacing | HIGH | `src/components/Card.tsx:42` | `padding: 13px;` | Off-grid spacing breaking 8px rhythm. | Correct value to `var(--spacing-16)` ($16\text{px}$). |
| **F-02** | UX Copy | MEDIUM | `src/components/Modal.tsx:18` | `"A new set was created by designer"` | Passive voice used in system notification. | Rephrase to active voice: `"Designer created a new set"`. |
| **F-03** | Typeset | MEDIUM | `src/styles/typography.css:12` | `font-size: 14px; line-height: 1.1;` | Body line-height too tight ($1.1$); causes text overlap. | Increase line-height to $1.5$ ($1.5\text{rem}$). |

---

## 5. Remediation Plan & Code Fixes

### [Finding ID / Group Name]
```diff
- // Current code snippet
+ // Fixed code snippet using host design tokens
```

---

## 6. Verification Checklist

- [ ] All `HIGH` severity findings resolved.
- [ ] Rendered interface re-inspected at 320px width & 200% zoom.
- [ ] Keyboard navigation and focus ring visibility verified.
- [ ] Microcopy verified for sentence-case and smart quotes.
```
