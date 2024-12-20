from fastapi import APIRouter, HTTPException, Form, Request, Depends
from pydantic import BaseModel, Field, ValidationError
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from schemas.user import UserLoginRegister
from database_queries.users_query import check_user, create_user

router = APIRouter(prefix='/register', tags=['Reg'])
templates = Jinja2Templates(directory="templates")


@router.get('/')
async def get_login_html(request: Request):
    return templates.TemplateResponse(name='register.html', context={'request': request})

@router.post("/")
async def register(request : Request,
                    user : UserLoginRegister = Form()):
    try:
        is_in_base = await check_user(user.login) # Проверяем, существует ли пользователь в базе данных
        if is_in_base:
            raise HTTPException(status_code=400, detail="Пользователь с таким логином уже зарегестрирован")
        
        await create_user(user)

    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors()) # Обрабатываем ошибки валидации
    # Если все ок, перекидываем на страницу авторизации
    response = RedirectResponse(url='/login', status_code=302)
    return response
