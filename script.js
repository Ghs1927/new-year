const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('music-control');

// 1. Initial Waddle Animation on Load
window.onload = () => {
    setTimeout(() => {
        const stage = document.getElementById('intro-stage');
        stage.classList.add('arrived');
        setTimeout(() => { stage.classList.remove('walking'); }, 3500);
    }, 500);
};

// 2. Start the magic on Button Click
function startTheMagic() {
    music.play().catch(e => console.log("Audio file missing or blocked"));
    musicBtn.style.display = 'flex';
    
    document.getElementById('intro-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('intro-screen').style.display = 'none';
        
        initMatrix();
        document.getElementById('matrixCanvas').style.opacity = '1';
        
        // --- 17 SECOND SYNC CALCULATION ---
        // Wait 5s rain + 3s countdown + 9s Title = 17s drop
        setTimeout(() => { runCountdown(); }, 5000); 
    }, 800);
}

function toggleMusic() {
    if (music.paused) { music.play(); musicBtn.style.opacity = "1"; } 
    else { music.pause(); musicBtn.style.opacity = "0.5"; }
}

function runCountdown() {
    const countEl = document.getElementById('count-number');
    countEl.style.display = 'flex';
    let count = 3;
    const timer = setInterval(() => {
        count--;
        if(count > 0) { 
            countEl.innerText = count; 
        } 
        else {
            clearInterval(timer);
            countEl.style.display = 'none';
            showReveal();
        }
    }, 1000);
}

function showReveal() {
    document.getElementById('reveal-screen').classList.add('active');
    
    setTimeout(() => {
        document.getElementById('reveal-title').style.opacity = '1';
        confetti({ particleCount: 200, spread: 80, origin: { y: 0.3 } });
        
        // Syncing the Letter Reveal to the 17s lyrics drop
        setTimeout(() => {
            const container = document.getElementById('letter-container');
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
            
            setTimeout(() => { startTypewriter(); }, 1000);
        }, 7000); 

    }, 500);
}

function startTypewriter() {
    /* PASTE YOUR FINAL MESSAGE BELOW!
       Use <br><br> for new paragraphs.
    */
    const message = "My Dear Honeyy,<br><br>" +
                    "Wishing You a Very Happy New Year Bangaram.I Hope Everything goes perfectly for you to the very last second of 2025 and i wish every second of the 2026 will be fulfiling our dreams from us growing old together and living and enjoying every moment in our life together. I wish 2026 will give all the luck and blessings to us .<br><br>" +
                    "I Missed You Alottt telsaa.. How can i not You are my other half and nothing in this world is perfect without its other half right.. only you make me complete and a whole person honeyyy and im sooo luckyyyy to have you in my life.I Love You sooo muchh honeyy if one day the universe asks me what do you want, ill chose you in every universe honeyy I Love you soo muchh. i want to spend happily rest of my life with you honeyy.ik we havent spent much time together this year but those very moments im there beside you, are more precious to me than any diamond worth.. every second i spent with you im longing for those moments again and again you are my happiness bangaram my love my wifeee ill work hard and ill take you with me bangaram i wish u will be happy all the time honeyy and me being beside you all the time honeyy 'NANU NINNANNU PRITISUTENE' 'NANU UNNAI KAADHALIKEREN MANIVI'  Uk i never felt special abt learning different languages until u said its good honeyy makes me want to learn more so i can express all my love to u in every languages i learnt hehe.<br><br>" +
                    "once again wishing you and our family a very very happy new year honeyy ❤️, wishing everything will go good and u will be happy all the time.stay safe stay happy keep smiling honeyy im missing you alott i lovee you soo muchh banaram ";
    
    let i = 0;
    const textEl = document.getElementById('letter-text');
    const scrollBox = document.getElementById('scroll-box');
    
    const typewriter = setInterval(() => {
        if (message.slice(i, i + 4) === "<br>") {
            textEl.innerHTML += "<br>"; i += 4;
        } else {
            textEl.innerHTML += message.charAt(i); i++;
        }
        scrollBox.scrollTop = scrollBox.scrollHeight;
        if (i >= message.length) {
            clearInterval(typewriter);
            document.getElementById('replay-btn').style.opacity = '1';
        }
    }, 50);
}

function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const columns = canvas.width / 20;
    const drops = Array(Math.floor(columns)).fill(1);
    function draw() {
        ctx.fillStyle = "rgba(5, 5, 5, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff2d75";
        ctx.font = "18px monospace";
        for (let i = 0; i < drops.length; i++) {
            const text = "HAPPYNEWYEAR2026MYDEARLOVE❤️✨"[Math.floor(Math.random()*23)];
            ctx.fillText(text, i * 20, drops[i] * 20);
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 50);

}



