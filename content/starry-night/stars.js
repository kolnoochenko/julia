<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Для моєї Юлі</title>
    <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #000005; }
        canvas { display: block; touch-action: none; position: fixed; top: 0; left: 0; }
        #msg {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            color: white; font-family: 'Georgia', serif; font-size: 28px; text-align: center;
            opacity: 0; transition: opacity 2s; pointer-events: none; width: 90%;
            text-shadow: 0 0 20px rgba(255,255,255,0.8);
        }
        #hint {
            position: absolute; bottom: 30px; width: 100%; text-align: center;
            color: rgba(255,255,255,0.4); font-family: sans-serif; font-size: 14px;
        }
    </style>
</head>
<body>
    <canvas id="c"></canvas>
    <div id="msg">Ти моє найяскравіше сузір'я, Юля ❤️</div>
    <div id="hint">Намалюй серце серед зірок...</div>

    <script>
        const canvas = document.getElementById('c');
        const ctx = canvas.getContext('2d');
        let w, h, stars = [], points = [], isFinished = false;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        function createStars() {
            stars = Array.from({length: 150}, () => ({
                x: Math.random()*w, y: Math.random()*h, 
                r: Math.random()*1.5, o: Math.random(), s: Math.random()*0.02
            }));
        }

        function draw() {
            ctx.fillStyle = '#000005';
            ctx.fillRect(0,0,w,h);
            
            stars.forEach(s => {
                ctx.fillStyle = `rgba(255,255,255,${s.o})`;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();
                s.o += (Math.random()-0.5)*0.03;
                if(s.o<0.1) s.o=0.1; if(s.o>1) s.o=1;
            });

            if(points.length > 1) {
                ctx.strokeStyle = isFinished ? 'rgba(255,100,100,0.8)' : 'rgba(255,255,255,0.5)';
                ctx.lineWidth = 3;
                ctx.shadowBlur = isFinished ? 15 : 5;
                ctx.shadowColor = 'white';
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                points.forEach(p => ctx.lineTo(p.x, p.y));
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
            requestAnimationFrame(draw);
        }

        // Алгоритм перевірки серця
        function checkHeart() {
            if (points.length < 15) return false;

            let minX = Math.min(...points.map(p => p.x));
            let maxX = Math.max(...points.map(p => p.x));
            let minY = Math.min(...points.map(p => p.y));
            let maxY = Math.max(...points.map(p => p.y));
            
            let width = maxX - minX;
            let height = maxY - minY;

            // 1. Перевірка пропорцій (серце не має бути занадто вузьким)
            if (width < 50 || height < 50) return false;

            // 2. Перевірка на "замкненість" (початок і кінець близько один до одного)
            const start = points[0];
            const end = points[points.length - 1];
            const dist = Math.hypot(start.x - end.x, start.y - end.y);

            // 3. Перевірка на "впадинку" зверху (спрощена)
            // Шукаємо середню точку по X і дивимось чи є там вигин вниз
            const midX = (minX + maxX) / 2;
            const topPoints = points.filter(p => p.y < minY + height * 0.3);
            
            if (dist < width * 0.5 && topPoints.length > 2) {
                return true; // Схоже на серце!
            }
            return false;
        }

        canvas.addEventListener('touchstart', () => {
            if (isFinished) return;
            points = [];
            document.getElementById('hint').style.opacity = 0;
        });

        canvas.addEventListener('touchmove', e => {
            if (isFinished) return;
            e.preventDefault();
            const t = e.touches[0];
            points.push({x: t.clientX, y: t.clientY});
        }, {passive: false});

        canvas.addEventListener('touchend', () => {
            if (isFinished) return;
            if (checkHeart()) {
                isFinished = true;
                document.getElementById('msg').style.opacity = 1;
                // Можна додати вібрацію iPhone
                if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
            } else {
                // Якщо не серце — стираємо через 0.5 сек
                setTimeout(() => { if(!isFinished) points = []; }, 500);
            }
        });

        window.addEventListener('resize', resize);
        resize();
        createStars();
        draw();
    </script>
</body>
</html>