# QuickNotes Data Model

## Choice of Database
We chose a **Relational SQL Database** (like PostgreSQL) because notes, tags, and users share highly structured, predictable relationships. The many-to-many relationship between notes and tags is handled efficiently via joins, ensuring data integrity compared to duplicating tag data in a NoSQL document structure.

## Entities and Relationships
* **users:** Stores account data. (One-to-Many with notes).
* **notes:** Stores the actual text. (Many-to-One with users).
* **tags:** Stores categorization labels.
* **note_tags:** A junction table facilitating a Many-to-Many relationship between notes and tags.

## CREATE TABLE Statements

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE note_tags (
    note_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);