from pathlib import Path

import streamlit as st

ROOT = Path(__file__).resolve().parent

st.set_page_config(
    page_title="Akari Flower's",
    page_icon="🌸",
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.html((ROOT / "assets" / "style.css").read_text(encoding="utf-8"))
st.html((ROOT / "assets" / "landing.html").read_text(encoding="utf-8"))
