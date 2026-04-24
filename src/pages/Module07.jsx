import Quiz from '../components/Quiz'
import Challenge from '../components/Challenge'
import NavButtons from '../components/NavButtons'

const STATIC = `<div class="module-header">
          <div class="module-tag">Moduł 07</div>
          <div class="module-title">Global state —<br><em>Zustand</em></div>
          <div class="module-desc">Zarządzanie stanem globalnym bez Redux-owego boilerplate. Zustand to 1KB biblioteki, która robi wszystko czego potrzebujesz.</div>
        </div>

        <div class="section">
          <div class="section-title">Dlaczego nie Redux?</div>
          <p>Redux był standardem przez lata, ale Redux Toolkit (RTK) wciąż wymaga sporo konfiguracji: actions, reducers, selectors, configureStore. Zustand to całkowite przeciwieństwo — minimal API, zero boilerplate.</p>

          <div class="callout info">
            <div class="callout-icon">📊</div>
            <div class="callout-body"><strong>Kiedy co:</strong> Zustand → 90% projektów. Redux Toolkit → gdy masz skomplikowany flow z middleware, lub pracujesz z legacy kodem. Jotai/Recoil → atomic state. Context API → mało zmieniające się dane (theme, locale).</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Tworzenie store</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>Zustand store</div>
            </div>
            <pre><code><span class="kw">import</span> { create } <span class="kw">from</span> <span class="str">'zustand'</span>;
<span class="kw">import</span> { persist } <span class="kw">from</span> <span class="str">'zustand/middleware'</span>;

<span class="kw">interface</span> <span class="fn">CartStore</span> {
  items: CartItem[];
  total: <span class="kw">number</span>;
  <span class="fn">addItem</span>: (item: CartItem) => <span class="kw">void</span>;
  <span class="fn">removeItem</span>: (id: <span class="kw">string</span>) => <span class="kw">void</span>;
  <span class="fn">clearCart</span>: () => <span class="kw">void</span>;
}

<span class="kw">export const</span> useCartStore = <span class="fn">create</span>&lt;<span class="fn">CartStore</span>&gt;()(
  <span class="fn">persist</span>(  <span class="cm">// middleware: auto-zapisuje do localStorage!</span>
    (<span class="fn">set</span>, <span class="fn">get</span>) => ({
      items: [],
      total: <span class="num">0</span>,

      <span class="fn">addItem</span>: (item) =>
        <span class="fn">set</span>(state => {
          <span class="kw">const</span> existing = state.items.<span class="fn">find</span>(i => i.id === item.id);
          <span class="kw">if</span> (existing) {
            <span class="kw">return</span> {
              items: state.items.<span class="fn">map</span>(i =>
                i.id === item.id
                  ? {...i, qty: i.qty + <span class="num">1</span>}
                  : i
              )
            };
          }
          <span class="kw">return</span> { items: [...state.items, {...item, qty: <span class="num">1</span>}] };
        }),

      <span class="fn">removeItem</span>: (id) =>
        <span class="fn">set</span>(state => ({
          items: state.items.<span class="fn">filter</span>(i => i.id !== id)
        })),

      <span class="fn">clearCart</span>: () => <span class="fn">set</span>({ items: [], total: <span class="num">0</span> }),
    }),
    { name: <span class="str">'cart-storage'</span> }
  )
);</code></pre>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Używanie store — selektory</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>W komponentach</div>
            </div>
            <pre><code><span class="kw">function</span> <span class="fn">CartIcon</span>() {
  <span class="cm">// Selektor — re-render TYLKO gdy items.length się zmieni</span>
  <span class="kw">const</span> count = <span class="fn">useCartStore</span>(state => state.items.length);

  <span class="kw">return</span> <span class="tag">&lt;span&gt;</span>🛒 {count}<span class="tag">&lt;/span&gt;</span>;
}

<span class="kw">function</span> <span class="fn">ProductCard</span>({ product }) {
  <span class="cm">// Wyciągamy tylko akcję — bez reaktywności na całym store</span>
  <span class="kw">const</span> addItem = <span class="fn">useCartStore</span>(state => state.addItem);

  <span class="kw">return</span> (
    <span class="tag">&lt;button</span> <span class="attr">onClick</span>={() => <span class="fn">addItem</span>(product)}<span class="tag">&gt;</span>
      Dodaj do koszyka
    <span class="tag">&lt;/button&gt;</span>
  );
}

<span class="kw">function</span> <span class="fn">CartPage</span>() {
  <span class="cm">// Wiele wartości naraz</span>
  <span class="kw">const</span> { items, total, clearCart } = <span class="fn">useCartStore</span>();
  <span class="cm">// Uwaga: re-renderuje przy każdej zmianie store!</span>
  <span class="cm">// Dla wydajności: używaj selektorów per-field</span>
}</code></pre>
          </div>
        </div>

        <!-- QUIZ 7 -->`

export default function Module07() {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: STATIC }} />
      <Quiz
        id="7-1"
        label="Quiz 7.1"
        question={`Masz store Zustand z 10 polami. Komponent używa tylko <code style="font-family:monospace">useStore(s => s.userName)</code>. Kiedy komponent się re-renderuje?`}
        options={[
    { text: `Przy każdej zmianie czegokolwiek w storze`, correct: false },
    { text: `Tylko gdy userName się zmieni — selektor izoluje reaktywność`, correct: true },
    { text: `Nigdy — Zustand nie powoduje re-renderów`, correct: false },
    { text: `Tylko gdy komponent wywołał akcję`, correct: false }
  ]}
      />
      <Challenge
        label="🎯 Zadanie praktyczne"
        title="Store powiadomień"
        desc={`Zbuduj Zustand store <code style="font-family:monospace">useNotificationStore</code> z: listą powiadomień (id, message, type: 'success'|'error'|'info'), akcją <code style="font-family:monospace">addNotification</code> (auto-generuje id) i <code style="font-family:monospace">dismissNotification(id)</code>. Powiadomienia powinny auto-znikać po 3 sekundach.`}
        hints={[
        `id: crypto.randomUUID() lub Date.now().toString()`,
        `W addNotification: setTimeout(() => dismissNotification(id), 3000)`,
        `setTimeout ma dostęp do id przez closure`,
        `get() w Zustand daje aktualny stan bez reaktywności`
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
        title="Store powiadomień"
        desc={``}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={`Zbuduj Zustand store <code style="font-family:monospace">useNotificationStore</code> z: listą powiadomień (id, message, type: 'success'|'error'|'info'), akcją <code style="font-family:monospace">addNotification</code> (auto-generuje id) i <code style="font-family:monospace">dismissNotification(id)</code>. Powiadomienia powinny auto-znikać po 3 sekundach.`}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={``}
        hints={[
        `id: crypto.randomUUID() lub Date.now().toString()`,
        `W addNotification: setTimeout(() => dismissNotification(id), 3000)`,
        `setTimeout ma dostęp do id przez closure`,
        `get() w Zustand daje aktualny stan bez reaktywności`
        ]}
      />
      <NavButtons
        prev={"m6"}
        next={"m8"}
        prevLabel={"Moduł 6"}
        nextLabel={"Moduł 8: TanStack Query"}
      />
    </div>
  )
}
