import Quiz from '../components/Quiz'
import Challenge from '../components/Challenge'
import NavButtons from '../components/NavButtons'

const STATIC = `<div class="module-header">
          <div class="module-tag">Moduł 09</div>
          <div class="module-title">Wzorce<br>i <em>architektura</em></div>
          <div class="module-desc">Compound Components, Render Props, Composition — wzorce, których szukają na rozmowie senior.</div>
        </div>

        <div class="section">
          <div class="section-title">Composition over configuration</div>
          <p>React faworyzuje kompozycję. Zamiast jednego komponentu z 20 propsami — kilka małych, które składasz razem. To fundamentalna różnica kulturowa względem Angulara.</p>

          <div class="code-split">
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">Anti-pattern</div>
                <div class="code-label"><span class="dot dot-neutral"></span>Props drilling</div>
              </div>
              <pre><code><span class="cm">// ❌ Prop explosion</span>
<span class="tag">&lt;Modal</span>
  <span class="attr">title</span>=<span class="str">"Tytuł"</span>
  <span class="attr">showHeader</span>={<span class="kw">true</span>}
  <span class="attr">showFooter</span>={<span class="kw">true</span>}
  <span class="attr">footerBtnLabel</span>=<span class="str">"OK"</span>
  <span class="attr">onClose</span>={fn}
  <span class="attr">onConfirm</span>={fn}
  <span class="attr">isLoading</span>={<span class="kw">false</span>}
  <span class="attr">content</span>={<span class="tag">&lt;p&gt;</span>...<span class="tag">&lt;/p&gt;</span>}
<span class="tag">/&gt;</span></code></pre>
            </div>
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">Pattern</div>
                <div class="code-label"><span class="dot dot-react"></span>Compound Components</div>
              </div>
              <pre><code><span class="cm">// ✓ Elastyczny, czytelny</span>
<span class="tag">&lt;Modal</span> <span class="attr">onClose</span>={fn}<span class="tag">&gt;</span>
  <span class="tag">&lt;Modal.Header&gt;</span>
    Tytuł
  <span class="tag">&lt;/Modal.Header&gt;</span>
  <span class="tag">&lt;Modal.Body&gt;</span>
    <span class="tag">&lt;p&gt;</span>Treść<span class="tag">&lt;/p&gt;</span>
  <span class="tag">&lt;/Modal.Body&gt;</span>
  <span class="tag">&lt;Modal.Footer&gt;</span>
    <span class="tag">&lt;button</span> <span class="attr">onClick</span>={fn}<span class="tag">&gt;</span>OK<span class="tag">&lt;/button&gt;</span>
  <span class="tag">&lt;/Modal.Footer&gt;</span>
<span class="tag">&lt;/Modal&gt;</span></code></pre>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Compound Components — implementacja</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>React</div>
            </div>
            <pre><code><span class="kw">const</span> ModalContext = <span class="fn">createContext</span>&lt;{ onClose: () => <span class="kw">void</span> }&gt;(<span class="kw">null</span>!);

<span class="kw">function</span> <span class="fn">Modal</span>({ children, onClose }) {
  <span class="kw">return</span> (
    <span class="tag">&lt;ModalContext.Provider</span> <span class="attr">value</span>={{ onClose }}<span class="tag">&gt;</span>
      <span class="tag">&lt;div</span> <span class="attr">className</span>=<span class="str">"modal-overlay"</span> <span class="attr">onClick</span>={onClose}<span class="tag">&gt;</span>
        <span class="tag">&lt;div</span> <span class="attr">className</span>=<span class="str">"modal"</span> <span class="attr">onClick</span>={e => e.<span class="fn">stopPropagation</span>()}<span class="tag">&gt;</span>
          {children}
        <span class="tag">&lt;/div&gt;</span>
      <span class="tag">&lt;/div&gt;</span>
    <span class="tag">&lt;/ModalContext.Provider&gt;</span>
  );
}

<span class="kw">function</span> <span class="fn">ModalHeader</span>({ children }) {
  <span class="kw">const</span> { onClose } = <span class="fn">useContext</span>(ModalContext);
  <span class="kw">return</span> (
    <span class="tag">&lt;div</span> <span class="attr">className</span>=<span class="str">"modal-header"</span><span class="tag">&gt;</span>
      {children}
      <span class="tag">&lt;button</span> <span class="attr">onClick</span>={onClose}<span class="tag">&gt;</span>✕<span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}

<span class="cm">// Attach sub-komponenty do Modal</span>
Modal.Header = ModalHeader;
Modal.Body = ({ children }) => <span class="tag">&lt;div</span> <span class="attr">className</span>=<span class="str">"modal-body"</span><span class="tag">&gt;</span>{children}<span class="tag">&lt;/div&gt;</span>;
Modal.Footer = ({ children }) => <span class="tag">&lt;div</span> <span class="attr">className</span>=<span class="str">"modal-footer"</span><span class="tag">&gt;</span>{children}<span class="tag">&lt;/div&gt;</span>;</code></pre>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Kluczowe zasady architektury</div>
          <ul class="styled">
            <li><strong>Single Responsibility</strong> — każdy komponent robi jedną rzecz. Logika biznesowa → custom hooks, UI → komponenty.</li>
            <li><strong>Colocate</strong> — trzymaj pliki blisko tego gdzie są używane. Nie jeden globalny folder "components".</li>
            <li><strong>Prezentacyjne vs kontenerowe</strong> — komponenty UI nie wiedzą skąd dane. Wyżej w drzewie: fetching i logika.</li>
            <li><strong>Feature-based struktura folderów</strong> — <span class="ic">features/users/</span>, <span class="ic">features/cart/</span> zamiast <span class="ic">components/</span>, <span class="ic">services/</span>.</li>
            <li><strong>Barrel exports</strong> — <span class="ic">index.ts</span> w każdym module, żeby importować <span class="ic">from 'features/users'</span>.</li>
          </ul>
        </div>

        <!-- QUIZ 9 -->
        

        
      </div>`

export default function Module09() {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: STATIC }} />
      <Quiz
        id="9-1"
        label="Quiz 9.1"
        question={`Czym jest wzorzec Compound Components i po co go używać?`}
        options={[
    { text: `Sposób na lazy loading wielu komponentów jednocześnie`, correct: false },
    { text: `Redux pattern do zarządzania złożonym stanem`, correct: false },
    { text: `Rodzina powiązanych komponentów współdzielących niejawny stan przez Context — daje elastyczność bez prop explosion`, correct: true },
    { text: `Sposób na łączenie wielu Redux reducerów`, correct: false }
  ]}
      />
      <NavButtons
        prev={"m8"}
        next={"m10"}
        prevLabel={"Moduł 8"}
        nextLabel={"Moduł 10: Testy"}
      />
    </div>
  )
}
