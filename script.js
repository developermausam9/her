// --- TRACKING CONFIGURATION ---
// Paste your Webhook URL (Discord, Slack, or Formspree) below to get notified!
const TRACKING_URL = "https://formspree.io/f/xvzvynqg";

const TARGET_DATE = new Date('April 10, 2026 00:00:00').getTime();

const timelineData = [
    {
        date: "The Beginning",
        title: "A little after you were Born",
        description: "I wish if i had sabse sano ko photo , that's all i had but its very cute😅.",
        image: "very small.jpeg"
    },
    {
        date: "A little grown up",
        title: "I guess guniyo choli hola ?😅",
        description: "Finally aalik thuli vayexeu, you look really cute and innocent in this pic like you are today😅.",
        image: "gunyo.jpeg"
    },
    {
        date: "A cute smile ?",
        title: "Still the same",
        description: "Noting to say , that's you and the same cute smile❤️ .",
        image: "withmom.jpeg"
    },
    {
        date: "Growing Up",
        title: "I feel like little grown up",
        description: "Aalik clear chai payena but i believe you had cute face and i guess voice ne clear huna thaleko thyo 😅❤️.",
        image: "joint.png"
    },
    {
        date: "Today - April 10",
        title: "Happy Birthday!",
        description: "Another beautiful year older, wiser, and more wonderful. Here's to all your dreams coming true ❤️. Aru bich ko timeline thyena so i skipped😅.",
        image: "hbd.jpeg"
    }
];

let countdownSection, flowerSection, cakeSection, letterSection, timelineSection, mysterySection, hoursEl, minutesEl, secondsEl, timelineContainer;
let timerInterval, transitionTimeout;

function init() {
    countdownSection = document.getElementById('countdown-section');
    flowerSection = document.getElementById('flower-section');
    cakeSection = document.getElementById('cake-section');
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

    const blowBtn = document.getElementById('blow-btn');
    if (blowBtn) {
        blowBtn.addEventListener('click', blowOutCandles);
    }

    mysterySection = document.getElementById('mystery-section');
    
    const mysteryTriggerBtn = document.getElementById('mystery-trigger-btn');
    if (mysteryTriggerBtn) {
        mysteryTriggerBtn.addEventListener('click', showMystery);
    }

    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', openMysteryLetter);
    }

    const blurNoBtn = document.getElementById('blur-no-btn');
    if (blurNoBtn) blurNoBtn.addEventListener('click', revealFinalSurprise);

    const finalNoBtn = document.getElementById('final-no-btn');
    const finalYesBtn = document.getElementById('final-yes-btn');
    if (finalNoBtn) {
        finalNoBtn.addEventListener('mouseover', moveFinalNoButton);
        finalNoBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveFinalNoButton();
        });
    }
    if (finalYesBtn) finalYesBtn.addEventListener('click', confirmFinalSurprise);

    const readyWishBtn = document.getElementById('ready-wish-btn');
    if (readyWishBtn) {
        readyWishBtn.addEventListener('click', async () => {
            // First things first: Create AudioContext synchronously
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            const intro = document.getElementById('wish-intro');
            const micArea = document.getElementById('mic-area');
            if (intro) intro.style.display = 'none';
            if (micArea) micArea.style.display = 'block';
            
            // Now request mic immediately
            await initMicrophone();
        });
    }

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
    const x = Math.random() * (window.innerWidth - 100) - window.innerWidth / 4;
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
        setTimeout(showCake, 7000);
    }, 1500);
}

function showCake() {
    if (flowerSection) flowerSection.style.opacity = '0';
    setTimeout(() => {
        if (flowerSection) flowerSection.style.display = 'none';
        if (cakeSection) {
            cakeSection.style.display = 'flex';
            setTimeout(() => {
                cakeSection.classList.add('active');
                document.querySelector('.cake-instructions').classList.add('visible');
            }, 100);
        }
    }, 1500);
}

let audioContext, analyser, microphone, javascriptNode;
let isExtinguished = false;

async function initMicrophone() {
    const statusEl = document.getElementById('mic-status');
    const micBar = document.querySelector('.mic-bar');
    const blowBtn = document.getElementById('blow-btn');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        if (statusEl) statusEl.innerText = "Browser doesn't support mic access (requires HTTPS).";
        if (blowBtn) blowBtn.style.display = 'block';
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        javascriptNode.onaudioprocess = function () {
            if (isExtinguished) return;

            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            let values = 0;

            const length = array.length;
            for (let i = 0; i < length; i++) {
                values += (array[i]);
            }

            const average = values / length;
            const volume = Math.min(100, Math.max(0, average * 1.5));

            if (micBar) micBar.style.width = volume + "%";

            // Threshold for "blowing" (sustained volume above 40)
            if (average > 40) {
                blowOutCandles();
            }
        };

        if (statusEl) statusEl.innerText = "Listening for your wish...";
    } catch (err) {
        console.error("Microphone Error:", err);
        let errorMsg = "Mic access blocked. 🚫";
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            errorMsg = "Mic permission was denied. Please reset permissions in your browser settings!";
        } else if (!window.isSecureContext) {
            errorMsg = "Mic requires a secure (HTTPS) connection to work on mobile.";
        }
        
        if (statusEl) statusEl.innerText = errorMsg;
        if (blowBtn) blowBtn.style.display = 'block';
        notifyUser("Microphone failed on mobile: " + err.name);
    }
}

function blowOutCandles() {
    if (isExtinguished) return;
    isExtinguished = true;

    const candle = document.querySelector('.candle');
    if (candle) candle.classList.add('blown-out');

    // Stop audio processing
    if (javascriptNode) {
        javascriptNode.onaudioprocess = null;
    }

    const micFeedback = document.querySelector('.mic-feedback');
    if (micFeedback) micFeedback.style.display = 'none';
    const micPrompt = document.querySelector('.mic-prompt');
    if (micPrompt) micPrompt.style.display = 'none';
    const statusEl = document.getElementById('mic-status');
    if (statusEl) statusEl.innerText = "Wish granted! ✨";

    // Confetti effect
    for (let i = 0; i < 80; i++) {
        createConfetti();
    }

    const blowBtn = document.getElementById('blow-btn');
    if (blowBtn) blowBtn.style.display = 'none';

    notifyUser("CANDLE BLOWN! 🎂 She physically blew into the mic!");

    // Transition to Timeline directly as requested
    setTimeout(showTimeline, 3000);
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
    if (cakeSection) cakeSection.style.opacity = '0';

    setTimeout(() => {
        if (flowerSection) flowerSection.style.display = 'none';
        if (letterSection) letterSection.style.display = 'none';
        if (cakeSection) cakeSection.style.display = 'none';

        if (timelineSection) {
            timelineSection.style.display = 'flex';
            setTimeout(() => {
                timelineSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
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

function showMystery() {
    if (timelineSection) timelineSection.style.opacity = '0';
    setTimeout(() => {
        if (timelineSection) timelineSection.style.display = 'none';
        if (mysterySection) {
            mysterySection.style.display = 'flex';
            setTimeout(() => {
                mysterySection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    }, 1000);
}

function openMysteryLetter() {
    const opening = document.getElementById('mystery-letter-opening');
    const challenge = document.getElementById('blur-challenge-container');
    if (opening) opening.style.display = 'none';
    if (challenge) challenge.style.display = 'block';
    notifyUser("Mystery Letter Opened! 💌");
}

function revealFinalSurprise() {
    const challenge = document.getElementById('blur-challenge-container');
    const final = document.getElementById('final-surprise-container');
    
    setTimeout(() => {
        if (challenge) challenge.style.display = 'none';
        if (final) final.style.display = 'block';
    }, 800);
    
    notifyUser("Comparison Question Answered! 🤭");
}

function moveFinalNoButton() {
    const btn = document.getElementById('final-no-btn');
    const x = Math.random() * (window.innerWidth - 100) - window.innerWidth / 4;
    const y = Math.random() * (200) - 100;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function confirmFinalSurprise() {
    const actions = document.querySelector('#final-surprise-container .gift-actions');
    const successMsg = document.getElementById('final-success-msg');
    
    if (actions) actions.style.display = 'none';
    if (successMsg) successMsg.style.display = 'block';

    // Confetti effect
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }

    notifyUser("FINAL SURPRISE ACCEPTED! ❤️🎁 She said YES to the gift surprise!");
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
