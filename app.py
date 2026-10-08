from base64 import b64encode
from pathlib import Path

import streamlit as st

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"


def data_uri(path: Path, media_type: str) -> str:
    return f"data:{media_type};base64,{b64encode(path.read_bytes()).decode('ascii')}"


def build_page() -> str:
    css = (ASSETS / "style.css").read_text(encoding="utf-8")
    css = css.replace("__HEADING_FONT__", data_uri(ASSETS / "fonts" / "Silkscreen-Regular.ttf", "font/ttf"))
    css = css.replace("__BODY_FONT__", data_uri(ASSETS / "fonts" / "VT323-Regular.ttf", "font/ttf"))
    html = (ASSETS / "landing.html").read_text(encoding="utf-8")
    html = html.replace("__PLANT_IMAGE__", data_uri(ASSETS / "kooizy-succulent.png", "image/png"))
    html = html.replace("__HERO_CHARACTER__", data_uri(ASSETS / "kooizy-character.png", "image/png"))
    html = html.replace("__GARDEN_IMAGE__", data_uri(ASSETS / "kooizy-garden.png", "image/png"))
    html = html.replace("__CHAPTER_ONE_PLANT__", data_uri(ASSETS / "docinho-sapeca.png", "image/png"))
    video = ASSETS / "story.mp4"
    if video.exists():
        video_html = (
            '<video class="story-video" controls playsinline preload="metadata" '
            'aria-label="A história da suculenta da Kooizy">'
            f'<source src="{data_uri(video, "video/mp4")}" type="video/mp4">'
            'Seu navegador não suporta vídeo HTML5.</video>'
        )
    else:
        video_html = """
        <div class="video-empty">
          <span class="video-film" aria-hidden="true">[ &gt; ]</span>
          <span class="pixel-label">Vídeo em breve</span>
          <p>Um novo jeito de conhecer a minha história.</p>
        </div>
        """
    html = html.replace("__VIDEO_CONTENT__", video_html)
    js = (ASSETS / "animation.js").read_text(encoding="utf-8")
    return f"<style>{css}</style>{html}<script>{js}</script>"


st.set_page_config(
    page_title="Kooizy | Uma pequena grande história",
    page_icon="🌱",
    layout="wide",
    initial_sidebar_state="collapsed",
)
# Only trusted, project-owned HTML and JavaScript are rendered here.
st.html(build_page(), unsafe_allow_javascript=True)
