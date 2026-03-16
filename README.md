# Helpdesk / Ticket System

Projekt portfolio Full Stack pokazujący budowę systemu zarządzania zgłoszeniami.

## Zakres projektu

Aplikacja umożliwia:
- tworzenie zgłoszeń przez użytkowników,
- przeglądanie zgłoszeń i ich statusów,
- zarządzanie zgłoszeniami przez administratora,
- dodawanie komentarzy do zgłoszeń.

## Technologie

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite / PostgreSQL

### Frontend
- Angular
- TypeScript
- Angular HttpClient

### Inne
- REST API
- SQL
- GitHub
- Markdown

## Plan rozwoju
1. Analiza wymagań i projekt MVP
2. Inicjalizacja repozytorium
3. Backend FastAPI
4. Baza danych i modele
5. REST API
6. Frontend Angular
7. Integracja frontend + backend
8. Dokumentacja i diagramy

## Struktura projektu

```t
helpdesk-ticket-system/
├── backend/   # API w FastAPI
├── frontend/  # aplikacja Angular
├── docs/      # diagramy i dokumentacja pomocnicza
└── README.md
```

## Uruchomienie projektu

### backend
```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### frontend
```
cd frontend/helpdesk-ui
npm install
ng serve
```