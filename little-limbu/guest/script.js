// guest/script.js
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const voteBoyButton = document.getElementById('voteBoy');
    const voteGirlButton = document.getElementById('voteGirl');
    const messageDiv = document.getElementById('message');

    // IMPORTANT: Replace this with your actual server URL
    const SERVER_BASE_URL = 'https://5065-108-198-211-31.ngrok-free.app';

    if (SERVER_BASE_URL === 'YOUR_SERVER_URL_HERE' && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        alert("Developer Note: Please set the SERVER_BASE_URL in guest/script.js and live/script.js to your backend server's address (e.g., ngrok URL)!");
        messageDiv.textContent = "Error: Server URL not configured.";
        messageDiv.style.color = 'red';
    }


    voteBoyButton.addEventListener('click', () => submitVote('boy'));
    voteGirlButton.addEventListener('click', () => submitVote('girl'));

    async function submitVote(gender) {
        const name = nameInput.value.trim();
        if (!name) {
            showMessage('Please enter your name!', 'error');
            nameInput.focus();
            return;
        }

        // Disable buttons to prevent multiple submissions
        setButtonsDisabled(true);
        showMessage('Submitting your vote...', 'loading');

        try {
            const response = await fetch(`${SERVER_BASE_URL}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, gender }),
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(result.message || `Thank you, ${name}! Your vote for ${gender} is in!`, 'success');
                triggerConfetti(gender);
                nameInput.value = ''; // Clear name input after successful vote
            } else {
                showMessage(result.error || 'Could not submit vote. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
            showMessage('Failed to connect to the server. Please check your connection or tell the party host!', 'error');
        } finally {
            // Re-enable buttons after a short delay
            setTimeout(() => setButtonsDisabled(false), 1000);
        }
    }

    function showMessage(msg, type = 'info') {
        messageDiv.textContent = msg;
        messageDiv.className = 'mt-6 text-lg min-h-[2em]'; // Reset classes
        if (type === 'success') {
            messageDiv.classList.add('text-green-600', 'font-semibold');
        } else if (type === 'error') {
            messageDiv.classList.add('text-red-600', 'font-semibold');
        } else if (type === 'loading') {
            messageDiv.classList.add('text-blue-600');
        } else {
            messageDiv.classList.add('text-gray-700');
        }
    }

    function setButtonsDisabled(disabled) {
        voteBoyButton.disabled = disabled;
        voteGirlButton.disabled = disabled;
        voteBoyButton.classList.toggle('opacity-50', disabled);
        voteBoyButton.classList.toggle('cursor-not-allowed', disabled);
        voteGirlButton.classList.toggle('opacity-50', disabled);
        voteGirlButton.classList.toggle('cursor-not-allowed', disabled);
    }

    function triggerConfetti(gender) {
        const colors = gender === 'boy' ? ['#2196f3', '#64b5f6', '#bbdefb'] : ['#e91e63', '#f06292', '#f8bbd0'];
        const end = Date.now() + (2 * 1000); // 2 seconds

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
});
