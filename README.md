# 🎯 REST API 연습용 TO DO 앱

> 이미지 및 텍스트 생성형 AI를 활용한 마케팅 콘텐츠 자동화 솔루션


## 🛠 기술 스택

### Frontend

- HTML / CSS / JavaScript / React
- Axios (AJAX 통신용)

### Backend

- Django 5.2 (DRF)
- SQLite


---

## 📁 프로젝트 구조

REST_API_TO_DO_APP/
│
├── backend/ # Django 백엔드
│ ├── django_root/ # settings.py, urls.py 등
│ ├── app_name/ # 너의 앱 (ex. content_generator)
│ ├── manage.py
│ └── requirements.txt # pip freeze로 생성
│
├── frontend/ # React 또는 HTML/JS 프론트엔드
│ ├── public/
│ ├── src/
│ └── package.json
│
├── .gitignore
└── README.md

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
김대원	  백엔드
이진욱	  프론트엔드




백엔드 의존성 관리
requirements.txt 파일 만들기

pip freeze > requirements.txt

pip install -r requirements.txt
```
