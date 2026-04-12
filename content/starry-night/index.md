---
title: "Для Юлі"
layout: "blank"
---

<style>
    body, html { margin: 0; padding: 0; background: #000; overflow: hidden; }
    #starCanvas { position: fixed; top: 0; left: 0; z-index: 1; touch-action: none; }
    #loveMessage {
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        color: white; font-family: sans-serif; font-size: 24px; text-align: center;
        opacity: 0; transition: opacity 2s; z-index: 2; pointer-events: none;
    }
</style>

<canvas id="starCanvas"></canvas>
<div id="loveMessage">Ти моє найяскравіше сузір'я, Юля ❤️</div>

<script>
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let w, h, stars = [], points = [];

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = Array.from({length: 150}, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() * 2,
        o: Math.random()
    }));
}

function draw() {
    ctx.fillStyle = '#000005';
    ctx.fillRect(0, 0, w, h);
    
    // Малюємо фонові зірки
    stars.forEach(s => {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.o})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.s, 0, Math.PI*2);
        ctx.fill();
        s.o += (Math.random() - 0.5) * 0.05;
        if(s.o < 0.1) s.o = 0.1; if(s.o > 1) s.o = 1;
    });

    // Малюємо лінії сузір'я
    if (points.length > 1) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
        
        points.forEach(p => {
            ctx.fillStyle = 'white';
            ctx.shadowBlur = 10; ctx.shadowColor = 'white';
            ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI*2); ctx.fill();
        });
        ctx.shadowBlur = 0;
    }
    requestAnimationFrame(draw);
}

canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const touch = e.touches[0];
    const last = points[points.length - 1];
    if (!last || Math.hypot(touch.clientX - last.x, touch.clientY - last.y) > 30) {
        points.push({x: touch.clientX, y: touch.clientY});
    }
    if (points.length > 12) document.getElementById('loveMessage').style.opacity = 1;
}, {passive: false});

window.addEventListener('resize', init);
init();
draw();
</script>