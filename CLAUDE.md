# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) para trabalhar com o código deste repositório.

## Visão Geral

Site de portfólio estático para Felipe Genuino, designer de UI/UX. Construído com HTML, CSS e JavaScript puro - sem ferramentas de build ou gerenciadores de pacotes.

## Desenvolvimento

Servir o site localmente a partir do diretório `app/`:
```bash
npx serve app
# ou
python -m http.server 8000 --directory app
```

Docker (expõe a porta 8000):
```bash
docker build -t portfolio .
docker run -p 8000:8000 portfolio
```

## Arquitetura

```
app/
├── index.html              # Página principal do portfólio
├── work/                   # Páginas de case studies
│   ├── template.html       # Template para novos cases (buscar "PLACEHOLDER")
│   └── [projeto].html      # Páginas específicas de projetos
├── assets/
│   ├── css/
│   │   ├── portfolio.css   # Estilos do index.html
│   │   └── work.css        # Estilos das páginas de case study
│   └── js/
│       ├── portfolio.js    # Partículas Three.js, carrossel Swiper, efeitos de scroll
│       └── work.js         # Estado da nav no scroll, reveal (subconjunto do portfolio.js)
└── docs/                   # Arquivos de documentação (currículo, TCC)
```

## Detalhes Técnicos

- **Variáveis CSS**: Tokens de design definidos em `:root` de cada arquivo CSS (cores, fontes, espaçamento)
- **Fontes**: Cormorant Garamond (títulos) + Inter (corpo) via Google Fonts
- **Bibliotecas externas** (via CDN):
  - Three.js - Animação de partículas no hero
  - Swiper - Carrossel de cards de projetos no mobile
- **Scroll Reveal**: Elementos com classe `.reveal` animam ao entrar na viewport via IntersectionObserver
- **Thumbnails de projetos**: Usa serviço thum.io para screenshots de sites ao vivo

## Adicionar Novos Case Studies

1. Duplicar `app/work/template.html`
2. Buscar por comentários "PLACEHOLDER" e preencher os dados do projeto
3. Adicionar entrada no carrossel Swiper e na `.proj-list` em `app/index.html`
