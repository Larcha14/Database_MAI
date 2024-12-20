from fastapi import APIRouter, HTTPException, Form, Request, Depends
from pydantic import BaseModel, Field, ValidationError
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from schemas.user import UserLoginRegister
from database_queries.users_query import check_user, create_user, get_session, get_user_login
from database_queries.profile_query import get_user_data

router = APIRouter(tags=['Profile'])
templates = Jinja2Templates(directory="templates")


@router.get('/profile')
async def get_profile(request: Request):
    session_id = request.cookies.get("session_id")
    session = await get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Сессия недействителььна")
    response = await get_user_data(session['user_id'])
    user_login = await get_user_login(session['user_id'])
    data =  {"login": user_login,"first_name": response['first_name'], "last_name": response['last_name'], "email":response['email']}
    return templates.TemplateResponse(name='profile.html', context={'request': request, 'data': data} )

@router.get('/admin_profile')
async def get_profile(request: Request):
    session_id = request.cookies.get("session_id")
    session = await get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Сессия недействителььна")
    response = await get_user_data(session['user_id'])
    user_login = await get_user_login(session['user_id'])
    data =  {"login": user_login,"first_name": response['first_name'], "last_name": response['last_name'], "email":response['email'], "website_url":response['website_url'], "date_of_birthday":response['date_of_birthday'], "description":response['description'], "avatar_path":response['avatar_path']}
    return templates.TemplateResponse(name='admin_profile.html', context={'request': request, 'data': data} )


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
