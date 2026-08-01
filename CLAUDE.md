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

## 3. Conceito central do V2: "A Trilha"

Uma linha (SVG `path` com `stroke-dashoffset` animado via GSAP ScrollTrigger) atravessa a página inteira, do Hero ao CTA, passando por trás/ao lado de todas as seções — não é elemento de uma seção específica, é uma camada própria de posicionamento global, coordenada ao progresso de scroll da página inteira (não por seção individual). Metáfora: tabuleiro de jogo / jornada do herói. Pode ganhar marcos (pontos/bolinhas) nas transições entre seções — a definir em detalhamento técnico futuro.

**Ordem real das seções no DOM** (confirmada em `App.jsx`, usada para calcular os waypoints): Hero → About → Programs → Students → Partners → Mentors → CTA. Essa ordem **diverge** da numeração da seção 4 abaixo (que segue a ordem em que as seções foram especificadas, não a ordem real de renderização) — usar sempre a ordem do `App.jsx` como fonte de verdade para qualquer trabalho que dependa da posição real das seções na página (trilha, header condicional, etc.).

**Header:** invisível até a trilha começar a ser percorrida (ou seja, até o usuário iniciar o scroll para além do Hero). Comportamento a implementar via ScrollTrigger com toggle de visibilidade/opacidade.

---

## 4. Especificação por seção

### 4.1 Hero — prioridade máxima, maior risco técnico

Sequência (nessa ordem):

1. **Vídeo de abertura** (técnica "frame-scroll", ver seção 5): sala escura, único ponto de luz branca indireta iluminando uma mesa de escritório escuro com MacBook preto fechado. A tampa se abre; na tela, VS Code com um projeto React sendo finalizado. Câmera é "sugada" para dentro da tela. Fade to white.
2. **Transição pós-white**: o branco se reduz a um **pin de marcação** (silhueta de gota/pin, contorno fino sem preenchimento sólido, cor `primary`) — mesmo efeito de glow duplo (núcleo nítido + halo blur) usado na trilha e nos marcos, mantendo consistência visual entre os três elementos. Fundo volta ao dark padrão do site. O pin marca visualmente o início da trilha e reforça a metáfora de jornada (seção 3) — substituiu o conceito anterior de cubo/tesseract.
3. **Tipografia animada** (GSAP puro, sem vídeo):
   - "O primeiro passo" — entra da esquerda para a direita
   - "da sua nova jornada" — entra da direita para a esquerda
   - "começa aqui" — entra de baixo para cima
4. **Assinatura** "DevClub/>" no canto inferior direito — reaproveitar componente `Signature` já existente (mesmo padrão do V1).
5. A trilha nasce a partir da ponta inferior do pin (mesma coordenada de origem do path, nunca calculada separadamente) e segue para o restante da página. A trilha só fica visível (opacity 0→1) a partir do ponto de scroll em que a animação do pin termina — mesma fonte de verdade usada para os dois, não um valor estimado.

### 4.2 Programs (Formações)

Dois ajustes independentes sobre a base V1 existente:

- **Cards:** substituir/complementar a entrada atual por efeito de revelação em cascata ao entrar na viewport (estilo MBA DevClub: cards sobem com stagger conforme o scroll os alcança), via `ScrollTrigger` + `stagger`. O scroll horizontal pinado (`ScrollTrigger` com `pin`/`scrub`) já existente é mantido — este é um efeito adicional de entrada, não substituição da mecânica de scroll horizontal.
- **`AmbientParticles`:** reduzir a área ocupada pelo sistema de partículas laranja de tela cheia para uma fração menor da seção (ex: atrás do título, não atrás de toda a seção). Ajustar `canvas.width`/`canvas.height` de referência ou container pai para refletir a nova área.

### 4.3 About (Quem Somos)

**Sem alterações.** Mantém texto e crossfade de foto (Rodolfo estúdio ↔ eletricista) como está no V1.

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

Ponto onde a trilha termina visualmente. Botão existente (`Quero ser aluno`) aparece na tela. Sem outras alterações estruturais além da chegada da trilha.

### 4.8 Header

Mantém estrutura V1 (logo, nav, CTA, menu mobile). Nova regra: invisível/oculto até a transição completa do Hero terminar (frame-scroll + pin + tipografia + assinatura) — não apenas quando a trilha "nasce" do pin. Implementar visibilidade condicionada ao progresso de scroll via `ScrollTrigger`, usando o fim da timeline do Hero como gatilho.

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
2. Trilha (elemento global de página inteira)
3. Header (comportamento condicional)
4. Programs (ajustes: cards + partículas reduzidas)
5. Students (espiral de fotos)
6. Mentors (polaroids aleatórias → grid)
7. Partners (nova lista de logos + mecânica de exibição)
8. CTA (chegada da trilha)

About e Footer não requerem trabalho nesta revisão.

---

## 7. Perguntas em aberto (não assumir, confirmar com o desenvolvedor antes de implementar)

- Quantidade final de fotos de alunos para o efeito de espiral
- Quantidade e identidade dos novos mentores a adicionar
- Mecânica final de exibição do Partners (marquee vs. célula cíclica)
- Design exato dos marcos/bolinhas da trilha nas transições entre seções
- Efeitos adicionais leves ao longo da página (mencionados como possibilidade, natureza ainda não definida — nada no nível de complexidade do Hero)
