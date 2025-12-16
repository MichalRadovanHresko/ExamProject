const filterButtons = document.querySelectorAll('.filter-btn');
const discoverCards = document.querySelectorAll('.discover-card');
const dividers = document.querySelectorAll('.discover-divider');
let activeFilter = null;

const showAll = () => {
    discoverCards.forEach(card => card.style.display = 'flex');
    dividers.forEach(d => d.style.display = 'block');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.backgroundColor = '#C4956E';
        btn.style.color = '#1A1A1A';
    });
    activeFilter = null;
};

showAll();

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filterText = this.textContent.toLowerCase();
        let category = '';
        if (filterText === 'chapels') category = 'chapels';
        else if (filterText === 'churches') category = 'churches';
        else if (filterText === 'nature') category = 'nature';
        else if (filterText === 'other') category = 'other';

        if (activeFilter === category) {
            showAll();
            return;
        }

        activeFilter = category;
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.backgroundColor = '#C4956E';
            btn.style.color = '#1A1A1A';
        });
        this.classList.add('active');
        this.style.backgroundColor = '#6B5344';
        this.style.color = '#FAF7F2';

        dividers.forEach(d => d.style.display = 'none');

        discoverCards.forEach(card => {
            card.style.display = (card.dataset.category === category) ? 'flex' : 'none';
        });
    });
});

const mapMarkers = document.querySelectorAll('.map-marker');

mapMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
        const location = this.dataset.location;
        const targetCard = document.getElementById(`location-${location}`);

        if (targetCard) {
            targetCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

