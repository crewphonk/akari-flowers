# Akari Flower's — Kooizy

Landing page em pixel art que conta a história de uma suculenta da Kooizy.
Projeto independente em Python e Streamlit, no repositório crewphonk/akari-flowers.

## A página

- Apresentação da suculenta com arte original em pixel.
- Três capítulos: o começo, o crescimento e um novo lar.
- Kooizy estática no jardim em pixel art, com nuvens, estrelas e lua em movimento; ao receber carinho, corações saem da plantinha nas mãos dela.
- Alternância de dia/noite e interação de carinho.
- Controle para pausar movimentos e respeito à preferência por movimento reduzido.
- Layout adaptado para desktop e celular.
- Carrossel de imagens na parte inferior, com setas, indicadores, teclado e gesto de deslizar no celular.

O texto é uma narrativa criativa da primeira versão e pode ser ajustado junto com a identidade da marca.

## Executar localmente

Recomendado: Python 3.12.

    python -m venv .venv
    .venv\Scripts\Activate.ps1
    python -m pip install -r requirements.txt
    python -m streamlit run app.py

## História em imagens

As imagens do carrossel ficam em assets/story/.
A ordem e os textos são definidos em assets/story/slides.json:

```json
[
  {"image": "01.png", "alt": "Descrição da primeira cena", "caption": "Legenda da primeira cena."},
  {"image": "02.png", "alt": "Descrição da segunda cena", "caption": "Legenda da segunda cena."}
]
```

Para montar uma cena no jardim com personagem e balão de fala, use:

```json
{"type": "garden", "image": "allan-01.png", "alt": "Descrição do personagem", "dialogue": "Fala da cena."}
```

A cena reutiliza o jardim em pixel art. O personagem e o balão ficam estáticos; as nuvens se movem.
Para uma cena com o casal, adicione "couple": true ao objeto: os personagens ficam juntos e corações em pixel art flutuam ao redor deles, respeitando a pausa e a preferência por movimento reduzido.

Formatos aceitos: PNG, JPEG, WebP e GIF. As imagens aparecem inteiras, sem cortes.
Enquanto a lista está vazia, o carrossel mostra três espaços de preparação.
A navegação é manual e circular, sem avanço automático, para permitir a leitura da história.

## Publicar no Streamlit

1. Acesse https://share.streamlit.io e conecte a conta GitHub crewphonk.
2. Crie um app a partir de crewphonk/akari-flowers.
3. Use a branch main e o arquivo principal app.py.
4. Selecione Python 3.12 em Advanced settings e clique em Deploy.

O repositório é público. Após conectar o app, os pushes na branch main atualizam a versão publicada.
A URL final deve ser confirmada no painel do Streamlit.

## Arquivos

- app.py: montagem da página e incorporação das imagens e fontes locais.
- assets/landing.html: conteúdo e estrutura.
- assets/style.css: visual em pixel e animações.
- assets/animation.js: dia/noite, carinho, pausa, progresso dos capítulos e navegação do carrossel.
- assets/kooizy-succulent.png: suculenta original com fundo transparente.
- assets/story/slides.json: imagens, ordem, descrições e legendas do carrossel.
- assets/ART.md: origem da arte e prompt final.
- assets/fonts/: fontes Silkscreen e VT323, com licenças OFL.
- .streamlit/config.toml: configuração visual do Streamlit.
- requirements.txt: dependências.

As fontes e a arte são servidas pelo próprio app. A página não usa scripts de terceiros.
Credenciais locais devem ficar em .streamlit/secrets.toml, ignorado pelo Git.

## Fluxo de trabalho

Depois das alterações e verificações, fazer commit e push no repositório crewphonk/akari-flowers.
Conferir a atualização no app Streamlit conectado ao repositório.
