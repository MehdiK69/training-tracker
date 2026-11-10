# Training Tracker

Web application to track workout sessions and the exercises performed in each session. Built as a university project (BUT3 RA, IUT Lyon 1).

## Stack

- Backend: Django 6, Django REST Framework, token authentication, SQLite
- Frontend: React 19, Vite, React Router, Axios

## Features

- Account registration, login and logout (token authentication)
- Create, list and delete training sessions
- Add exercises to a session (sets, reps, weight, rest time)
- Each user only sees and edits their own data

## Project structure

```
training-tracker/
  backend/     Django project (config) and the training app
  frontend/    React application
```

## Getting started

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The API is available at http://127.0.0.1:8000/api/ and the admin at http://127.0.0.1:8000/admin/.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The application is available at http://localhost:5173.

## API

| Method | Route | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register/ | Create an account, returns a token | No |
| POST | /api/auth/login/ | Returns a token | No |
| GET, POST | /api/sessions/ | List or create sessions | Token |
| GET, PUT, PATCH, DELETE | /api/sessions/{id}/ | Read, update or delete a session | Token |
| GET, POST | /api/exercises/ | List or create exercises | Token |
| GET, PUT, PATCH, DELETE | /api/exercises/{id}/ | Read, update or delete an exercise | Token |

Authenticated requests must send the header `Authorization: Token <token>`.

## Data model

- TrainingSession: user, title, description, date, duration, completed. A user cannot have two sessions with the same title on the same date.
- Exercise: session, name, sets, reps, weight, rest_seconds. An exercise belongs to one session.
