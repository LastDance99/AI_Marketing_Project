# 🎯 AI 기반 마케팅 콘텐츠 생성 플랫폼

> 이미지 및 텍스트 생성형 AI를 활용한 마케팅 콘텐츠 자동화 솔루션

---

## 🚀 프로젝트 개요

이 프로젝트는 생성형 AI(GPT 및 이미지 생성 모델)를 기반으로 마케팅 콘텐츠(문장, 이미지 등)를 자동으로 생성하는 웹 애플리케이션입니다.  
사용자는 키워드 또는 프롬프트 입력을 통해 다양한 콘텐츠를 빠르게 생성할 수 있습니다.

---

## 🛠 기술 스택

### Frontend
- HTML / CSS / JavaScript (또는 React)
- Axios (AJAX 통신용)

### Backend
- Django 5.x (DRF 포함 가능)
- PostgreSQL 또는 SQLite

### AI
- OpenAI API 또는 Fine-tuned 모델
- Prompt Engineering
- Embedding + Vector DB (RAG)

---

## 📁 프로젝트 구조

AI_Marketing_Project/ ├── backend/ # Django 백엔드 │ ├── django_root/ # 설정 및 루트 │ └── app_name/ # 주요 기능 앱 │ ├── frontend/ # 프론트엔드 │ ├── public/
│ └── src/ │ ├── .gitignore ├── README.md └── requirements.txt



---

## ⚙️ 실행 방법

```bash
cd backend
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py runserver

cd frontend
# HTML/JS: 브라우저로 index.html 열기
# React 기준
npm install
npm run dev



이름	  역할
김대원	  백엔드, AI 모델
이진욱	  프론트엔드 UI/UX 개발



📌 주요 기능

- 텍스트 생성 (프롬프트 기반)

- 이미지 생성 (DALL·E 등 연동)

- 콘텐츠 저장/조회

- 회원가입 / 로그인

- 마이페이지 및 콘텐츠 히스토리



