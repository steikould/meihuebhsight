document.addEventListener('DOMContentLoaded', function() {
    const timelineSummaries = document.querySelectorAll('.experience-timeline .timeline-summary');

    timelineSummaries.forEach(summary => {
        summary.addEventListener('click', function() {
            // Find the parent .timeline-card or .timeline-item
            const parentCard = this.closest('.timeline-card');
            if (parentCard) {
                const details = parentCard.querySelector('.timeline-details');
                if (details) {
                    // Toggle a class on the details element
                    details.classList.toggle('details-visible');

                    // Optional: Toggle a class on the summary or card for styling active state
                    this.classList.toggle('summary-active');
                    parentCard.classList.toggle('card-expanded');

                    // Update ARIA attribute
                    const isExpanded = details.classList.contains('details-visible');
                    this.setAttribute('aria-expanded', isExpanded.toString());
                }
            }
        });

        // Add keyboard accessibility (Enter or Space key)
        summary.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent default space scroll
                this.click(); // Trigger the click event
            }
        });

        // Make the summary focusable for keyboard navigation
        summary.setAttribute('tabindex', '0');
        // Add ARIA attributes for accessibility
        const detailsId = 'details-' + Math.random().toString(36).substr(2, 9); // Generate unique ID
        const details = summary.closest('.timeline-card').querySelector('.timeline-details');
        if(details) {
            details.setAttribute('id', detailsId);
            summary.setAttribute('aria-expanded', 'false');
            summary.setAttribute('aria-controls', detailsId);
        }

    });
});
