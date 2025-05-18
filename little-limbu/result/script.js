document.addEventListener('DOMContentLoaded', () => {
    // *********************************************************************
    // ***** HOST: SET THE ACTUAL GENDER HERE BEFORE THE REVEAL!      *****
    // ***** Options: "boy" or "girl" (must be all lowercase)      *****
    // ***** e.g., const ACTUAL_GENDER_TO_REVEAL = "boy";           *****
    const ACTUAL_GENDER_TO_REVEAL = "boy"; // <-- EDIT THIS LINE!
    // *********************************************************************


    // --- CONFIGURATION ---
    const SERVER_BASE_URL = 'https://5065-108-198-211-31.ngrok-free.app';
    const REVEAL_DELAY_MS = 1000;
    const COUNTDOWN_SECONDS = 3;

    // --- DOM Elements ---
    const bodyElement = document.body;
    const preRevealSection = document.getElementById('preRevealSection');
    const revealButton = document.getElementById('revealButton');
    const revealError = document.getElementById('revealError');

    const revealDisplaySection = document.getElementById('revealDisplaySection');
    const revealCountdownEl = document.getElementById('revealCountdown');
    const revealedGenderTextEl = document.getElementById('revealedGenderText');

    const statsSection = document.getElementById('statsSection');
    const boyVotesEl = document.getElementById('boyVotes');
    const girlVotesEl = document.getElementById('girlVotes');
    const totalVotesEl = document.getElementById('totalVotes');
    const boyPercentageEl = document.getElementById('boyPercentage');
    const girlPercentageEl = document.getElementById('girlPercentage');
    const loadingMessageEl = document.getElementById('loadingMessage');
    const errorMessageEl = document.getElementById('errorMessage');
    const guestListUl = document.getElementById('guestList');
    let resultsChart = null;

    // --- Initial Check for Server URL ---
    if (SERVER_BASE_URL === 'YOUR_SERVER_URL_HERE' && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        alert("Developer Note: Please set the SERVER_BASE_URL in result/script.js to your backend server's address!");
        showRevealError("Page configuration error (server URL). Please contact the host.");
        revealButton.disabled = true;
        revealButton.classList.add('opacity-50', 'cursor-not-allowed');
    }

    // --- Event Listener ---
    revealButton.addEventListener('click', () => {
        if (ACTUAL_GENDER_TO_REVEAL !== 'boy' && ACTUAL_GENDER_TO_REVEAL !== 'girl') {
            showRevealError("Reveal not configured by host. Please ask the host to set the gender in the page's script file.");
            return;
        }
        revealError.classList.add('hidden'); // Clear any previous error/info messages
        preRevealSection.classList.add('hidden');
        revealDisplaySection.classList.remove('hidden');
        startRevealSequence(ACTUAL_GENDER_TO_REVEAL);
    });

    // --- Initial Page State based on ACTUAL_GENDER_TO_REVEAL ---
    function initializePage() {
        if (ACTUAL_GENDER_TO_REVEAL !== 'boy' && ACTUAL_GENDER_TO_REVEAL !== 'girl') {
            showRevealError("Host: Please configure the ACTUAL_GENDER_TO_REVEAL variable in result/script.js before sharing this page.", "info");
            // Optionally disable the button if not configured, or let the click handler catch it.
            // revealButton.disabled = true;
            // revealButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            showRevealError("Ready for the big moment!", "info"); // Or hide it: revealError.classList.add('hidden');
        }
        initChart(); // Initialize chart structure
    }

    function showRevealError(message, type = "error") {
        revealError.textContent = message;
        if (type === "error") {
            revealError.className = 'text-red-500 mt-4 font-semibold';
        } else if (type === "info") {
            revealError.className = 'text-blue-500 mt-4 font-semibold';
        }
        revealError.classList.remove('hidden');
    }


    // --- Reveal Logic (startRevealSequence, displayFinalGender, triggerGrandConfetti) ---
    // THIS REMAINS THE SAME AS THE PREVIOUS result/script.js
    function startRevealSequence(gender) {
        let count = COUNTDOWN_SECONDS;
        revealCountdownEl.textContent = count;

        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                revealCountdownEl.textContent = count;
            } else if (count === 0) {
                revealCountdownEl.textContent = "It's a...";
            } else {
                clearInterval(countdownInterval);
                revealCountdownEl.classList.add('hidden');
                displayFinalGender(gender);
            }
        }, 1200); // Countdown interval
    }

    function displayFinalGender(gender) {
        if (gender === 'boy') {
            revealedGenderTextEl.textContent = "BOY!";
            revealedGenderTextEl.className = 'text-7xl md:text-8xl lg:text-9xl font-extrabold boy revealed';
            bodyElement.className = 'bg-gradient-to-br from-blue-300 via-blue-400 to-teal-400 flex flex-col items-center justify-center min-h-screen font-sans p-6 transition-all duration-1000 ease-in-out';
            triggerGrandConfetti('boy');
        } else if (gender === 'girl') {
            revealedGenderTextEl.textContent = "GIRL!";
            revealedGenderTextEl.className = 'text-7xl md:text-8xl lg:text-9xl font-extrabold girl revealed';
            bodyElement.className = 'bg-gradient-to-br from-pink-300 via-pink-400 to-red-400 flex flex-col items-center justify-center min-h-screen font-sans p-6 transition-all duration-1000 ease-in-out';
            triggerGrandConfetti('girl');
        }

        setTimeout(() => {
            revealDisplaySection.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => revealDisplaySection.classList.add('hidden'), 1000);
            statsSection.classList.remove('hidden');
            fetchResultsAndDisplay();
        }, REVEAL_DELAY_MS + 2000);
    }

    function triggerGrandConfetti(gender) {
        const colors = gender === 'boy' ? ['#2196f3', '#64b5f6', '#bbdefb', '#1976d2', '#FFFFFF'] : ['#e91e63', '#f06292', '#f8bbd0', '#c2185b', '#FFFFFF'];
        const duration = 4 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 100, scalar: 1.2 };

        function randomInRange(min, max) { return Math.random() * (max - min) + min; }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 70 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: colors }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: colors }));
        }, 250);
    }

    // --- Stats Display Logic (initChart, fetchResultsAndDisplay, updateStatsDisplay, etc.) ---
    // THIS ALSO REMAINS THE SAME AS THE PREVIOUS result/script.js
    function initChart() {
        const ctx = document.getElementById('resultsChart').getContext('2d');
        resultsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Team Boy 💙', 'Team Girl 💖'],
                datasets: [{
                    label: 'Votes', data: [0, 0],
                    backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)'],
                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { font: { size: 14 } } } }
            }
        });
    }

    async function fetchResultsAndDisplay() {
        if (SERVER_BASE_URL === 'YOUR_SERVER_URL_HERE') {
            showError("Server URL not configured for results."); return;
        }
        showLoading(true);
        try {
            const response = await fetch(`${SERVER_BASE_URL}/results`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.error || `HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            updateStatsDisplay(data);
            showLoading(false);
            showError('');
        } catch (error) {
            console.error('Error fetching results:', error);
            showError(`Failed to fetch results: ${error.message}`);
            showLoading(false);
        }
    }

    function updateStatsDisplay(data) {
        const { boy, girl, total_votes, guesses } = data;
        boyVotesEl.textContent = boy;
        girlVotesEl.textContent = girl;
        totalVotesEl.textContent = total_votes;
        const boyPercent = total_votes > 0 ? ((boy / total_votes) * 100).toFixed(1) : 0;
        const girlPercent = total_votes > 0 ? ((girl / total_votes) * 100).toFixed(1) : 0;
        boyPercentageEl.textContent = `(${boyPercent}%)`;
        girlPercentageEl.textContent = `(${girlPercent}%)`;

        if (resultsChart) {
            resultsChart.data.datasets[0].data[0] = boy;
            resultsChart.data.datasets[0].data[1] = girl;
            resultsChart.update();
        }

        if (guesses && guesses.length > 0) {
            guestListUl.innerHTML = '';
            guesses.forEach(guess => {
                const listItem = document.createElement('li');
                listItem.className = 'py-2 px-1 flex items-center';
                const nameSpan = document.createElement('span');
                nameSpan.className = 'guest-name';
                nameSpan.textContent = escapeHtml(guess.name);
                const guessedTextSpan = document.createElement('span');
                guessedTextSpan.className = 'guessed-text';
                guessedTextSpan.textContent = 'guessed:';
                const genderSpan = document.createElement('span');
                genderSpan.className = `guess-value guess-${guess.gender.toLowerCase()}`;
                genderSpan.textContent = escapeHtml(guess.gender.toUpperCase());
                listItem.appendChild(nameSpan);
                listItem.appendChild(guessedTextSpan);
                listItem.appendChild(genderSpan);
                guestListUl.appendChild(listItem);
            });
        } else {
            guestListUl.innerHTML = '<li class="py-2 px-1 text-gray-500">No guesses recorded.</li>';
        }
    }

    function showLoading(isLoading) {
        loadingMessageEl.classList.toggle('hidden', !isLoading);
    }
    function showError(message) { // For general errors in fetching stats
        errorMessageEl.textContent = message;
        errorMessageEl.classList.toggle('hidden', !message);
    }
    function escapeHtml(unsafe) {
        if (unsafe === null || typeof unsafe === 'undefined') return '';
        return unsafe.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // --- Initialize Page ---
    initializePage();
});