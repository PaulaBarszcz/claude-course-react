import Quiz from '../components/Quiz'
import Challenge from '../components/Challenge'
import NavButtons from '../components/NavButtons'

const STATIC = `<div class="module-header">
          <div class="module-tag">Moduł 06</div>
          <div class="module-title">Routing —<br><em>React Router v6</em></div>
          <div class="module-desc">Deklaratywne routowanie, nested routes, lazy loading i ochrona tras.</div>
        </div>

        <div class="section">
          <div class="section-title">Konfiguracja routera</div>
          <div class="code-split">
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">Angular</div>
                <div class="code-label"><span class="dot dot-angular"></span>Routes</div>
              </div>
              <pre><code><span class="kw">const</span> routes: Routes = [
  { path: <span class="str">''</span>, component: HomeComponent },
  { path: <span class="str">'users'</span>, children: [
    { path: <span class="str">''</span>, component: UserList },
    { path: <span class="str">':id'</span>, component: UserDetail },
  ]},
  {
    path: <span class="str">'admin'</span>,
    canActivate: [authGuard],
    loadChildren: () => <span class="kw">import</span>(...)
  }
];</code></pre>
            </div>
            <div class="code-block">
              <div class="code-header">
                <div class="code-lang">React</div>
                <div class="code-label"><span class="dot dot-react"></span>React Router v6</div>
              </div>
              <pre><code><span class="kw">const</span> router = <span class="fn">createBrowserRouter</span>([
  { path: <span class="str">'/'</span>, element: <span class="tag">&lt;Home /&gt;</span> },
  {
    path: <span class="str">'users'</span>,
    element: <span class="tag">&lt;UsersLayout /&gt;</span>,
    children: [
      { index: <span class="kw">true</span>, element: <span class="tag">&lt;UserList /&gt;</span> },
      { path: <span class="str">':id'</span>, element: <span class="tag">&lt;UserDetail /&gt;</span> },
    ]
  },
  {
    path: <span class="str">'admin'</span>,
    loader: authLoader, <span class="cm">// guard jako loader</span>
    lazy: () => <span class="kw">import</span>(<span class="str">'./Admin'</span>),
  }
]);</code></pre>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Hooki nawigacji</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>React Router hooks</div>
            </div>
            <pre><code><span class="kw">import</span> {
  useNavigate, useParams, useSearchParams,
  useLocation, Link, NavLink
} <span class="kw">from</span> <span class="str">'react-router-dom'</span>;

<span class="kw">function</span> <span class="fn">UserDetail</span>() {
  <span class="kw">const</span> { id } = <span class="fn">useParams</span>();            <span class="cm">// :id z URL</span>
  <span class="kw">const</span> navigate = <span class="fn">useNavigate</span>();       <span class="cm">// programowa nawigacja</span>
  <span class="kw">const</span> location = <span class="fn">useLocation</span>();       <span class="cm">// aktualny URL</span>
  <span class="kw">const</span> [params] = <span class="fn">useSearchParams</span>(); <span class="cm">// query params</span>

  <span class="kw">const</span> page = params.<span class="fn">get</span>(<span class="str">'page'</span>); <span class="cm">// ?page=2</span>

  <span class="kw">const</span> <span class="fn">goBack</span> = () => <span class="fn">navigate</span>(-<span class="num">1</span>);         <span class="cm">// jak history.back()</span>
  <span class="kw">const</span> <span class="fn">goUsers</span> = () => <span class="fn">navigate</span>(<span class="str">'/users'</span>); <span class="cm">// absolutna</span>

  <span class="kw">return</span> (
    <span class="tag">&lt;div&gt;</span>
      <span class="cm">{/* Link = RouterLink w Angular */}</span>
      <span class="tag">&lt;Link</span> <span class="attr">to</span>=<span class="str">"/users"</span><span class="tag">&gt;</span>Powrót<span class="tag">&lt;/Link&gt;</span>

      <span class="cm">{/* NavLink dodaje klasę 'active' */}</span>
      <span class="tag">&lt;NavLink</span> <span class="attr">to</span>=<span class="str">"/dashboard"</span><span class="tag">&gt;</span>Dashboard<span class="tag">&lt;/NavLink&gt;</span>
    <span class="tag">&lt;/div&gt;</span>
  );
}</code></pre>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Guard — ochrona tras</div>
          <p>React Router nie ma osobnego API na guardy. Używasz <span class="ic">loader</span> (do sprawdzania przed renderowaniem) lub komponentu wrapper.</p>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>Protected Route</div>
            </div>
            <pre><code><span class="cm">// Wzorzec 1: loader jako guard</span>
<span class="kw">async function</span> <span class="fn">authLoader</span>() {
  <span class="kw">const</span> user = <span class="kw">await</span> <span class="fn">getUser</span>();
  <span class="kw">if</span> (!user) <span class="kw">throw</span> <span class="fn">redirect</span>(<span class="str">'/login'</span>);
  <span class="kw">return</span> user;
}

<span class="cm">// Wzorzec 2: wrapper komponent</span>
<span class="kw">function</span> <span class="fn">RequireAuth</span>({ children }) {
  <span class="kw">const</span> { user } = <span class="fn">useAuth</span>();
  <span class="kw">const</span> location = <span class="fn">useLocation</span>();

  <span class="kw">if</span> (!user) {
    <span class="kw">return</span> <span class="tag">&lt;Navigate</span>
      <span class="attr">to</span>=<span class="str">"/login"</span>
      <span class="attr">state</span>={{ from: location }}
      <span class="attr">replace</span>
    <span class="tag">/&gt;</span>;
  }
  <span class="kw">return</span> children;
}

<span class="cm">// w routerze:</span>
{
  path: <span class="str">'dashboard'</span>,
  element: (
    <span class="tag">&lt;RequireAuth&gt;</span>
      <span class="tag">&lt;Dashboard /&gt;</span>
    <span class="tag">&lt;/RequireAuth&gt;</span>
  )
}</code></pre>
          </div>
        </div>

        <!-- QUIZ 6 -->
        

        
      </div>`

export default function Module06() {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: STATIC }} />
      <Quiz
        id="6-1"
        label="Quiz 6.1"
        question={`Jak w React Router v6 zdefiniować "index route" — komponent wyświetlany gdy jesteś na ścieżce rodzica bez żadnej podrouty?`}
        options={[
    { text: `path: '*'`, correct: false },
    { text: `path: ''`, correct: false },
    { text: `index: true (bez path)`, correct: true },
    { text: `path: '/'`, correct: false }
  ]}
      />
      <NavButtons
        prev={"m5"}
        next={"m7"}
        prevLabel={"Moduł 5"}
        nextLabel={"Moduł 7: Zustand"}
      />
    </div>
  )
}
