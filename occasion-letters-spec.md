# Occasion Letters — Product Spec (v1)

**Audience for this doc:** an AI coding assistant scaffolding a React app.
**Platform:** desktop web only. No mobile/responsive requirement in v1.
**Users:** Comms team member (primary, non-technical). Config owner is out of scope for this front end — assume occasion data already exists.

---

## 1. Product summary

A single-screen app where the comms team sees every occasion (national days, cultural observances, etc.) on a calendar, and can open, edit, and send the AI-drafted letter for any occasion without leaving the calendar. A per-occasion chat lets them ask the agent to revise the draft, translate it, or share it — the agent's memory is scoped to whichever occasion is currently selected.

Three structural zones, always visible together:

1. **Left sidebar** — primary navigation.
2. **Center panel** — the calendar. This is the main surface; the app opens here by default.
3. **Right overlay** — a slide-in panel, opened by selecting a calendar tile. Shows draft + chat. Never navigates away from the calendar or covers the full screen.

---

## 2. Layout

```
┌────────┬──────────────────────────────────────┬───────────────────┐
│        │                                      │   (only when an   │
│ Side-  │            Calendar                  │   occasion tile   │
│ bar    │        (center, always visible)      │   is selected)    │
│        │                                      │  Right Overlay    │
│        │                                      │                   │
└────────┴──────────────────────────────────────┴───────────────────┘
```

- Sidebar: fixed width (~72–220px, collapsible), always visible.
- Calendar: fills remaining space. Never resizes or shifts when the overlay opens — the overlay slides in **on top**, partial width (~380–440px), calendar stays visible/dimmed underneath.
- Overlay: dismissible via close button, click-outside, or `Esc`. Closing it never triggers navigation — user is always still looking at the calendar underneath.

---

## 3. Left sidebar

Minimal. Two items only for v1:

- **Calendar** (default/home view)
- **Notifications** — badge with unread count

No settings, no config/admin screens, no search in v1 (flag these as future if the builder asks).

---

## 4. Center: Calendar

- Month grid view (a "big calendar chart" per the brief — think a standard month grid, not a list).
- Most days are empty — occasions are sparse (~20/year). Only days with an occasion show a tile; empty days are visually quiet.
- Each occasion tile shows:
  - Occasion name (short label, e.g. "UAE National Day")
  - A status indicator — color-coded, **muted** palette (no bright/saturated colors):
    - `Not started` — muted grey
    - `Drafting` — muted amber
    - `In review` — muted blue
    - `Sent` — muted green
  - If the occasion spans a date range, the tile spans across those days.
- **Hover** on a tile → lightweight tooltip/preview (name, date, status, audience). No overlay yet.
- **Click** on a tile → opens the Right Overlay for that occasion.
- Today's date is marked distinctly (thin outline or dot, not a bright color).

---

## 5. Right overlay (per-occasion panel)

Opens on tile click. Two stacked sections:

### 5a. Top section — occasion details + draft (manual review area)

- Header: occasion name, date(s), audience tag(s) (Internal / External / Both), language tags, status.
- Status control: lets the user move status forward (e.g. Drafting → In review → Sent). This is a manual action, not automatic.
- Draft area:
  - Shows the current AI-generated draft.
  - If multiple languages are required, show language tabs (e.g. EN / AR) — one draft per tab.
  - Draft text is directly editable inline (this is the "manual thing to review" from the brief).
  - Shows last-edited timestamp and who edited it.

### 5b. Bottom section — chat (the agent)

- A **context chip** pinned above the chat input, always showing which occasion is active, e.g.:
  `Talking about: UAE National Day — Dec 2`
  This chip is what scopes the agent's memory — the agent only knows about this occasion's history, not other occasions or general chat.
- Chat history for this occasion only (persists across sessions — reopening this occasion's overlay later shows the same thread).
- Input box at the very bottom. Example things the user can type and what happens:
  - "Make paragraph 2 warmer" → agent edits the draft above, draft area updates live.
  - "Now give me the Arabic version" → agent adds/updates the Arabic tab.
  - "Share this with sarah@company.com" → agent asks for confirmation, then sends; no separate email client opens. If no email is given but the user says "share this," agent prompts for an email address inline in chat.
- Chat and draft are two panes of the *same* overlay — editing via chat and editing inline in the draft area both update the same underlying draft object.

---

## 6. Notifications (separate view, not the overlay)

- Reached via the sidebar, not shown inside the calendar overlay.
- A simple list, most recent first:
  - "Draft ready for review: [Occasion]"
  - "[Occasion] is due in 3 days — not yet started"
  - "[Occasion] was sent successfully"
- Clicking a notification opens the Right Overlay for that occasion (same component as clicking a calendar tile — reuse it, don't build a second draft view).

---

## 7. Data model (draft — adjust as needed when building)

```ts
type OccasionStatus = "not_started" | "drafting" | "in_review" | "sent";
type Audience = "internal" | "external" | "both";

interface Occasion {
  id: string;
  name: string;
  startDate: string;      // ISO date
  endDate?: string;       // present only if it spans a range
  audience: Audience;
  languages: string[];    // e.g. ["en", "ar"]
  status: OccasionStatus;
  drafts: Record<string, Draft>;  // keyed by language code
  lastUpdated: string;
  reviewer?: string;
}

interface Draft {
  content: string;
  lastEditedAt: string;
  lastEditedBy: string;
  history: DraftVersion[];  // for undo / "what changed" — optional in v1
}

interface DraftVersion {
  content: string;
  savedAt: string;
}

interface ChatMessage {
  id: string;
  occasionId: string;      // scopes memory to one occasion
  role: "user" | "agent";
  content: string;
  timestamp: string;
}

interface AppNotification {
  id: string;
  occasionId: string;
  type: "draft_ready" | "due_soon" | "sent_confirmation";
  message: string;
  timestamp: string;
  read: boolean;
}
```

---

## 8. Component tree (suggested starting structure)

```
<App>
 ├── <Sidebar />
 ├── <CalendarView>
 │     ├── <CalendarGrid>
 │     │     └── <CalendarTile />  (one per occasion, positioned by date)
 │     └── <TileHoverPreview />
 ├── <OccasionOverlay>              (renders only when an occasion is selected)
 │     ├── <OccasionHeader />
 │     ├── <StatusControl />
 │     ├── <DraftEditor />          (with language tabs)
 │     └── <OccasionChat>
 │           ├── <ContextChip />
 │           ├── <ChatHistory />
 │           └── <ChatInput />
 └── <NotificationsView>
       └── <NotificationItem />     (opens <OccasionOverlay> on click, same component)
```

State notes for the builder:
- `selectedOccasionId: string | null` at the `App` level controls whether `OccasionOverlay` renders — set by clicking a tile *or* a notification.
- Chat messages, draft content, and status all live on the `Occasion` object so the overlay always reflects one source of truth regardless of whether it was opened from the calendar or from notifications.

---

## 9. Visual direction (loose — not fixed)

- Muted, low-saturation palette throughout. Status colors should read as calm/informational, not alarming — this is an internal operations tool, not a dashboard of errors.
- Calendar should feel closer to a real desk calendar than a data table — generous whitespace on empty days, tiles are the only "loud" element (and even those stay muted).
- No fixed color values dictated here — builder/designer has freedom as long as the palette stays muted and status colors stay distinguishable at a glance.

---

## 10. Explicitly out of scope for v1

- Config owner's view (managing the occasion list itself) — assume seed data exists.
- Mobile/responsive layout.
- Real email sending — "share via email" can be stubbed/mocked.
- Real automation (auto-archive, auto-schedule next year) — visual-only for this phase, per earlier prototype.
- Multi-user presence/collaboration (two people editing the same draft at once).

---

## 11. Open questions to confirm before/while building

- Should the overlay be a true modal (dims + traps focus) or a non-blocking slide-in (calendar still interactive underneath)? Spec assumes non-blocking slide-in based on "without going over any other display."
- How many languages can realistically appear as tabs before it needs a dropdown instead of tabs?
- Does "share with an email" need any access control, or is it open to any address the user types?
