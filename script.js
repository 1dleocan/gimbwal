const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');

// Change initial music state
let isMusicPlaying = false;

// Auto-play music when page loads
window.addEventListener('load', () => {
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        musicControl.classList.add('playing');
    }).catch(() => {
        // Handle auto-play blocked by browser
        console.log('Autoplay blocked');
    });
});

musicControl.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicControl.classList.remove('playing');
    } else {
        bgMusic.play();
        musicControl.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
});

const messages = [
    {
        text: "plss mau dong",
        image: "https://i.pinimg.com/736x/1e/7c/6f/1e7c6ff7a0c26f7eaefbce683656193d.jpg"
    },
    {
        text: "pls klik yg kiri",
        image: "https://i.pinimg.com/736x/90/73/a9/9073a9359bff531cd830ae7384752934.jpg"
    },
    {
        text: "terakhir, kalo \"no\" yauda deh",
        image: "https://i.pinimg.com/736x/a6/43/f5/a643f5a40db387585b56bc767b66fddb.jpg"
    }
];

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

setInterval(() => createHeart(), 300);

const title = document.querySelector('.title');
const noBtn = document.querySelector('.no-btn');
const yesBtn = document.querySelector('.yes-btn');
let noCount = 0;

function runAway(e) {
    const noButton = e.target;
    const yesButton = document.querySelector('.yes-btn');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const isMobile = window.innerWidth <= 768;

    // Get current button position
    const currentRect = noButton.getBoundingClientRect();
    
    // Calculate movement range
    const moveRange = isMobile ? 100 : 200;
    
    // Calculate new position based on current position
    let newX = currentRect.left + (Math.random() - 0.5) * moveRange;
    let newY = currentRect.top + (Math.random() - 0.5) * moveRange;
    
    // Keep button within viewport with padding
    const padding = isMobile ? 20 : 40;
    newX = Math.max(padding, Math.min(windowWidth - buttonWidth - padding, newX));
    newY = Math.max(padding, Math.min(windowHeight - buttonHeight - padding, newY));
    
    // Get Yes button position
    const yesRect = yesButton.getBoundingClientRect();
    
    // Check if new position would overlap with Yes button
    const wouldOverlap = (
        newX < yesRect.right + padding &&
        newX + buttonWidth > yesRect.left - padding &&
        newY < yesRect.bottom + padding &&
        newY + buttonHeight > yesRect.top - padding
    );
    
    // If would overlap, move in opposite direction
    if (wouldOverlap) {
        if (newX < yesRect.left) {
            newX = Math.max(padding, yesRect.left - buttonWidth - padding);
        } else {
            newX = Math.min(windowWidth - buttonWidth - padding, yesRect.right + padding);
        }
    }
    
    // Apply new position with smooth transition
    noButton.style.position = 'fixed';
    noButton.style.transition = isMobile ? 'all 0.8s ease' : 'all 0.3s ease';
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
    noButton.style.zIndex = '9999';
}

yesBtn.addEventListener('click', () => {
    title.innerHTML = "HORE!! i knew you would say vqsghvwegdsbjs";
    document.querySelector('img').src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/good-night-kiss-kiss.gif";
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';
    if (!isMusicPlaying) {
        bgMusic.play();
        musicControl.classList.add('playing');
        isMusicPlaying = true;
    }
});

noBtn.addEventListener('click', () => {
    if (noCount < 3) {
        noCount++;
        title.innerHTML = messages[noCount - 1].text;
        document.querySelector('img').src = messages[noCount - 1].image;
    } else {
        title.innerHTML = "TAPI BOONG HEHEHE";
        if (!noBtn.classList.contains('running')) {
            noBtn.classList.add('running');
            runAway({ target: noBtn });
        }
    }
});

// Handle both mouse and touch events
noBtn.addEventListener('mouseover', (e) => {
    if (noCount >= 3) runAway(e);
});

noBtn.addEventListener('touchstart', (e) => {
    if (noCount >= 3) {
        e.preventDefault();
        runAway(e);
    }
}, { passive: false });
