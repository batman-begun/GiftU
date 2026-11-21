CREATE TABLE gift_rooms (
  sender TEXT PRIMARY KEY,
  receiver TEXT UNIQUE NOT NULL,
  deck TEXT NOT NULL,
  progress TEXT NOT NULL DEFAULT '[]',
  outcome TEXT,
  expires INTEGER NOT NULL
);
--> statement-breakpoint
CREATE INDEX gift_rooms_expiry ON gift_rooms(expires);
