# Occasion Letters — Product Spec v2 (Addendum)

**Read alongside:** `occasion-letters-spec.md` (v1). This doc does not repeat v1 — it only specifies the four features that close gaps found when v1 was checked against the original brief. Implement these as additions to the existing data model and components, not a rewrite.

---

## 1. Draft provenance ("what was this drafted from")

**Problem it closes:** the manual process wastes time "hunting for last year's letter." v1 stored history but marked it optional — this makes it required and visible, so provenance is never lost again.

### Behavior
- Every draft, from the moment it's first generated, must record which prior version (if any) it was generated from.
- This is shown in the UI as a small, permanent line at the top of the draft area — not buried in a menu: e.g. `Based on: 2025 approved version — sent Dec 2, 2025`.
- If there is no prior version (first time this occasion is being drafted), show `No prior version on file` instead of hiding the field.
- Clicking that line opens a **read-only diff view** — this year's draft vs. the version it's based on, changes highlighted inline (additions/removals). This reuses the same visual language as a document redline, not a separate page.

### Data model change
```ts
interface Draft {
  content: string;
  lastEditedAt: string;
  lastEditedBy: string;
  history: DraftVersion[];       // now required, not optional — always at least populated on first generation
  basedOnVersionId: string | null;  // null only if genuinely no prior version exists
}

interface DraftVersion {
  id: string;                     // now required — needed so basedOnVersionId can reference it
  content: string;
  savedAt: string;
  label?: string;                 // e.g. "2025 approved version" — shown in the provenance line
}
```

### Component change
- New: `<DraftProvenanceLine />` — sits directly above `<DraftEditor>` inside the existing overlay. Not a new screen.
- New: `<DraftDiffView />` — opens on click, read-only, closes back to the normal draft view.

---

## 2. Dual-audience drafts (Internal + External as separate drafts)

**Problem it closes:** the brief explicitly names doing "the whole cycle twice" for occasions needing both an internal and external version as one of the core pain points. v1's data model had an `audience: "both"` value but no way to actually hold two distinct drafts for it — this fixes that ambiguity.

### Behavior
- An occasion with audience `"both"` is treated as **two parallel draft tracks**, not one draft with a shared audience label. Internal and external versions can have entirely different tone/content, since the brief says internal is warm/inclusive and external is formal/diplomatic — they are not just two recipients of the same text.
- In the overlay, when audience is `"both"`, add a top-level toggle above the existing language tabs: `Internal | External`. Selecting one filters which language tabs are shown underneath (each audience may need different languages — internal is English-only per the brief, external may need multiple).
- Status tracking is **per audience track**, not one shared status for the occasion. An occasion can legitimately be "External: Sent" while "Internal: In review" — the calendar tile should reflect the least-complete track's status (so it doesn't look falsely finished).
- Chat context chip updates to reflect which track is active: `Talking about: UAE National Day — External (Formal)` vs `— Internal (Staff)`, so the agent doesn't accidentally write staff-casual tone into the external draft or vice versa.

### Data model change
```ts
interface Occasion {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  audience: Audience;             // "internal" | "external" | "both"
  status: OccasionStatus;         // derived: least-complete track when audience === "both"
  tracks: {
    internal?: AudienceTrack;     // present only if audience is "internal" or "both"
    external?: AudienceTrack;     // present only if audience is "external" or "both"
  };
  lastUpdated: string;
  reviewer?: string;
}

interface AudienceTrack {
  status: OccasionStatus;
  languages: string[];
  drafts: Record<string, Draft>;  // keyed by language code, same Draft shape as before
}
```
*(This replaces the flat `languages` / `drafts` fields directly on `Occasion` from v1 — audience-scoped tracks are now the source of truth.)*

### Component change
- `<OccasionOverlay>` gains an `<AudienceTrackToggle>` above `<DraftEditor>`, rendered only when `audience === "both"`.
- `<CalendarTile>` status logic updates to compute the "least complete" status across tracks when both exist.

---

## 3. Review and approval routing

**Problem it closes:** the original process has an informal, undocumented review loop ("the draft goes to a colleague for review, comes back with edits, and the loop repeats"). v1 added a generic status control with no concept of *who* is allowed to approve or how a second reviewer gets involved — this makes that explicit.

### Behavior
- Each occasion (or each audience track, for dual-audience occasions) has an assigned **reviewer** — a named person, set in the occasion data, shown in the overlay header.
- Moving status from `In review` → `Sent` is a **restricted action**: only the assigned reviewer (or an admin role) can perform it. The comms team member who drafts can move `Not started → Drafting → In review`, but the final `Sent` transition requires the reviewer's action, not the drafter's.
- When a draft is moved to `In review`, the reviewer is notified (appears in their Notifications tab — reuses the existing notification system from v1, new `type: "review_requested"`).
- The reviewer, opening the same overlay, sees the same draft with the same chat — but their action buttons differ: `Approve & mark Sent` or `Send back with comments`.
- "Send back with comments" reopens the track's status to `Drafting`, and posts the reviewer's comment as a message in the existing `OccasionChat` thread (not a separate comments system) — so the drafter sees exactly what needs to change, in context, in the same place they already work.

### Data model change
```ts
interface AudienceTrack {
  status: OccasionStatus;
  languages: string[];
  drafts: Record<string, Draft>;
  reviewerId: string;              // who can approve this specific track
  reviewHistory: ReviewAction[];   // audit trail of approvals / send-backs
}

interface ReviewAction {
  id: string;
  action: "approved" | "sent_back";
  byUserId: string;
  comment?: string;
  timestamp: string;
}

// AppNotification.type gains a new value:
// "draft_ready" | "due_soon" | "sent_confirmation" | "review_requested"
```

### Component change
- `<StatusControl>` (from v1) becomes role-aware: renders different buttons depending on whether the current user is the drafter or the assigned reviewer for the active track.
- `ReviewAction` entries with a comment render as chat messages in `<ChatHistory>`, tagged distinctly (e.g. a small "Review comment" label) so they're not confused with normal agent conversation.

---

## 4. Export as a formatted file (independent of sharing)

**Problem it closes:** v1 only specified "share via email" through chat. Some letters need to exist as a properly formatted, letterhead-ready file regardless of whether or how they're emailed — this adds that as its own action.

### Behavior
- A visible **Export** action in the overlay header (next to the status control), available at any status — not gated behind "Sent." A drafter may want to export a near-final version to walk into a meeting with, for instance.
- Exporting produces a formatted document (Word or PDF) using a fixed letterhead/template — not a raw text dump of the draft field. If audience is `"both"`, exporting produces separate files per track, never a combined one (internal and external content should never live in the same file).
- Export is a distinct action from "Share via email" (already specced in chat, v1) — exporting produces a downloadable file locally; sharing sends it. Both should be available, and using one doesn't require using the other.

### Component change
- New: `<ExportButton>` in the overlay header.
- New (or reused, if your builder already has one): a template-based document generator that takes `Draft.content` + occasion metadata (name, date, audience, language) and produces the formatted file. This can be stubbed/mocked in this phase per v1 Section 10 — the button and the file-naming/track-splitting logic are the part that needs to be real; actual document generation can be a placeholder.

---

## Summary of what to build

| # | Feature | Touches |
|---|---|---|
| 1 | Draft provenance + diff view | `Draft`, `DraftVersion`, new `<DraftProvenanceLine>`, `<DraftDiffView>` |
| 2 | Dual-audience parallel tracks | `Occasion`, new `AudienceTrack`, new `<AudienceTrackToggle>`, `<CalendarTile>` status logic |
| 3 | Reviewer-gated approval | `AudienceTrack`, new `ReviewAction`, role-aware `<StatusControl>`, chat-embedded review comments |
| 4 | Export as formatted file | New `<ExportButton>`, template-based generator (stub OK) |