

// Sample broadcast schedule data
const scheduleData = [
    { date: 'Oct 24, 2024', opponent: 'vs San Antonio Spurs', broadcasts: ['WFAA 8', 'MavsTV'], month: 'october' },
    { date: 'Oct 26, 2024', opponent: 'vs Phoenix Suns', broadcasts: ['KFAA 29', 'MavsTV'], month: 'october' },
    { date: 'Oct 28, 2024', opponent: '@ Utah Jazz', broadcasts: ['KFAA 29', 'MavsTV'], month: 'october' },
    { date: 'Oct 31, 2024', opponent: 'vs Minnesota Timberwolves', broadcasts: ['WFAA 8', 'MavsTV'], month: 'october' },
    { date: 'Nov 2, 2024', opponent: '@ Denver Nuggets', broadcasts: ['KFAA 29', 'MavsTV'], month: 'november' },
    { date: 'Nov 4, 2024', opponent: 'vs Chicago Bulls', broadcasts: ['WFAA 8', 'MavsTV'], month: 'november' },
    { date: 'Nov 6, 2024', opponent: '@ Orlando Magic', broadcasts: ['KFAA 29', 'MavsTV'], month: 'november' },
    { date: 'Nov 9, 2024', opponent: 'vs Indiana Pacers', broadcasts: ['KFAA 29', 'MavsTV'], month: 'november' },
    { date: 'Nov 12, 2024', opponent: 'vs Golden State Warriors', broadcasts: ['WFAA 8', 'MavsTV'], month: 'november' },
    { date: 'Nov 14, 2024', opponent: '@ Houston Rockets', broadcasts: ['KFAA 29', 'MavsTV'], month: 'november' },
    { date: 'Nov 17, 2024', opponent: 'vs Oklahoma City Thunder', broadcasts: ['WFAA 8', 'MavsTV'], month: 'november' },
    { date: 'Nov 19, 2024', opponent: '@ Atlanta Hawks', broadcasts: ['KFAA 29', 'MavsTV'], month: 'november' },
    { date: 'Nov 22, 2024', opponent: 'vs Los Angeles Lakers', broadcasts: ['WFAA 8', 'MavsTV'], month: 'november' },
    { date: 'Dec 1, 2024', opponent: 'vs Memphis Grizzlies', broadcasts: ['KFAA 29', 'MavsTV'], month: 'december' },
    { date: 'Dec 5, 2024', opponent: '@ Toronto Raptors', broadcasts: ['KFAA 29', 'MavsTV'], month: 'december' },
    { date: 'Dec 8, 2024', opponent: 'vs New York Knicks', broadcasts: ['WFAA 8', 'MavsTV'], month: 'december' },
    { date: 'Dec 12, 2024', opponent: '@ Portland Trail Blazers', broadcasts: ['KFAA 29', 'MavsTV'], month: 'december' },
    { date: 'Dec 15, 2024', opponent: 'vs LA Clippers', broadcasts: ['WFAA 8', 'MavsTV'], month: 'december' },
    { date: 'Dec 19, 2024', opponent: 'vs Portland Trail Blazers', broadcasts: ['KFAA 29', 'MavsTV'], month: 'december' },
    { date: 'Dec 23, 2024', opponent: '@ Milwaukee Bucks', broadcasts: ['KFAA 29', 'MavsTV'], month: 'december' },
    { date: 'Dec 25, 2024', opponent: 'vs Minnesota Timberwolves', broadcasts: ['ESPN'], month: 'december' },
    { date: 'Dec 27, 2024', opponent: 'vs Phoenix Suns', broadcasts: ['WFAA 8', 'MavsTV'], month: 'december' },
];

// Cable providers data for ZIP code lookup
const cableProviders = {
    default: [
        { name: 'Spectrum', channel: 'Channel 29' },
        { name: 'AT&T U-verse', channel: 'Channel 29' },
        { name: 'Frontier FiOS', channel: 'Channel 29' },
        { name: 'Verizon FiOS', channel: 'Channel 29' },
        { name: 'Over-the-Air (Antenna)', channel: 'WFAA 8, KFAA 29' }
    ]
};

// DOM Elements
const zipInput = document.getElementById('zipInput');
const findButton = document.getElementById('findButton');
const stationResults = document.getElementById('stationResults');
const resultsList = document.getElementById('resultsList');
const scheduleBody = document.getElementById('scheduleBody');
const monthFilter = document.getElementById('monthFilter');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeScheduleTable();
    initializeFAQs();
    initializeStationFinder();
    addScrollAnimations();
});

// ===================================
// BROADCAST SCHEDULE FUNCTIONS
// ===================================

function initializeScheduleTable() {
    renderSchedule(scheduleData);
    
    // Add event listener for month filter
    monthFilter.addEventListener('change', (e) => {
        const selectedMonth = e.target.value;
        if (selectedMonth === 'all') {
            renderSchedule(scheduleData);
        } else {
            const filtered = scheduleData.filter(game => game.month === selectedMonth);
            renderSchedule(filtered);
        }
    });
}

function renderSchedule(games) {
    scheduleBody.innerHTML = '';
    
    if (games.length === 0) {
        scheduleBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align: center; padding: 40px;">
                    No games scheduled for this month
                </td>
            </tr>
        `;
        return;
    }
    
    games.forEach(game => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${game.date}</strong></td>
            <td>${game.opponent}</td>
            <td>
                <div class="broadcast-badges">
                    ${game.broadcasts.map(b => `<span class="broadcast-badge">${b}</span>`).join('')}
                </div>
            </td>
        `;
        scheduleBody.appendChild(row);
    });
}

// ===================================
// STATION FINDER FUNCTIONS
// ===================================

function initializeStationFinder() {
    findButton.addEventListener('click', handleStationSearch);
    
    zipInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleStationSearch();
        }
    });
    
    // Only allow numeric input for ZIP code
    zipInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
}

function handleStationSearch() {
    const zipCode = zipInput.value.trim();
    
    if (zipCode.length !== 5) {
        alert('Please enter a valid 5-digit ZIP code');
        return;
    }
    
    // Simulate station lookup
    displayStationResults(zipCode);
}

function displayStationResults(zipCode) {
    // In a real application, this would make an API call based on ZIP code
    // For now, we'll show the default providers
    
    const providers = cableProviders.default;
    
    resultsList.innerHTML = '';
    
    providers.forEach(provider => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item fade-in';
        serviceItem.innerHTML = `
            <div class="service-name">${provider.name}</div>
            <div class="service-channel">${provider.channel}</div>
        `;
        resultsList.appendChild(serviceItem);
    });
    
    stationResults.classList.remove('hidden');
    
    // Smooth scroll to results
    stationResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===================================
// FAQ ACCORDION FUNCTIONS
// ===================================

function initializeFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===================================
// SMOOTH SCROLLING FOR NAVIGATION
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Format date helper
function formatDate(dateString) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Debounce helper for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// FORM VALIDATION
// ===================================

// Add any additional form validation as needed
function validateZipCode(zip) {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zip);
}

// ===================================
// CONSOLE LOG FOR DEBUGGING
// ===================================

console.log('Dallas Mavericks Landing Page - JavaScript Loaded');
console.log(`Total games in schedule: ${scheduleData.length}`);