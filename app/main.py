from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from routers import login, register, profile, admin
from database_queries.users_query import get_session, check_admin

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(login.router)
app.include_router(register.router)
app.include_router(profile.router)
app.include_router(admin.router)

# Проверка авторизации
@app.get("/check-auth")
async def check_auth(request: Request):
    session_id = request.cookies.get("session_id")
    session = await get_session(session_id)

    if not session_id or not session:
        return JSONResponse(content={"authenticated": False})
    return JSONResponse(content={"authenticated": True})

@app.get("/check-admin")
async def check_auth(request: Request):
    session_id = request.cookies.get("session_id")
    session = await get_session(session_id)
    is_admin = await check_admin(session['user_id'])

    if not is_admin:
        return JSONResponse(content={"authenticated": False})
    return JSONResponse(content={"authenticated": True})


# @app.get("/check-admin")
# async def check_auth(request: Request):
#     session_id = request.cookies.get("session_id")
#     session = await get_session(session_id)

#     if not session_id or not session:
#         return JSONResponse(content={"authenticated": False})
#     return JSONResponse(content={"authenticated": True})


# Главная страница
@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

# @app.get("/home")
# async def index(request: Request):
#     return templates.TemplateResponse("home.html", {"request": request})

#python3 -m uvicorn main:app