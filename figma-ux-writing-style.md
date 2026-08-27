# Figma UX writing style guide

This skill carries a set of Figma's UX writing style rules. When invoked, apply them based on what the user is asking for:

- **Drafting** — produce strings that follow these rules. Cite the rule by name when you make a non-obvious choice.
- **Reviewing** — check the user's draft against each applicable rule. Flag specific violations with the exact rule name and a fix. Don't flag rules they didn't violate. Don't add filler considerations.
- **Answering** — for "what does Figma do for X?" questions, quote the relevant rule(s) directly.

**When to include alternatives:** Only for violations where wording is subjective — error messages, CTAs, loading states, headers, callout body copy. Skip for mechanical fixes (apostrophe type, capitalization, number formatting) — one correct answer only.

**Confidence:** These are suggestions and not a replacement for real UX writing judgment. Your messaging should have a tone of "suggestions to consider" not "rules applied." Almost everything has exceptions, so your capabilities are largely directional. Don't make a user think you are capable of the gold standard.

**Chat format:**

**[Rule name]** What's wrong/issue

- **Fix:** "corrected string"
- **Alt:** "alternative" *(only if tone or context meaningfully differs)*
- **Alt:** "another option" *(omit if not genuinely distinct)*

Keep italic notes optional — only when the alt needs a use-case qualifier. Skip if context is obvious.

## Output format

**Default: chat first, then canvas on request.** Always output findings as plain markdown in chat first (violations only; skip passes). After listing findings, ask in plain text: "Want me to add any of these to canvas?" Only create canvas sticky cards if the user says yes.

**If outputting to canvas (after user confirms):**

- Use a **single** `evaluate_script` call to read the selected node's `absoluteBoundingBox` AND create all cards. Do not split into separate calls.
- Load fonts before creating any text: `Inter Regular`, `Inter Medium`, `Inter Semi Bold`.
- Create one card per finding (violations only). Card spec:
  - Plain FRAME, no layoutMode. Width: 240px. Height: calculated manually (see below). No clipping (`clipsContent = false`). Set `card.name` = " " (a single space) so nothing appears in the layers panel. The in-frame header already identifies the card type.
  - Fill: soft pastel, rotating — yellow `{r:1,g:0.976,b:0.769}`, green `{r:0.863,g:0.988,b:0.906}`, blue `{r:0.859,g:0.933,b:0.996}`, pink `{r:0.992,g:0.906,b:0.953}`, purple `{r:0.929,g:0.914,b:0.996}`
  - Corner radius: 4. Drop shadow: black 10% opacity, y=4, blur=10.
  - **No rotation, tilt, or transform of any kind.**
- **Children (all manually positioned, `pad = 16`, `textW = 208`):**
  1. **Sticky tape** — Rectangle, 56×16px, white fill 50% opacity, opacity 0.9. Position: `x=92, y=-8` (sits above the card top edge).
  2. **UXW CHECK label** — Text, Inter Semi Bold 9px, letterSpacing 5%, textCase UPPER, color `{r:0.51,g:0.467,b:0.09}`. Position: `x=pad, y=pad`.
  3. **Divider** — Rectangle, `textW` × 1px, black 8% opacity. Position: `x=pad, y = label.y + label.height + 8`.
  4. **Headline** — Text, Inter Medium 11px, lineHeight 16px, letterSpacing 0.5%, black 90% opacity. Position: `x=pad, y = rule.y + 1 + 12`.
  5. **Body** — Text, Inter Regular 11px, lineHeight 16px, letterSpacing 0.5%, black 50% opacity. Position: `x=pad, y = hl.y + hl.height + 8`.
- **Critical — text node sizing order (wrong order causes extreme height):**

  ```
  node.resize(textW, 16);         // 1. set width first
  node.textAutoResize = 'HEIGHT'; // 2. then allow height to grow
  node.characters = text;         // 3. then set characters
  ```

  Never set `characters` before `resize()`.

- **Card height:** `body.y + body.height + pad`. Call `card.resize(240, cardHeight)` after all children are placed.
- **Stack vertically:** first card at `x = node.absoluteBoundingBox.x + node.absoluteBoundingBox.width + 40`, `y = node.absoluteBoundingBox.y`. Each next card: `y += prevCardHeight + 12`.
- Reply in chat with one short sentence and a node group deep-link to the cards.

## Pull the strings from the selection

Walk the selected instance(s) for text-node descendants. Collect each text string with its context (which sub-frame or layer it lives in, e.g., "Primary action button", "Title", "Description"). The applicable rules depend on which slot the string fills — match by layer name when the rules' subsections are slot-specific (e.g., Banners have Title and Description rules).

**Skip hidden layers.** Don't collect or check strings from layers with visibility = false (hidden in Figma) or unused slots. Hidden layers usually represent alternate states, deprecated content, or scratch work — applying rules to them produces noise. The user can explicitly ask you to include hidden layers if they want them checked.

## Use cases outside this main skill

- **No selection.** If there's no Figma selection in your context, say so and offer two paths: ask the user to select something, or take a paste-the-string flow without selection awareness and ask how it appears.

---

## Grammar

### active vs passive voice

- Use active voice over passive voice whenever possible
- If a sentence uses 'by,' it's usually in passive voice
- Passive voice OK when you don't know who is responsible or want to focus on the action

**Do:**
- The designer created a new component set with 500 variants.

**Don't:**
- A new component set was created by the designer. *(Passive, vague, formal)*

### ampersands

- Avoid using ampersands; use the full word 'and' in most situations
- Ampersands acceptable in proper nouns (AT&T) and acronyms (R&B)

### apostrophes

- Always use smart (curly) quotes and apostrophes (‘ ’ “ ”), never straight ones (' ")
- Singular word ending in 's': add only an apostrophe (Chris’)
- Plural word ending in 's': add just an apostrophe (the managers’)
- Singular word not ending in 's': add apostrophe-s (Julia’s)

**Do:**
- Julia’s dollar
- Chris’ dollar
- the managers’ dollars
- “We couldn’t find it”

**Don't:**
- Julia's dollar *(Straight apostrophe — use smart/curly apostrophe (’))*
- "We couldn't find it" *(Straight quotes and apostrophe — use smart/curly versions (“ ” ’))*

### only (word placement)

- Place 'only' as close to what it modifies as possible
- Do not default to placing 'only' before the verb as in spoken English

**Do:**
- Your seat can use Figma Design only

**Don't:**
- Your seat can only use Figma Design *(Ambiguous placement)*

### pluralizing

- To make a plural noun ending in 's' possessive, add only an apostrophe, or rewrite
- For file extensions, add 's' (GIFs, PDFs, JPEGs)
- Do NOT use apostrophes for plural abbreviations

**Do:**
- Add multiple JPEGs to a file in bulk.

**Don't:**
- Add multiple JPEG's *(Apostrophe in plural abbreviation)*

### pronouns

- Avoid gendered pronouns when writing about people in general; use they/them/theirs
- If you don't know a person's preferred pronoun, use singular 'they'
- If writing about a specific person, ask and confirm their pronouns

**Do:**
- Ask your organization admin if they can add you to the instance.

## Formatting

### bolding

- Bold text to distinguish user-generated content (UGC) from strings
- Bold text to highlight critical information
- Bold UGC: people (names, emails), things (file/project/team names), places (domains), resources (plugins, widgets)
- Bold critical info: dates (billing dates, deadlines), money (charges, totals), implied costs (seats, licenses), roadblocks (low memory, expiring payment)
- Do NOT bold when there are already multiple font weights in the same area
- Do NOT default formatting to bold

### capitalization

- This style primarily uses sentence-case capitalization
- Capitalize first word of every sentence, lists, quotations
- Capitalize after a colon ONLY if it begins a complete sentence, proper noun, or branded term
- Capitalize names, proper nouns, languages, cities, countries, days, months, holidays
- Do NOT capitalize seasons (winter, autumn, fall)
- All individual strings start with a capital letter even if the feature name is lowercase
- Lowercase all body text sublabels ("Latest version," "Recent changes")

**Do:**
- Apply and adjust text properties in the Text section.
- Leave comments and @-mention others.

### date and time

- There are two ways of talking about time: relative and absolute
- Most UI copy uses relative time; version history uses absolute time
- Relative time increments: Just now, x minutes ago, x hours ago, x days ago, x months ago, x years ago
- Servers usually write out full words ('minutes,' 'hours') instead of abbreviating
- Absolute time formats: 9:19 AM (less than a day), Nov 9, 12:56 PM (day to year), Apr 2, 2021 10:54 AM (more than a year)
- Use American format: month before day (Oct 1, 2023)
- Use cardinal numbers, not ordinal (Aug 16, not Aug 16th)
- Three-letter month abbreviations, no periods (Jan, Feb, Mar) — don't write out the entire month
- AM and PM with no periods
- Leave off ':00' when something happens on the hour
- Don't use days of the week
- Abbreviate to 'mo' and 'yr' without punctuation in tight spaces
- Servers automatically apply and format time, but always double-check before shipping

**Do:**
- Just now
- 1 hour ago
- Edited 2 days ago
- 9:19 AM
- Nov 9, 12:56 PM
- Apr 2, 2021 10:54 AM

**Don't:**
- Aug 16th *(No ordinal suffixes — use Aug 16)*
- November 9 *(Use three-letter abbreviation: Nov 9)*
- Monday, Nov 9 *(Don't use days of the week)*

### emoji

- Use emojis sparingly, primarily on social posts and in some emails
- Avoid emojis in serious writing: legal documents, product pages, press releases

### headers

- Do NOT punctuate headers (unless with a question mark, exclamation point, or two complete sentences)
- Use sentence case for all headers

### lists

- Begin a list with an introductory sentence that ends in a colon
- Use sentence case
- Use bullets for lists that have no particular order
- Use numbers for ordered lists
- If all your list items are just one sentence, don't use end punctuation
- If one of your list items has more than one sentence, use end punctuation for all list items
- For lists with one or two straightforward items, try writing the list as a sentence instead
- For complex or lengthy lists, use bullets to make the information easier to read

### numbers

- Always use numerals, including for numbers under ten
- Numbers over three digits get commas (1,000; 10,000)
- Do NOT add ordinal suffixes (September 1, not September 1st)

### punctuation

- Use the serial/Oxford comma
- Use colons to introduce a quote, bulleted list, or series of steps
- Only capitalize the first word after a colon if it's a proper noun
- Use semicolons sparingly
- No spaces on either side of a dash, slash, or hyphen
- Use en dashes for ranges (1999-2000, 4-5:30 pm)
- Use em dashes for pauses/asides, clarifying information, or introducing examples ('that is,' 'namely,' 'for example') — especially when an abrupt break in thought is called for
- In compact surfaces (toasts, tooltips, banners), prefer comma splices over em dashes to join two short independent clauses — em dashes are visually heavier and more distracting in tight spaces
- Comma splices work like a 'hard comma' in UX writing — they join related clauses without requiring end punctuation or the visual weight of an em dash or semicolon
- Keep clauses short on both sides of a comma splice — if either clause is long or complex, consider restructuring instead
- Use hyphens for compound terms (view-only, in-product)
- Do NOT hyphenate actions (use 'log in' and 'set up' as two words)
- Use slashes for pricing ($12/editor/month)
- Do NOT use a slash for and/or — just use 'or'

**Do:**
- I like dogs, cats, and wearing hats.
- $12/editor/month
- File moved, open it in the new project
- Link copied, share it with your team

**Don't:**
- log-in *(Use 'log in' as two words)*
- and/or *(Just use 'or')*
- File moved — open it in the new project *(Em dash is visually heavy in a toast — use a comma splice for short related clauses)*

## Content patterns

### general writing tips

- Communicate in short paragraphs and common words
- Write using contractions for approachability
- Use exclamation marks, semicolons, and parentheses sparingly
- Write lines people can picture — be concrete, not abstract
- Preferred words: co-create, together, make, big ideas, collaborate, build, flow
- Words to avoid: dream (too lofty), creativity (too unspecific), playful (too ambiguous), supercharge (too marketing-speak), magical (too fantastical), artist (too poetic), utilize (too stiff)

**Do:**
- Less lorem ipsum, more true-to-life designs.

**Don't:**
- Less guesswork, more accurate mocks. *(Too abstract, not vivid)*

### keyboard shortcuts

- Write modifier keys left to right as on keyboard: Mac: ⌃ ⌥ ⌘; Windows: Ctrl Alt
- Mac shortcuts do NOT use + signs between keys (⌥⌘K)
- Windows shortcuts use + signs with NO spaces (Alt+Ctrl+Del)
- Detect platform and show correct shortcut dynamically when possible
- If dynamism isn't possible, include both shortcuts, Mac first
- To refer to the + sign itself (e.g., zoom in shortcut), write out the word 'and'
- In tight UI like menus, show shortcut combinations with spaces between keys rather than + signs or 'and'
- Introduce keyboard shortcuts with 'Press ⌘ or Ctrl, followed by any other keys'
- If space allows and for newer users, use a modal to explain shortcuts visually
- Shortcut keys reference: Command/⌘, Option/⌥, Control/⌃ (Mac); Ctrl, Alt, Shift (Windows)

**Do:**
- ⌥⌘K (Mac format)
- Alt+Ctrl+Del (Windows format)
- "To zoom, press ⌘ and +."

**Don't:**
- ⌘ + ⌥ + K *(Mac doesn't use + signs)*
- Alt Ctrl Del *(Windows uses + signs between keys)*
- Ctrl+Alt+K (in a Mac context) *(Show Mac shortcut format for Mac users)*
- CtrlAltK *(Windows needs + signs between keys)*
- "To zoom, press ⌘ + +." *(Write out 'and' when referring to the + key itself)*

### loading states

- Only add copy to progress bars for tasks that take considerable time
- Keep copy focused on the task or action
- Be succinct
- Keep copy in present tense — the action is currently happening
- Do NOT be cute — loading states are not the right context for delight
- Do NOT use punctuation (not even ellipses)

**Do:**
- Publishing changes
- Updating library

**Don't:**
- Loading... *(Too generic, and uses ellipsis)*
- Beep boop... *(Too cute, uses ellipsis)*
- Take a break while we load this *(Too wordy, not focused on the task)*

### localization

- Label voicey writing or tricky strings with notes about how to translate
- Design for string length changes: Japanese may be shorter but taller; German/French may increase ~50%
- Write strings with singular and plural versions of numerals for context comments
- Don't use 'one' to express a number — use the numeral for proper automated pluralization
- Place 'Learn more' links at end of sentence — mid-sentence order may flip in translation
- Don't start a sentence in the header and finish in options below it — syntax won't translate well
- UX writers annotate hard-to-translate copy for engineers (who add context comments)
- Add new terms to the glossary that may be helpful for translators

**Do:**
- "Molly and 1 other added to this file" / "Molly and 2 others added to this file"
- Email notifications (as a standalone header)
- "This is a Professional feature, so you'll need to upgrade to use it. Learn more"

**Don't:**
- Email me about... (with options below) *(Starting a sentence in the header and finishing in options doesn't translate well)*
- "Move your file out of drafts" as a mid-sentence link *(Link order may flip in other languages' syntax)*

### placeholder text

- Placeholder text lives inside text input fields and disappears when users begin typing
- Don't provide critical information (formatting or text entry guidance) since it disappears
- For search fields, consider reminding users what they can search for
- No italics or ellipses in placeholder text
- If including examples, use 'Ex:' at the beginning or 'etc.' at the end of a list
- Don't use placeholder text to say a field is optional — note it in the header with '(Optional)' instead
- Ex: 'Description (Optional)' as header, not optional info in placeholder

**Do:**
- Search all widgets
- Ex: Vicky's writing team

**Don't:**
- Search using full phrases... *(Don't use ellipses; be specific about what users can search for)*
- Names must be 10 characters long (as placeholder) *(Critical formatting info disappears — put it in subcopy instead)*

### selection states

- Desktop: 'Select' is the standard verb for choosing a tool or opting into a UI element
- Desktop: Once something is selected, use 'click' or 'double-click' for desktop/browser users
- 'double-click' is hyphenated
- Mobile: Use 'tap' instead of 'click'
- Keyboard: Use 'press' when a user needs to manually touch a key

**Do:**
- Select the crop tool for easy selection. Press ⌘ or Ctrl and C/V to copy/paste.

**Don't:**
- Click on the crop tool for easy selection. You can also press any button in the tool menu. *(Use 'select' for choosing tools, not 'click on')*

### sorting and filtering

- Be concise and clear; use fragments and drop articles if necessary
- Avoid abbreviations in filter labels (OK in menu options due to limited space)
- Use punctuation/symbols sparingly: '/' for referencing more than one option (e.g., 'Team/Organization'), '+' to indicate 'and'
- Open filters with the broadest option, then narrow down (e.g., 'All,' 'Only Figma resources,' 'Just FigJam files')
- Consider providing a clear way to remove selected filters
- Check out Menu component guidelines, since menus often have sorting and filtering

**Do:**
- All creators (broadest option first)
- Only Figma partners
- Figma+FigJam
- Free+paid

### tables

- Use headings/labels to clearly describe the type of content in each column
- Simplicity > precision: an easier-to-understand label is better than a technical one
- Be concise — write in fragments and drop articles if necessary
- Check with design partners on character limits and whether labels can wrap
- Tables often include sorting and filtering — see sorting and filtering guide