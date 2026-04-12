<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Для Юлі</title>
    <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #000008; }
        canvas { display: block; touch-action: none; position: fixed; top: 0; left: 0; }
        #msg {
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            color: white; font-family: 'Georgia', serif; font-size: 26px; text-align: center;
            opacity: 0; transition: opacity 3s; pointer-events: none; width: 85%;
            text-shadow: 0 0 20px rgba(255,255,255,0.8); z-index: 10;
        }
        #hint {
            position: fixed; bottom: 30px; width: 100%; text-align: center;
            color: rgba(255,255,255,0.5); font-family: sans-serif; font-size: 14px; z-index: 10;
        }
    </style>
</head>
<body>
    <canvas id="c"></canvas>
    <div id="msg">Ти моє найяскравіше сузір'я, Юля ❤️</div>
    <div id="hint">З'єднай зірки у формі серця...</div>

    <script>
    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('c');
        const ctx = canvas.getContext('2d');
        let w, h, stars = [], heartPoints = [], isFinished = false;

        function init() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            
            // Створюємо фонові зірки
            stars = Array.from({length: 100}, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.5,
                o: Math.random()
            }));

            // Створюємо опорні точки серця
            heartPoints = [];
            const centerX = w / 2;
            const centerY = h / 2 - 30;
            const scale = Math.min(w, h) / 30; 

            for (let t = 0; t < Math.PI * 2; t += 0.3) {
                const x = centerX + 16 * Math.pow(Math.sin(t), 3) * scale;
                const y = centerY - (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * scale;
                heartPoints.push({x, y, active: false});
            }
        }

        function draw() {
            ctx.fillStyle = '#000008';
            ctx.fillRect(0, 0, w, h);

            // Малюємо фон
            stars.forEach(s => {
                ctx.fillStyle = `rgba(255,255,255,${s.o})`;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();
                s.o += (Math.random() - 0.5) * 0.02;
                if(s.o < 0.1) s.o = 0.1; if(s.o > 1) s.o = 1;
            });

            // Малюємо точки серця
            heartPoints.forEach(p => {
                ctx.shadowBlur = p.active ? 15 : 0;
                ctx.shadowColor = 'white';
                ctx.fillStyle = p.active ? 'white' : 'rgba(255,255,255,0.2)';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.active ? 3 : 1.5, 0, Math.PI*2);
                ctx.fill();
            });
            ctx.shadowBlur = 0;

            // З'єднуємо активні точки лініями
            ctx.strokeStyle = 'rgba(255,255,255,0.4)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            let firstActive = true;
            heartPoints.forEach((p, i) => {
                if(p.active) {
                    if(firstActive) { ctx.moveTo(p.x, p.y); firstActive = false; }
                    else { ctx.lineTo(p.x, p.y); }
                }
            });
            ctx.stroke();

            requestAnimationFrame(draw);
        }

        function handleTouch(ex, ey) {
            if (isFinished) return;
            heartPoints.forEach(p => {
                const d = Math.hypot(ex - p.x, ey - p.y);
                if (d < 35) p.active = true;
            });

            if (heartPoints.every(p => p.active)) {
                isFinished = true;
                document.getElementById('msg').style.opacity = 1;
                document.getElementById('hint').style.opacity = 0;
                if(navigator.vibrate) navigator.vibrate(200);
            }
        }

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            handleTouch(e.touches[0].clientX, e.touches[0].clientY);
        }, {passive: false});

        canvas.addEventListener('mousemove', (e) => {
            if(e.buttons > 0) handleTouch(e.clientX, e.clientY);
        });

        window.addEventListener('resize', init);
        init();
        draw();
    });
    </script>
</body>
</html>