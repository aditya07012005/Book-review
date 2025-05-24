# Book Reviews Website

A Django-based web application for book reviews and recommendations.

## Features

- User authentication (register, login, logout)
- Submit book reviews
- View featured books
- Browse new releases
- Responsive design

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

## Usage

Visit `http://localhost:8000` in your web browser to access the application.

## Technologies Used

- Django
- Python
- HTML/CSS
- JavaScript
- SQLite (development database) 