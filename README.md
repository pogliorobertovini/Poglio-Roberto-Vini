# Poglio Roberto — site

Site em italiano, página única, da Azienda Agricola Vitivinicola Poglio Roberto (Castelnuovo Calcea, Asti).

> **Marca:** o nome da fazenda é **Poglio Roberto**. "Poderi La Bruciata" não é mais usado; "La Bruciata" aparece só como nome de um dos vinhos. Os arquivos em `docs/branding/` são de antes dessa mudança (ainda dizem "Poderi La Bruciata"); as cores, fontes e componentes continuam valendo.

Next.js 16 (App Router) + React 19 + three.js (garrafa 3D). Sem backend: tudo estático.

```bash
npm run dev      # http://localhost:3000
npm run build    # build de produção (estático)
npm run lint
```

## Onde mexer

| O quê | Onde |
|---|---|
| **Todos os textos, vinhos, contatos** | `src/content/site.ts` |
| Cores, fontes, botões, animações de entrada | `src/app/globals.css` (tokens de `docs/branding/IDENTITA.md`) |
| Cada seção | `src/components/<Seção>.tsx` + `.module.css` |
| Garrafa 3D (vidro, luz, giro) | `src/components/Bottle3D.tsx` |
| Logo (direção 1a Cornice) | `src/components/Logo.tsx` |

Ordem da página: Apertura → Storia → Territorio → Dalla vigna alla bottiglia → Vini → Visite → Contatti.
Referências do design em `docs/branding/` (identidade e wireframe).

## Pendências (marcadas `TODO` no código)

- [ ] **Vídeo de abertura** (drone): colocar em `public/video/` e preencher `HERO.video` em `site.ts`. Hoje usa a foto da colina com zoom lento.
- [ ] **Contatos**: endereço, telefone, WhatsApp (só dígitos com DDI), e-mail, e-mail para importadores, Instagram, P. IVA → `CONTACT` em `site.ts`. Enquanto vazios, o site mostra "da inserire" e os botões abrem WhatsApp/e-mail em branco.
- [ ] **Uva do Il Frutteto** (`grape: null`) — a linha "Uva" fica escondida até confirmar.
- [ ] **Fotos definitivas**: foto antiga da família (história), foto da terra com gesso (território), fotos de vendemmia/cantina em melhor enquadramento.
- [ ] **Conferir os rótulos novos**: nome "Ca' Bianca" (antes "Anfiteatro") e annate (os PDFs de prova dizem 2020; Nonu Vanin 2023).
- [ ] **Mapa**: o SVG usa as regiões da ISTAT; conferir os limites do Piemonte na versão final.
- [ ] **Privacy e Cookie**: textos legais em `src/app/privacy` e `src/app/cookie` (hoje placeholders). O site ainda não usa cookies nem analytics.
- [ ] Logo: redesenhada com "POGLIO ROBERTO" (Cornice). Validar com o cliente; exportar versões finais em SVG com o texto em curvas.
- [ ] Domínio definitivo em `SITE.url` (usado em metadados/SEO); `sitemap.xml` e `robots.txt`.
- [ ] Duas novas etiquetas: basta acrescentar dois itens em `WINES` (rótulo em `public/labels/`).
- [ ] Confirmar com a família textos provisórios (descrições dos vinhos, legendas das fotos).

## Scripts de imagens (`scripts/`)

Geram os arquivos de `public/` a partir das fotos originais (caminhos da pasta *Downloads/Poderi La Bruciata branding — nome da pasta antiga*):

- `node scripts/photos.mjs` — otimiza as fotos para webp.
- `node scripts/labels-pdf.mjs` — **atual**: gera as texturas das garrafas (frente + etiqueta, e contrarrótulo) a partir dos PDFs de prova da gráfica. Exige os PDFs renderizados em PNG (escala 6) numa pasta indicada em `PDF_PNG_DIR`.
- `node scripts/labels.mjs` — (antigo, a partir das fotos sobre papelão) recorta os rótulos das fotos (corrige a perspectiva) e monta a textura da garrafa (rótulo + etiqueta sobreposta, fundo transparente).
