# QuickNotes System Design

QuickNotes is a full-stack system design project demonstrating a resilient frontend API client connected to a mock REST API, alongside comprehensive backend architectural planning, data modeling, and scaling strategies.

## How to Run the API Client
1. Clone this repository to your local machine.
2. Open the folder in VS Code.
3. Open `index.html` in your browser (or use the VS Code Live Server extension).
4. Use the interface to Load, Create, and Delete notes. Note: Because it uses JSONPlaceholder, creates and deletes are mocked (they return success but do not permanently alter the global server database).

## Documentation Links
* [API Design Document](docs/api-design.md)
* [Data Model Document](docs/data-model.md)
* [Architecture & Scaling Document](docs/architecture.md)

## What I Learned
1. **DOM State Management:** I learned how to track and update loading, success, and error states dynamically in the UI while asynchronous `fetch` requests are running.
2. **Database Normalization:** I learned how to use junction tables to properly map many-to-many relationships (like notes and tags) while maintaining strict foreign key constraints.
3. **Scaling Trade-offs:** I learned that introducing a Message Queue and a Read Replica improves performance and user experience, but requires handling eventual data consistency.