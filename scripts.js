// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Select all timeline summary elements within the new horizontal timeline structure
    const eventSummaries = document.querySelectorAll('.horizontal-timeline .event-summary');

    eventSummaries.forEach(summary => {
        // Add click event listener to each summary item
        summary.addEventListener('click', function() {
            // Find the closest parent .event-card element
            const parentCard = this.closest('.event-card');
            if (parentCard) {
                // Find the .event-details element within this card
                const details = parentCard.querySelector('.event-details');
                if (details) {
                    // Toggle visibility class for the details section
                    details.classList.toggle('details-visible');

                    // Toggle active state class for the summary (for styling the arrow, e.g.)
                    this.classList.toggle('summary-active');

                    // Optional: Toggle a class on the parent card if needed for styling
                    parentCard.classList.toggle('card-expanded');

                    // Update ARIA attribute for accessibility
                    const isExpanded = details.classList.contains('details-visible');
                    this.setAttribute('aria-expanded', isExpanded.toString());
                }
            }
        });

        // Add keyboard accessibility: allow toggling with Enter or Space key
        summary.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent default action (e.g., scrolling on space)
                this.click(); // Simulate a click to trigger the expand/collapse logic
            }
        });

        // Ensure the summary is focusable for keyboard navigation
        summary.setAttribute('tabindex', '0');

        // Set up ARIA attributes for enhanced accessibility
        // Find the details section associated with this summary
        const parentCardForAria = summary.closest('.event-card');
        if (parentCardForAria) {
            const detailsElementForAria = parentCardForAria.querySelector('.event-details');
            if (detailsElementForAria) {
                // Generate a unique ID for the details section to link it with the summary button
                const detailsId = 'details-' + Math.random().toString(36).substring(2, 11);
                detailsElementForAria.setAttribute('id', detailsId);
                // Indicate that the summary controls the details section
                summary.setAttribute('aria-controls', detailsId);
                // Set initial expanded state to false
                summary.setAttribute('aria-expanded', 'false');
            }
        }
    });
});
