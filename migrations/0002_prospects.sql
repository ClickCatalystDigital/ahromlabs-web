-- Outbound prospects: companies picked from the MCA registry (or found on Apollo) in
-- ~/Developer/data_collector/indian_companies (prospects.py), loaded here with `prospects.py crm-sql`.
-- Only rows with a contact are loaded; suppressed companies (clients, partners) never are.
-- The loader updates company and contact fields only; status, next_step and notes belong to the CRM.
CREATE TABLE prospects (
  cin TEXT PRIMARY KEY,                -- MCA CIN, or APOLLO:<org id> for companies outside the registry
  company TEXT NOT NULL,
  segment TEXT NOT NULL,               -- boiler | electronics | interiors-furniture | distribution | industrial-install-service
  sub_type TEXT, priority TEXT NOT NULL, state TEXT, city TEXT,
  website TEXT, phone TEXT, email TEXT, email_status TEXT,
  contact_name TEXT, contact_role TEXT, linkedin_url TEXT, notes_import TEXT,
  source TEXT NOT NULL,                -- MCA company registry | Apollo people search
  status TEXT NOT NULL DEFAULT 'not contacted',  -- not contacted | contacted | replied | meeting | not interested | do not contact
  next_step TEXT NOT NULL DEFAULT '', notes TEXT NOT NULL DEFAULT '',
  last_touch TEXT, imported_at TEXT NOT NULL, updated_at TEXT
);
CREATE INDEX prospects_seg ON prospects (segment, priority);
CREATE INDEX prospects_status ON prospects (status);
