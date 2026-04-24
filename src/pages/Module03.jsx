import Quiz from '../components/Quiz'
import Challenge from '../components/Challenge'
import NavButtons from '../components/NavButtons'

const STATIC = `<div class="module-header">
          <div class="module-tag">Moduł 03</div>
          <div class="module-title"><em>useState</em><br>& useEffect</div>
          <div class="module-desc">Dwa najważniejsze hooki. Serce Reacta. Tu jest 80% tego co musisz wiedzieć.</div>
        </div>

        <div class="section">
          <div class="section-title">useState — lokalny stan komponentu</div>
          <p>Zamiast <span class="ic">this.property = value</span> masz <span class="ic">setState</span>. Zmiana stanu → React re-renderuje komponent.</p>

          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript + JSX</div>
              <div class="code-label"><span class="dot dot-react"></span>React</div>
            </div>
            <pre><code><span class="kw">import</span> { useState } <span class="kw">from</span> <span class="str">'react'</span>;

<span class="kw">function</span> <span class="fn">Counter</span>() {
  <span class="cm">// [wartość, setter] — destrukturyzacja tablicy</span>
  <span class="kw">const</span> [count, setCount] = <span class="fn">useState</span>(<span class="num">0</span>);
  <span class="kw">const</span> [name, setName] = <span class="fn">useState</span>(<span class="str">''</span>);

  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="tag">&lt;p&gt;</span>Licznik: {count}<span class="tag">&lt;/p&gt;</span>
      <span class="tag">&lt;button</span> <span class="attr">onClick</span>={() => <span class="fn">setCount</span>(count + <span class="num">1</span>)}<span class="tag">&gt;</span>+<span class="tag">&lt;/button&gt;</span>
      <span class="tag">&lt;button</span> <span class="attr">onClick</span>={() => <span class="fn">setCount</span>(c => c - <span class="num">1</span>)}<span class="tag">&gt;</span>-<span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}</code></pre>
          </div>

          <div class="concept-box">
            <h4>Functional update — kiedy używać</h4>
            <p><span class="ic">setCount(count + 1)</span> — bezpośrednia wartość. OK gdy nie zależy na poprzednim stanie.</p>
            <p><span class="ic">setCount(c => c + 1)</span> — funkcja z poprzednim stanem. <strong>Zawsze używaj tego w callbackach asynchronicznych</strong>, bo <span class="ic">count</span> może być "stary" (closure problem).</p>
          </div>

          <div class="callout warning">
            <div class="callout-icon">⚠️</div>
            <div class="callout-body">
              <strong>Stan jest immutable!</strong> Nigdy nie mutuj bezpośrednio:<br>
              <code style="font-family:monospace;color:#f87171">❌ user.name = 'Anna' // React nie zobaczy zmiany!</code><br>
              <code style="font-family:monospace;color:#4ade80">✓ setUser({...user, name: 'Anna'})</code>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">useEffect — efekty uboczne i lifecycle</div>
          <p>Jeden hook zastępuje <span class="ic">ngOnInit</span>, <span class="ic">ngOnChanges</span>, <span class="ic">ngOnDestroy</span> i <span class="ic">ngAfterViewInit</span>.</p>

          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>React</div>
            </div>
            <pre><code><span class="kw">import</span> { useEffect, useState } <span class="kw">from</span> <span class="str">'react'</span>;

<span class="kw">function</span> <span class="fn">UserProfile</span>({ userId }: { userId: <span class="kw">string</span> }) {
  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>(<span class="kw">null</span>);

  <span class="cm">// 1. [] — działa raz, jak ngOnInit</span>
<span class="hl">  <span class="fn">useEffect</span>(() => {
    console.<span class="fn">log</span>(<span class="str">'mounted!'</span>);
    <span class="kw">return</span> () => console.<span class="fn">log</span>(<span class="str">'unmounted!'</span>); <span class="cm">// cleanup = ngOnDestroy</span>
  }, []);
</span>
  <span class="cm">// 2. [userId] — reaguje na zmianę userId, jak ngOnChanges</span>
<span class="hl">  <span class="fn">useEffect</span>(() => {
    <span class="kw">fetch</span>(<span class="str">\`/api/users/</span>\${userId}<span class="str">\`</span>)
      .<span class="fn">then</span>(r => r.<span class="fn">json</span>())
      .<span class="fn">then</span>(data => <span class="fn">setUser</span>(data));
  }, [userId]); <span class="cm">// dependency array!</span>
</span>
  <span class="cm">// 3. bez [] — działa po każdym renderze</span>
  <span class="fn">useEffect</span>(() => {
    document.title = user?.name ?? <span class="str">'Loading...'</span>;
  }); <span class="cm">// ← brak tablicy = każdy render</span>

  <span class="kw">return</span> <span class="tag">&lt;div&gt;</span>{user?.name}<span class="tag">&lt;/div&gt;</span>;
}</code></pre>
          </div>

          <div class="callout warning">
            <div class="callout-icon">⚠️</div>
            <div class="callout-body">
              <strong>Najczęstszy błąd: dependency array.</strong> Jeśli używasz zmiennej wewnątrz useEffect, musi być w tablicy. ESLint plugin <span class="ic">eslint-plugin-react-hooks</span> to sprawdza — zawsze go używaj.
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Async w useEffect — prawidłowy wzorzec</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>React</div>
            </div>
            <pre><code><span class="fn">useEffect</span>(() => {
  <span class="cm">// useEffect NIE może być async — callback musi zwrócić cleanup lub nic</span>
  <span class="cm">// Rozwiązanie: IIFE lub osobna funkcja wewnątrz</span>

  <span class="kw">const</span> <span class="fn">fetchUser</span> = <span class="kw">async</span> () => {
    <span class="kw">try</span> {
      <span class="kw">const</span> data = <span class="kw">await</span> <span class="fn">getUser</span>(userId);
      <span class="fn">setUser</span>(data);
    } <span class="kw">catch</span> (err) {
      <span class="fn">setError</span>(err);
    }
  };

  <span class="fn">fetchUser</span>();

  <span class="cm">// Cleanup — anuluj request jeśli komponent się odmontuje</span>
  <span class="kw">const</span> controller = <span class="kw">new</span> <span class="fn">AbortController</span>();
  <span class="kw">return</span> () => controller.<span class="fn">abort</span>();
}, [userId]);</code></pre>
          </div>
          <div class="callout success">
            <div class="callout-icon">✓</div>
            <div class="callout-body"><strong>Tip:</strong> W praktyce do fetchowania danych nie używaj useEffect + useState bezpośrednio. Użyj <strong>TanStack Query</strong> (Moduł 8) — obsługuje loading, error, cache, deduplication za Ciebie.</div>
          </div>
        </div>

        <!-- QUIZ 3 -->`

export default function Module03() {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: STATIC }} />
      <Quiz
        id="3-1"
        label="Quiz 3.1"
        question={`Masz komponent z useEffect. Kiedy wywoła się cleanup (funkcja zwracana z useEffect)?`}
        options={[
    { text: `Tylko gdy komponent jest odmontowywany (unmount)`, correct: false },
    { text: `Przed każdym kolejnym uruchomieniem efektu oraz przy odmontowaniu`, correct: true },
    { text: `Tylko gdy dependency array się zmieni`, correct: false },
    { text: `Nigdy — cleanup to tylko konwencja, React go ignoruje`, correct: false }
  ]}
      />
      <Quiz
        id="3-2"
        label="Quiz 3.2"
        question={`Co jest nie tak z tym kodem?<br><br><code style="font-family:monospace;font-size:12px;color:#abb2bf">const [items, setItems] = useState([]);<br>setItems(items.push(newItem)); // dodajemy element</code>`}
        options={[
    { text: `push nie istnieje na tablicach w React`, correct: false },
    { text: `push mutuje tablicę (nie tworzy nowej) i zwraca długość, nie tablicę — podwójny błąd`, correct: true },
    { text: `Powinno być setItems([newItem]) żeby zastąpić całą tablicę`, correct: false },
    { text: `Nic — ten kod jest poprawny`, correct: false }
  ]}
      />
      <Challenge
        label="🎯 Zadanie praktyczne"
        title="Hook useFetch"
        desc={`Napisz custom hook <code style="font-family:monospace">useFetch&lt;T&gt;(url: string)</code> który zwraca <code style="font-family:monospace">{ data: T | null, loading: boolean, error: string | null }</code>. Anuluj request przy odmontowaniu komponentu przez AbortController.`}
        hints={[
        `Użyj trzech stanów: data, loading, error`,
        `useEffect z [url] w dependency array`,
        `new AbortController() → fetch(url, { signal: controller.signal })`,
        `W cleanup: controller.abort()`,
        `Złap błąd AbortError osobno — to nie jest prawdziwy błąd`
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
        title="Hook useFetch"
        desc={``}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={`Napisz custom hook <code style="font-family:monospace">useFetch&lt;T&gt;(url: string)</code> który zwraca <code style="font-family:monospace">{ data: T | null, loading: boolean, error: string | null }</code>. Anuluj request przy odmontowaniu komponentu przez AbortController.`}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={``}
        hints={[
        `Użyj trzech stanów: data, loading, error`,
        `useEffect z [url] w dependency array`,
        `new AbortController() → fetch(url, { signal: controller.signal })`,
        `W cleanup: controller.abort()`,
        `Złap błąd AbortError osobno — to nie jest prawdziwy błąd`
        ]}
      />
      <NavButtons
        prev={"m2"}
        next={"m4"}
        prevLabel={"Moduł 2"}
        nextLabel={"Moduł 4: Pełny arsenał hooków"}
      />
    </div>
  )
}
