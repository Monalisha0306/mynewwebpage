document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchInputs = document.querySelectorAll('input[type="search"]');

    searchInputs.forEach(input => {
        input.addEventListener('input', event => {
            const query = event.target.value.toLowerCase();
            const table = event.target.closest('.main-content').querySelector('table');
            const rows = table.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(query));
                row.style.display = match ? '' : 'none';
            });
        });
    });

    // Pagination functionality
    const paginatedTables = document.querySelectorAll('.pagination');

    paginatedTables.forEach(pagination => {
        const table = pagination.previousElementSibling;
        const rows = table.querySelectorAll('tbody tr');
        const rowsPerPage = 5;
        let currentPage = 1;

        const updateTable = () => {
            rows.forEach((row, index) => {
                row.style.display = (index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage) ? '' : 'none';
            });
        };

        const updatePagination = () => {
            pagination.innerHTML = '';
            const pageCount = Math.ceil(rows.length / rowsPerPage);

            for (let i = 1; i <= pageCount; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.classList.toggle('active', i === currentPage);
                button.addEventListener('click', () => {
                    currentPage = i;
                    updateTable();
                    updatePagination();
                });
                pagination.appendChild(button);
            }
        };

        updateTable();
        updatePagination();
    });

    // Profile editing functionality
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const profileSection = button.closest('.profile-section');
            const inputs = profileSection.querySelectorAll('input');

            inputs.forEach(input => {
                input.removeAttribute('disabled');
            });

            profileSection.querySelector('.save-cancel-buttons').style.display = 'flex';
        });
    });

    const saveButtons = document.querySelectorAll('.save-button');

    saveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const profileSection = button.closest('.profile-section');
            const inputs = profileSection.querySelectorAll('input');

            inputs.forEach(input => {
                input.setAttribute('disabled', true);
            });

            profileSection.querySelector('.save-cancel-buttons').style.display = 'none';
        });
    });

    const cancelButtons = document.querySelectorAll('.cancel-button');

    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const profileSection = button.closest('.profile-section');
            const inputs = profileSection.querySelectorAll('input');

            inputs.forEach(input => {
                input.setAttribute('disabled', true);
                // Reset values to initial values (implement as needed)
            });

            profileSection.querySelector('.save-cancel-buttons').style.display = 'none';
        });
    });
});
