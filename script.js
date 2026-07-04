// Initialize wallets storage
let wallets = JSON.parse(localStorage.getItem('wallets')) || [];

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Handle Lost Wallet Form Submission
document.getElementById('lostForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const wallet = {
        id: Date.now(),
        type: 'lost',
        name: document.getElementById('lostName').value,
        email: document.getElementById('lostEmail').value,
        phone: document.getElementById('lostPhone').value,
        location: document.getElementById('lostLocation').value,
        date: document.getElementById('lostDate').value,
        description: document.getElementById('lostDescription').value,
        datePosted: new Date().toLocaleDateString()
    };

    wallets.push(wallet);
    localStorage.setItem('wallets', JSON.stringify(wallets));

    alert('✅ Lost wallet reported successfully! We hope it gets found.');
    this.reset();
});

// Handle Found Wallet Form Submission
document.getElementById('foundForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const wallet = {
        id: Date.now(),
        type: 'found',
        name: document.getElementById('foundName').value,
        email: document.getElementById('foundEmail').value,
        phone: document.getElementById('foundPhone').value,
        location: document.getElementById('foundLocation').value,
        date: document.getElementById('foundDate').value,
        description: document.getElementById('foundDescription').value,
        datePosted: new Date().toLocaleDateString()
    };

    wallets.push(wallet);
    localStorage.setItem('wallets', JSON.stringify(wallets));

    alert('✅ Found wallet reported successfully! Thank you for your honesty.');
    this.reset();
});

// Search Wallets
function searchWallets() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');

    if (!searchTerm) {
        resultsContainer.innerHTML = '<p class="no-results">Please enter a search term...</p>';
        return;
    }

    const results = wallets.filter(wallet => {
        return (
            wallet.location.toLowerCase().includes(searchTerm) ||
            wallet.description.toLowerCase().includes(searchTerm) ||
            wallet.name.toLowerCase().includes(searchTerm)
        );
    });

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No wallets found. Try a different search.</p>';
        return;
    }

    resultsContainer.innerHTML = results.map(wallet => `
        <div class="wallet-card">
            <h3>${wallet.type === 'lost' ? '🔍 Lost Wallet' : '✓ Found Wallet'}</h3>
            <p><span class="card-label">Posted by:</span> ${wallet.name}</p>
            <p><span class="card-label">Location:</span> ${wallet.location}</p>
            <p><span class="card-label">Date:</span> ${wallet.date}</p>
            <p><span class="card-label">Description:</span> ${wallet.description}</p>
            <p><span class="card-label">Contact Email:</span> <a href="mailto:${wallet.email}">${wallet.email}</a></p>
            ${wallet.phone ? `<p><span class="card-label">Phone:</span> <a href="tel:${wallet.phone}">${wallet.phone}</a></p>` : ''}
            <p><span class="card-label">Posted:</span> ${wallet.datePosted}</p>
            <span class="status-badge ${wallet.type === 'lost' ? 'status-lost' : 'status-found'}">
                ${wallet.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
            </span>
        </div>
    `).join('');
}

// Auto-load results on Search tab
document.addEventListener('DOMContentLoaded', function() {
    // If there are wallets, show them on load
    if (wallets.length > 0) {
        console.log('Wallets loaded:', wallets);
    }
});