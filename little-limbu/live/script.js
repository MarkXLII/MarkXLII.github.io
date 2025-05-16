// live/script.js
document.addEventListener('DOMContentLoaded', () => {
    const boyVotesEl = document.getElementById('boyVotes');
    const girlVotesEl = document.getElementById('girlVotes');
    const totalVotesEl = document.getElementById('totalVotes');
    const boyPercentageEl = document.getElementById('boyPercentage');
    const girlPercentageEl = document.getElementById('girlPercentage');
    const loadingMessageEl = document.getElementById('loadingMessage');
    const errorMessageEl = document.getElementById('errorMessage');
    const guestListUl = document.getElementById('guestList');

    const revealButton = document.getElementById('revealButton'); // You'll need to add this button if you want a manual reveal
    const revealedGenderEl = document.getElementById('revealedGender');

    // IMPORTANT: Replace this with your actual server URL
    const SERVER_BASE_URL = 'https://5065-108-198-211-31.ngrok-free.app';

    if (SERVER_BASE_URL === 'YOUR_SERVER_URL_HERE' && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        alert("Developer Note: Please set the SERVER_BASE_URL in guest/script.js and live/script.js to your backend server's address (e.g., ngrok URL)!");
        showError("Error: Server URL not configured for live results.");
    }


    let resultsChart = null;

    function initChart() {
        const ctx = document.getElementById('resultsChart').getContext('2d');
        resultsChart = new Chart(ctx, {
            type: 'pie', // or 'doughnut'
            data: {
                labels: ['Boy 💙', 'Girl 💖'],
                datasets: [{
                    label: 'Votes',
                    data: [0, 0], // Initial data
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)', // Blue
                        'rgba(255, 99, 132, 0.7)'  // Pink
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 14,
                                family: "'Comic Sans MS', 'Chalkduster', 'cursive'"
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + ' votes';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    async function fetchResults() {
        if (SERVER_BASE_URL === 'YOUR_SERVER_URL_HERE') {
            showError("Server URL not configured.");
            return;
        }
        try {
            const response = await fetch(`${SERVER_BASE_URL}/results`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.error || `HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            updateDisplay(data);
            showLoading(false);
            showError(''); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching results:', error);
            showError(`Failed to fetch results: ${error.message}. Is the server running and accessible?`);
            showLoading(false);
        }
    }

    function updateDisplay(data) {
        const { boy, girl, total_votes, guesses } = data;

        boyVotesEl.textContent = boy;
        girlVotesEl.textContent = girl;
        totalVotesEl.textContent = total_votes;

        const boyPercent = total_votes > 0 ? ((boy / total_votes) * 100).toFixed(1) : 0;
        const girlPercent = total_votes > 0 ? ((girl / total_votes) * 100).toFixed(1) : 0;

        boyPercentageEl.textContent = `(${boyPercent}%)`;
        girlPercentageEl.textContent = `(${girlPercent}%)`;

        // Update chart
        if (resultsChart) {
            resultsChart.data.datasets[0].data[0] = boy;
            resultsChart.data.datasets[0].data[1] = girl;
            resultsChart.update();
        }

        // Update guest list
        if (guesses && guesses.length > 0) {
            guestListUl.innerHTML = ''; // Clear existing list
            guesses.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by most recent first

            guesses.forEach(guess => {
                const listItem = document.createElement('li');
                // Updated className for the li element:
                listItem.className = 'py-2 px-1 flex items-center'; // Removed justify-between

                // Create a span for the guest's name
                const nameSpan = document.createElement('span');
                nameSpan.className = 'guest-name';
                nameSpan.textContent = guess.name;

                // Create a span for the "guessed:" text
                const guessedTextSpan = document.createElement('span');
                guessedTextSpan.className = 'guessed-text';
                guessedTextSpan.textContent = 'guessed:';

                // Create a span for the gender vote
                const genderSpan = document.createElement('span');
                // Add 'guess-value' class for general styling of the gender vote
                genderSpan.className = `guess-value guess-${guess.gender.toLowerCase()}`;
                genderSpan.textContent = guess.gender.toUpperCase();

                // Append the new spans to the list item
                listItem.appendChild(nameSpan);
                listItem.appendChild(guessedTextSpan);
                listItem.appendChild(genderSpan);

                guestListUl.appendChild(listItem);
            });
        } else {
            guestListUl.innerHTML = '<li class="py-2 px-1 text-gray-500">No guesses yet...</li>';
        }


        // Optional: Show reveal button if a certain condition is met (e.g., after host clicks it or after a certain number of votes)
        // For now, let's assume the host manually decides when to "reveal"
        // You might want to add a password or a special link for the host to trigger the actual reveal.
        // For this example, the button is always there but hidden initially.
        // You could show it by removing the 'hidden' class based on some logic.
        // revealButton.classList.remove('hidden');
    }

    function showLoading(isLoading) {
        if (isLoading) {
            loadingMessageEl.classList.remove('hidden');
        } else {
            loadingMessageEl.classList.add('hidden');
        }
    }

    function showError(message) {
        if (message) {
            errorMessageEl.textContent = message;
            errorMessageEl.classList.remove('hidden');
        } else {
            errorMessageEl.classList.add('hidden');
        }
    }


    // --- Actual Reveal Logic (Example - you'll need to decide how this is triggered) ---
    // This is a placeholder. The "actual" gender would come from the parents, not the votes.
    // You might have a separate, password-protected endpoint or a manual reveal.
    /*
    revealButton.addEventListener('click', () => {
        // *** THIS IS WHERE YOU'D PUT THE ACTUAL GENDER ***
        const actualGender = "Girl"; // or "Boy" - this should be the true gender!
        const actualGenderKey = actualGender.toLowerCase();

        revealedGenderEl.textContent = `It's a ${actualGender}!`;
        revealedGenderEl.className = `mt-6 text-5xl font-extrabold ${actualGenderKey}`; // Applies .boy or .girl class
        revealedGenderEl.classList.remove('hidden');
        revealButton.classList.add('hidden'); // Hide button after reveal

        // Optional: Highlight winning voters or other fun effects
        triggerGrandConfetti(actualGenderKey);
    });

    function triggerGrandConfetti(gender) {
        const colors = gender === 'boy' ? ['#2196f3', '#64b5f6', '#bbdefb', '#1976d2'] : ['#e91e63', '#f06292', '#f8bbd0', '#c2185b'];
        const duration = 5 * 1000; // 5 seconds
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher if desired
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: colors }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: colors }));
        }, 250);
    }
    */
    // For the reveal button to be more useful, you'd likely have a separate mechanism
    // for the "host" to input the *actual* gender, and then this page would display it.
    // The button above is a simple client-side placeholder for that idea.

    // Initialize
    initChart();
    showLoading(true);
    fetchResults(); // Initial fetch

    // Fetch results periodically
    setInterval(fetchResults, 5000); // Refresh every 5 seconds
});