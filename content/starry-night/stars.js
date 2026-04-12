<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Для моєї Юлі</title>
    <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #000005; }
        canvas { display: block; touch-action: none; position: fixed; top: 0; left: 0; z-index: 1; }
        #msg {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            color: white; font-family: 'Georgia', serif; font-size: 28px; text-align: center;
            opacity: 0; transition: opacity 3s; pointer-events: none; width: 90%;
            text-shadow: 0 0 25px rgba(255,255,255,0.9);
            z-index: 2; /* Щоб бути над канвасом */
        }
        #hint {
            position: absolute; bottom: 40px; width: 100%; text-align: center;
            color: rgba(255,255,255,0.3); font-family: sans-serif; font-size: 14px;
            z-index: 2;
        }
    </style>
</head>
<body>
    <canvas id="c"></canvas>
    <div id="msg">Ти моє найяскравіше сузір'я, Юля ❤️</div>
    <div id="hint">Обведи серце серед зірок...</div>

    <script>
        const canvas = document.getElementById('c');
        const ctx = canvas.getContext('2d');
        let w, h, stars = [], heartPoints = [], tracedPoints = [], isFinished = false;

        // Налаштування серця
        const heartSize = 15; // Масштаб серця
        const tracingPrecision = 20; // Радіус точності обведення (пікселі)

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            generateHeartPoints(); // Перемальовуємо серце під новий розмір
        }

        function createStars() {
            stars = Array.from({length: 120}, () => ({
                x: Math.random()*w, y: Math.random()*h, 
                r: Math.random()*1.2, o: Math.random(), s: Math.random()*0.015
            }));
        }

        // Математична формула серця (для контуру)
        function generateHeartPoints() {
            heartPoints = [];
            const centerX = w / 2;
            const centerY = h / 2 - 20; // Трохи вище центру
            for (let t = 0; t <= Math.PI * 2; t += 0.1) {
                // Класична формула: x = 16sin^3(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
                const x = centerX + 16 * Math.pow(Math.sin(t), 3) * heartSize;
                const y = centerY - (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * heartSize;
                heartPoints.push({x: x, y: y, isTraced: false});
            }
        }

        function draw() {
            ctx.fillStyle = '#000005';
            ctx.fillRect(0,0,w,h);
            
            // 1. Фонові зірки
            stars.forEach(s => {
                ctx.fillStyle = `rgba(255,255,255,${s.o})`;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();
                s.o += (Math.random()-0.5)*0.03;
                if(s.o<0.1) s.o=0.1; if(s.o>1) s.o=1;
            });

            // 2. Контур серця (сузір'я-підказка)
            ctx.strokeStyle = isFinished ? 'rgba(255,100,100,0.9)' : 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 5]); // Пунктирна лінія, щоб виглядало як сузір'я
            ctx.beginPath();
            ctx.moveTo(heartPoints[0].x, heartPoints[0].y);
            heartPoints.forEach(p => ctx.lineTo(p.x, p.y));
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]); // Скидаємо пунктир

            // 3. Точки, які вона вже обвела
            tracedPoints.forEach(p => {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.shadowBlur = 10; ctx.shadowColor = 'white';
                ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI*2); ctx.fill();
                ctx.shadowBlur = 0;
            });

            // 4. Ефект сяйва, якщо завершено
            if (isFinished) {
                ctx.shadowBlur = 30; ctx.shadowColor = 'white';
                ctx.strokeStyle = 'white'; ctx.lineWidth = 2;
                ctx.stroke(); ctx.shadowBlur = 0;
            }

            requestAnimationFrame(draw);
        }

        function handlePointerMove(clientX, clientY) {
            if (isFinished) return;
            
            let allTraced = true;
            heartPoints.forEach(hp => {
                const dist = Math.hypot(clientX - hp.x, clientY - hp.y);
                if (dist < tracingPrecision) {
                    if (!hp.isTraced) { hp.isTraced = true; tracedPoints.push(hp); }
                }
                if (!hp.isTraced) allTraced = false;
            });

            if (allTraced && heartPoints.length > 0) {
                isFinished = true;
                showSuccess();
            }
        }

        function showSuccess() {
            document.getElementById('msg').style.opacity = 1;
            document.getElementById('hint').style.display = 'none';
            if (navigator.vibrate) navigator.vibrate([100, 50, 200]);
        }

        // Події для iPhone (touch)
        canvas.addEventListener('touchstart', e => { e.preventDefault(); tracedPoints = []; heartPoints.forEach(p => p.isTraced = false); }, {passive: false});
        canvas.addEventListener('touchmove', e => {
            e.preventDefault();
            const t = e.touches[0];
            handlePointerMove(t.clientX, t.clientY);
        }, {passive: false});

        window.addEventListener('resize', resize);
        resize();
        createStars();
        draw();
    </script>
</body>
</html>