import Quiz from '../components/Quiz'
import Challenge from '../components/Challenge'
import NavButtons from '../components/NavButtons'

const STATIC = `<div class="module-header">
          <div class="module-tag">Moduł 05</div>
          <div class="module-title">Formularze<br>& <em>React Hook Form</em></div>
          <div class="module-desc">Formularze w React to jeden z najważniejszych tematów. React Hook Form to de facto standard — lżejszy i prostszy niż Reactive Forms.</div>
        </div>

        <div class="section">
          <div class="section-title">Controlled vs Uncontrolled</div>
          <p>W Angular wszystko było "controlled" przez FormControl. React ma dwa podejścia:</p>

          <div class="code-split">
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">JSX</div>
                <div class="code-label"><span class="dot dot-react"></span>Controlled input</div>
              </div>
              <pre><code><span class="cm">// Stan jest w React — React kontroluje</span>
<span class="kw">const</span> [email, setEmail] = <span class="fn">useState</span>(<span class="str">''</span>);

<span class="tag">&lt;input</span>
  <span class="attr">value</span>={email}
  <span class="attr">onChange</span>={e => <span class="fn">setEmail</span>(e.target.value)}
<span class="tag">/&gt;</span>

<span class="cm">// Każde naciśnięcie klawisza → re-render</span>
<span class="cm">// Dobre do: live validation, dependent fields</span></code></pre>
            </div>
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">JSX</div>
                <div class="code-label"><span class="dot dot-react"></span>Uncontrolled (ref)</div>
              </div>
              <pre><code><span class="cm">// DOM przechowuje wartość — React nie kontroluje</span>
<span class="kw">const</span> emailRef = <span class="fn">useRef</span>();

<span class="tag">&lt;input</span> <span class="attr">ref</span>={emailRef} <span class="tag">/&gt;</span>

<span class="cm">// Wartość przy submit:</span>
<span class="kw">const</span> val = emailRef.current.value;

<span class="cm">// Dobre do: proste formy, duże formularze
// React Hook Form używa tego podejścia!</span></code></pre>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">React Hook Form — standard w 2025</div>
          <p>Działa uncontrolled (zero re-renderów przy pisaniu), ma integrację z TypeScript i Zod, obsługuje złożone walidacje.</p>

          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>React Hook Form + Zod</div>
            </div>
            <pre><code><span class="kw">import</span> { useForm } <span class="kw">from</span> <span class="str">'react-hook-form'</span>;
<span class="kw">import</span> { zodResolver } <span class="kw">from</span> <span class="str">'@hookform/resolvers/zod'</span>;
<span class="kw">import</span> { z } <span class="kw">from</span> <span class="str">'zod'</span>;

<span class="cm">// 1. Schema walidacji</span>
<span class="kw">const</span> schema = z.<span class="fn">object</span>({
  email: z.<span class="fn">string</span>().<span class="fn">email</span>(<span class="str">'Nieprawidłowy email'</span>),
  password: z.<span class="fn">string</span>().<span class="fn">min</span>(<span class="num">8</span>, <span class="str">'Min. 8 znaków'</span>),
  age: z.<span class="fn">number</span>().<span class="fn">min</span>(<span class="num">18</span>),
});

<span class="kw">type</span> <span class="fn">FormData</span> = z.<span class="fn">infer</span>&lt;<span class="kw">typeof</span> schema&gt;;

<span class="kw">function</span> <span class="fn">LoginForm</span>() {
  <span class="kw">const</span> {
    register,      <span class="cm">// rejestruje pole</span>
    handleSubmit,  <span class="cm">// wrapper na submit</span>
    formState: { errors, isSubmitting },
    watch,         <span class="cm">// obserwuje wartość pola</span>
    setValue,      <span class="cm">// programowe ustawianie</span>
  } = <span class="fn">useForm</span>&lt;<span class="fn">FormData</span>&gt;({
    resolver: <span class="fn">zodResolver</span>(schema),
    defaultValues: { email: <span class="str">''</span>, password: <span class="str">''</span> },
  });

  <span class="kw">const</span> <span class="fn">onSubmit</span> = <span class="kw">async</span> (data: <span class="fn">FormData</span>) => {
    <span class="kw">await</span> <span class="fn">login</span>(data); <span class="cm">// data jest już zwalidowana i typed</span>
  };

  <span class="kw">return</span> (
    <span class="tag">&lt;form</span> <span class="attr">onSubmit</span>={<span class="fn">handleSubmit</span>(onSubmit)}<span class="tag">&gt;</span>
      <span class="tag">&lt;input</span>
        {..register(<span class="str">'email'</span>)}
        <span class="attr">placeholder</span>=<span class="str">"Email"</span>
      <span class="tag">/&gt;</span>
      {errors.email && (
        <span class="tag">&lt;span&gt;</span>{errors.email.message}<span class="tag">&lt;/span&gt;</span>
      )}

      <span class="tag">&lt;input</span>
        {..register(<span class="str">'password'</span>)}
        <span class="attr">type</span>=<span class="str">"password"</span>
      <span class="tag">/&gt;</span>
      {errors.password && (
        <span class="tag">&lt;span&gt;</span>{errors.password.message}<span class="tag">&lt;/span&gt;</span>
      )}

      <span class="tag">&lt;button</span> <span class="attr">disabled</span>={isSubmitting}<span class="tag">&gt;</span>
        {isSubmitting ? <span class="str">'Logowanie...'</span> : <span class="str">'Zaloguj'</span>}
      <span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/form&gt;</span>
  );
}</code></pre>
          </div>

          <div class="callout success">
            <div class="callout-icon">✓</div>
            <div class="callout-body">Porównanie z Angular Reactive Forms: <strong>brak boilerplate</strong> FormGroup/FormControl, typy wyciągane z Zod schema automatycznie, zero re-renderów przy pisaniu (uncontrolled), integracja z dowolnym komponentem UI przez <span class="ic">Controller</span>.</div>
          </div>
        </div>

        <!-- QUIZ 5 -->`

export default function Module05() {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: STATIC }} />
      <Quiz
        id="5-1"
        label="Quiz 5.1"
        question={`Dlaczego React Hook Form jest wydajniejszy niż Controlled inputs przy dużych formularzach?`}
        options={[
    { text: `Bo waliduje po stronie serwera`, correct: false },
    { text: `Używa uncontrolled inputs (ref) — DOM zarządza stanem, React nie re-renderuje przy każdym keystroke`, correct: true },
    { text: `Używa Web Workers do walidacji asynchronicznej`, correct: false },
    { text: `Kompiluje formularz do WebAssembly`, correct: false }
  ]}
      />
      <Challenge
        label="🎯 Zadanie praktyczne"
        title="Formularz rejestracji"
        desc={`Zbuduj formularz rejestracji z polami: name (min 2 znaki), email, password (min 8 znaków, musi mieć wielką literę), confirmPassword (musi pasować do password). Użyj React Hook Form + Zod. Pokaż błędy pod każdym polem.`}
        hints={[
        `Walidacja hasła: z.string().regex(/[A-Z]/, 'Wymagana wielka litera')`,
        `confirmPassword: z.string(), potem .refine() na całym obiekcie`,
        `schema.refine(data => data.password === data.confirmPassword, { message: '...', path: ['confirmPassword'] })`
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
        title="Formularz rejestracji"
        desc={``}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={`Zbuduj formularz rejestracji z polami: name (min 2 znaki), email, password (min 8 znaków, musi mieć wielką literę), confirmPassword (musi pasować do password). Użyj React Hook Form + Zod. Pokaż błędy pod każdym polem.`}
        hints={[
        
        ]}
      />
      <Challenge
        label="🎯 Zadanie"
        title=""
        desc={``}
        hints={[
        `Walidacja hasła: z.string().regex(/[A-Z]/, 'Wymagana wielka litera')`,
        `confirmPassword: z.string(), potem .refine() na całym obiekcie`,
        `schema.refine(data => data.password === data.confirmPassword, { message: '...', path: ['confirmPassword'] })`
        ]}
      />
      <NavButtons
        prev={"m4"}
        next={"m6"}
        prevLabel={"Moduł 4"}
        nextLabel={"Moduł 6: Routing"}
      />
    </div>
  )
}
