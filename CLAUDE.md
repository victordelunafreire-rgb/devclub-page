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

Grid estático substituído por uma **hélice (espiral 3D) contínua de cards**, replicando a referência `otsuka-air.jp` (`/zeroz`).

**Comportamento:** os cards **giram em torno do eixo vertical central da página** enquanto sobem — vêm girando por trás do eixo, cruzam a frente (grandes e nítidos), voltam pro fundo (pequenos e escurecidos) e seguem subindo. Fluxo permanente em loop (autoplay), não dirigido por scroll — nada de `pin`/`scrub` nesta seção.

- **O eixo precisa apontar pra câmera, não deitar no plano da tela.** Duas tentativas erradas antes de acertar: (1) interpolação reta de `x`/`y` entre dois pontos — puro deslize diagonal, sem espiral nenhuma; (2) órbita em torno de um eixo *diagonal deitado no plano da tela* — como o eixo é achatado em relação à câmera, orbitar em torno dele só produz uma oscilação lateral que o olho lê como "as imagens surgem e são sugadas pra cima", nunca como giro. O que funciona é orbitar o eixo **vertical central**: `x = sin(angle) * raio` (posição lateral em torno do eixo) e `z = cos(angle) * raio` (profundidade, em contrafase), com `y` subindo de forma independente e linear. Circunferência em `x`/`z` + subida em `y` = hélice ascendente de verdade.
- **Teste de regressão:** amostrar a matriz de transform ao longo do tempo — `translateX` precisa **trocar de sinal várias vezes** (o card cruzando o eixo central de um lado pro outro), `translateZ` precisa oscilar em contrafase (frente/fundo), e `translateY` precisa subir monotonicamente, sem inversões. Se `x` não cruza o eixo repetidamente, não há giro.
- **Pool:** 18 cards em voo (múltiplo de 6), cobrindo os 6 alunos existentes repetidos 3× (`students[index % students.length]`) — sem conteúdo novo.
- **Motor da animação:** um único `gsap.to` sobre um objeto proxy (`{ value: 0 } → 1`, `repeat: -1`, `ease: 'none'`) cujo `onUpdate` recalcula e aplica a posição de todos os cards. Cada card lê o mesmo progresso deslocado pela sua fase (`(progress + index / CARD_COUNT) % 1`), ficando espaçado uniformemente ao longo da mesma hélice. Um tween só, em vez de um por card, mantém tudo em fase e o código explicável.
- **Profundidade legível:** `perspective` no container (1500px) converte o `z` em tamanho aparente. Perspectiva curta demais faz os cards da frente ficarem gigantes e engolirem o título — 1500px equilibra profundidade visível e escala controlada. Além disso os cards do fundo são escurecidos proporcionalmente (`DEPTH_DIM`), reforçando que estão atrás do eixo, e `rotationY` acompanha a órbita pra eles virarem junto em vez de deslizarem de frente.
- **Densidade:** ~12-13 cards visíveis por vez. Regulada por `CARD_COUNT` × raio da órbita × span de subida.
- **Variação por card:** largura, altura e raio de órbita são derivados deterministicamente do índice (`(index * 137) % 180 - 90` etc.), nunca de `Math.random()` — layout estável entre re-renders.
- **Legibilidade:** o título fica em `z-index` acima da camada de cards; o container tem `perspective` e a camada dos cards `transform-style: preserve-3d` (sem isso `z`/`rotationY` não produzem perspectiva real). Cada card carrega legenda compacta (nome + formação) sobre gradiente escuro, além do selo "Aprovado"/"Em jornada" — a seção continua comunicando resultados, não vira só textura.

### 4.5 Mentors (Tutores)

Grid estático substituído por um **leque (fan) de cards revelados por hover**, referência `landonorris.com` (seção "ON SOCIALS").

**Esta spec substitui a anterior** ("cards espalhados aleatoriamente se alinhando ao grid conforme o scroll"), abandonada junto com a entrada por scroll: toda a animação da seção agora vive na interação de clique, não no scroll.

- **Geometria do leque:** os 8 cards ficam todos ancorados no mesmo ponto (base, centro horizontal) e recebem **apenas uma rotação** cada, em torno de um `transformOrigin` bem **abaixo** do card (`50% 420%`). Girar em torno de um pivô distante produz de uma vez só a posição horizontal, a queda vertical das pontas e a inclinação — é o que gera o arco do leque sem precisar posicionar card por card. O leque abre de `-26°` a `+26°`.
- **Hover destaca no lugar — o leque NÃO reordena.** Passar o mouse sobre um card já revela o efeito: ele cresce (`scale`), vai pro topo do empilhamento e sai do estado esmaecido, mas **mantém sua posição e rotação originais no arco**. Não migra pra posição central. (Interpretação inicial errada e corrigida pelo desenvolvedor: chegou a ser especificado que o card iria pro centro com o leque reorganizando ao redor — não é isso que a referência faz.)
- **Sem clique e sem `cursor: pointer`.** A referência não anuncia os cards como alvo de clique — o cursor permanece neutro (`cursor: default`) e o efeito é puramente de passagem do mouse, o que deixa a interação mais sutil. O `onClick` continua registrado apenas como fallback pra dispositivos de toque, que não têm hover; `onFocus` cobre navegação por teclado.
- **Seleção é persistente:** o último card destacado continua destacado quando o mouse sai do leque, em vez de voltar ao estado inicial — evita o pisca-pisca de um reset a cada saída do mouse.
- **Empilhamento:** `z-index` cresce conforme a proximidade do card selecionado, e o selecionado recebe o valor máximo — assim o destaque nunca fica parcialmente coberto por um vizinho.
- **Info só no card selecionado:** nome, função, barras de stats e a tag `P#` aparecem apenas no card ativo (sobre um gradiente escuro na base do card); os demais mostram só a foto. Preserva a identidade "player card" do V1 sem poluir o leque, já que a sobreposição esconderia esse conteúdo de qualquer forma.
- **Conteúdo:** 8 cards reaproveitando os 4 tutores existentes (`mentors[index % mentors.length]`) — mesma abordagem usada em Students, sem conteúdo novo. Isso **encerra a pendência** que constava na seção 7 (adicionar tutores novos para acompanhar a expansão de 4 → 8 formações).
- **Sem entrada especial:** o leque já aparece montado, com fade discreto. Nada de `ScrollTrigger` nesta seção.
- **Acessibilidade:** cada card é um `<button>` de verdade (não um `div`), com `aria-pressed` e `aria-label` descritivo. Como o efeito é por hover, `onFocus` espelha o `onMouseEnter` — assim quem navega por teclado percorre os tutores com Tab e vê a mesma revelação.

### 4.6 Partners (Empresas Parceiras)

Marquee infinito do V1 substituído por **grid de células cíclicas**, referência `cinetica.studio`.

**Mecânica:** grid fixo de células; cada célula troca de logo de forma **aleatória e individual** (nunca todas juntas). Na troca, o logo novo **nasce por baixo e sobe empurrando o antigo**, que sai por cima com um fade rápido. Um único agendador no componente pai sorteia qual célula troca e para qual logo — assim é impossível o mesmo logo aparecer em duas células ao mesmo tempo (o sorteio só considera marcas que não estão na tela).

**Grid 5 × 2 = 10 células para um pool de 12 marcas:** a folga de 2 marcas é proposital e necessária — com pool igual ao número de células não sobra nenhuma marca "de reserva" pra entrar numa troca sem duplicar outra já visível.

### Consistência visual entre logos (problema central do V1)

No V1 os logos eram assets soltos com proporções de 1:1 (TOTVS 600×600) a 4,3:1 (SVGs 240×56) — uma variação de 4× — em 3 formatos diferentes (SVG/PNG/AVIF), alguns em resolução baixa (`santander-logo.png` 265×148, que borra ao escalar). Nenhum layout corrige isso; a inconsistência está no asset.

**Princípio:** consistência e fidelidade de marca não são conflitantes, porque as três variáveis que quebram a consistência são todas separáveis do desenho da marca:

1. **Cor → monocromático branco.** Maior alavanca, e **não descaracteriza**: praticamente todo manual de marca publica uma versão de cor única / reversa / knockout exatamente para fundos escuros e paredes de parceiros. Usar essa variante é seguir o manual, não violá-lo — e é o que a referência faz (todos os logos em branco chapado).
2. **Bounding box → célula fixa + `object-fit: contain`.** A proporção de cada marca é preservada exatamente; a célula é só um envelope máximo. Nunca esticar, nunca `fill`.
3. **Peso óptico → fator de escala por logo.** Mesmo com `contain`, um selo circular (BMW) na altura cheia da célula pesa muito mais que um wordmark fino (Netflix). **Bounding box igual ≠ tamanho percebido igual.** Por isso existe um multiplicador por marca no `Partners.data.js`.

**Como calibrar a escala (não é no olho):** todos os ícones do Simple Icons compartilham um `viewBox` quadrado 24×24, então definir a altura define a **caixa**, não o desenho visível — um wordmark largo (Coca-Cola, Kia) só ocupa uma faixa central dessa caixa e por isso aparenta ser bem menor que um selo que preenche o quadrado inteiro. A calibração correta mede a **tinta visível** de cada marca com `svg.getBBox()` convertido pra pixels de tela, e ajusta a escala em cima disso. Sem essa medição, os valores parecem certos no código e saem visivelmente desiguais na tela: antes da calibração a altura visível ia de 18px (Kia) a 76px (Netflix), quase 4× de diferença.

**Alvo de proporção (espelhando a referência):** wordmarks largos ~120-130px de largura visível, selos ~77-90px. `LOGO_BASE_SIZE` (76px) é a caixa base e `CELL_HEIGHT` (132px) precisa acomodar a maior caixa depois da escala — hoje a do Kia, com 130px.

**Fonte dos logos:** `react-icons/si` (Simple Icons) — **já é dependência do projeto** e já usada em `Programs.jsx`. Resolve as três alavancas de uma vez: renderiza em `currentColor` (normalização pra branco sai de graça, sem hack de `filter`), `viewBox` uniforme 24×24 já balanceado opticamente, vetor (nítido em qualquer tamanho), zero asset novo e zero requisição de imagem.

**Pool final — as 12 marcas disponíveis no Simple Icons:** Netflix, YouTube, Coca-Cola, Duolingo, Mercado Pago, BMW, Nissan, Motorola, Kia, The North Face, Spotify, Aeroméxico. As demais da referência (Nestlé, Mattel, Duracell, Nescafé, Doritos, Tecate, Shark, Clase Azul) **ficam de fora de propósito** — incluí-las exigiria assets externos avulsos, reintroduzindo exatamente a mistura de formato/resolução que quebrou o V1.

**Texto da seção:** o título deixa de afirmar parceria com essas marcas (era "+300 empresas parceiras"). Como são empresas reais num site público, a chamada passa a falar do destino dos alunos, não de uma relação comercial entre DevClub e as marcas.

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

- ~~Quantidade final de fotos de alunos para o efeito de espiral~~ — resolvido: reaproveitar os 6 alunos existentes (ver 4.4)
- ~~Quantidade e identidade dos novos mentores a adicionar~~ — resolvido: reaproveitar os 4 tutores existentes para formar os 8 cards do leque (ver 4.5)
- ~~Mecânica final de exibição do Partners (marquee vs. célula cíclica)~~ — resolvido: célula cíclica (ver 4.6)
- Efeitos adicionais leves ao longo da página (mencionados como possibilidade, natureza ainda não definida — nada no nível de complexidade do Hero)
