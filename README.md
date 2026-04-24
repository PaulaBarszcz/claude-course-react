# React dla Angular Devów — Kurs Interaktywny

Interaktywny kurs React przeznaczony dla developerów znających Angular. 10 modułów z przykładami kodu, quizami i zadaniami praktycznymi.

## Demo

https://paulabarszcz.github.io/claude-course-react/

## Stack

- **React 19** + **Vite 6**
- **React Router v6** — nawigacja między modułami
- Vanilla CSS z CSS variables (dark/light mode)

## Wymagania

- Node.js ≥ 18
- npm ≥ 9

## Uruchomienie

```bash
npm install
npm run dev        # dev server na http://localhost:5173
```

## Dostępne komendy

| Komenda | Opis |
|---------|------|
| `npm run dev` | Serwer deweloperski z hot reload |
| `npm run build` | Build produkcyjny do `dist/` |
| `npm run preview` | Podgląd buildu produkcyjnego |

## Struktura projektu

```
src/
├── App.jsx              # routing + śledzenie postępu
├── main.jsx             # entry point
├── index.css            # style globalne (CSS variables)
├── components/
│   ├── Sidebar.jsx      # nawigacja boczna
│   ├── Quiz.jsx         # komponent quizu z React state
│   ├── Challenge.jsx    # zadanie z podpowiedziami
│   ├── NavButtons.jsx   # przyciski prev/next
│   ├── Callout.jsx      # bloki info/warning/success
│   └── CodeBlock.jsx    # bloki kodu z syntax highlighting
├── hooks/
│   └── useProgress.js   # postęp kursu (localStorage)
├── data/
│   ├── modules.js       # metadane modułów
│   └── quizFeedbacks.js # odpowiedzi do quizów
└── pages/
    ├── Home.jsx
    └── Module01-10.jsx
```

## Deploy

GitHub Actions automatycznie buduje i deployuje na GitHub Pages przy każdym pushu do `main`.
