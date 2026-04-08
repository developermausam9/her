// --- TRACKING CONFIGURATION ---
// Paste your Webhook URL (Discord, Slack, or Formspree) below to get notified!
const TRACKING_URL = "https://formspree.io/f/xvzvynqg"; 

const TARGET_DATE = new Date('April 9, 2026 00:00:00').getTime();

const timelineData = [
    {
        date: "2010 - The Beginning",
        title: "A Star is Born",
        description: "The world got a little brighter today. A tiny bundle of joy with the biggest smile.",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800"
    },
    {
        date: "2014 - First Steps",
        title: "Exploring the World",
        description: "Endless curiosity and those adorable pigtails. Everything was a new adventure.",
        image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800"
    },
    {
        date: "2018 - School Days",
        title: "Making Friends",
        description: "First day of school, big backpack, and even bigger dreams. The journey of learning begins.",
        image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=800"
    },
    {
        date: "2022 - Growing Up",
        title: "Finding Her Voice",
        description: "Becoming the amazing person she is today. Talented, kind, and always inspiring.",
        image: "https://images.unsplash.com/photo-1529626458564-2f43c91a32a1?q=80&w=800"
    },
    {
        date: "Today - April 9",
        title: "Happy Birthday!",
        description: "Another beautiful year older, wiser, and more wonderful. Here's to all your dreams coming true.",
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800"
    }
];

let countdownSection, flowerSection, letterSection, timelineSection, hoursEl, minutesEl, secondsEl, timelineContainer;
let timerInterval, transitionTimeout;

function init() {
    countdownSection = document.getElementById('countdown-section');
    flowerSection = document.getElementById('flower-section');
    letterSection = document.getElementById('letter-section');
    timelineSection = document.getElementById('timeline-section');
    hoursEl = document.getElementById('hours');
    minutesEl = document.getElementById('minutes');
    secondsEl = document.getElementById('seconds');
    timelineContainer = document.querySelector('.timeline-container');

    const proceedBtn = document.getElementById('proceed-btn');
    if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
            clearTimeout(transitionTimeout);
            showTimeline();
        });
    }

    // Gift Interaction Logic
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    
    if (noBtn) {
        noBtn.addEventListener('mouseover', moveButton);
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveButton();
        });
    }
    
    if (yesBtn) {
        yesBtn.addEventListener('click', confirmGift);
    }

    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
    renderTimeline();
    
    const testTrigger = document.getElementById('test-trigger');
    if (testTrigger) {
        testTrigger.onclick = startCelebration;
    }

    // Initial Tracking: She opened the link!
    notifyUser("Journey Started! 🚀 She just opened the link.");
}

async function notifyUser(message) {
    if (!TRACKING_URL) {
        console.log("Tracking (Simulated):", message);
        return;
    }

    try {
        await fetch(TRACKING_URL, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message }) 
        });
    } catch (err) {
        console.error("Tracking Error:", err);
    }
}

function moveButton() {
    const btn = document.getElementById('no-btn');
    const x = Math.random() * (window.innerWidth - 100) - window.innerWidth/4;
    const y = Math.random() * (200) - 100;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function confirmGift() {
    const actions = document.querySelector('.gift-actions');
    if (actions) actions.style.display = 'none';
    
    const successMsg = document.createElement('div');
    successMsg.className = 'gift-success-msg';
    successMsg.innerHTML = "Yay! I can't wait to give it to you. ❤️<br><br>Happiest Birthday again, beautiful!";
    document.querySelector('.letter-body').appendChild(successMsg);
    
    // Confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }

    // Final Tracking: She accepted the gift!
    notifyUser("SHE SAID YES! ❤️🎁 She accepted your gift invitation.");
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'falling-petal';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.opacity = Math.random() * 0.9;
    confetti.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;

    if (distance <= 0) {
        clearInterval(timerInterval);
        startCelebration();
        return;
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
}

function startCelebration() {
    if (countdownSection) countdownSection.classList.remove('active');
    setTimeout(() => {
        if (countdownSection) countdownSection.style.display = 'none';
        if (flowerSection) {
            flowerSection.style.display = 'flex';
            setTimeout(() => flowerSection.classList.add('active'), 100);
        }
        
        startFallingPetals();
        setTimeout(showLetter, 7000);
    }, 1500);
}

function showLetter() {
    if (letterSection) {
        letterSection.classList.add('active');
        transitionTimeout = setTimeout(showTimeline, 25000);
    }
}

function startFallingPetals() {
    const container = document.createElement('div');
    container.className = 'petals-container';
    document.body.appendChild(container);

    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'falling-petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 4 + 3 + 's';
        petal.style.opacity = Math.random() * 0.7;
        petal.style.background = Math.random() > 0.5 ? '#ff4d6d' : '#800015';
        container.appendChild(petal);
        setTimeout(() => petal.remove(), 7000);
    }, 600);
}

function showTimeline() {
    if (flowerSection) flowerSection.style.opacity = '0';
    if (letterSection) letterSection.style.opacity = '0';
    
    setTimeout(() => {
        if (flowerSection) flowerSection.style.display = 'none';
        if (letterSection) letterSection.style.display = 'none';
        
        if (timelineSection) {
            timelineSection.style.display = 'flex';
            setTimeout(() => {
                timelineSection.classList.add('active');
            }, 100);
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('in-view');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
    }, 1500);
}

function renderTimeline() {
    if (!timelineContainer) return;
    timelineContainer.innerHTML = '';
    timelineData.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
            <span class="timeline-date">${item.date}</span>
            <img src="${item.image}" alt="${item.title}" class="timeline-img">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        timelineContainer.appendChild(div);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
