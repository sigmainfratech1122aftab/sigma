// API endpoint
const API_BASE = 'https://v2.jokeapi.dev/joke';

let currentJoke = null;
let jokeCount = 0;
let selectedType = 'any';

// Set joke type filter
function setJokeType(type) {
    selectedType = type;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === type) {
            btn.classList.add('active');
        }
    });
}

// Get joke from API
async function getJoke() {
    const loading = document.getElementById('loading');
    const jokeContent = document.getElementById('jokeContent');
    const jokeType = document.getElementById('jokeType');
    const getJokeBtn = document.getElementById('getJokeBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    // Show loading state
    loading.style.display = 'block';
    getJokeBtn.disabled = true;
    jokeContent.textContent = '';
    
    try {
        // Build API URL
        let url = `${API_BASE}`;
        
        if (selectedType === 'any') {
            url += '/Any';
        } else if (selectedType === 'general') {
            url += '/General';
        } else if (selectedType === 'programming') {
            url += '/Programming';
        } else if (selectedType === 'knock-knock') {
            url += '/Knock-Knock';
        }
        
        url += '?format=json';
        
        // Fetch joke
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        
        // Store current joke
        currentJoke = data;
        
        // Display joke
        displayJoke(data);
        
        // Update counter
        jokeCount++;
        document.getElementById('jokeCount').textContent = jokeCount;
        
        // Enable share button
        shareBtn.disabled = false;
        
    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeContent.textContent = 'Oops! Failed to load a joke. Please try again.';
        jokeType.textContent = 'Error';
    } finally {
        loading.style.display = 'none';
        getJokeBtn.disabled = false;
    }
}

// Display joke on page
function displayJoke(data) {
    const jokeContent = document.getElementById('jokeContent');
    const jokeType = document.getElementById('jokeType');
    
    if (data.type === 'single') {
        jokeContent.textContent = data.joke;
    } else if (data.type === 'twopart') {
        jokeContent.innerHTML = `
            <div class="setup">${data.setup}</div>
            <div class="punchline" style="margin-top: 15px; font-weight: bold; color: #764ba2;">${data.delivery}</div>
        `;
    }
    
    jokeType.textContent = `Type: ${data.category} | Safe: ${data.safe ? 'Yes' : 'No'}`;
}

// Copy joke to clipboard
function copyJoke() {
    if (!currentJoke) return;
    
    let jokeText = '';
    if (currentJoke.type === 'single') {
        jokeText = currentJoke.joke;
    } else if (currentJoke.type === 'twopart') {
        jokeText = `${currentJoke.setup}\n${currentJoke.delivery}`;
    }
    
    navigator.clipboard.writeText(jokeText).then(() => {
        showNotification('Joke copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy joke');
    });
}

// Share joke
function shareJoke() {
    if (!currentJoke) return;
    
    let jokeText = '';
    if (currentJoke.type === 'single') {
        jokeText = currentJoke.joke;
    } else if (currentJoke.type === 'twopart') {
        jokeText = `${currentJoke.setup}\n${currentJoke.delivery}`;
    }
    
    if (navigator.share) {
        navigator.share({
            title: 'Check out this joke!',
            text: jokeText,
            url: window.location.href
        }).catch((error) => {
            console.error('Error sharing:', error);
        });
    } else {
        // Fallback: copy to clipboard
        copyJoke();
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Load initial joke on page load
window.addEventListener('load', () => {
    getJoke();
});

// Allow Enter key to get new joke
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const getJokeBtn = document.getElementById('getJokeBtn');
        if (!getJokeBtn.disabled) {
            getJoke();
        }
    }
});
