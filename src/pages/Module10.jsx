import Quiz from '../components/Quiz'
import Challenge from '../components/Challenge'
import NavButtons from '../components/NavButtons'

const STATIC = `<div class="module-header">
          <div class="module-tag">Moduł 10</div>
          <div class="module-title">Testy —<br><em>React Testing Library</em></div>
          <div class="module-desc">Testuj zachowanie, nie implementację. RTL i Vitest to standard w 2025.</div>
        </div>

        <div class="section">
          <div class="section-title">Filozofia RTL — testuj jak użytkownik</div>
          <p>React Testing Library ma jedno motto: <em>"The more your tests resemble the way your software is used, the more confidence they can give you."</em></p>

          <div class="callout info">
            <div class="callout-icon">💡</div>
            <div class="callout-body"><strong>Mapowanie z Angular Testing:</strong> <span class="ic">TestBed.createComponent</span> → <span class="ic">render()</span>. <span class="ic">fixture.nativeElement.querySelector</span> → <span class="ic">screen.getByRole/Text/Label</span>. <span class="ic">fixture.detectChanges()</span> → <span class="ic">fireEvent / userEvent</span>.</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Priorytety selektorów (od najlepszego)</div>
          <ul class="styled">
            <li><strong>getByRole</strong> — semantyczne (button, heading, textbox) — <span style="color:var(--success)">zawsze preferuj</span></li>
            <li><strong>getByLabelText</strong> — pola formularza przez label</li>
            <li><strong>getByPlaceholderText</strong> — przez placeholder (słabszy)</li>
            <li><strong>getByText</strong> — tekst widoczny dla użytkownika</li>
            <li><strong>getByTestId</strong> — data-testid — <span style="color:var(--error)">tylko jako ostateczność</span></li>
          </ul>
        </div>

        <div class="section">
          <div class="section-title">Przykładowy test</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>RTL + Vitest</div>
            </div>
            <pre><code><span class="kw">import</span> { render, screen, waitFor } <span class="kw">from</span> <span class="str">'@testing-library/react'</span>;
<span class="kw">import</span> userEvent <span class="kw">from</span> <span class="str">'@testing-library/user-event'</span>;
<span class="kw">import</span> { describe, it, expect, vi } <span class="kw">from</span> <span class="str">'vitest'</span>;
<span class="kw">import</span> { LoginForm } <span class="kw">from</span> <span class="str">'./LoginForm'</span>;

<span class="fn">describe</span>(<span class="str">'LoginForm'</span>, () => {
  <span class="fn">it</span>(<span class="str">'pokazuje błąd przy nieprawidłowym email'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> user = userEvent.<span class="fn">setup</span>();
    <span class="fn">render</span>(<span class="tag">&lt;LoginForm /&gt;</span>);

    <span class="cm">// Znajdź input przez role + name (label)</span>
    <span class="kw">const</span> emailInput = screen.<span class="fn">getByRole</span>(<span class="str">'textbox'</span>, {
      name: <span class="str">/email/i</span>
    });

    <span class="cm">// Symuluj wpisywanie (userEvent > fireEvent)</span>
    <span class="kw">await</span> user.<span class="fn">type</span>(emailInput, <span class="str">'nieemail'</span>);
    <span class="kw">await</span> user.<span class="fn">click</span>(screen.<span class="fn">getByRole</span>(<span class="str">'button'</span>, { name: <span class="str">/zaloguj/i</span> }));

    <span class="cm">// Sprawdź czy pojawił się błąd</span>
    <span class="kw">await</span> <span class="fn">waitFor</span>(() => {
      <span class="fn">expect</span>(screen.<span class="fn">getByText</span>(<span class="str">/nieprawidłowy email/i</span>)).<span class="fn">toBeInTheDocument</span>();
    });
  });

  <span class="fn">it</span>(<span class="str">'wywołuje onLogin z danymi po udanym submit'</span>, <span class="kw">async</span> () => {
    <span class="kw">const</span> onLogin = vi.<span class="fn">fn</span>();
    <span class="kw">const</span> user = userEvent.<span class="fn">setup</span>();
    <span class="fn">render</span>(<span class="tag">&lt;LoginForm</span> <span class="attr">onLogin</span>={onLogin} <span class="tag">/&gt;</span>);

    <span class="kw">await</span> user.<span class="fn">type</span>(screen.<span class="fn">getByRole</span>(<span class="str">'textbox'</span>, {name: <span class="str">/email/i</span>}), <span class="str">'a@b.com'</span>);
    <span class="kw">await</span> user.<span class="fn">type</span>(screen.<span class="fn">getByLabelText</span>(<span class="str">/password/i</span>), <span class="str">'Pass1234!'</span>);
    <span class="kw">await</span> user.<span class="fn">click</span>(screen.<span class="fn">getByRole</span>(<span class="str">'button'</span>, {name: <span class="str">/zaloguj/i</span>}));

    <span class="fn">expect</span>(onLogin).<span class="fn">toHaveBeenCalledWith</span>({
      email: <span class="str">'a@b.com'</span>,
      password: <span class="str">'Pass1234!'</span>,
    });
  });
});</code></pre>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Mockowanie — React Query i Router</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>Test helpers</div>
            </div>
            <pre><code><span class="cm">// Wrapper z providerami — stwórz raz, używaj wszędzie</span>
<span class="kw">function</span> <span class="fn">renderWithProviders</span>(ui: ReactElement) {
  <span class="kw">const</span> queryClient = <span class="kw">new</span> <span class="fn">QueryClient</span>({
    defaultOptions: { queries: { retry: <span class="kw">false</span> } }
  });

  <span class="kw">return</span> <span class="fn">render</span>(
    <span class="tag">&lt;QueryClientProvider</span> <span class="attr">client</span>={queryClient}<span class="tag">&gt;</span>
      <span class="tag">&lt;MemoryRouter&gt;</span>
        {ui}
      <span class="tag">&lt;/MemoryRouter&gt;</span>
    <span class="tag">&lt;/QueryClientProvider&gt;</span>
  );
}

<span class="cm">// Mockowanie fetcha przez MSW (Mock Service Worker)</span>
<span class="cm">// lub vi.mock:</span>
vi.<span class="fn">mock</span>(<span class="str">'../api/users'</span>, () => ({
  <span class="fn">fetchUsers</span>: vi.<span class="fn">fn</span>().<span class="fn">mockResolvedValue</span>([
    { id: <span class="str">'1'</span>, name: <span class="str">'Anna'</span> }
  ])
}));</code></pre>
          </div>
        </div>

        <!-- FINAL QUIZ -->`

export default function Module10() {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: STATIC }} />
      <Quiz
        id="10-1 — Finałowy"
        label="Quiz 10.1 — Finałowy"
        question={`Masz test: <code style="font-family:monospace;font-size:12px">const btn = document.querySelector('.submit-btn')</code>. Dlaczego to antypattern w RTL?`}
        options={[
    { text: `querySelector jest zbyt wolny w testach`, correct: false },
    { text: `Testuje implementację (className), nie zachowanie. Zmiana nazwy klasy łamie test, choć komponent działa poprawnie`, correct: true },
    { text: `RTL nie ma dostępu do DOM`, correct: false },
    { text: `Powinna być użyta getByTestId zamiast querySelector`, correct: false }
  ]}
      />
      <Challenge
        label="🎯 Zadanie finałowe"
        title="Mini-aplikacja: Todo List"
        desc={`Zbuduj kompletną aplikację Todo używając wszystkiego z kursu:<br><br>
            • <strong>useState</strong> — lista tasków<br>
            • <strong>React Hook Form</strong> — formularz dodawania<br>
            • <strong>Zustand</strong> — filtrowanie (all/active/done) jako global state<br>
            • <strong>Custom hook</strong> — useLocalStorage do persystencji<br>
            • <strong>TypeScript</strong> — pełne typowanie<br>
            • <strong>Testy RTL</strong> — przynajmniej 3 scenariusze`}
        hints={[
        `Zacznij od typów: interface Todo { id: string, text: string, done: boolean }`,
        `useLocalStorage hook z Modułu 4 — gotowy blueprint`,
        `Zustand store: { filter: 'all'|'active'|'done', setFilter }`,
        `filteredTodos = useMemo(() => todos.filter(...), [todos, filter])`,
        `Testuj: dodawanie taska, oznaczanie jako done, filtrowanie`
        ]}
      />
      <Challenge
        label="🎯 Zadanie finałowe"
        title=""
        desc={``}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title="Mini-aplikacja: Todo List"
        desc={``}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={`Zbuduj kompletną aplikację Todo używając wszystkiego z kursu:<br><br>
            • <strong>useState</strong> — lista tasków<br>
            • <strong>React Hook Form</strong> — formularz dodawania<br>
            • <strong>Zustand</strong> — filtrowanie (all/active/done) jako global state<br>
            • <strong>Custom hook</strong> — useLocalStorage do persystencji<br>
            • <strong>TypeScript</strong> — pełne typowanie<br>
            • <strong>Testy RTL</strong> — przynajmniej 3 scenariusze`}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={``}
        hints={[
        `Zacznij od typów: interface Todo { id: string, text: string, done: boolean }`,
        `useLocalStorage hook z Modułu 4 — gotowy blueprint`,
        `Zustand store: { filter: 'all'|'active'|'done', setFilter }`,
        `filteredTodos = useMemo(() => todos.filter(...), [todos, filter])`,
        `Testuj: dodawanie taska, oznaczanie jako done, filtrowanie`
        ]}
      />
      <NavButtons
        prev={"m9"}
        next={"home"}
        prevLabel={"Moduł 9"}
        nextLabel={"📋 Spis treści"}
      />
    </div>
  )
}
