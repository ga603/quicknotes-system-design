const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const statusEl = document.getElementById('status');
const loadBtn = document.getElementById('load-btn');
const formEl = document.getElementById('note-form');
const titleInput = document.getElementById('title-input');
const bodyInput = document.getElementById('body-input');
const submitBtn = document.getElementById('submit-btn');
const notesList = document.getElementById('notes-list');

// Reusable fetch wrapper
async function request(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
}

function updateStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = type; // 'loading', 'success', 'error'
}

// GET - Load 10 notes
loadBtn.addEventListener('click', async () => {
    try {
        loadBtn.disabled = true;
        updateStatus('Loading notes...', 'loading');
        
        const notes = await request(`${API_URL}?_limit=10`);
        
        notesList.innerHTML = ''; // Clear current
        if (notes.length === 0) {
            updateStatus('No notes found. It is empty!', 'success');
            return;
        }

        notes.forEach(note => addNoteToDOM(note));
        updateStatus('Notes loaded successfully!', 'success');
    } catch (error) {
        updateStatus('Failed to load notes.', 'error');
    } finally {
        loadBtn.disabled = false;
    }
});

// POST - Create Note
formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    // Validation
    if (!title) return updateStatus('Title is required.', 'error');
    if (title.length > 100) return updateStatus('Title must be under 100 characters.', 'error');

    try {
        submitBtn.disabled = true;
        updateStatus('Saving note...', 'loading');

        const newNote = await request(API_URL, {
            method: 'POST',
            body: JSON.stringify({ title, body, userId: 1 }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        addNoteToDOM(newNote, true);
        formEl.reset();
        updateStatus('Note created successfully!', 'success');
    } catch (error) {
        updateStatus('Failed to save note.', 'error');
    } finally {
        submitBtn.disabled = false;
    }
});

// DELETE - Remove note
async function deleteNote(id, liElement, deleteBtn) {
    try {
        deleteBtn.disabled = true;
        updateStatus('Deleting note...', 'loading');
        
        await request(`${API_URL}/${id}`, { method: 'DELETE' });
        
        liElement.remove();
        updateStatus('Note deleted successfully!', 'success');
        
        if (notesList.children.length === 0) {
            updateStatus('All notes deleted. The list is empty.', 'success');
        }
    } catch (error) {
        updateStatus('Failed to delete note.', 'error');
        deleteBtn.disabled = false;
    }
}

// DOM rendering (uses textContent to prevent XSS)
function addNoteToDOM(note, atTop = false) {
    const li = document.createElement('li');
    
    const h3 = document.createElement('h3');
    h3.textContent = note.title;
    
    const p = document.createElement('p');
    p.textContent = note.body;
    
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete Note';
    delBtn.addEventListener('click', () => deleteNote(note.id, li, delBtn));

    li.append(h3, p, delBtn);
    
    if (atTop) {
        notesList.prepend(li);
    } else {
        notesList.appendChild(li);
    }
}