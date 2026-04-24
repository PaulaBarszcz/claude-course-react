import Quiz from '../components/Quiz'
import Challenge from '../components/Challenge'
import NavButtons from '../components/NavButtons'

const STATIC = `<div class="module-header">
          <div class="module-tag">Moduł 01</div>
          <div class="module-title">Mental model:<br><em>Angular → React</em></div>
          <div class="module-desc">Zanim napiszesz pierwszą linię Reacta — zrozum, co odpowiada czemu. To przyspieszy naukę 3×.</div>
        </div>

        <div class="section">
          <div class="section-title">Fundamentalna różnica filozoficzna</div>
          <p>Angular to <strong>framework</strong> — dostarcza gotowe rozwiązania na wszystko: DI, routing, formularze, HTTP, change detection. React to <strong>biblioteka UI</strong> — obsługuje tylko renderowanie. Resztę dobierasz sam.</p>
          <p>To nie jest minus Reacta — to feature. Ekosystem się rozwinął i dla każdego problemu jest jedno dobre rozwiązanie, które robi robotę świetnie.</p>

          <div class="callout info">
            <div class="callout-icon">💡</div>
            <div class="callout-body"><strong>Kluczowy mental shift:</strong> W Angularze pytasz "jak to zrobić w Angularze?". W Reakcie pytasz "jak to zrobić w JavaScript?" — React jest transparentny, JS jest na wierzchu.</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Tabela przekładów Angular → React</div>
          <table class="compare-table">
            <thead>
              <tr>
                <th class="concept-col">Concept</th>
                <th class="angular-col">Angular 20</th>
                <th class="react-col">React 19</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="concept">Komponent</td><td class="angular">@Component class</td><td class="react-c">function + JSX</td></tr>
              <tr><td class="concept">Template syntax</td><td class="angular">@if, @for, @switch</td><td class="react-c">JS w JSX: &&, .map()</td></tr>
              <tr><td class="concept">Lifecycle OnInit</td><td class="angular">ngOnInit()</td><td class="react-c">useEffect(fn, [])</td></tr>
              <tr><td class="concept">Lifecycle OnDestroy</td><td class="angular">ngOnDestroy()</td><td class="react-c">useEffect return fn</td></tr>
              <tr><td class="concept">Two-way binding</td><td class="angular">[(ngModel)]</td><td class="react-c">value + onChange</td></tr>
              <tr><td class="concept">Input property</td><td class="angular">@Input() prop</td><td class="react-c">props.prop</td></tr>
              <tr><td class="concept">Output event</td><td class="angular">@Output() EventEmitter</td><td class="react-c">props.onXxx callback</td></tr>
              <tr><td class="concept">Service (singleton)</td><td class="angular">@Injectable class</td><td class="react-c">custom hook / Zustand</td></tr>
              <tr><td class="concept">Dependency Injection</td><td class="angular">inject() / constructor</td><td class="react-c">import + call</td></tr>
              <tr><td class="concept">Pipe (transform)</td><td class="angular">@Pipe, | pipe</td><td class="react-c">zwykła funkcja JS</td></tr>
              <tr><td class="concept">Reactive Forms</td><td class="angular">FormGroup, FormControl</td><td class="react-c">React Hook Form</td></tr>
              <tr><td class="concept">HttpClient + RxJS</td><td class="angular">Observable pipe chain</td><td class="react-c">TanStack Query + fetch</td></tr>
              <tr><td class="concept">Router</td><td class="angular">RouterModule, routes[]</td><td class="react-c">React Router v6</td></tr>
              <tr><td class="concept">Guard</td><td class="angular">CanActivateFn</td><td class="react-c">loader / wrapper component</td></tr>
              <tr><td class="concept">NgModule</td><td class="angular">@NgModule</td><td class="react-c">nie istnieje (zwykły import)</td></tr>
              <tr><td class="concept">Change detection</td><td class="angular">Zone.js / signals</td><td class="react-c">useState trigger re-render</td></tr>
              <tr><td class="concept">Standalone components</td><td class="angular">standalone: true</td><td class="react-c">każdy komponent jest standalone</td></tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">Co zniknęło (i dlaczego to dobrze)</div>

          <div class="callout angular">
            <div class="callout-icon">🗑</div>
            <div class="callout-body">
              <strong>NgModule</strong> — W Reacte nie ma modułów. Każdy komponent to plik, który importujesz jak każdy inny moduł JS. Koniec z boilerplate <code>declarations</code>, <code>imports</code>, <code>exports</code>.
            </div>
          </div>
          <div class="callout angular">
            <div class="callout-icon">🗑</div>
            <div class="callout-body">
              <strong>Zone.js i change detection</strong> — React nie ślędzi magicznie co się zmieniło. Ty wywołujesz <span class="ic">setState</span> → React wie że coś się zmieniło → re-render. Prostsze, przewidywalne.
            </div>
          </div>
          <div class="callout angular">
            <div class="callout-icon">🗑</div>
            <div class="callout-body">
              <strong>RxJS jako domyślny tool</strong> — W Reacte nie ma Observables wszędzie. Async to <span class="ic">async/await</span>. RxJS możesz użyć jeśli chcesz, ale nie musisz.
            </div>
          </div>
          <div class="callout angular">
            <div class="callout-icon">🗑</div>
            <div class="callout-body">
              <strong>Klasy komponentów</strong> — Żadnych <span class="ic">class MyComponent implements OnInit</span>. Wszystko to funkcje. React 16.8+ (2019) przestawił się na hooki — klasy wciąż działają, ale nikt ich nie pisze.
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Co jest naprawdę nowe (od 2018)</div>
          <p>W 2018 React był jeszcze klasowy. Oto co się zmieniło:</p>
          <ul class="styled">
            <li><strong>Hooks (React 16.8, 2019)</strong> — useState, useEffect i cała rodzina. To jest teraz React.</li>
            <li><strong>Concurrent Mode / Fiber (React 18, 2022)</strong> — renderowanie nie blokuje UI, Suspense, transitions.</li>
            <li><strong>useTransition, useDeferredValue (React 18)</strong> — kontrola priorytetu renderowania.</li>
            <li><strong>Server Components (React 19, 2024)</strong> — komponenty renderowane na serwerze, bez JS na kliencie.</li>
            <li><strong>use() hook (React 19)</strong> — await w komponencie, nowy sposób na dane asynchroniczne.</li>
            <li><strong>Actions / useActionState (React 19)</strong> — nowy model formularzy i mutacji.</li>
          </ul>
          <div class="callout success">
            <div class="callout-icon">✓</div>
            <div class="callout-body"><strong>Na rozmowie</strong> wystarczy znać hooki dobrze, wiedzieć że React 18 wprowadził Concurrent Mode, i wiedzieć że React 19 to Server Components. Reszty nikt nie pyta na poziomie senior bez wcześniejszego ostrzeżenia.</div>
          </div>
        </div>

        <!-- QUIZ 1 -->
        

        

        
      </div>`

export default function Module01() {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: STATIC }} />
      <Quiz
        id="1-1"
        label="Quiz 1.1"
        question={`Czym w React odpowiada serwis z Angular (singleton z logiką)?`}
        options={[
    { text: `Redux store — zawsze używaj Reduxa do serwisów`, correct: false },
    { text: `@Injectable klasa — React ma to samo`, correct: false },
    { text: `Custom hook lub Zustand store — logikę wyciągasz do reużywalnej funkcji lub store'a`, correct: true },
    { text: `Context API — jedyny sposób na współdzielenie logiki`, correct: false }
  ]}
      />
      <Quiz
        id="1-2"
        label="Quiz 1.2"
        question={`Hooki w React pojawiły się w wersji:`}
        options={[
    { text: `React 15 (2016)`, correct: false },
    { text: `React 16.8 (luty 2019)`, correct: true },
    { text: `React 17 (2020)`, correct: false },
    { text: `React 18 (2022)`, correct: false }
  ]}
      />
      <NavButtons
        prev={"home"}
        next={"m2"}
        prevLabel={"Spis treści"}
        nextLabel={"Moduł 2: Komponenty"}
      />
    </div>
  )
}
