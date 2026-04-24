import Quiz from '../components/Quiz'
import Challenge from '../components/Challenge'
import NavButtons from '../components/NavButtons'

const STATIC = `<div class="module-header">
          <div class="module-tag">Moduł 02</div>
          <div class="module-title">Komponenty<br>i <em>JSX</em></div>
          <div class="module-desc">Funkcyjne komponenty, JSX, props, children, renderowanie warunkowe i listy.</div>
        </div>

        <div class="section">
          <div class="section-title">Komponent to funkcja, która zwraca JSX</div>
          <p>Tyle. To naprawdę tyle. Żadnych dekoratorów, żadnych klas, żadnego metadata.</p>

          <div class="code-split">
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">TypeScript</div>
                <div class="code-label"><span class="dot dot-angular"></span>Angular</div>
              </div>
              <pre><code><span class="kw">@Component</span>({
  selector: <span class="str">'app-hello'</span>,
  template: <span class="str">\`
    &lt;h1&gt;Cześć, {{ name }}!&lt;/h1&gt;
    &lt;p&gt;Wiek: {{ age }}&lt;/p&gt;
  \`</span>
})
<span class="kw">export class</span> <span class="fn">HelloComponent</span> {
  <span class="kw">@Input</span>() name!: <span class="kw">string</span>;
  <span class="kw">@Input</span>() age!: <span class="kw">number</span>;
}</code></pre>
            </div>
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">TypeScript + JSX</div>
                <div class="code-label"><span class="dot dot-react"></span>React</div>
              </div>
              <pre><code><span class="kw">interface</span> <span class="fn">HelloProps</span> {
  name: <span class="kw">string</span>;
  age: <span class="kw">number</span>;
}

<span class="kw">export function</span> <span class="fn">Hello</span>({ name, age }: <span class="fn">HelloProps</span>) {
  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="tag">&lt;h1&gt;</span>Cześć, {name}!<span class="tag">&lt;/h1&gt;</span>
      <span class="tag">&lt;p&gt;</span>Wiek: {age}<span class="tag">&lt;/p&gt;</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}</code></pre>
            </div>
          </div>

          <div class="callout info">
            <div class="callout-icon">💡</div>
            <div class="callout-body"><strong>JSX to nie HTML.</strong> To JavaScript z syntaktycznym cukrem. <span class="ic">&lt;h1&gt;</span> kompiluje się do <span class="ic">React.createElement('h1', null, ...)</span>. Dlatego: <span class="ic">className</span> zamiast <span class="ic">class</span>, <span class="ic">htmlFor</span> zamiast <span class="ic">for</span>, wszystkie atrybuty camelCase.</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Renderowanie warunkowe</div>
          <p>Nie ma <span class="ic">*ngIf</span>. Jest JavaScript:</p>

          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">JSX</div>
              <div class="code-label"><span class="dot dot-react"></span>React</div>
            </div>
            <pre><code><span class="kw">function</span> <span class="fn">UserCard</span>({ user, isLoading }: Props) {
  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="cm">{/* && — jak *ngIf */}</span>
      {isLoading <span class="kw">&amp;&amp;</span> <span class="tag">&lt;Spinner /&gt;</span>}

      <span class="cm">{/* ternary — jak *ngIf / else */}</span>
      {user ? (
        <span class="tag">&lt;p&gt;</span>Witaj, {user.name}<span class="tag">&lt;/p&gt;</span>
      ) : (
        <span class="tag">&lt;p&gt;</span>Zaloguj się<span class="tag">&lt;/p&gt;</span>
      )}

      <span class="cm">{/* switch — wyciągasz do zmiennej */}</span>
      {<span class="fn">renderStatus</span>(user.status)}
    <span class="tag">&lt;/div&gt;</span>
  );
}</code></pre>
          </div>

          <div class="callout warning">
            <div class="callout-icon">⚠️</div>
            <div class="callout-body"><strong>Pułapka:</strong> <span class="ic">0 && &lt;Component /&gt;</span> renderuje <span class="ic">0</span> na ekranie! Zawsze używaj wyrażeń booleanowych: <span class="ic">count > 0 && &lt;Component /&gt;</span> lub <span class="ic">!!count && &lt;Component /&gt;</span>.</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Listy — zamiennik *ngFor</div>
          <div class="code-split">
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">HTML Template</div>
                <div class="code-label"><span class="dot dot-angular"></span>Angular</div>
              </div>
              <pre><code><span class="tag">&lt;ul&gt;</span>
  <span class="tag">@for</span> (item <span class="kw">of</span> items;
         track item.id) {
    <span class="tag">&lt;li&gt;</span>{{ item.name }}<span class="tag">&lt;/li&gt;</span>
  }
<span class="tag">&lt;/ul&gt;</span></code></pre>
            </div>
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">JSX</div>
                <div class="code-label"><span class="dot dot-react"></span>React</div>
              </div>
              <pre><code><span class="tag">&lt;ul&gt;</span>
  {items.<span class="fn">map</span>(item => (
    <span class="tag">&lt;li</span> <span class="attr">key</span>={item.id}<span class="tag">&gt;</span>
      {item.name}
    <span class="tag">&lt;/li&gt;</span>
  ))}
<span class="tag">&lt;/ul&gt;</span></code></pre>
            </div>
          </div>
          <div class="callout info">
            <div class="callout-icon">🔑</div>
            <div class="callout-body"><strong>key</strong> jest wymagany przy listach — jak <span class="ic">track</span> w Angularze. Musi być unikalny w obrębie listy. Nigdy nie używaj indeksu tablicy jako key (chyba że lista jest statyczna i nie zmienia kolejności).</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Children — projekcja treści</div>
          <div class="code-split">
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">Angular</div>
                <div class="code-label"><span class="dot dot-angular"></span>ng-content</div>
              </div>
              <pre><code><span class="cm">// komponent</span>
<span class="tag">&lt;ng-content /&gt;</span>

<span class="cm">// użycie</span>
<span class="tag">&lt;app-card&gt;</span>
  <span class="tag">&lt;p&gt;</span>Treść<span class="tag">&lt;/p&gt;</span>
<span class="tag">&lt;/app-card&gt;</span></code></pre>
            </div>
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">React</div>
                <div class="code-label"><span class="dot dot-react"></span>children prop</div>
              </div>
              <pre><code><span class="cm">// komponent</span>
<span class="kw">function</span> <span class="fn">Card</span>({ children }) {
  <span class="kw">return</span> <span class="tag">&lt;div&gt;</span>{children}<span class="tag">&lt;/div&gt;</span>;
}

<span class="cm">// użycie</span>
<span class="tag">&lt;Card&gt;</span>
  <span class="tag">&lt;p&gt;</span>Treść<span class="tag">&lt;/p&gt;</span>
<span class="tag">&lt;/Card&gt;</span></code></pre>
            </div>
          </div>
        </div>

        <!-- QUIZ 2 -->
        

        

        <!-- CHALLENGE -->`

export default function Module02() {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: STATIC }} />
      <Quiz
        id="2-1"
        label="Quiz 2.1"
        question={`Masz tablicę produktów. Co jest błędem w tym kodzie?<br><br><code style="font-family:monospace;font-size:13px;color:#98c379">{products.map(p => &lt;li&gt;{p.name}&lt;/li&gt;)}</code>`}
        options={[
    { text: `Powinno być forEach zamiast map`, correct: false },
    { text: `Brak atrybutu key na elemencie li`, correct: true },
    { text: `Produkty powinny być w useState`, correct: false },
    { text: `Nie można używać map w JSX`, correct: false }
  ]}
      />
      <Quiz
        id="2-2"
        label="Quiz 2.2"
        question={`Co wyrenderuje: <code style="font-family:monospace;font-size:13px;color:#98c379">{0 && &lt;Alert /&gt;}</code>?`}
        options={[
    { text: `Nic — warunek jest false, React pomija`, correct: false },
    { text: `Renderuje "0" — liczba 0 jest falsy, ale React ją wyświetla!`, correct: true },
    { text: `Renderuje komponent Alert`, correct: false },
    { text: `Rzuca TypeError`, correct: false }
  ]}
      />
      <Challenge
        label="🎯 Zadanie praktyczne"
        title="Komponent UserList"
        desc={`Napisz komponent <code style="font-family:monospace">UserList</code>, który przyjmuje props: <code style="font-family:monospace">users: User[]</code> i <code style="font-family:monospace">isLoading: boolean</code>. Gdy ładuje — pokaż tekst "Ładowanie...". Gdy pusta lista — "Brak użytkowników". W przeciwnym razie — lista imion z avatarami (pierwsze litery imienia w kółku).`}
        hints={[
        `Użyj warunkowego renderowania z ternary lub &&`,
        `Pamiętaj o key={user.id} na każdym elemencie listy`,
        `Avatar: <code style="font-family:monospace">{user.name.charAt(0).toUpperCase()}</code>`,
        `Trzy stany: loading / empty / filled — obsłuż wszystkie`
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
        title="Komponent UserList"
        desc={``}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={`Napisz komponent <code style="font-family:monospace">UserList</code>, który przyjmuje props: <code style="font-family:monospace">users: User[]</code> i <code style="font-family:monospace">isLoading: boolean</code>. Gdy ładuje — pokaż tekst "Ładowanie...". Gdy pusta lista — "Brak użytkowników". W przeciwnym razie — lista imion z avatarami (pierwsze litery imienia w kółku).`}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={``}
        hints={[
        `Użyj warunkowego renderowania z ternary lub &&`,
        `Pamiętaj o key={user.id} na każdym elemencie listy`,
        `Avatar: <code style="font-family:monospace">{user.name.charAt(0).toUpperCase()}</code>`,
        `Trzy stany: loading / empty / filled — obsłuż wszystkie`
        ]}
      />
      <NavButtons
        prev={"m1"}
        next={"m3"}
        prevLabel={"Moduł 1"}
        nextLabel={"Moduł 3: useState & useEffect"}
      />
    </div>
  )
}
