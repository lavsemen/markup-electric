document.addEventListener('DOMContentLoaded', () => {
    const reviewsCardsIndex = document.querySelectorAll('.reviews-card__index');

    reviewsCardsIndex.forEach((item, index) => {
        const currentIndex = index + 1;
        let newIndex;
        if (currentIndex < 10) {
            newIndex = '0' + currentIndex;
        } else {
            newIndex = currentIndex
        }

        item.innerHTML = newIndex;
    })
})
