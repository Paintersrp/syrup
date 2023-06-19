#!/bin/bash

# Start Django server
start bash -c "cd backend; python manage.py runserver; read -p 'Press Enter to exit...'"

# Start React server
start bash -c "cd frontend; npm run dev; read -p 'Press Enter to exit...'"
