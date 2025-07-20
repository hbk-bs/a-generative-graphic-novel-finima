document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    // Adjusted: Select all checkboxes, including the new one
    const checkboxes = document.querySelectorAll('input[type="checkbox"][id^="checkbox-page"]');
    const coverCheckbox = document.getElementById('checkbox-cover');

    // Initial z-index assignment (to match your original CSS initial z-index)
    // We'll iterate in reverse to set z-index correctly for overlapping pages
    for (let i = pages.length - 1; i >= 0; i--) {
        pages[i].style.zIndex = 2 + (pages.length - 1 - i); // Example: page17 z-index 2, page16 z-index 3, etc.
    }

    // Function to update page states
    function updatePageStates() {
        let maxCheckedPageNumber = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const pageNum = parseInt(checkbox.id.replace('checkbox-page', ''));
                if (pageNum > maxCheckedPageNumber) {
                    maxCheckedPageNumber = pageNum;
                }
            }
        });

        // If the cover is unchecked, effectively no pages are "checked" from a navigation perspective
        if (!coverCheckbox.checked) {
            maxCheckedPageNumber = 0; // Reset to 0 if cover is closed
        }

        // Determine current highest z-index for unflipped pages based on initial state
        const getInitialZIndex = (pageNumber) => {
            let pageIndex = -1;
            // Find the index of the page element based on its page number
            for(let i=0; i<pages.length; i++) {
                if (parseInt(pages[i].id.replace('page', '')) === pageNumber) {
                    pageIndex = i;
                    break;
                }
            }
            if (pageIndex !== -1) {
                return 2 + (pages.length - 1 - pageIndex);
            }
            return 1; // Default low z-index if not found
        };


        // First pass: Handle pages that need to be unflipped or are behind the active flip
        pages.forEach(page => {
            const pageNumber = parseInt(page.id.replace('page', ''));

            // The key change: if maxCheckedPageNumber is 18, all pages should remain flipped
            if (pageNumber > maxCheckedPageNumber && maxCheckedPageNumber !== 18) {
                // These pages should be unflipped and stack in their initial order
                page.classList.remove('flipped');
                page.style.zIndex = getInitialZIndex(pageNumber);
            }
        });

        const baseFlippedZIndex = 20;

        // Second pass: Iterate through all pages to apply 'flipped' class and correct z-index
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            const pageNumber = parseInt(page.id.replace('page', ''));

            // All pages should be flipped if maxCheckedPageNumber is 18 (final state)
            if (pageNumber <= maxCheckedPageNumber || maxCheckedPageNumber === 18) {
                page.classList.add('flipped');
                if (pageNumber === maxCheckedPageNumber && maxCheckedPageNumber !== 18) {
                    // This is the currently active flipping page (unless it's the final state)
                    page.style.zIndex = baseFlippedZIndex + pageNumber;
                } else {
                    // These are pages that have been flipped previously or are in the final state
                    page.style.zIndex = baseFlippedZIndex - 1; // Ensure they are behind the active page
                }
            }
        }

        // Handle cover flip
        if (coverCheckbox.checked) {
             const page1 = document.getElementById('page1');
             if (page1 && !page1.classList.contains('flipped')) {
                page1.style.zIndex = baseFlippedZIndex - 1;
             }
        } else {
            // When cover is not checked, page1 should return to its initial z-index
            const page1 = document.getElementById('page1');
            if (page1) {
                page1.style.zIndex = getInitialZIndex(1);
            }
        }
    }

    // Add event listeners to all checkboxes
    // Re-select checkboxes to include the new one
    document.querySelectorAll('input[type="checkbox"][id^="checkbox-page"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updatePageStates();
        });
    });

    // Handle cover checkbox specifically
    coverCheckbox.addEventListener('change', (event) => {
        updatePageStates();
    });

    // Initial state setup on load
    updatePageStates();
});