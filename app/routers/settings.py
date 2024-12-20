import subprocess
import os
from datetime import datetime
from fastapi import APIRouter, HTTPException, Form, Request, Depends
from pydantic import BaseModel, Field, ValidationError
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from schemas.user import UserLoginRegister
from database_queries.users_query import check_user, create_user

router = APIRouter(tags=['Set'])
templates = Jinja2Templates(directory="templates")

@router.get('/make-backup')
async def backup_database(db_name, db_user, backup_dir):
    # Создаем имя файла для бэкапа с учетом даты
    backup_file = os.path.join(backup_dir, f"{db_name}_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.sql")
    
    try:
        # Выполняем команду pg_dump
        subprocess.run(['pg_dump', '-U', db_user, db_name, '-f', backup_file], check=True)
        print(f"Бэкап базы данных успешно создан: {backup_file}")
    except subprocess.CalledProcessError as e:
        print(f"Ошибка при создании бэкапа: {e}")

# Пример вызова функции
if __name__ == "__main__":
    backup_database("your_db_name", "your_db_user", "/path/to/backup/directory")




# def restore_database(db_name, db_user, backup_file):
#     try:
#         # Выполняем команду pg_restore
#         subprocess.run(['pg_restore', '-U', db_user, '-d', db_name, backup_file], check=True)
#         print(f"База данных успешно восстановлена из {backup_file}")
#     except subprocess.CalledProcessError as e:
#         print(f"Ошибка при восстановлении базы данных: {e}")

# # Пример вызова функции
# if __name__ == "__main__":
#     restore_database("your_db_name", "your_db_user", "/path/to/backup/file.sql")


# @router.get('./make-backup')
# async def get_backup(request: Request):
#     return templates.TemplateResponse(name='register.html', context={'request': request})

# @router.get('./upload-backup')
# async def get_load_backup(request: Request):
#     return templates.TemplateResponse(name='register.html', context={'request': request})


# @router.post("/")
# async def register(request : Request,
#                     user : UserLoginRegister = Form()):
#     try:
#         is_in_base = await check_user(user.login) # Проверяем, существует ли пользователь в базе данных
#         if is_in_base:
#             raise HTTPException(status_code=400, detail="Пользователь с таким логином уже зарегестрирован")
        
#         await create_user(user)

#     except ValidationError as e:
#         raise HTTPException(status_code=422, detail=e.errors()) # Обрабатываем ошибки валидации
#     # Если все ок, перекидываем на страницу авторизации
#     response = RedirectResponse(url='/login', status_code=302)
#     return response