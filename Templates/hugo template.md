<%*
// 1. Беремо назву, яку ви дали нотатці (кирилицею)
let title = tp.file.title;

// 2. Функція транслітерації (Кирилиця -> Latin)
// Перетворює "Привіт Світ" у "privit-svit"
const translit = (str) => {
    const map = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ie', 'ж': 'zh', 'з': 'z',
        'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
        'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
        'ь': '', 'ю': 'iu', 'я': 'ia', ' ': '-', '’': '', '\'': ''
    };
    return str.toLowerCase().split('').map(c => map[c] || c).join('').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
}

let slug = translit(title);

// 3. МАГІЯ: Перейменовуємо файл фізично
// Це гарантує, що посилання в Телеграмі буде робочим!
await tp.file.rename(slug);
-%>
---
title: "<% title %>"
date: <% tp.date.now("YYYY-MM-DDTHH:mm:ss") %>+02:00
draft: true
summary: ""
cover:
    image: "/images/cover.jpg"
    alt: "<% title %>"
    caption: ""
    relative: false
---

<% tp.file.cursor %>
