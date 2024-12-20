from fastapi import APIRouter, HTTPException, Form, Request, Depends, Cookie
from pydantic import BaseModel, Field, ValidationError
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from schemas.user import UserLogin, DelUsers
from database_queries.users_query import check_user,check_password, create_session, get_user_id, check_admin, get_session, delete_session,get_user_login
from typing import Any
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
from database_queries.profile_query import get_user_data
from database_queries.admin_users_query import get_all_users, delete_user, set_admin
# import asyncio
# import asyncpg

router = APIRouter(tags=['Adminus'])
templates = Jinja2Templates(directory="templates")

@router.get('/admin_home')
async def login(request: Request):
    
    return templates.TemplateResponse(name='admin_home.html', context={'request': request})

@router.get('/settings')
async def settings(request: Request):
    return templates.TemplateResponse(name='settings.html', context={'request': request})

@router.get('/users')
async def settings(request: Request):
    # session_id = request.cookies.get("session_id")
    # session = await get_session(session_id)
    response = templates.TemplateResponse(name='users.html', context={'request': request})
    # response.set_cookie(key="session_id", value=session_id, 
    #                     max_age=120, httponly=True)
    return response



@router.get("/users_list")
async def register(request : Request):
    session_id = request.cookies.get("session_id")
    session = await get_session(session_id)
    users = await get_all_users(session['user_id']) 
    return  [
        {
            "user_id": user[0],
            "user_login": user[1],
            "first_name": user[2],
            "last_name": user[3],
            "is_admin": user[4],
            "is_user": user[5]
        }
        for user in users
    ]

@router.post("/delete_user")
async def register(request : Request,
                    user : DelUsers = Form()):
    try:
        print("Get id:", user.user_id)
        request = await get_user_login(user.user_id) # Проверяем, существует ли пользователь в базе данных
        if not request:
            raise HTTPException(status_code=400, detail="Пользователь с таким id не нвйден")
        await delete_user(user.user_id)

    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors()) # Обрабатываем ошибки валидации
    return JSONResponse(content={"deleted": True})

@router.post("/assing_as_admin")
async def register(request : Request,
                    user : DelUsers = Form()):
    try:
        print("Get id:", user.user_id)
        request = await get_user_login(user.user_id) # Проверяем, существует ли пользователь в базе данных
        if not request:
            raise HTTPException(status_code=400, detail="Пользователь с таким id не нвйден")
        await set_admin(user.user_id)

    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors()) # Обрабатываем ошибки валидации
    return JSONResponse(content={"deleted": True})