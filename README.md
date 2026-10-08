# Akari Flower's

Projeto independente para a nova landing page da Akari Flower's, desenvolvido em Python com Streamlit.

A versão inicial é uma página "em breve". Textos comerciais, fotos, catálogo e contatos serão definidos na próxima etapa.

## Executar localmente

Recomendado: Python 3.12.

    python -m venv .venv
    .venv\Scripts\Activate.ps1
    python -m pip install -r requirements.txt
    python -m streamlit run app.py

## Publicar no Streamlit Community Cloud

1. Acesse https://share.streamlit.io e conecte a conta GitHub crewphonk.
2. Clique em Create app e selecione a opção para um app existente.
3. Selecione o repositório crewphonk/akari-flowers.
4. Use a branch main e o arquivo principal app.py.
5. Em Advanced settings, selecione Python 3.12.
6. Clique em Deploy e aguarde a URL confirmada pelo Streamlit.

O repositório é público. Conecte a conta GitHub crewphonk ao Streamlit Community Cloud para publicar e administrar o aplicativo.

## Estrutura

- app.py: entrada do aplicativo.
- assets/landing.html: conteúdo da página.
- assets/style.css: identidade visual e layout responsivo.
- .streamlit/config.toml: configuração de tema e execução.
- requirements.txt: dependências.

Guarde credenciais em .streamlit/secrets.toml localmente ou em Secrets no Streamlit Cloud. Esse arquivo não deve ser enviado ao GitHub.

Este repositório tem seu próprio histórico Git e não depende dos demais projetos.
