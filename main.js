document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('.announcement-submit');
    const announcementBox = document.querySelector('.announcement-box');
    const dateBox = document.querySelector('.date-text');
    const typeSelect = document.querySelector('.announcement-type');

    const pinnedList = document.querySelector('.card-announcement:nth-of-type(2) .announcement-list');
    const generalList = document.querySelector('.card-announcement:nth-of-type(3) .announcement-list');
    const pastList = document.querySelector('.card-announcement:nth-of-type(4) .announcement-list');

    function createAnnouncementRow(text, date, type) {
        const row = document.createElement('div');
        row.classList.add('announcement-row');

        const newText = document.createElement('p');
        newText.classList.add('announcement-text');
        if (type === 'pinned') newText.classList.add('pinned');
        newText.textContent = text;

        const newDate = document.createElement('p');
        newDate.classList.add('announcement-date');
        newDate.textContent = date;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', () => deleteAnnouncement(row, text, type));

        row.appendChild(newText);
        row.appendChild(newDate);
        row.appendChild(deleteBtn);

        return row;
    }

    function deleteAnnouncement(row, text, type) {
        if (type === 'pinned') {
            [pinnedList, generalList].forEach(list => {
            Array.from(list.children).forEach(r => {
                if (r.querySelector('.announcement-text').textContent === text) r.remove();
            });
        });
        }
        else {
            row.remove();
        }

        const newText = row.querySelector('.announcement-text');
        newText.classList.remove('pinned');
        newText.classList.add('past');
        pastList.insertBefore(row, pastList.firstChild);

        const deleteBtn = row.querySelector('.delete-btn');
        if (deleteBtn) deleteBtn.remove();
    }

    submitBtn.addEventListener('click', () => {
        const text = announcementBox.value.trim();
        const date = dateBox.value.trim();
        const type = typeSelect.value;

        if (!text || !date) return;

        const newRow = createAnnouncementRow(text, date, type);

        if (type === 'pinned') {
            pinnedList.insertBefore(newRow.cloneNode(true), pinnedList.firstChild);
            generalList.insertBefore(newRow, generalList.firstChild);
        } else {
            generalList.insertBefore(newRow, generalList.firstChild);
        }

        announcementBox.value = '';
        dateBox.value = '';
        typeSelect.value = 'general';
    });

    document.querySelectorAll('.announcement-row .delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('.announcement-row');
            const textElem = row.querySelector('.announcement-text');
            const isPinned = textElem.classList.contains('pinned');
            deleteAnnouncement(row, textElem.textContent, isPinned ? 'pinned' : 'general');
        });
    });
});
