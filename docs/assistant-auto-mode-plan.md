# Assistant actions: Settings switch + Manual / Auto in chat (decided 9 Nov 2026)

For all four assistants (Atelier, Ohm, Ember, Datum). Start after the Datum and Ember gap work is merged.

## Settings (owner/admin), next to the existing data-access setting
- **Allow changes from the assistant:** on/off. Off = the assistant never offers action cards (look-ups and how-to still work).
- **Roles that may use Auto:** the owner ticks roles; everyone else stays on Manual.

## Chat
- A small **Manual / Auto** toggle beside the text box, shown only to people whose role may use Auto. Remembered per person.
  It must not change the chat layout otherwise.
- **Manual** (default): today's card, saved only on Save.
- **Auto**: adds and edits (`risk: 'create'` and plain field changes) save at once and show a one-line "Done · Undo"
  instead of the card. **Deletes, payments and approvals always show the card**, even in Auto.
- Every change still runs the screen's own route as that person, so role and department checks are unchanged.

## MCP (Claude / ChatGPT)
- Unchanged: always preview, then confirm, whatever the Auto setting.

## Per action
Each registry entry needs a flag for "always confirm" (deletes, payments, approvals, status moves that post money).
Undo = the route's own reverse (delete what was created, restore the old field values); where no clean reverse
exists, that action stays card-only.
