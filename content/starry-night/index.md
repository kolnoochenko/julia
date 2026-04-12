---
title: "Для моєї зірочки Юлі"
date: 2023-10-27
# Спробуємо вимкнути стандартні елементи теми, щоб небо було на весь екран
# (Назви параметрів можуть відрізнятися залежно від твоєї теми Hugo)
layout: "blank" # Якщо в темі є пустий шаблон
outputs: ["HTML"]
# Якщо твоя тема підтримує приховування меню/футера:
hideHeader: true
hideFooter: true
---

<style>
    body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden; /* Щоб сторінка не скролилася */
        background-color: #000005; /* Дуже темний синій, майже чорний */
    }

    #starCanvas {
        display: block;
        touch-action: none; /* Важливо для iPhone, щоб вимкнути стандартні жести */
    }

    /* Повідомлення, яке з'явиться в кінці */
    #loveMessage {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-family: 'Georgia', serif; /* Або будь-який гарний шрифт */
        font-size: 2.5rem;
        text-align: center;
        opacity: 0;
        transition: opacity 2s ease-in-out;
        pointer-events: none; /* Щоб не заважало малювати */
        text-shadow: 0 0 10px rgba(255,255,255,0.8);
        width: 90%;
    }

    #starCanvas {
    display: block;
    position: fixed; /* Фіксуємо на весь екран */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999; /* Виносимо на самий передній план */
    background-color: #000005;
    touch-action: none;
}
#loveMessage {
    z-index: 10000; /* Текст має бути ще вище */
}
</style>

<canvas id="starCanvas"></canvas>

<div id="loveMessage">Ти моє найяскравіше сузір'я, Юля ❤️</div>

<script src="stars.js"></script>.