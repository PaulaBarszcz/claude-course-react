# AGENTS.md — React dla Angular Devów

## Kontekst dla agentów AI

Kurs interaktywny React (10 modułów) dla Angular developerów. Zbudowany w React 19 + Vite. Treść kursu to statyczny HTML w `dangerouslySetInnerHTML` + interaktywne komponenty React (Quiz, Challenge, NavButtons).

## Kluczowe pliki

| Plik | Rola |
|------|------|
| `src/App.jsx` | Router, progress tracking, dark/light mode, mobile menu |
| `src/components/Quiz.jsx` | Quizy — stan w useState, dane z quizFeedbacks.js |
| `src/components/Sidebar.jsx` | Nawigacja, postęp, theme toggle |
| `src/data/quizFeedbacks.js` | Teksty odpowiedzi do wszystkich quizów |
| `src/index.css` | CSS variables dla dark (`:root`) i light (`.light`) |

## Konwencje

- Komponenty: PascalCase, jeden per plik
- Dane: eksportowane z `src/data/`, importowane tam gdzie potrzebne
- Brak TypeScript, brak zewnętrznych bibliotek UI
- CSS: tylko klasy z `src/index.css`, bez inline styles (wyjątek: dynamiczne wartości jak width dla progress bar)

## Typowe zadania

**Dodanie modułu:** Stwórz `src/pages/Module11.jsx` wzorując się na istniejących. Dodaj route w `App.jsx`, wpis w `src/data/modules.js` i `NAV_LABELS`.

**Dodanie quizu:** Dodaj feedback do `quizFeedbacks.js` (klucz `'X-Y'`), użyj komponentu `<Quiz id="X-Y" ... />` w odpowiednim module.

**Zmiana stylu:** Edytuj CSS variables w `src/index.css`. Dark mode: `:root`. Light mode: `.light`.

**Responsywność:** Breakpoint mobilny w `@media (max-width: 640px)` na końcu `src/index.css`.

## Czego nie robić

- Nie instaluj zewnętrznych bibliotek bez wyraźnej potrzeby
- Nie zmieniaj struktury routingu (base `/claude-course-react/`)
- Nie usuwaj `dangerouslySetInnerHTML` z modułów — treść kursu jest tam celowo
