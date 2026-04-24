# CLAUDE.md — React dla Angular Devów

## Projekt

Interaktywny kurs React dla Angular developerów. Vanilla React + Vite, bez TypeScript (celowo — kurs jest o konceptach, nie o setup).

## Stack

- React 19, React Router v6, Vite 6
- Vanilla CSS z CSS variables (dark/light mode)
- Brak TypeScript, brak zewnętrznych bibliotek UI

## Komendy

```bash
npm run dev      # dev server
npm run build    # build do dist/
npm run preview  # podgląd buildu
```

## Struktura

- `src/pages/` — jeden plik na moduł kursu (Module01–10 + Home)
- `src/components/` — reużywalne: Quiz, Challenge, Callout, CodeBlock, NavButtons, Sidebar
- `src/data/` — dane: metadane modułów, feedbacki quizów
- `src/hooks/` — useProgress (localStorage)

## Zasady przy modyfikacjach

- **Nie dodawaj TypeScript** — projekt jest celowo w JS
- **Nie dodawaj bibliotek UI** — Tailwind, MUI, etc. poza stackiem
- Nowa treść modułu → nowy plik w `src/pages/Module[NN].jsx`
- Quizy: dane w `src/data/quizFeedbacks.js`, komponent w `src/components/Quiz.jsx`
- Style: zmieniaj CSS variables w `src/index.css` sekcja `:root` i `.light`
- Dark/light mode: klasa `light` na `<html>`, przełącznik w Sidebar + mobile header
- Mobile breakpoint: 640px — sidebar jako drawer, content padding 16px

## Deploy

GitHub Actions → GitHub Pages przy pushu do `main`. Konfiguracja w `.github/workflows/react-kurs-actions.yml`. Base URL: `/claude-course-react/`.
