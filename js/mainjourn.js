

function saveJournalEntry() {
    const title = document.getElementById("journal-title").value;
    const note = document.getElementById("journal-note").value;
    
    // Get the current date in the "YYYY-MM-DD" format
    const currentDate = new Date().toISOString().split("T")[0];
    
    if (title && note) {
        const entry = { title, date: currentDate, note };
        let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        entries.push(entry);
        localStorage.setItem("journalEntries", JSON.stringify(entries));

        document.getElementById("journal-title").value = "";
        document.getElementById("journal-date").value = currentDate; // Set to current date
        document.getElementById("journal-note").value = "";

        displayJournalEntries();
    }
}


function editJournalEntry(index) {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const entry = entries[index];

    if (entry) {
        document.getElementById("edit-journal-title").value = entry.title;
        document.getElementById("edit-journal-date").value = entry.date;
        document.getElementById("edit-journal-note").value = entry.note;

        // Store the index of the entry being edited for later use
        document.getElementById("edit-popup").setAttribute("data-index", index);

        openEditPopup();
    }
}

function updateJournalEntry() {
    const index = document.getElementById("edit-popup").getAttribute("data-index");
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const entry = entries[index];

    if (entry) {
        entry.title = document.getElementById("edit-journal-title").value;
        entry.date = document.getElementById("edit-journal-date").value;
        entry.note = document.getElementById("edit-journal-note").value;

        entries[index] = entry;
        localStorage.setItem("journalEntries", JSON.stringify(entries));

        closeEditPopup();
        displayJournalEntries();
    }
}

function openEditPopup() {
    document.getElementById("edit-popup").style.display = "block";
}

function closeEditPopup() {
    document.getElementById("edit-popup").style.display = "none";
}

function deleteJournalEntry(index) {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    if (index >= 0 && index < entries.length) {
        entries.splice(index, 1);
        localStorage.setItem("journalEntries", JSON.stringify(entries));
        displayJournalEntries(); // Refresh the list
    }
}

function displayJournalEntries() {
    const journalList = document.getElementById("journal-list");
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    journalList.innerHTML = "";

    entries.forEach((entry, index) => {
        const entryElement = document.createElement("div");
        entryElement.innerHTML = `
            <div class="journal-entry">
                <h2>${entry.title}</h2>
                <p>Date: ${entry.date}</p>
                <p>${entry.note}</p>
                <button class="btn btn-secondary" onclick="editJournalEntry(${index})">Edit</button>
                <button class="btn btn-secondary" onclick="deleteJournalEntry(${index})">Delete</button>
            </div>
        `;
        journalList.appendChild(entryElement);
    });
}


displayJournalEntries();