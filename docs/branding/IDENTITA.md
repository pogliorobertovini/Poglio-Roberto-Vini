> **Nota (mudança de marca):** o nome agora é **Poglio Roberto**; "Poderi La Bruciata" foi abandonado. Este documento é anterior e serve só de referência de cores, fontes e componentes.

# Poderi La Bruciata — Identidade visual (resumo para Claude Code)

Azienda Agricola Vitivinicola Poglio Roberto · Castelnuovo Calcea (AT), Piemonte. Site em italiano, página única.

## Logo
Arquivos de referência: `Logo.dc.html` (SVG; props `dir` a|b|c, `layout` stacked|horizontal|symbol, `tone`).
Direção recomendada: **1a Cornice** — moldura dos rótulos com "PODERI" atravessando a linha superior, "LA BRUCIATA" em Cinzel 600, torre desenhada sobre a colina, uma janela e o ponto da brasa em vermelho.
- **Principal (stacked):** rodapé, materiais impressos. Mín. 120 px de largura.
- **Horizontal:** menu. Símbolo + "PODERI LA BRUCIATA" em uma linha. 260–300 px no desktop, mín. 160 px no celular (altura ~32–34 px).
- **Símbolo:** favicon (16/32 px), avatar das redes (sobre Nero), carimbo.
- **Tons:** `light` (Inchiostro + Oro Antico + Rosso Brace, sobre claro) · `dark` (Carta + Oro + brasa #C8374F, sobre escuro) · `black` #17130F · `goldprint` #85642B (claro) · `gold` #C9A45C (escuro) · `white` #F5F0E6 (fotos, vermelho, preto).
- Área de proteção: altura de "PODERI" em todos os lados. Não distorcer, não recolorir, sem sombras/degradês.
- Exportar os SVGs finais de `Logo.dc.html` para `/public/logo/` (svg + favicon.ico/png 32, apple-touch 180).

## Cores
| Token | HEX | Papel | Contraste |
|---|---|---|---|
| carta | #F5F0E6 | fundo claro | — |
| tufo | #EAE2D3 | fundo claro alternado | Inchiostro 13,4:1 |
| nero | #17130F | fundo escuro, menu, rodapé | Carta 16,3:1 |
| inchiostro | #1E1A16 | texto principal (claro) | 15,2:1 sobre Carta |
| terra | #5E554B | texto secundário (claro) | 6,4:1 |
| polvere | #B5AA9A | texto secundário (escuro) | 8,1:1 sobre Nero |
| rosso-barbera | #6E1423 | botões, fundo de destaque | Carta sobre ele 10,4:1 |
| rosso-brace | #A8213A | links, hover, ponto da brasa | 6,3:1 sobre Carta |
| oro | #C9A45C | dourado só sobre escuro | 7,9:1 sobre Nero |
| oro-antico | #85642B | dourado sobre claro (≥13 px) | 4,8:1 sobre Carta (4,2:1 sobre Tufo: só texto grande) |

Proporção: Carta/Nero ~85%, Rosso ~10%, dourado <5% (fios, números, occhielli). Nunca dourado em blocos ou parágrafos.
Cores das etiquetas dos vinhos (só nas garrafas): La Bruciata papel #1C1916, foil #C9A45C, etiqueta #A8213A · Il Frutteto #EFE4CB / #7E7C78 / #2F5A34 · Il Chiostro #EBD5E3 / #1E1A16 / #8A2045 · Anfiteatro #F3F1EA / #1E1A16 / #6B1A35 · Nonu Vanin #D9DBDB / #A8833F / #151515.

## Tipografia (Google Fonts)
`https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Hanken+Grotesk:ital,wght@0,400;0,500;0,600;1,400&display=swap`
- **Cinzel 600** — logo e títulos. H1 clamp(34px, 5.4vw, 76px)/1.08; H2 clamp(32px, 4vw, 52px)/1.1; H3 22–26px. Nunca < 15 px nem em parágrafos.
- **Hanken Grotesk** — texto 400 17px/1.65; occhiello 600 13px, caixa alta, letter-spacing .2em; botões 600 14px, caixa alta, .12em.

## Componentes
- Botão primário: bg #6E1423, texto #F5F0E6, hover #A8213A, raio 2px, padding 16×24, altura mín. 44px.
- Botão sobre escuro: bg #F5F0E6, texto #17130F; secundário: borda 1px Carta 60%.
- Menu: fixo, transparente sobre o vídeo → Nero 97% após 40px de scroll; no celular botão "Menu" abre overlay Nero com links em Cinzel 28px.
- Polaroid: moldura #FFFDF8, 14px (base 0 + legenda itálica), rotação −3°/+4°, sombra suave.
- Linha do tempo: ponto Rosso Brace 11px + fio #CFC3AE.

## Seções (ordem)
1. Apertura — vídeo full-screen (placeholder: foto da colina com zoom lento), véu Nero, H1 "Dal primo Ottocento, la stessa famiglia, la stessa collina."
2. La nostra storia — timeline + 2 polaroids (família, colina na neve). Fundo Carta.
3. Il territorio — `assets/italia-piemonte.svg` (dados reais das regiões ISTAT/openpolis), Piemonte em #6E1423, ponto Oro em Castelnuovo Calcea (left 15.38%, top 22.26%). Fundo Tufo.
4. Dalla vigna alla bottiglia — 3 passos com fotos 4:5. Fundo Nero.
5. I nostri vini — uma garrafa central; ao trocar vinho o rótulo sai pela lateral (translateX + scaleX, 360ms) e entra pelo outro lado (460ms). Fundo Carta.
6. Vieni a trovarci — foto da cantina + texto sobre Rosso Barbera, botões WhatsApp e e-mail.
7. Contatti — dados da empresa + quadro para importadores (borda Oro 50%). Fundo Nero.

## Pendências
Textos em italiano são provisórios. Faltam: vídeo, endereço, telefone/WhatsApp, e-mail, P. IVA, uva do Il Frutteto, datas reais para a linha do tempo.
