from base64 import b64encode
from html import escape
import json
import mimetypes
from pathlib import Path

import streamlit as st

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"


def data_uri(path: Path, media_type: str) -> str:
    return f"data:{media_type};base64,{b64encode(path.read_bytes()).decode('ascii')}"


def build_slides() -> str:
    story = ASSETS / "story"
    slides = json.loads((story / "slides.json").read_text(encoding="utf-8"))
    if not slides:
        slides = [{"placeholder": True} for _ in range(3)]
    rendered = []
    for index, slide in enumerate(slides):
        number = str(index + 1).zfill(2)
        hidden = " hidden" if index else ""
        if slide.get("placeholder"):
            content = (
                '<div class="carousel-placeholder">'
                '<span class="carousel-symbol" aria-hidden="true">[ ♥ ]</span>'
                f'<span class="pixel-label">Imagem {number}</span>'
                '<p>As imagens da nossa história chegam em breve.</p></div>'
            )
            caption = "Uma nova página da nossa história."
        else:
            image_path = (story / slide["image"]).resolve()
            if not image_path.is_relative_to(story.resolve()):
                raise ValueError("Story images must be inside assets/story.")
            media_type = mimetypes.guess_type(image_path.name)[0]
            if media_type not in {"image/png", "image/jpeg", "image/webp", "image/gif"}:
                raise ValueError("Unsupported story image format.")
            alt = escape(slide.get("alt", f"Imagem {number} da história"), quote=True)
            if slide.get("type") == "garden":
                dialogue = escape(slide["dialogue"])
                terrain = data_uri(ASSETS / "kooizy-garden.png", "image/png")
                content = (
                    '<div class="story-garden">'
                    '<div class="sky-cloud story-cloud-one" aria-hidden="true"></div>'
                    '<div class="sky-cloud story-cloud-two" aria-hidden="true"></div>'
                    '<div class="pixel-sun story-sun" aria-hidden="true"></div>'
                    f'<img class="garden-terrain story-terrain" src="{terrain}" alt="" aria-hidden="true">'
                    f'<img class="story-character" src="{data_uri(image_path, media_type)}" '
                    f'alt="{alt}" loading="lazy">'
                    f'<p class="story-dialogue">{dialogue}</p></div>'
                )
            else:
                content = (
                    f'<img class="carousel-image" src="{data_uri(image_path, media_type)}" '
                    f'alt="{alt}" loading="lazy">'
                )
            caption = slide.get("caption", "")
        scene_class = " has-scene" if slide.get("type") == "garden" else ""
        caption_html = f'<figcaption>{escape(caption)}</figcaption>' if caption else ""
        rendered.append(
            f'<figure class="carousel-slide" role="group" aria-roledescription="imagem" '
            f'aria-label="{index + 1} de {len(slides)}"{hidden}>'
            f'<div class="carousel-art{scene_class}">{content}</div>'
            f'{caption_html}</figure>'
        )
    return "".join(rendered)


def build_page() -> str:
    css = (ASSETS / "style.css").read_text(encoding="utf-8")
    css = css.replace("__HEADING_FONT__", data_uri(ASSETS / "fonts" / "Silkscreen-Regular.ttf", "font/ttf"))
    css = css.replace("__BODY_FONT__", data_uri(ASSETS / "fonts" / "VT323-Regular.ttf", "font/ttf"))
    html = (ASSETS / "landing.html").read_text(encoding="utf-8")
    html = html.replace("__PLANT_IMAGE__", data_uri(ASSETS / "kooizy-succulent.png", "image/png"))
    html = html.replace("__HERO_CHARACTER__", data_uri(ASSETS / "kooizy-character.png", "image/png"))
    html = html.replace("__GARDEN_IMAGE__", data_uri(ASSETS / "kooizy-garden.png", "image/png"))
    html = html.replace("__CHAPTER_ONE_PLANT__", data_uri(ASSETS / "docinho-sapeca.png", "image/png"))
    html = html.replace("__CHAPTER_THREE_PLANT__", data_uri(ASSETS / "docinho-surpresa.png", "image/png"))
    html = html.replace("__CAROUSEL_SLIDES__", build_slides())
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
