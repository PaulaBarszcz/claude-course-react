import Quiz from '../components/Quiz'
import Challenge from '../components/Challenge'
import NavButtons from '../components/NavButtons'

const STATIC = `<div class="module-header">
          <div class="module-tag">Moduł 04</div>
          <div class="module-title">Pełny arsenał<br><em>hooków</em></div>
          <div class="module-desc">useRef, useMemo, useCallback, useContext, useReducer — i jak pisać własne.</div>
        </div>

        <div class="section">
          <div class="section-title">useRef — bez re-renderu</div>
          <p><span class="ic">useRef</span> to kontener, który nie powoduje re-renderu przy zmianie. Używasz go do: dostępu do DOM, zapamiętania wartości między renderami (jak poprzednia wartość), timerów/eventListenerów.</p>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>React</div>
            </div>
            <pre><code><span class="kw">function</span> <span class="fn">SearchInput</span>() {
  <span class="cm">// Dostęp do DOM — jak ViewChild w Angular</span>
  <span class="kw">const</span> inputRef = <span class="fn">useRef</span>&lt;HTMLInputElement&gt;(<span class="kw">null</span>);

  <span class="cm">// Wartość między renderami bez trigger re-render</span>
  <span class="kw">const</span> timerRef = <span class="fn">useRef</span>&lt;ReturnType&lt;<span class="kw">typeof</span> setTimeout&gt;&gt;();

  <span class="kw">const</span> <span class="fn">focusInput</span> = () => {
    inputRef.current?.<span class="fn">focus</span>(); <span class="cm">// optional chaining!</span>
  };

  <span class="kw">const</span> <span class="fn">handleChange</span> = (e: ChangeEvent&lt;HTMLInputElement&gt;) => {
    <span class="fn">clearTimeout</span>(timerRef.current);
    timerRef.current = <span class="fn">setTimeout</span>(() => {
      <span class="fn">search</span>(e.target.value);
    }, <span class="num">300</span>);
  };

  <span class="kw">return</span> <span class="tag">&lt;input</span> <span class="attr">ref</span>={inputRef} <span class="attr">onChange</span>={handleChange} <span class="tag">/&gt;</span>;
}</code></pre>
          </div>
        </div>

        <div class="section">
          <div class="section-title">useMemo i useCallback — optymalizacja</div>
          <div class="callout info">
            <div class="callout-icon">💡</div>
            <div class="callout-body"><strong>Zasada:</strong> Nie używaj ich domyślnie. Używaj gdy: 1) masz pomierzony problem z wydajnością, 2) przekazujesz callback do memoizowanego child-komponentu, 3) wyliczasz coś kosztownego na każdym renderze.</div>
          </div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>React</div>
            </div>
            <pre><code><span class="kw">function</span> <span class="fn">ProductList</span>({ products, filters }) {
  <span class="cm">// useMemo — memoizuje wynik obliczeń</span>
  <span class="cm">// Jak pure pipe w Angular — nie przelicza bez potrzeby</span>
  <span class="kw">const</span> filteredProducts = <span class="fn">useMemo</span>(() => {
    <span class="kw">return</span> products.<span class="fn">filter</span>(p =>
      p.category === filters.category &&
      p.price <= filters.maxPrice
    );
  }, [products, filters]); <span class="cm">// przelicz tylko gdy się zmieniły</span>

  <span class="cm">// useCallback — memoizuje funkcję</span>
  <span class="cm">// Bez tego: nowa referencja na każdym renderze → child się re-renderuje</span>
  <span class="kw">const</span> <span class="fn">handleAddToCart</span> = <span class="fn">useCallback</span>((productId: <span class="kw">string</span>) => {
    <span class="fn">addToCart</span>(productId, filters.userId);
  }, [filters.userId]);

  <span class="kw">return</span> (
    <span class="tag">&lt;List</span>
      <span class="attr">items</span>={filteredProducts}
      <span class="attr">onAdd</span>={handleAddToCart} <span class="cm">// stable reference!</span>
    <span class="tag">/&gt;</span>
  );
}</code></pre>
          </div>
        </div>

        <div class="section">
          <div class="section-title">useContext — lekki DI</div>
          <p>Odpowiednik Dependency Injection z Angulara, ale prostszy. Używaj do: theme, auth state, language, user preferences. Nie do wszystkiego — do tego jest Zustand (Moduł 7).</p>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>React</div>
            </div>
            <pre><code><span class="cm">// 1. Stwórz context</span>
<span class="kw">interface</span> <span class="fn">AuthContext</span> {
  user: User | <span class="kw">null</span>;
  <span class="fn">logout</span>: () => <span class="kw">void</span>;
}
<span class="kw">const</span> AuthContext = <span class="fn">createContext</span>&lt;<span class="fn">AuthContext</span>&gt;(<span class="kw">null</span>!);

<span class="cm">// 2. Provider — otocz aplikację lub drzewo</span>
<span class="kw">export function</span> <span class="fn">AuthProvider</span>({ children }) {
  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>&lt;User | <span class="kw">null</span>&gt;(<span class="kw">null</span>);
  <span class="kw">const</span> <span class="fn">logout</span> = <span class="fn">useCallback</span>(() => <span class="fn">setUser</span>(<span class="kw">null</span>), []);
  <span class="kw">return</span> (
    <span class="tag">&lt;AuthContext.Provider</span> <span class="attr">value</span>={{ user, logout }}<span class="tag">&gt;</span>
      {children}
    <span class="tag">&lt;/AuthContext.Provider&gt;</span>
  );
}

<span class="cm">// 3. Custom hook — ergonomiczne użycie</span>
<span class="kw">export function</span> <span class="fn">useAuth</span>() {
  <span class="kw">const</span> ctx = <span class="fn">useContext</span>(AuthContext);
  <span class="kw">if</span> (!ctx) <span class="kw">throw new</span> Error(<span class="str">'useAuth musi być w AuthProvider'</span>);
  <span class="kw">return</span> ctx;
}

<span class="cm">// 4. Użycie w dowolnym komponencie</span>
<span class="kw">function</span> <span class="fn">Header</span>() {
  <span class="kw">const</span> { user, logout } = <span class="fn">useAuth</span>();
  <span class="kw">return</span> <span class="tag">&lt;button</span> <span class="attr">onClick</span>={logout}<span class="tag">&gt;</span>Wyloguj {user?.name}<span class="tag">&lt;/button&gt;</span>;
}</code></pre>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Custom hooks — odpowiednik serwisów</div>
          <p>Custom hook to funkcja zaczynająca się od <span class="ic">use</span>, która może używać innych hooków. To jest wzorzec kompozycji w React — wyciągasz logikę do reużywalnej funkcji.</p>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>Custom Hook</div>
            </div>
            <pre><code><span class="cm">// useLocalStorage — persystentny stan</span>
<span class="kw">function</span> <span class="fn">useLocalStorage</span>&lt;T&gt;(key: <span class="kw">string</span>, initial: T) {
  <span class="kw">const</span> [value, setValue] = <span class="fn">useState</span>&lt;T&gt;(() => {
    <span class="kw">const</span> stored = localStorage.<span class="fn">getItem</span>(key);
    <span class="kw">return</span> stored ? <span class="fn">JSON.parse</span>(stored) : initial;
  });

  <span class="kw">const</span> <span class="fn">set</span> = <span class="fn">useCallback</span>((val: T) => {
    <span class="fn">setValue</span>(val);
    localStorage.<span class="fn">setItem</span>(key, <span class="fn">JSON.stringify</span>(val));
  }, [key]);

  <span class="kw">return</span> [value, set] <span class="kw">as const</span>;
}

<span class="cm">// useDebounce — debounce wartości</span>
<span class="kw">function</span> <span class="fn">useDebounce</span>&lt;T&gt;(value: T, delay: <span class="kw">number</span>) {
  <span class="kw">const</span> [debounced, setDebounced] = <span class="fn">useState</span>(value);
  <span class="fn">useEffect</span>(() => {
    <span class="kw">const</span> timer = <span class="fn">setTimeout</span>(() => <span class="fn">setDebounced</span>(value), delay);
    <span class="kw">return</span> () => <span class="fn">clearTimeout</span>(timer);
  }, [value, delay]);
  <span class="kw">return</span> debounced;
}

<span class="cm">// Użycie</span>
<span class="kw">function</span> <span class="fn">SearchPage</span>() {
  <span class="kw">const</span> [query, setQuery] = <span class="fn">useLocalStorage</span>(<span class="str">'search'</span>, <span class="str">''</span>);
  <span class="kw">const</span> debouncedQuery = <span class="fn">useDebounce</span>(query, <span class="num">300</span>);
  <span class="cm">// ...</span>
}</code></pre>
          </div>
        </div>

        <!-- QUIZ 4 -->`

export default function Module04() {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: STATIC }} />
      <Quiz
        id="4-1"
        label="Quiz 4.1"
        question={`Kiedy useCallback jest faktycznie potrzebny?`}
        options={[
    { text: `Zawsze — memoizuj każdy callback w komponencie`, correct: false },
    { text: `Nigdy — React i tak optymalizuje automatycznie`, correct: false },
    { text: `Gdy przekazujesz callback do memoizowanego child-komponentu (React.memo) lub gdy jest w dependency array innego hooka`, correct: true },
    { text: `Tylko w Server Components`, correct: false }
  ]}
      />
      <Quiz
        id="4-2"
        label="Quiz 4.2"
        question={`Czym różni się useRef od useState?`}
        options={[
    { text: `useRef przechowuje tylko referencje do DOM, useState dowolne wartości`, correct: false },
    { text: `Nie ma różnicy — oba powodują re-render przy zmianie`, correct: false },
    { text: `Zmiana .current w useRef NIE powoduje re-renderu. useState powoduje re-render przy każdej zmianie.`, correct: true },
    { text: `useRef jest deprecated — używaj tylko useState`, correct: false }
  ]}
      />
      <Challenge
        label="🎯 Zadanie praktyczne"
        title="Hook useWindowSize"
        desc={`Napisz custom hook <code style="font-family:monospace">useWindowSize()</code> który zwraca <code style="font-family:monospace">{ width: number, height: number }</code> i aktualizuje się przy resize okna. Pamiętaj o cleanup!`}
        hints={[
        `Stan: { width: window.innerWidth, height: window.innerHeight }`,
        `addEventListener('resize', handler) w useEffect`,
        `Cleanup: return () => removeEventListener('resize', handler)`,
        `[] jako dependency array — listener dodajesz raz`
        ]}
      />
      <Challenge
        label="🎯 Zadanie praktyczne"
        title=""
        desc={``}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title="Hook useWindowSize"
        desc={``}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={`Napisz custom hook <code style="font-family:monospace">useWindowSize()</code> który zwraca <code style="font-family:monospace">{ width: number, height: number }</code> i aktualizuje się przy resize okna. Pamiętaj o cleanup!`}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={``}
        hints={[
        `Stan: { width: window.innerWidth, height: window.innerHeight }`,
        `addEventListener('resize', handler) w useEffect`,
        `Cleanup: return () => removeEventListener('resize', handler)`,
        `[] jako dependency array — listener dodajesz raz`
        ]}
      />
      <NavButtons
        prev={"m3"}
        next={"m5"}
        prevLabel={"Moduł 3"}
        nextLabel={"Moduł 5: Formularze"}
      />
    </div>
  )
}
