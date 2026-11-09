# Assistant action gaps (audit, 8 Nov 2026)

Every write route the screens call, checked against each app's action registry (chat cards and MCP use the same list).
"Worth adding" excludes file uploads, logins and passwords, admin settings, bulk imports, large line-item editors and
anything that sends outside the app (email, WhatsApp, GST portal). Read-only audit; route matches are by path, so
check each one before building.

| App | Registry | Write routes in scope | Covered | Worth adding |
|---|---|---|---|---|
| Ohm AI (ls-inventory) | `utils/assistantActions.js` | 63 | 33 | 9 |
| Atelier AI (savistar-ops) | `lib/assistantActions.js` | 66 | 31 | 17 |
| Datum AI (structonova-ops) | `lib/assistantActions.js` | ~90 | 31 | ~23 |
| Ember AI (SB Ops) | `lib/assistant-actions.js` | ~427 | 25 | ~40 routes (~25 task types) |

## Ohm AI
1. `PUT /api/finance/sales/:vno/reminder`: set a payment reminder date
2. `POST /api/requests/:id/edit-approve`: change quantities, then approve
3. `PATCH /api/po/:id/items/:itemId`: edit a PO line's quantity or price
4. `DELETE /api/po/:id/items/:itemId`: remove a PO line
5. `PUT /api/orders/dispatches/:id`: change a dispatch lot's date or quantity
6. `DELETE /api/orders/dispatches/:id`: delete a dispatch lot
7. `PUT /api/procurement/:id`: edit a supplier order (expected date, status)
8. `PUT /api/sales-invoices/:no`: set rates and HSN on a sales invoice
9. `POST /api/invoices/manual`: key in a supplier bill (large form, lowest priority)

## Atelier AI
Most useful: `POST /api/payroll` (month's salary paid), `POST /api/invoices` (invoice by hand), `PUT /api/cash/[id]`
(correct a cash entry), `PUT /api/vendors/[id]` (edit a vendor). Then delete cards: clients, projects, quotations,
invoices, vendors, employees (prefer "left"), cash, expenses; low priority: site visits, vendor rates, vendor POs,
freight, work logs.

## Datum AI
- Orders: `POST /api/orders`, `PUT /api/orders/[id]`
- Cash: `PUT /api/cash/[id]`, `DELETE /api/cash/[id]`
- Suppliers: `PUT /api/vendors/[id]`, `PUT /api/vendor-pos/[id]`, `POST /api/vendor-pos/[id]/deliveries`, `POST /api/vendor-rates`, `POST /api/freight`
- Workforce: `POST /api/attendance` (People page; site attendance is a different route), `POST /api/work-logs`, `POST /api/expenses`, `POST /api/payroll`, `POST /api/gate-passes`
- Projects and clients: `POST /api/projects`, `PUT /api/clients/[id]`, `POST /api/projects/[id]/mobilisation`
- Stock and machines: `POST /api/stores/items`, `POST /api/machinery`
- Quotes and trading: `POST /api/quotations/[id]/invoice`, the `revise` action, other `POST /api/trading/[id]` actions, `DELETE /api/projects/[id]/measurements`

## Ember AI (SB Ops)
Strongest: leave approval, expense claims, service expenses, service calls, CRM follow-up tasks, NCR disposition and
close, quotation approve and convert, receipts against sales invoices, vendor-bill approve and pay, record a bill on a
PO, PO delivery lots, BOM line receive / cancel / raise PR, supplier delivery chases, stock receive / reserve / issue /
release, shipments and gate passes, gate-entry close, create project and release BOM, installation reports, job-card
time logs and QC release, worker days, opportunity stage, enquiry convert and close, create and acknowledge packing
lists, enquiry name/phone edits.

Switches: actions have no on/off switch at the client (only department limits and `action_permissions`); the live-data
look-ups wait for the `assistant_data_access` approval; MCP is off in the demo (`DEMO_MODE`).
