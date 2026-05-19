// Particle generation for a magical background effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize properties
        const size = Math.random() * 6 + 2 + 'px';
        const left = Math.random() * 100 + 'vw';
        const top = Math.random() * 100 + 'vh';
        const animationDuration = Math.random() * 4 + 4 + 's';
        const animationDelay = Math.random() * 3 + 's';

        particle.style.width = size;
        particle.style.height = size;
        particle.style.left = left;
        particle.style.top = top;
        particle.style.animationDuration = animationDuration;
        particle.style.animationDelay = animationDelay;

        particlesContainer.appendChild(particle);
    }
}

// Logic to transition between messages
let currentMessage = 1;

function nextMessage(step) {
    // Prevent event bubbling if a button was clicked
    if (window.event) {
        window.event.stopPropagation();
    }
    
    const currentEl = document.getElementById(`message${currentMessage}`);
    const nextEl = document.getElementById(`message${step}`);

    if (currentEl && nextEl) {
        currentEl.classList.remove('active');
        currentEl.classList.add('hidden');
        
        setTimeout(() => {
            nextEl.classList.remove('hidden');
            nextEl.classList.add('active');
        }, 300); // Wait for the fade out transition
        
        currentMessage = step;
    }
}

// Initial card click for the first message
let musicStarted = false;
document.getElementById('mainCard').addEventListener('click', function(e) {
    if (!musicStarted) {
        const bgMusic = document.getElementById('bgMusic');
        const musicPlayer = document.getElementById('musicPlayer');
        if (bgMusic) {
            bgMusic.volume = 0.4; // Set a nice soothing background volume
            bgMusic.play().catch(err => console.log("Audio play failed, user interaction might be needed:", err));
        }
        if (musicPlayer) {
            musicPlayer.style.opacity = '1';
        }
        musicStarted = true;
    }

    if (currentMessage === 1) {
        nextMessage(2);
    }
});

function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const toggleBtn = document.getElementById('musicToggle');
    
    if (bgMusic.paused) {
        bgMusic.play();
        toggleBtn.innerText = '🔊 Playing Music';
    } else {
        bgMusic.pause();
        toggleBtn.innerText = '🔈 Music Paused';
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Add active class to first message so it animates in with a slight delay
    setTimeout(() => {
        const msg1 = document.getElementById('message1');
        msg1.classList.remove('hidden');
        msg1.classList.add('active');
    }, 300);
});
