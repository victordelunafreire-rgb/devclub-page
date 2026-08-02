# DevClub Página Institucional — Guia do Projeto (V2)

Este arquivo é a fonte de verdade do projeto. Consulte-o sempre antes de gerar código novo ou alterar código existente. Não assuma convenções fora daqui — se houver dúvida, pergunte antes de implementar.

---

## 1. Convenções estabelecidas (V1 — já implementadas, manter)

- **Package manager:** Yarn
- **Linter/formatter:** Biome (aspas simples, remove imports não usados automaticamente)
- **Estilização:** Styled Components apenas — sem CSS files. Componentes estilizados vivem em `Nome.styles.js` (named exports); lógica/JSX em `Nome.jsx`.
- **Nomenclatura de arquivos:** nomes explícitos (`Hero.jsx`, nunca `index.jsx`)
- **Acesso ao tema:** `(props) => props.theme.algumaCoisa` — nunca destructuring (`({ theme }) => ...`)
- **Props transientes:** prefixadas com `$` (ex: `$photo`, `$hovered`, `$value`) para não vazar atributos para o DOM
- **Idioma:** código (variáveis, nomes de componentes, comentários, commits) em **inglês**. Conteúdo visível ao usuário (textos, labels) em **português**. Exceção: `href` de âncoras internas usa português quando o valor é minimamente visível ao usuário (ex: barra de status do navegador) — convenção já validada no projeto.
- **Unidades:** `px` exclusivamente. Nunca `rem`.
- **Arrays de dados:** declarados fora dos componentes, em arquivos `Nome.data.js`, para evitar recriação a cada render.
- **Tema:** objeto flat `standardTheme` (sem aninhamento) em `src/styles/standard.js`. Reset global via `createGlobalStyle` em `src/styles/globalStyles.js`.
- **Deploy:** Vercel, auto-deploy a partir do GitHub (branch `main`).

### Estrutura de tema atual (`standardTheme`)
Inclui: `background`, `backgroundElevated`, `primary` (#FF6B4A), `primaryGlow`, `secondary`, `textPrimary`, `textSecondary`, `border`, `transitionDefault`, `headingFont` (Space Grotesk), `bodyFont` (Inter), `monoFont` (Space Mono), `arcadeFont` (Press Start 2P), `impactFont` (Bangers).

---

## 2. Contexto do projeto

Página institucional para concurso de vaga (Programador Full Stack, DevClub). O júri (Rodolfo Mori) avalia: impacto visual/originalidade (50%), animações/microinterações (30%), qualidade de código (20%). Uma primeira versão (V1) já foi entregue e reprovada por falta de nível de acabamento — o V2 eleva significativamente o nível de animação e direção de arte, mantendo a identidade dark + coral/laranja neon já estabelecida.

**Princípio inegociável:** cada linha de código precisa ser explicável pelo desenvolvedor em entrevista técnica. Não gerar código que não possa ser justificado tecnicamente.

---

## 3. Conceito central do V2: Indicador de Progresso de Scroll

Uma cápsula vertical fixa (`position: fixed`, lateral direita `right: 32px`, centralizada verticalmente via `top: 50%; transform: translateY(-50%)`), 220px de altura por 6px de largura, `border-radius` total (formato pílula). É só o trilho de fundo — cor `primary` a ~25% de opacidade, translúcido e discreto.

Dentro da cápsula, um **thumb** (círculo de ~16px, `primary` sólido, glow leve via `box-shadow` com blur suave na mesma cor) se desloca de cima pra baixo dentro dos limites da cápsula (nunca sai dela): 0% de scroll = topo do thumb no topo da cápsula; 100% = no fundo. Progresso calculado sobre o scroll total da página inteira (0–100%), via um único listener global (`ScrollTrigger` com `trigger: document.body`, `start: 'top top'`, `end: 'bottom bottom'`) — sem lógica por seção, sem marcos, sem posicionamento individual, sem texto ou labels.

A scrollbar nativa do navegador é escondida via CSS (`scrollbar-width: none` no Firefox, `::-webkit-scrollbar { display: none }` no Chrome/Safari) — essa cápsula é o único indicador de progresso que deve aparecer.

**Visibilidade condicionada ao fim do Hero:** tanto a cápsula quanto o Header (seção 4.8) ficam invisíveis (`autoAlpha: 0`) até a timeline do Hero terminar por completo, e reaparecem (fade, reversível ao rolar de volta) exatamente nesse ponto — nunca antes. Fonte de verdade única: o Hero expõe o scroll onde seu próprio pin termina via `data-hero-complete-scroll-y` no `#hero`; ambos os consumidores leem esse mesmo valor através do hook compartilhado `useHeroCompleteFade` (`src/hooks/`), nunca um valor estimado separadamente.

Este conceito **substitui** a ideia original de "trilha sinuosa" (SVG `path` atravessando o DOM com marcos nas transições entre seções), abandonada por complexidade desproporcional ao ganho visual: o `pin` do GSAP (usado no Hero e no Programs) aplica `transform` ao elemento pinado, criando um novo stacking context que isola qualquer coisa dentro dele de comparações de `z-index` com elementos externos — o que exigiu múltiplas camadas de contorno (backdrops externos medidos via JS, ajuste fino de `z-index` negativo) sem benefício claro sobre a identidade visual que cada seção já tem por conta própria.

**Ordem real das seções no DOM** (confirmada em `App.jsx`): Hero → About → Programs → Students → Partners → Mentors → CTA. Essa ordem **diverge** da numeração da seção 4 abaixo (que segue a ordem em que as seções foram especificadas, não a ordem real de renderização) — usar sempre a ordem do `App.jsx` como fonte de verdade para qualquer trabalho que dependa da posição real das seções na página.

---

## 4. Especificação por seção

### 4.1 Hero — prioridade máxima, maior risco técnico

Sequência (nessa ordem):

1. **Vídeo de abertura** (técnica "frame-scroll", ver seção 5): sala escura, único ponto de luz branca indireta iluminando uma mesa de escritório escuro com MacBook preto fechado. A tampa se abre; na tela, VS Code com um projeto React sendo finalizado. Câmera é "sugada" para dentro da tela. Fade to white.
2. **Transição pós-white**: o branco se dissolve e o fundo volta ao dark padrão do site.
3. **Tipografia animada** (GSAP puro, sem vídeo):
   - "O primeiro passo" — entra da esquerda para a direita
   - "da sua nova jornada" — entra da direita para a esquerda
   - "começa aqui" — entra de baixo para cima
4. **Assinatura** "DevClub/>" no canto inferior direito — reaproveitar componente `Signature` já existente (mesmo padrão do V1).

Não há mais nenhum elemento de marcação (cubo/tesseract ou pin) nesta sequência — abandonado junto com o conceito de trilha física (ver seção 3).

### 4.2 Programs (Formações)

**`AmbientParticles`:** restrita a uma faixa vertical do lado direito da seção (~50% da largura), não mais tela cheia — a metade esquerda, onde ficam título e cards, fica sem partículas atrás. Implementado via um container (`ParticlesArea`) `position: absolute; right: 0; width: 50%; height: 100%` envolvendo o `<AmbientParticles />`; como o canvas interno já mede `offsetWidth`/`offsetHeight` do seu elemento pai, restringir esse pai restringe automaticamente a área de desenho.

**Estrutura (substitui o scroll horizontal pinado da V1):** uma única seção pinada para o Formations inteiro (referência: MBA DevClub). Título ("Formações") fixo, ancorado no topo, fora do fluxo que cresce com os cards — não usa `justify-content: center` no container inteiro (isso reintroduziria o bug em que o título é empurrado pra fora da viewport conforme os cards se acumulam); em vez disso, o título tem posição própria (`padding-top` fixo) e só o `CardStack` abaixo dele centraliza verticalmente (`flex: 1; justify-content: center`) no espaço restante.

- Os 5 cards de formação já existentes (Front-end, Back-end, Full Stack, Mobile, N8N — `programs.slice(0, 5)`) são os itens que empilham, cada card = 1 item da progressão (conteúdo não subdividido).
- Cada card tem dois estados, animados por um único `gsap.timeline` com `scrollTrigger: { pin: true, scrub: 1 }` no container: **expandido** (card ativo — altura maior, padding maior, ícone da formação, título, descrição visíveis) e **colapsado** (altura e padding menores, ícone substituído por um badge de check, descrição com opacidade 0). Conforme o scroll avança, o próximo card entra (`opacity`/`y`) enquanto o card anterior colapsa simultaneamente (mesma posição de timeline) — nunca dois cards expandidos ao mesmo tempo, exceto durante a transição.
- **Agrupamento visual (referência: MBA DevClub):** os cards colapsados ficam praticamente colados uns nos outros (`marginTop` mínimo, `CARD_GROUPED_GAP`), formando um bloco compacto; o espaçamento maior (`CARD_ACTIVE_GAP`) fica sempre logo acima do card atualmente expandido, já que esse card mantém sua margem "ativa" até o momento em que ele próprio colapsa. O espaçamento é controlado por `marginTop` por card (não por `gap` uniforme no `CardStack`), justamente para permitir essa diferença entre "dentro do grupo" e "antes do card ativo".
- **O último card (N8N) também colapsa** antes de a página liberar o scroll — ele entra, permanece expandido brevemente (dwell), depois colapsa como os demais, terminando os 5 agrupados. Isso usa um passo extra dedicado no timeline (`window.innerHeight * (cards.length + 1)` de distância de pin, não `* cards.length`).
- Depois que os 5 cards colapsam/agrupam, a seção libera o scroll (unpin).
- **Armadilha de GSAP a evitar:** dentro de um mesmo grupo de tweens concorrentes, nunca reutilizar a mesma string de posição relativa (`'+=0.1'`) em múltiplas chamadas `.to()` — cada chamada reavalia `'+=0.1'` contra a duração *atual* da timeline (que cresce a cada tween adicionado), então os tweens acabam encadeados em sequência em vez de simultâneos, inflando a duração total e desalinhando todo o mapeamento de scrub. Usar `tl.addLabel('nome', posição)` uma vez e referenciar esse label (fixo) em todas as chamadas do grupo. Posições relativas tipo `'<'` (alinhar ao início do tween anterior) não sofrem desse problema, pois cada nova chamada ainda aponta pro mesmo instante fixo.
- Alturas fixas via inline style do GSAP (`height`, não `auto`) para permitir a animação suave: `CARD_EXPANDED_HEIGHT`/`CARD_COLLAPSED_HEIGHT` em `Programs.jsx`. A transição CSS do `Card` (`transition: ...`) é restrita a `transform`/`border-color`/`box-shadow` (hover), excluindo `height`, para não competir com o tween do GSAP.

Implementação faseada: uma formação por vez (Front-end primeiro), validada antes de replicar a mecânica para as outras 4.

### 4.3 About (Quem Somos)

Texto mantido como está no V1. O crossfade de foto (Rodolfo eletricista ↔ programador) deixa de ser por hover e passa a ser controlado por scroll:

- **Transição**: `ScrollTrigger` com `scrub` (sem `pin`) — `trigger: AboutContainer`, `start: 'top bottom'`; `end` calculado dinamicamente como `+= 25% da altura da própria seção` (`() => `+=${containerRef.current.offsetHeight * 0.25}``). Janela deliberadamente estreita: o crossfade resolve para `opacity: 1` (programador) dentro dos primeiros ~25% do scroll pela seção — em vez de se estender por 100% do range (mapeamento anterior via `endTrigger` na foto), o que fazia a mistura das duas fotos ("assombração") acontecer bem no meio do scroll, exatamente onde o usuário passa mais tempo lendo o texto já assentado na tela. Com a janela estreita, a foto chega praticamente resolvida (ou já resolvida) no momento em que entra na área visível, permanecendo nítida e estática pelo resto do scroll da seção. Ao entrar na seção, a foto do Rodolfo eletricista aparece primeiro (camada de base, sempre visível); a segunda camada (foto programador) cresce de `opacity: 0` a `1` proporcionalmente a esse progresso estreito — sem travar a página.
- **Borda**: estática, `primary` (`#FF6B4A`) com glow leve constante (`box-shadow`) — substituiu o efeito de piscar (`pulse`/`box-shadow` animado) do V1. Não depende de estado de scroll ou hover.

### 4.4 Students (Alunos)

Substituir grid estático atual por efeito de "espiral ascendente": cada posição/slot cicla entre múltiplas fotos ao longo do tempo (referência: site `/zeroz`, fotos tipo polaroid rotacionadas, ciclando de forma assíncrona entre si).

**Pendência de conteúdo:** expandir o pool de fotos de alunos além das 6 atuais — quantidade a definir para que o efeito de ciclagem funcione com variedade suficiente.

### 4.5 Mentors (Tutores)

Cards iniciam espalhados de forma aleatória na tela (posição/rotação randômica, estilo polaroids jogadas sobre uma mesa) e se alinham à posição de grid final conforme o usuário rola a página (`ScrollTrigger` animando `x`/`y`/`rotation` de estado aleatório para posição final).

**Pendência de conteúdo:** adicionar mentores novos — o número de formações (`Programs`) foi expandido de 4 para 8 na revisão do V1, mas o número de mentores não foi atualizado proporcionalmente.

### 4.6 Partners (Empresas Parceiras)

Substituir a lista de empresas atual pela mesma lista usada na referência (`cinetica.studio`): Coca-Cola, Nissan, Netflix, Motorola, Mattel, The North Face, Kia, Nescafé, Duracell, Nestlé, Shark, Tecate, Mercado Pago, Duolingo, YouTube, Clase Azul — ou subconjunto equivalente. Objetivo: eliminar o problema de inconsistência de tamanho/formato entre logos que ocorreu no V1 usando exatamente o mesmo pool de referência.

Mecânica de exibição a especificar (era marquee infinito no V1 — avaliar se mantém ou se adota o modelo de "célula cíclica" descrito na seção 4.4/4.5, com itens entrando por baixo e empurrando os anteriores para cima, por célula, de forma assíncrona — referência `cinetica.studio`).

### 4.7 CTA

**Sem alterações estruturais nesta revisão.** Botão existente (`Quero ser aluno`) permanece como está.

### 4.8 Header

Mantém estrutura V1 (logo, nav, CTA, menu mobile). Nova regra: invisível/oculto até a transição completa do Hero terminar (frame-scroll + tipografia + assinatura) — implementado via o hook compartilhado `useHeroCompleteFade` (ver seção 3), mesma fonte de verdade usada pela cápsula de progresso.

### 4.9 Footer

**Sem alterações.**

---

## 5. Nota técnica: pipeline de vídeo do Hero

Técnica de referência ("Scroll World"): (1) gerar imagem-âncora via IA, (2) animar essa imagem em vídeo via IA, (3) fatiar o vídeo em frames com FFmpeg, (4) amarrar cada frame à posição do scroll via GSAP/ScrollTrigger — rolar a página avança/recua o "filme" frame a frame.

**Substituição de provedor:** ao invés de Higgsfield (usado nas referências originais), usar Gemini via MCP:
- Geração de imagem: `nano-banana-mcp` ou `nano-banana-2-mcp` (requer `GEMINI_API_KEY` do Google AI Studio)
- Geração de vídeo: modelo Veo do Gemini (confirmar disponibilidade na conta Gemini Pro do desenvolvedor)
- Fatiamento: FFmpeg (instalação local necessária)

**Risco identificado:** esta é a peça de maior incerteza técnica do projeto (setup de MCP, custo de geração, qualidade do resultado de primeira tentativa). Recomendação: validar e construir esta seção **primeiro**, isoladamente, antes de iniciar qualquer outra seção do V2 — se travar, é preferível descobrir isso no início do prazo, não no fim.

---

## 6. Ordem de execução recomendada

1. Hero (vídeo + transição + tipografia) — validar pipeline técnico primeiro
2. Indicador de progresso de scroll (elemento global fixo)
3. Header (comportamento condicional)
4. Programs (ajustes: cards + partículas reduzidas)
5. Students (espiral de fotos)
6. Mentors (polaroids aleatórias → grid)
7. Partners (nova lista de logos + mecânica de exibição)

CTA não requer trabalho adicional nesta revisão (ver 4.7).

About e Footer não requerem trabalho nesta revisão.

---

## 7. Perguntas em aberto (não assumir, confirmar com o desenvolvedor antes de implementar)

- Quantidade final de fotos de alunos para o efeito de espiral
- Quantidade e identidade dos novos mentores a adicionar
- Mecânica final de exibição do Partners (marquee vs. célula cíclica)
- Efeitos adicionais leves ao longo da página (mencionados como possibilidade, natureza ainda não definida — nada no nível de complexidade do Hero)
