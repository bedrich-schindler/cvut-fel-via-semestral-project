DROP TABLE IF EXISTS shooting_range;

CREATE TABLE shooting_range (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  phone TEXT NULL,
  web TEXT NULL,
  about TEXT NULL,
  foursquare_place_id TEXT NULL
);
