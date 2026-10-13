-- Every lead from the ahromlabs.com contact form and the three live demos' entry forms (api/contact,
-- api/demo-lead). Saved before the email is sent, so a lead is kept even when the email fails.
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  source TEXT NOT NULL,              -- contact | demo:boiler | demo:electronics | demo:interiors
  name TEXT, company TEXT, email TEXT NOT NULL, phone TEXT, about TEXT, message TEXT, page TEXT,
  email_status TEXT NOT NULL DEFAULT 'pending',  -- pending | sent | failed
  status TEXT NOT NULL DEFAULT 'new',            -- new | contacted | qualified | won | lost | spam
  notes TEXT NOT NULL DEFAULT '',
  updated_at TEXT
);
CREATE INDEX leads_created ON leads (created_at);
