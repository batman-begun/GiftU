CREATE TABLE gift_hunts (
  token TEXT PRIMARY KEY,
  clue TEXT NOT NULL,
  answer TEXT NOT NULL,
  reveal TEXT NOT NULL,
  expires INTEGER NOT NULL
);
--> statement-breakpoint
CREATE INDEX gift_hunts_expiry ON gift_hunts(expires);
