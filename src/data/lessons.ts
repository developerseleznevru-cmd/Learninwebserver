import type { Lesson } from '../types';

/**
 * Задания по курсам. Ключ — id курса из mockData.
 * checks — структурные правила: проверяются по очищенному от комментариев коду.
 */
export const lessonsByCourse: Record<string, Lesson[]> = {
  basics: [
    {
      id: 'basics-1',
      title: 'Каркас HTML-документа',
      goal: 'Собери минимальную страницу: объяви тип документа, корневой тег и тело.',
      checks: [
        {
          label: '<!DOCTYPE html>',
          pattern: /<!DOCTYPE\s+html>/i,
          message: 'Не хватает объявления <!DOCTYPE html>.',
        },
        {
          label: '<html>…</html>',
          pattern: /<html[^>]*>[\s\S]*<\/html>/i,
          message: 'Нужен корневой тег <html>…</html>.',
        },
        {
          label: '<head> с <title>',
          pattern: /<head[^>]*>[\s\S]*<title[^>]*>[\s\S]*<\/title>[\s\S]*<\/head>/i,
          message: 'В <head> помести <title> с названием страницы.',
        },
        {
          label: '<body> с контентом',
          pattern: /<body[^>]*>[\s\S]*\S[\s\S]*<\/body>/i,
          message: 'Внутри <body> должен быть видимый контент.',
        },
      ],
      starter: '<!-- Начни с объявления типа документа -->\n\n',
      solution:
        '<!DOCTYPE html>\n<html lang="ru">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Моя первая страница</title>\n  </head>\n  <body>\n    <h1>Привет, CodePulse!</h1>\n  </body>\n</html>',
      hint: 'Порядок такой: <!DOCTYPE html> → <html> → <head> и <body>.',
    },
    {
      id: 'basics-2',
      title: 'Заголовок и абзац',
      goal: 'Добавь в body заголовок первого уровня и короткий абзац о себе.',
      checks: [
        {
          label: '<h1> с текстом',
          pattern: /<h1[^>]*>[^<]+<\/h1>/i,
          message: 'Добавь заголовок первого уровня <h1> с текстом.',
        },
        {
          label: '<p> с текстом',
          pattern: /<p[^>]*>[^<]+<\/p>/i,
          message: 'Добавь абзац <p> с текстом.',
        },
        {
          label: 'оба внутри <body>',
          pattern: /<body[^>]*>[\s\S]*<h1[^>]*>[\s\S]*<p[^>]*>[\s\S]*<\/body>/i,
          message: 'Заголовок и абзац должны находиться внутри <body>.',
        },
      ],
      starter: '<body>\n\n</body>',
      solution: '<body>\n  <h1>Алекс</h1>\n  <p>Учусь верстать и программировать.</p>\n</body>',
      hint: 'Заголовок — <h1>, текст — <p>, оба закрываются.',
    },
    {
      id: 'basics-3',
      title: 'Ссылка и изображение',
      goal: 'Поставь ссылку на сайт и картинку с адресом src.',
      checks: [
        {
          label: '<a href="…">…</a>',
          pattern: /<a\s[^>]*href\s*=\s*("[^"]+"|'[^']+')[^>]*>[\s\S]*?<\/a>/i,
          message: 'Ссылка должна быть парным тегом <a> с атрибутом href.',
        },
        {
          label: '<img src="…">',
          pattern: /<img\s[^>]*src\s*=\s*("[^"]+"|'[^']+')[^>]*\/?>/i,
          message: 'Картинке нужен тег <img> с атрибутом src.',
        },
      ],
      starter: '<a>\n\n</a>',
      solution:
        '<a href="https://developer.mozilla.org">Документация</a>\n<img src="hero.png" alt="Мой проект" />',
      hint: 'У ссылки обязателен href, у картинки — src.',
    },
    {
      id: 'basics-4',
      title: 'Список дел',
      goal: 'Сверстай нумерованный список из трёх пунктов.',
      checks: [
        {
          label: '<ol>…</ol>',
          pattern: /<ol[^>]*>[\s\S]*<\/ol>/i,
          message: 'Нумерованный список — это <ol>…</ol>.',
        },
        {
          label: 'три <li>',
          pattern:
            /<li[^>]*>[\s\S]*?<\/li>[\s\S]*<li[^>]*>[\s\S]*?<\/li>[\s\S]*<li[^>]*>[\s\S]*?<\/li>/i,
          message: 'Внутри списка должно быть три пункта <li>.',
        },
      ],
      starter: '<ol>\n\n</ol>',
      solution:
        '<ol>\n  <li>Выучить HTML</li>\n  <li>Понять CSS</li>\n  <li>Написать скрипт</li>\n</ol>',
      hint: 'Пункты вставляются внутрь <ol> или <ul> как <li>.',
    },
    {
      id: 'basics-5',
      title: 'Первые стили',
      goal: 'Подключи блок style и задай абзацу цвет и внутренний отступ.',
      checks: [
        {
          label: '<style>…</style>',
          pattern: /<style[^>]*>[\s\S]*<\/style>/i,
          message: 'Стили подключаются блоком <style>…</style>.',
        },
        {
          label: 'p { color: … }',
          pattern: /p\s*\{[^}]*color\s*:\s*[^;}]+/i,
          message: 'Задай цвет в правиле p: color: #00d2ff.',
        },
        {
          label: 'p { padding: … }',
          pattern: /p\s*\{[^}]*padding\s*:\s*[^;}]+/i,
          message: 'Добавь внутренний отступ padding в правило p.',
        },
      ],
      starter: '<style>\n  /* стили страницы */\n</style>\n<p>Текст</p>',
      solution:
        '<style>\n  p {\n    color: #00d2ff;\n    padding: 12px;\n  }\n</style>\n<p>Текст</p>',
      hint: 'Правило выглядит так: p { color: #00d2ff; padding: 12px; }',
    },
    {
      id: 'basics-6',
      title: 'Оживляем кнопку',
      goal: 'Подключи скрипт: найди кнопку по id и поменяй её текст по клику.',
      checks: [
        {
          label: '<script>…</script>',
          pattern: /<script[^>]*>[\s\S]*<\/script>/i,
          message: 'Скрипт подключается тегом <script>.',
        },
        {
          label: "querySelector('#start')",
          pattern: /document\.querySelector\(\s*['"]#start['"]\s*\)/,
          message: "Найди кнопку через document.querySelector('#start').",
        },
        {
          label: "addEventListener('click')",
          pattern: /addEventListener\(\s*['"]click['"]/,
          message: "Повесь обработчик addEventListener('click', …).",
        },
        {
          label: 'смена textContent',
          pattern: /\.textContent\s*=/,
          message: 'Измени текст кнопки через textContent.',
        },
      ],
      starter: '<button id="start">Старт</button>\n<script>\n\n</script>',
      solution:
        '<button id="start">Старт</button>\n<script>\n  const button = document.querySelector(\'#start\');\n  button.addEventListener(\'click\', () => {\n    button.textContent = \'Поехали!\';\n  });\n</script>',
      hint: "querySelector('#start') даёт кнопку, addEventListener('click', ...) вешает обработчик.",
    },
  ],

  python: [
    {
      id: 'python-1',
      title: 'Первый вывод',
      goal: 'Выведи в консоль строку «Привет, Python!».',
      checks: [
        {
          label: 'print("Привет, Python!")',
          pattern: /print\(\s*(['"])Привет,\s+Python!\1\s*\)/,
          message: 'Выведи точную строку: print("Привет, Python!").',
        },
      ],
      starter: '# Твой код ниже\n',
      solution: 'print("Привет, Python!")',
      hint: 'Строка в кавычках внутри print().',
    },
    {
      id: 'python-2',
      title: 'Переменные и f-строка',
      goal: 'Сохрани имя и возраст в переменные и выведи их одной f-строкой.',
      checks: [
        {
          label: 'name = "…"',
          pattern: /^\s*name\s*=\s*(['"])[^'"]+\1/m,
          message: 'Присвой переменной name строку в кавычках.',
        },
        {
          label: 'age = число',
          pattern: /^\s*age\s*=\s*\d+/m,
          message: 'Присвой переменной age число.',
        },
        {
          label: 'f-строка с {name} и {age}',
          pattern: /print\(\s*f(['"])[^'"]*\{\s*name\s*\}[^'"]*\{\s*age\s*\}[^'"]*\1\s*\)/,
          message: 'Выведи f-строку, где подставлены {name} и {age}.',
        },
      ],
      starter: 'name = "Алекс"\nage = 25\n\n',
      solution: 'name = "Алекс"\nage = 25\nprint(f"Меня зовут {name}, мне {age} лет.")',
      hint: 'f-строка: f"Меня зовут {name}".',
    },
    {
      id: 'python-3',
      title: 'Условие',
      goal: 'Напиши проверку возраста: если 18 и больше — «Доступ разрешён», иначе — «Доступ закрыт».',
      checks: [
        {
          label: 'if age >= 18:',
          pattern: /if\s+age\s*>=\s*18\s*:/,
          message: 'Проверь условие: if age >= 18:.',
        },
        { label: 'else:', pattern: /^\s*else\s*:/m, message: 'Добавь ветку else:.' },
        {
          label: 'print в каждой ветке',
          pattern: /if\s+age\s*>=\s*18\s*:[\s\S]*print\([\s\S]*\)[\s\S]*else\s*:[\s\S]*print\(/,
          message: 'В каждой ветке должен быть свой print.',
        },
      ],
      starter: 'age = 20\n\n',
      solution:
        'age = 20\nif age >= 18:\n    print("Доступ разрешён")\nelse:\n    print("Доступ закрыт")',
      hint: 'Условие: if age >= 18: и ветка else: с отступом в 4 пробела.',
    },
    {
      id: 'python-4',
      title: 'Цикл for',
      goal: 'Выведи квадраты чисел от 1 до 5 через цикл.',
      checks: [
        {
          label: 'for … in range(1, 6):',
          pattern: /for\s+\w+\s+in\s+range\(\s*1\s*,\s*6\s*\)\s*:/,
          message: 'Перебери числа: for number in range(1, 6):.',
        },
        {
          label: 'print(number ** 2)',
          pattern: /print\(\s*\w+\s*\*\*\s*2\s*\)/,
          message: 'Выведи квадрат числа: print(number ** 2).',
        },
      ],
      starter: '',
      solution: 'for number in range(1, 6):\n    print(number ** 2)',
      hint: 'range(1, 6) даёт 1…5, а ** — возведение в степень.',
    },
    {
      id: 'python-5',
      title: 'Функция',
      goal: 'Опиши функцию add(a, b), которая возвращает сумму, и вызови её.',
      checks: [
        {
          label: 'def add(a, b):',
          pattern: /def\s+add\(\s*a\s*,\s*b\s*\)\s*:/,
          message: 'Опиши функцию: def add(a, b):.',
        },
        {
          label: 'return a + b',
          pattern: /return\s+a\s*\+\s*b/,
          message: 'Функция должна возвращать сумму: return a + b.',
        },
        {
          label: 'вызов add(…)',
          pattern: /add\(\s*\d+\s*,\s*\d+\s*\)/,
          message: 'Вызови функцию с двумя числами.',
        },
      ],
      starter: '',
      solution: 'def add(a, b):\n    return a + b\n\nprint(add(2, 3))',
      hint: 'Функция: def add(a, b): … return a + b.',
    },
  ],

  typescript: [
    {
      id: 'typescript-1',
      title: 'Типы переменных',
      goal: 'Задай строке и числу явные типы.',
      checks: [
        {
          label: 'city: string',
          pattern: /const\s+city\s*:\s*string\s*=\s*(['"])[^'"]+\1/,
          message: 'Укажи тип: const city: string = "Астрахань".',
        },
        {
          label: 'year: number',
          pattern: /const\s+year\s*:\s*number\s*=\s*\d+/,
          message: 'Укажи тип: const year: number = 2026.',
        },
      ],
      starter: "const city = 'Астрахань';\nconst year = 2026;\n",
      solution: "const city: string = 'Астрахань';\nconst year: number = 2026;",
      hint: 'Тип пишется после имени: const city: string = "...".',
    },
    {
      id: 'typescript-2',
      title: 'Интерфейс',
      goal: 'Опиши интерфейс User с полями id: number и name: string.',
      checks: [
        {
          label: 'interface User {',
          pattern: /interface\s+User\s*\{/,
          message: 'Опиши интерфейс: interface User { … }.',
        },
        {
          label: 'id: number',
          pattern: /interface\s+User\s*\{[\s\S]*id\s*:\s*number/,
          message: 'В интерфейсе нужно поле id: number.',
        },
        {
          label: 'name: string',
          pattern: /interface\s+User\s*\{[\s\S]*name\s*:\s*string/,
          message: 'В интерфейсе нужно поле name: string.',
        },
      ],
      starter: '// Опиши интерфейс User\n\n',
      solution: 'interface User {\n  id: number;\n  name: string;\n}',
      hint: 'Интерфейс: interface User { id: number; name: string; }',
    },
    {
      id: 'typescript-3',
      title: 'Функция с типами',
      goal: 'Напиши функцию sum с типизированными аргументами и возвращаемым числом.',
      checks: [
        {
          label: '(a: number, b: number)',
          pattern: /function\s+sum\(\s*a\s*:\s*number\s*,\s*b\s*:\s*number\s*\)/,
          message: 'Типизируй аргументы: (a: number, b: number).',
        },
        {
          label: 'возвращает number',
          pattern: /function\s+sum\([^)]*\)\s*:\s*number\s*\{/,
          message: 'Укажи тип результата: : number.',
        },
        {
          label: 'return a + b',
          pattern: /return\s+a\s*\+\s*b/,
          message: 'Функция должна возвращать a + b.',
        },
      ],
      starter: 'function sum(a, b) {\n  return a + b;\n}\n',
      solution: 'function sum(a: number, b: number): number {\n  return a + b;\n}',
      hint: 'Типы аргументов — в скобках, тип результата — после них.',
    },
    {
      id: 'typescript-4',
      title: 'Union-тип',
      goal: 'Опиши параметр value, который принимает строку или число.',
      checks: [
        {
          label: 'value: string | number',
          pattern: /printValue\(\s*value\s*:\s*string\s*\|\s*number\s*\)/,
          message: 'Опиши параметр как value: string | number.',
        },
      ],
      starter: 'function printValue(value) {\n  console.log(value);\n}\n',
      solution: 'function printValue(value: string | number) {\n  console.log(value);\n}',
      hint: 'Объединение типов пишется через |: string | number.',
    },
    {
      id: 'typescript-5',
      title: 'Массив объектов',
      goal: 'Задай массив пользователей с типами и выведи имена через map.',
      checks: [
        {
          label: 'типизированный массив',
          pattern:
            /const\s+users\s*:\s*\{[\s\S]*id\s*:\s*number[\s\S]*name\s*:\s*string[\s\S]*\}\s*\[\s*\]\s*=/,
          message: 'Задай тип элемента: { id: number; name: string }[].',
        },
        {
          label: 'обход через .map(',
          pattern: /\.map\(\s*\(?\s*\w+\s*\)?\s*=>/,
          message: 'Перебери массив через users.map(…).',
        },
        {
          label: 'console.log(…name)',
          pattern: /console\.log\(\s*\w+\.name\s*\)/,
          message: 'Выведи имя каждого пользователя.',
        },
      ],
      starter: "const users = [\n  { id: 1, name: 'Алекс' },\n];\n\n",
      solution:
        "const users: { id: number; name: string }[] = [\n  { id: 1, name: 'Алекс' },\n];\n\nusers.map((user) => console.log(user.name));",
      hint: 'Массив объектов: { id: number; name: string }[]; обход — users.map(...).',
    },
  ],

  react: [
    {
      id: 'react-1',
      title: 'Компонент и JSX',
      goal: 'Опиши компонент Hello, который возвращает заголовок h1.',
      checks: [
        {
          label: 'function Hello()',
          pattern: /function\s+Hello\s*\(\s*\)\s*\{/,
          message: 'Компонент — функция Hello().',
        },
        {
          label: 'return (<h1>…</h1>)',
          pattern: /return\s*\(\s*<h1[^>]*>[\s\S]*<\/h1>/,
          message: 'Верни из компонента заголовок <h1>.',
        },
      ],
      starter: '// Создай компонент Hello\n',
      solution:
        'function Hello() {\n  return (\n    <h1>Привет из React!</h1>\n  );\n}\n\nexport default Hello;',
      hint: 'Компонент — функция с большой буквы, возвращающая JSX.',
    },
    {
      id: 'react-2',
      title: 'Пропсы',
      goal: 'Прими пропс name и выведи его в заголовке.',
      checks: [
        {
          label: 'Greeting(props)',
          pattern: /function\s+Greeting\(\s*props\s*\)/,
          message: 'Компонент должен принимать props.',
        },
        {
          label: '{props.name} в <h1>',
          pattern: /<h1[^>]*>[\s\S]*\{\s*props\.name\s*\}[\s\S]*<\/h1>/,
          message: 'Вставь имя в заголовок: {props.name}.',
        },
      ],
      starter: 'function Greeting(props) {\n  return (\n\n  );\n}\n',
      solution: 'function Greeting(props) {\n  return (\n    <h1>Привет, {props.name}!</h1>\n  );\n}',
      hint: 'Значение пропса вставляется в JSX в фигурных скобках: {props.name}.',
    },
    {
      id: 'react-3',
      title: 'useState: счётчик',
      goal: 'Сделай счётчик: состояние и кнопка, увеличивающая его на 1.',
      checks: [
        {
          label: 'useState(0)',
          pattern: /useState\(\s*0\s*\)/,
          message: 'Заведи состояние: useState(0).',
        },
        {
          label: '[count, setCount]',
          pattern: /\[\s*count\s*,\s*setCount\s*\]\s*=\s*useState/,
          message: 'Деструктурируй состояние: const [count, setCount] = useState(0).',
        },
        {
          label: 'onClick → setCount(count + 1)',
          pattern: /onClick\s*=\s*\{\s*\(\s*\)\s*=>\s*setCount\(\s*count\s*\+\s*1\s*\)\s*\}/,
          message: 'Кнопка должна увеличивать счётчик: onClick={() => setCount(count + 1)}.',
        },
      ],
      starter: "import { useState } from 'react';\n\nfunction Counter() {\n\n}\n",
      solution:
        "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>{count}</button>\n  );\n}",
      hint: 'const [count, setCount] = useState(0); обработчик — onClick.',
    },
    {
      id: 'react-4',
      title: 'Список с map',
      goal: 'Выведи массив задач списком с уникальными ключами.',
      checks: [
        {
          label: '…map((task) =>',
          pattern: /\.map\(\s*\(\s*\w+\s*\)\s*=>/,
          message: 'Выведи пункты через tasks.map((task) => …).',
        },
        {
          label: 'key={…}',
          pattern: /key\s*=\s*\{\s*\w+\s*\}/,
          message: 'Каждому <li> нужен уникальный key.',
        },
      ],
      starter:
        "const tasks = ['HTML', 'CSS', 'JS'];\n\nfunction TaskList() {\n  return (\n    <ul>\n\n    </ul>\n  );\n}\n",
      solution:
        "const tasks = ['HTML', 'CSS', 'JS'];\n\nfunction TaskList() {\n  return (\n    <ul>\n      {tasks.map((task) => (\n        <li key={task}>{task}</li>\n      ))}\n    </ul>\n  );\n}",
      hint: 'tasks.map((task) => <li key={task}>{task}</li>) внутри JSX в фигурных скобках.',
    },
    {
      id: 'react-5',
      title: 'useEffect',
      goal: 'Загрузи данные один раз при монтировании компонента.',
      checks: [
        {
          label: 'useEffect(…)',
          pattern: /useEffect\(\s*\(\s*\)\s*=>\s*\{/,
          message: 'Добавь эффект: useEffect(() => { … }, []).',
        },
        {
          label: 'пустой массив зависимостей',
          pattern: /\}\s*,\s*\[\s*\]\s*\)/,
          message: 'Передай пустой массив зависимостей в конце: }, []).',
        },
      ],
      starter:
        "import { useEffect } from 'react';\n\nfunction Catalog() {\n\n  return <div>Курсы</div>;\n}\n",
      solution:
        "import { useEffect } from 'react';\n\nfunction Catalog() {\n  useEffect(() => {\n    console.log('Загрузка курсов');\n  }, []);\n\n  return <div>Курсы</div>;\n}",
      hint: 'Пустой массив зависимостей [] запускает эффект один раз.',
    },
  ],

  nodejs: [
    {
      id: 'nodejs-1',
      title: 'Первый скрипт',
      goal: 'Выведи в консоль название и версию приложения.',
      checks: [
        {
          label: 'console.log("…")',
          pattern: /console\.log\(\s*(['"])[^'"]+\1\s*\)/,
          message: 'Выведи строку через console.log("…").',
        },
      ],
      starter: '// Твой скрипт\n',
      solution: "console.log('CodePulse v1.0');",
      hint: 'console.log — стандартный вывод в Node.',
    },
    {
      id: 'nodejs-2',
      title: 'HTTP-сервер',
      goal: 'Подними сервер, который отвечает «OK» на любой запрос.',
      checks: [
        {
          label: 'http.createServer((req, res) =>',
          pattern: /createServer\(\s*\(\s*req\s*,\s*res\s*\)\s*=>/,
          message: 'Создай сервер: http.createServer((req, res) => …).',
        },
        {
          label: 'res.end("OK")',
          pattern: /res\.end\(\s*(['"])[^'"]*\1\s*\)/,
          message: 'Ответь на запрос через res.end("OK").',
        },
        {
          label: '.listen(3000)',
          pattern: /\.listen\(\s*\d{2,5}\s*\)/,
          message: 'Запусти сервер: server.listen(3000).',
        },
      ],
      starter: "const http = require('node:http');\n\n",
      solution:
        "const http = require('node:http');\n\nconst server = http.createServer((req, res) => {\n  res.end('OK');\n});\n\nserver.listen(3000);",
      hint: 'http.createServer(handler).listen(3000).',
    },
    {
      id: 'nodejs-3',
      title: 'Роутинг по URL',
      goal: 'Отдай разные ответы для /api и остальных адресов.',
      checks: [
        {
          label: "req.url === '/api'",
          pattern: /req\.url\s*===?\s*(['"])\/api\1/,
          message: "Сравни адрес: req.url === '/api'.",
        },
        {
          label: 'два разных res.end',
          pattern: /res\.end\([\s\S]*else[\s\S]*res\.end\(/,
          message: 'Для /api и остальных адресов нужны разные ответы res.end(…).',
        },
      ],
      starter:
        "const http = require('node:http');\n\nhttp.createServer((req, res) => {\n\n}).listen(3000);\n",
      solution:
        "const http = require('node:http');\n\nhttp.createServer((req, res) => {\n  if (req.url === '/api') {\n    res.end('API');\n  } else {\n    res.end('Главная');\n  }\n}).listen(3000);",
      hint: 'Проверяй req.url и отвечай через res.end(...).',
    },
    {
      id: 'nodejs-4',
      title: 'Чтение файла',
      goal: 'Прочитай файл data.txt асинхронно и выведи содержимое.',
      checks: [
        {
          label: "readFile(…, 'utf8', …)",
          pattern: /readFile\(\s*(['"])[^'"]+\1\s*,\s*(['"])utf8\2/,
          message: "Читай файл: fs.readFile('data.txt', 'utf8', …).",
        },
        {
          label: 'console.log(data)',
          pattern: /console\.log\(\s*data\s*\)/,
          message: 'Выведи содержимое файла: console.log(data).',
        },
      ],
      starter: "const fs = require('node:fs');\n\n",
      solution:
        "const fs = require('node:fs');\n\nfs.readFile('data.txt', 'utf8', (err, data) => {\n  if (err) {\n    console.error(err);\n    return;\n  }\n  console.log(data);\n});",
      hint: "fs.readFile(path, 'utf8', callback).",
    },
    {
      id: 'nodejs-5',
      title: 'Express-роут',
      goal: 'Подними Express-сервер с GET-роутом /health, возвращающим JSON.',
      checks: [
        {
          label: "app.get('/health', …)",
          pattern: /app\.get\(\s*(['"])\/health\1\s*,\s*\(\s*req\s*,\s*res\s*\)/,
          message: "Опиши роут: app.get('/health', (req, res) => …).",
        },
        {
          label: "res.json({ status: 'ok' })",
          pattern: /res\.json\(\s*\{[\s\S]*status\s*:\s*(['"])ok\1[\s\S]*\}\s*\)/,
          message: "Верни JSON: res.json({ status: 'ok' }).",
        },
      ],
      starter: "const express = require('express');\nconst app = express();\n\n",
      solution:
        "const express = require('express');\nconst app = express();\n\napp.get('/health', (req, res) => {\n  res.json({ status: 'ok' });\n});\n\napp.listen(3000);",
      hint: "app.get('/health', handler) и res.json({ status: 'ok' }).",
    },
  ],

  sql: [
    {
      id: 'sql-1',
      title: 'SELECT и WHERE',
      goal: 'Выбери имя и email пользователей старше 18 лет.',
      checks: [
        {
          label: 'SELECT name, email FROM users',
          pattern: /SELECT\s+name\s*,\s*email\s+FROM\s+users/i,
          message: 'Выбери нужные колонки: SELECT name, email FROM users …',
        },
        {
          label: 'WHERE age > 18;',
          pattern: /WHERE\s+age\s*>\s*18\s*;/i,
          message: 'Добавь условие WHERE age > 18;',
        },
      ],
      starter: '-- Таблица users: id, name, email, age\n\n',
      solution: 'SELECT name, email FROM users WHERE age > 18;',
      hint: 'SELECT name, email FROM users WHERE age > 18;',
    },
    {
      id: 'sql-2',
      title: 'Сортировка и лимит',
      goal: 'Выведи 5 самых молодых пользователей по возрастанию возраста.',
      checks: [
        {
          label: 'ORDER BY age ASC',
          pattern: /ORDER\s+BY\s+age(\s+ASC)?/i,
          message: 'Отсортируй по возрасту: ORDER BY age ASC.',
        },
        {
          label: 'LIMIT 5;',
          pattern: /LIMIT\s+5\s*;/i,
          message: 'Ограничь вывод: LIMIT 5;.',
        },
      ],
      starter: '',
      solution: 'SELECT * FROM users ORDER BY age ASC LIMIT 5;',
      hint: 'ORDER BY age ASC LIMIT 5.',
    },
    {
      id: 'sql-3',
      title: 'Добавление записи',
      goal: 'Добавь нового пользователя в таблицу users.',
      checks: [
        {
          label: 'INSERT INTO users (…)',
          pattern: /INSERT\s+INTO\s+users\s*\(/i,
          message: 'Начни с INSERT INTO users (…).',
        },
        {
          label: 'VALUES (…);',
          pattern: /VALUES\s*\([^)]*\)\s*;/i,
          message: 'Перечисли значения в VALUES (…);.',
        },
      ],
      starter: 'INSERT INTO users\n',
      solution: "INSERT INTO users (name, email, age) VALUES ('Алекс', 'alex@example.com', 25);",
      hint: 'INSERT INTO users (колонки) VALUES (значения).',
    },
    {
      id: 'sql-4',
      title: 'Обновление данных',
      goal: 'Повысь возраст пользователя с id = 1 на один год.',
      checks: [
        {
          label: 'UPDATE users SET',
          pattern: /UPDATE\s+users\s+SET/i,
          message: 'Начни с UPDATE users SET …',
        },
        {
          label: 'age = age + 1',
          pattern: /SET\s+age\s*=\s*age\s*\+\s*1/i,
          message: 'Увеличь возраст: SET age = age + 1.',
        },
        {
          label: 'WHERE id = 1;',
          pattern: /WHERE\s+id\s*=\s*1\s*;/i,
          message: 'Укажи пользователя: WHERE id = 1;.',
        },
      ],
      starter: '',
      solution: 'UPDATE users SET age = age + 1 WHERE id = 1;',
      hint: 'UPDATE users SET ... WHERE id = 1.',
    },
    {
      id: 'sql-5',
      title: 'JOIN',
      goal: 'Выведи имена пользователей и названия их курсов, соединив две таблицы.',
      checks: [
        {
          label: 'JOIN courses',
          pattern: /JOIN\s+courses/i,
          message: 'Соедини таблицы: JOIN courses.',
        },
        {
          label: 'ON courses.user_id = users.id',
          pattern: /ON\s+courses\.user_id\s*=\s*users\.id/i,
          message: 'Условие соединения: ON courses.user_id = users.id.',
        },
        {
          label: 'SELECT users.name, courses.title',
          pattern: /SELECT\s+users\.name\s*,\s*courses\.title/i,
          message: 'Выбери users.name и courses.title.',
        },
      ],
      starter: '-- users(id, name), courses(id, user_id, title)\n\n',
      solution:
        'SELECT users.name, courses.title FROM users JOIN courses ON courses.user_id = users.id;',
      hint: 'JOIN courses ON courses.user_id = users.id.',
    },
  ],

  java: [
    {
      id: 'java-1',
      title: 'Класс и main',
      goal: 'Объяви класс Main с точкой входа и выведи приветствие.',
      checks: [
        {
          label: 'public class Main',
          pattern: /public\s+class\s+Main\s*\{/,
          message: 'Объяви класс: public class Main { … }.',
        },
        {
          label: 'main(String[] args)',
          pattern: /public\s+static\s+void\s+main\(\s*String\s*\[\s*\]\s*\w+\s*\)\s*\{/,
          message: 'Точка входа: public static void main(String[] args) { … }.',
        },
        {
          label: 'System.out.println("…");',
          pattern: /System\.out\.println\(\s*"[^"]*"\s*\)\s*;/,
          message: 'Выведи строку: System.out.println("Привет, Java!");.',
        },
      ],
      starter: 'public class Main {\n\n}\n',
      solution:
        'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Привет, Java!");\n    }\n}',
      hint: 'public static void main(String[] args) — стандартная точка входа.',
    },
    {
      id: 'java-2',
      title: 'Переменные и вывод',
      goal: 'Заведи строку и число, выведи их одной строкой.',
      checks: [
        {
          label: 'String name = "…"',
          pattern: /String\s+\w+\s*=\s*"[^"]+"\s*;/,
          message: 'Заведи строку: String name = "Алекс";.',
        },
        {
          label: 'int age = число',
          pattern: /int\s+\w+\s*=\s*\d+\s*;/,
          message: 'Заведи число: int age = 25;.',
        },
        {
          label: 'System.out.println(…);',
          pattern: /System\.out\.println\(\s*[^)]+\)\s*;/,
          message: 'Выведи обе переменные через System.out.println(…).',
        },
      ],
      starter: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
      solution:
        'public class Main {\n    public static void main(String[] args) {\n        String name = "Алекс";\n        int age = 25;\n        System.out.println(name + ", " + age);\n    }\n}',
      hint: 'String name = "Алекс"; int age = 25;',
    },
    {
      id: 'java-3',
      title: 'Условие',
      goal: 'Проверь число: если больше нуля — «плюс», иначе — «минус».',
      checks: [
        {
          label: 'if (number > 0)',
          pattern: /if\s*\(\s*number\s*>\s*0\s*\)\s*\{/,
          message: 'Проверь условие: if (number > 0) { … }.',
        },
        { label: 'else {', pattern: /else\s*\{/, message: 'Добавь ветку else { … }.' },
        {
          label: 'println в каждой ветке',
          pattern: /if[\s\S]*System\.out\.println[\s\S]*else[\s\S]*System\.out\.println/,
          message: 'В каждой ветке должен быть свой System.out.println.',
        },
      ],
      starter: 'int number = 7;\n\n',
      solution:
        'int number = 7;\n\nif (number > 0) {\n    System.out.println("плюс");\n} else {\n    System.out.println("минус");\n}',
      hint: 'if (number > 0) { ... } else { ... }',
    },
    {
      id: 'java-4',
      title: 'Цикл for',
      goal: 'Выведи числа от 1 до 5 циклом for.',
      checks: [
        {
          label: 'for (int i = 1; i <= 5; i++)',
          pattern: /for\s*\(\s*int\s+\w+\s*=\s*1\s*;\s*\w+\s*<=\s*5\s*;\s*\w+\+\+\s*\)/,
          message: 'Цикл: for (int i = 1; i <= 5; i++).',
        },
        {
          label: 'println внутри цикла',
          pattern: /for\s*\([^)]*\)\s*\{[\s\S]*System\.out\.println/,
          message: 'Выводи число внутри тела цикла.',
        },
      ],
      starter: '',
      solution: 'for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}',
      hint: 'for (int i = 1; i <= 5; i++).',
    },
    {
      id: 'java-5',
      title: 'Метод',
      goal: 'Опиши статический метод square, возвращающий квадрат числа.',
      checks: [
        {
          label: 'static int square(int x)',
          pattern: /static\s+int\s+square\(\s*int\s+\w+\s*\)\s*\{/,
          message: 'Опиши метод: static int square(int x) { … }.',
        },
        {
          label: 'return x * x;',
          pattern: /return\s+\w+\s*\*\s*\w+\s*;/,
          message: 'Метод должен возвращать квадрат: return x * x;.',
        },
      ],
      starter: 'public class Main {\n\n}\n',
      solution: 'public class Main {\n    static int square(int x) {\n        return x * x;\n    }\n}',
      hint: 'static int square(int x) { return x * x; }',
    },
  ],

  cpp: [
    {
      id: 'cpp-1',
      title: 'Hello, C++',
      goal: 'Выведи приветствие через std::cout.',
      checks: [
        {
          label: '#include <iostream>',
          pattern: /#include\s*<iostream>/,
          message: 'Подключи библиотеку: #include <iostream>.',
        },
        {
          label: 'int main()',
          pattern: /int\s+main\s*\(\s*(void\s*)?\)\s*\{/,
          message: 'Нужна точка входа int main() { … }.',
        },
        {
          label: 'std::cout << "…"',
          pattern: /std::cout\s*<<\s*"[^"]*"/,
          message: 'Выведи строку через std::cout << "…".',
        },
      ],
      starter: '',
      solution:
        '#include <iostream>\n\nint main() {\n    std::cout << "Привет, C++!" << std::endl;\n    return 0;\n}',
      hint: 'Не забудь #include <iostream> и int main().',
    },
    {
      id: 'cpp-2',
      title: 'Ввод с клавиатуры',
      goal: 'Считай число и выведи его удвоенным.',
      checks: [
        {
          label: 'std::cin >> number;',
          pattern: /std::cin\s*>>\s*\w+\s*;/,
          message: 'Считай число: std::cin >> number;.',
        },
        {
          label: 'std::cout << number * 2',
          pattern: /std::cout\s*<<\s*\w+\s*\*\s*2/,
          message: 'Выведи удвоенное значение: std::cout << number * 2.',
        },
      ],
      starter: '#include <iostream>\n\nint main() {\n    int number;\n\n}\n',
      solution:
        '#include <iostream>\n\nint main() {\n    int number;\n    std::cin >> number;\n    std::cout << number * 2 << std::endl;\n    return 0;\n}',
      hint: 'std::cin >> number; затем std::cout << number * 2.',
    },
    {
      id: 'cpp-3',
      title: 'Условие',
      goal: 'Определи, положительное ли число.',
      checks: [
        {
          label: 'if (n > 0)',
          pattern: /if\s*\(\s*n\s*>\s*0\s*\)\s*\{/,
          message: 'Проверь условие: if (n > 0) { … }.',
        },
        { label: 'else {', pattern: /else\s*\{/, message: 'Добавь ветку else { … }.' },
        {
          label: 'cout в каждой ветке',
          pattern: /if[\s\S]*std::cout[\s\S]*else[\s\S]*std::cout/,
          message: 'В каждой ветке должен быть свой std::cout.',
        },
      ],
      starter: '#include <iostream>\n\nint main() {\n    int n = 5;\n\n}\n',
      solution:
        '#include <iostream>\n\nint main() {\n    int n = 5;\n    if (n > 0) {\n        std::cout << "положительное";\n    } else {\n        std::cout << "не положительное";\n    }\n    return 0;\n}',
      hint: 'if (n > 0) { ... } else { ... }',
    },
    {
      id: 'cpp-4',
      title: 'Цикл for',
      goal: 'Выведи числа от 1 до 5 через цикл.',
      checks: [
        {
          label: 'for (int i = 1; i <= 5; i++)',
          pattern: /for\s*\(\s*int\s+\w+\s*=\s*1\s*;\s*\w+\s*<=\s*5\s*;\s*\w+\+\+\s*\)/,
          message: 'Цикл: for (int i = 1; i <= 5; i++).',
        },
        {
          label: 'std::cout внутри цикла',
          pattern: /for\s*\([^)]*\)\s*\{[\s\S]*std::cout/,
          message: 'Выводи число внутри цикла.',
        },
      ],
      starter: '#include <iostream>\n\nint main() {\n\n}\n',
      solution:
        '#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        std::cout << i << " ";\n    }\n    return 0;\n}',
      hint: 'for (int i = 1; i <= 5; i++)',
    },
    {
      id: 'cpp-5',
      title: 'std::vector',
      goal: 'Создай вектор с тремя числами и выведи их сумму.',
      checks: [
        {
          label: 'std::vector<int> numbers = {…}',
          pattern: /std::vector<\s*int\s*>\s+\w+\s*=\s*\{[^}]*\}/,
          message: 'Создай вектор: std::vector<int> numbers = {1, 2, 3};.',
        },
        {
          label: 'for (int n : numbers)',
          pattern: /for\s*\(\s*int\s+\w+\s*:\s*\w+\s*\)/,
          message: 'Пройди по вектору: for (int n : numbers).',
        },
        {
          label: 'sum += n',
          pattern: /sum\s*\+=\s*\w+/,
          message: 'Сложи элементы: sum += n.',
        },
      ],
      starter: '#include <iostream>\n#include <vector>\n\nint main() {\n\n}\n',
      solution:
        '#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> numbers = {1, 2, 3};\n    int sum = 0;\n    for (int n : numbers) {\n        sum += n;\n    }\n    std::cout << sum;\n    return 0;\n}',
      hint: 'std::vector<int> numbers = {1, 2, 3};',
    },
  ],
};
