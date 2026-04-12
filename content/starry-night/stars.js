const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('loveMessage');

// Налаштування екрану
let width, height;
function setCanvasSize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Налаштування зірок
const numStars = 200; // Скільки зірок буде на небі спочатку
const stars = [];
let touchedPoints = []; // Точки, де Юля провела пальцем
const drawingDistance = 50; // Відстань між точками, щоб провести лінію
let isMessageShown = false;

// Клас Зірки
class Star {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5;
        this.opacity = Math.random();
        this.speed = Math.random() * 0.05; // Трохи рухаються
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        // Мерехтіння
        this.opacity += (Math.random() - 0.5) * 0.03;
        if (this.opacity < 0.1) this.opacity = 0.1;
        if (this.opacity > 1) this.opacity = 1;
        
        // Легкий рух
        this.y -= this.speed;
        if (this.y < 0) this.y = height;
    }
}

// Ініціалізація зірок
function initStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

// Функція малювання фонового неба
function drawSky() {
    ctx.fillStyle = '#000005';
    ctx.fillRect(0, 0, width, height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
}

// Функція малювання ліній сузір'я
function drawConstellation() {
    if (touchedPoints.length < 2) return;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; // Колір ліній
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(touchedPoints[0].x, touchedPoints[0].y);

    for (let i = 1; i < touchedPoints.length; i++) {
        ctx.lineTo(touchedPoints[i].x, touchedPoints[i].y);
    }
    ctx.stroke();

    // Додаємо яскраві зірки в точках дотику
    touchedPoints.forEach(point => {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
        // Ефект світіння
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'white';
    });
    ctx.shadowBlur = 0; // Скидаємо тінь
}

// Головний цикл анімації
function animate() {
    drawSky();
    drawConstellation();
    checkCompletion();
    requestAnimationFrame(animate);
}

// Відстеження дотиків (для iPhone)
canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchmove', handleTouchMove, false);

function getTouchPos(e) {
    return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
}

function handleTouchStart(e) {
    const pos = getTouchPos(e);
    // Додаємо першу точку, якщо ще не малювали
    if (touchedPoints.length === 0) {
        touchedPoints.push(pos);
    }
}

function handleTouchMove(e) {
    e.preventDefault(); // Запобігає скролу на iPhone
    const pos = getTouchPos(e);
    
    if (touchedPoints.length === 0) return;

    const lastPoint = touchedPoints[touchedPoints.length - 1];
    // Обчислюємо відстань від останньої точки
    const dist = Math.hypot(pos.x - lastPoint.x, pos.y - lastPoint.y);

    // Додаємо точку, тільки якщо палець просунувся достатньо далеко
    // Це створює красиві сегменти ліній
    if (dist > drawingDistance) {
        touchedPoints.push(pos);
    }
}

// Перевіряємо, чи достатньо вона "намалювала"
function checkCompletion() {
    // Якщо вона провела достатньо довгу лінію (наприклад, 10 точок)
    if (touchedPoints.length > 10 && !isMessageShown) {
        isMessageShown = true;
        showMessage();
    }
}

function showMessage() {
    message.style.opacity = 1;
    // Через 5 секунд лінії можна стерти, щоб почати заново (за бажанням)
    // setTimeout(() => { touchedPoints = []; isMessageShown = false; message.style.opacity = 0; }, 5000);
}

// Запуск
initStars();
animate();