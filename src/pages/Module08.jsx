import Quiz from '../components/Quiz'
import Challenge from '../components/Challenge'
import NavButtons from '../components/NavButtons'

const STATIC = `<div class="module-header">
          <div class="module-tag">Moduł 08</div>
          <div class="module-title">Data fetching —<br><em>TanStack Query</em></div>
          <div class="module-desc">Zastępuje HttpClient + RxJS do zarządzania danymi z serwera. Cache, loading states, mutations, optimistic updates — wszystko gotowe.</div>
        </div>

        <div class="section">
          <div class="section-title">Dlaczego TanStack Query?</div>
          <p>Bez TanStack Query piszesz ręcznie: loading state, error state, refetch, cache, deduplication, background refresh... To dużo kodu. TanStack Query robi to wszystko automatycznie.</p>

          <div class="callout info">
            <div class="callout-icon">🔄</div>
            <div class="callout-body"><strong>Mapowanie z Angular:</strong> <span class="ic">HttpClient.get() + async pipe</span> ≈ <span class="ic">useQuery()</span>. <span class="ic">HttpClient.post() + switchMap</span> ≈ <span class="ic">useMutation()</span>.</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">useQuery — pobieranie danych</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>TanStack Query</div>
            </div>
            <pre><code><span class="kw">import</span> { useQuery, QueryClient, QueryClientProvider } <span class="kw">from</span> <span class="str">'@tanstack/react-query'</span>;

<span class="cm">// Setup — raz w app.tsx</span>
<span class="kw">const</span> queryClient = <span class="kw">new</span> <span class="fn">QueryClient</span>({
  defaultOptions: {
    queries: { staleTime: <span class="num">60_000</span> } <span class="cm">// cache przez 60s</span>
  }
});

<span class="kw">function</span> <span class="fn">App</span>() {
  <span class="kw">return</span> (
    <span class="tag">&lt;QueryClientProvider</span> <span class="attr">client</span>={queryClient}<span class="tag">&gt;</span>
      <span class="tag">&lt;MyApp /&gt;</span>
    <span class="tag">&lt;/QueryClientProvider&gt;</span>
  );
}

<span class="cm">// Użycie w komponencie</span>
<span class="kw">function</span> <span class="fn">UserList</span>() {
  <span class="kw">const</span> {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = <span class="fn">useQuery</span>({
    queryKey: [<span class="str">'users'</span>],       <span class="cm">// unikalny klucz cache</span>
    queryFn: () => <span class="fn">fetchUsers</span>(), <span class="cm">// funkcja zwracająca Promise</span>
    staleTime: <span class="num">5 * 60_000</span>,      <span class="cm">// 5 minut cache</span>
  });

  <span class="kw">if</span> (isLoading) <span class="kw">return</span> <span class="tag">&lt;Spinner /&gt;</span>;
  <span class="kw">if</span> (isError) <span class="kw">return</span> <span class="tag">&lt;Error</span> <span class="attr">message</span>={error.message} <span class="tag">/&gt;</span>;

  <span class="kw">return</span> (
    <span class="tag">&lt;ul&gt;</span>
      {users.<span class="fn">map</span>(u => (
        <span class="tag">&lt;li</span> <span class="attr">key</span>={u.id}<span class="tag">&gt;</span>{u.name}<span class="tag">&lt;/li&gt;</span>
      ))}
    <span class="tag">&lt;/ul&gt;</span>
  );
}</code></pre>
          </div>
        </div>

        <div class="section">
          <div class="section-title">useMutation — zapis danych</div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-lang">TypeScript</div>
              <div class="code-label"><span class="dot dot-react"></span>Mutation z invalidation</div>
            </div>
            <pre><code><span class="kw">function</span> <span class="fn">CreateUserForm</span>() {
  <span class="kw">const</span> queryClient = <span class="fn">useQueryClient</span>();

  <span class="kw">const</span> mutation = <span class="fn">useMutation</span>({
    mutationFn: (newUser: CreateUserDto) =>
      <span class="fn">createUser</span>(newUser),

    <span class="fn">onSuccess</span>: () => {
      <span class="cm">// Invalidate → automatyczny refetch listy użytkowników</span>
      queryClient.<span class="fn">invalidateQueries</span>({ queryKey: [<span class="str">'users'</span>] });
    },

    <span class="fn">onError</span>: (error) => {
      <span class="fn">toast</span>.<span class="fn">error</span>(<span class="str">\`Błąd: </span>\${error.message}<span class="str">\`</span>);
    },
  });

  <span class="kw">return</span> (
    <span class="tag">&lt;form</span> <span class="attr">onSubmit</span>={<span class="fn">handleSubmit</span>(data => mutation.<span class="fn">mutate</span>(data))}<span class="tag">&gt;</span>
      <span class="cm">{/* ... pola formularza */}</span>
      <span class="tag">&lt;button</span>
        <span class="attr">type</span>=<span class="str">"submit"</span>
        <span class="attr">disabled</span>={mutation.isPending}
      <span class="tag">&gt;</span>
        {mutation.isPending ? <span class="str">'Zapisywanie...'</span> : <span class="str">'Zapisz'</span>}
      <span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/form&gt;</span>
  );
}</code></pre>
          </div>
        </div>

        <!-- QUIZ 8 -->
        

        
      </div>`

export default function Module08() {
  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: STATIC }} />
      <Quiz
        id="8-1"
        label="Quiz 8.1"
        question={`queryKey: ['users', userId] — co się stanie, gdy userId się zmieni?`}
        options={[
    { text: `Nic — queryKey to tylko label, nie wpływa na cache`, correct: false },
    { text: `TanStack Query automatycznie refetchuje dla nowego userId (inny klucz = inne zapytanie)`, correct: true },
    { text: `Musisz ręcznie wywołać refetch() po zmianie userId`, correct: false },
    { text: `Rzuca błąd — queryKey nie może być tablicą`, correct: false }
  ]}
      />
      <NavButtons
        prev={"m7"}
        next={"m9"}
        prevLabel={"Moduł 7"}
        nextLabel={"Moduł 9: Wzorce"}
      />
    </div>
  )
}
