# Contador de Formatura 🎓

Relógio digital em **Next.js** que faz a contagem regressiva para o fim do
semestre **2026/2** — e para a colação de grau de **17 de dezembro de 2026**.

O contador mostra **dias, horas, minutos e segundos** atualizados em tempo real,
além de um painel com o progresso do semestre e um resumo de semanas, dias úteis
e fins de semana restantes.

## ✨ Destaques

- Contagem regressiva em tempo real, sincronizada com o horário do navegador.
- Design noturno com aurora animada, textura de grão, vidro fosco e ouro de
  colação — nada de template genérico.
- Números com efeito de dígito entrando (estilo relógio flip).
- Barra de progresso do semestre com marcador luminoso.
- Relógio ao vivo em BRT no topo da página.
- 100% responsivo, com respeito a `prefers-reduced-motion`.
- Renderização no servidor com valores iniciais corretos e região
  `aria-live` para leitores de tela.

## 🧱 Stack

| Camada   | Tecnologia                        |
| -------- | --------------------------------- |
| Framework | Next.js 16 (App Router)          |
| UI       | React 19 + TypeScript            |
| Estilo   | CSS puro (variáveis + keyframes) |
| Fontes   | Space Grotesk + JetBrains Mono   |

## 🚀 Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Build de produção:

```bash
npm run build
npm start
```

## ⚙️ Alterando a data

Toda a configuração do período letivo fica em `lib/graduation.ts`:

```ts
export const SEMESTER: SemesterConfig = {
  start: "2026-08-01T00:00:00-03:00",
  target: "2026-12-17T23:59:59-03:00",
  startLabel: "01 ago 2026",
  targetLabel: "17 dez 2026",
  semester: "2026/2",
};
```

- `target` é o instante final da contagem (último segundo do dia 17/12).
- `start` é usado apenas para calcular o progresso do semestre.

## 📁 Estrutura

```text
app/
  layout.tsx        metadados, fontes e classes globais
  page.tsx          estrutura da página (hero, placar, rodapé)
  globals.css       todo o design system do projeto
  icon.svg          favicon com o capelo
components/
  Countdown.tsx     contador + progresso + estatísticas (client)
  LiveClock.tsx     relógio de Brasília (client)
lib/
  graduation.ts     configuração do semestre e cálculos puros
```

## ☁️ Deploy

Publicado na Vercel. O projeto não precisa de variáveis de ambiente: basta
importar o repositório e manter as configurações padrão (`next build`).

---

Feito com café e ansiedade acadêmica.
