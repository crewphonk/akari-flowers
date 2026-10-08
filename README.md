# Akari Flower's — Kooizy

Landing page em pixel art que conta a história de uma suculenta da Kooizy.
Projeto independente em Python e Streamlit, no repositório crewphonk/akari-flowers.

## A página

- Apresentação da suculenta com arte original em pixel.
- Três capítulos: o começo, o crescimento e um novo lar.
- Plantinha, nuvens, brilhos e corações com animações em passos.
- Alternância de dia/noite e interação de carinho.
- Controle para pausar movimentos e respeito à preferência por movimento reduzido.
- Layout adaptado para desktop e celular.
- Espaço para vídeo na parte inferior.

O texto é uma narrativa criativa da primeira versão e pode ser ajustado junto com a identidade da marca.

## Executar localmente

Recomendado: Python 3.12.

    python -m venv .venv
    .venv\Scripts\Activate.ps1
    python -m pip install -r requirements.txt
    python -m streamlit run app.py

## Vídeo

A página mostra um espaço "Vídeo em breve" enquanto não há vídeo.
Para inserir o filme, adicione assets/story.mp4 ao repositório.
O app substitui automaticamente o espaço por um player com controles, sem reprodução automática.

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
- assets/animation.js: dia/noite, carinho, pausa e progresso dos capítulos.
- assets/kooizy-succulent.png: suculenta original com fundo transparente.
- assets/ART.md: origem da arte e prompt final.
- assets/fonts/: fontes Silkscreen e VT323, com licenças OFL.
- .streamlit/config.toml: configuração visual do Streamlit.
- requirements.txt: dependências.

As fontes e a arte são servidas pelo próprio app. A página não usa scripts de terceiros.
Credenciais locais devem ficar em .streamlit/secrets.toml, ignorado pelo Git.

## Fluxo de trabalho

Depois das alterações e verificações, fazer commit e push no repositório crewphonk/akari-flowers.
Conferir a atualização no app Streamlit conectado ao repositório.
