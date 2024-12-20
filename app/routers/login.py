from fastapi import APIRouter, HTTPException, Form, Request, Depends, Cookie
from pydantic import BaseModel, Field, ValidationError
from fastapi.responses import RedirectResponse
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from schemas.user import UserLogin
from database_queries.users_query import check_user,check_password, create_session, get_user_id, check_admin, get_session, delete_session
from typing import Any
from datetime import datetime, timedelta
# import asyncio
# import asyncpg

router = APIRouter(tags=['Login'])
templates = Jinja2Templates(directory="templates")


@router.get('/login')
async def login(request: Request):
    return templates.TemplateResponse(name='login.html', context={'request': request})



@router.post('/login')
async def login(request: Request,
    user: UserLogin = Form()):
    # print("Received data:", user.dict())
    try:
        is_in_base = await check_user(user.login) # Проверяем, существует ли пользователь в базе данных
        if not is_in_base:
            raise HTTPException(status_code=404, detail="Пользователь с таким логином не найден")

        if not await check_password(user): # Проверяем правильность пароля и получаем пользователя
            raise HTTPException(status_code=400, detail="Неправильный логин или пароль")

    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors()) # Обрабатываем ошибки валидации
    
    #Если все ок ... сохраняем куки и перекидываем на главную страницу
    user_id = await get_user_id(user.login)
    session_id = await create_session(user_id['user_id'])
    is_admin = await check_admin(user_id['user_id'])
    # if not is_admin:
    #     # response = templates.TemplateResponse(name='profile.html', context={'request': request})
    #     response = RedirectResponse(url='/home', status_code=302)
    # else:
    #     # response = templates.TemplateResponse(name='admin_profile.html', context={'request': request})
    #     response = RedirectResponse(url='/admin_profile', status_code=302)
    # response = RedirectResponse(url='/profile', status_code=302)
    response = JSONResponse(content={"authenticated": True})
    response.set_cookie(key="session_id", value=session_id, 
                        max_age=120, httponly=True)  
    print(response)
    return response


@router.post('/logout')
async def logout(request: Request):
    session_id = request.cookies.get("session_id")
    session = await get_session(session_id)
    if session:
        await delete_session(session_id)

    response = RedirectResponse(url='/home.html', status_code=303)
    response.delete_cookie(key='session_id')
    return response