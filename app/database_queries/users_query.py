from .connect import create_connection, close_connection
import asyncio
from schemas.user import UserLogin, UserLoginRegister
import bcrypt
import uuid
from datetime import timedelta, datetime

async def check_user(user_login: str):
    conn = await create_connection()
    try:
        query = """
            SELECT user_id, password_hash FROM users WHERE user_login = $1
        """
        user = await conn.fetchrow(query, user_login)
        return user
    finally:
        await close_connection(conn)

async def get_user_login(user_id: int):
    conn = await create_connection()
    try:
        query = """
            SELECT user_login FROM users WHERE user_id = $1
        """
        user_login = await conn.fetchval(query, user_id)
        return user_login
    finally:
        await close_connection(conn)

async def get_user_id(user_login: str):
    conn = await create_connection()
    try:
        query = """
            SELECT user_id FROM users WHERE user_login = $1
        """
        user_id = await conn.fetchrow(query, user_login)
        return user_id
    finally:
        await close_connection(conn)

async def check_password(user: UserLogin): #проверяем пароль используя хэш
    db_user = await check_user(user.login)
    if not db_user or not bcrypt.checkpw(user.password.encode('utf-8'), db_user['password_hash'].encode('utf-8')):
        return None
    return db_user['user_id']


async def create_user(user: UserLoginRegister):
    conn = await create_connection()
    try:
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        query1 = """
            INSERT INTO users (user_login, password_hash) VALUES ($1, $2) RETURNING user_id
        """
        user_id  = await conn.fetchval(query1, user.login, hashed_password)

        query2 = """
            INSERT INTO profile (user_id, first_name, last_name, email) VALUES ($1, $2, $3, $4)
        """
        await conn.execute(query2, user_id, user.firstname, user.lastname, user.email     )

    finally:
        await close_connection(conn) 


async def create_session(user_id: int):
    uniq_session_id = str(uuid.uuid4())
    conn = await create_connection()
    try:
        query = """
            INSERT INTO sessions_table (session_id, user_id, creation_time) VALUES ($1, $2, $3) 
        """
        await conn.execute(query, uniq_session_id, user_id, datetime.now())
        return uniq_session_id
    finally:
        await close_connection(conn)

async def get_session(session_id: str):
    conn = await create_connection()
    try:
        query = """
            Select session_id, user_id from sessions_table where session_id = $1
        """
        session = await conn.fetchrow(query, session_id)
        return session
    finally:
        await close_connection(conn)



async def check_admin(user_id: int):
    conn = await create_connection()
    try:
        query = """
            Select admin_id from admins where user_id = $1
        """
        session = await conn.fetchval(query, user_id)
        return session
    finally:
        await close_connection(conn)

async def delete_session(session_id: str):
    conn = await create_connection()
    try:
        query = """
            DELETE from sessions_table where session_id = $1;
        """
        await conn.execute(query, session_id)

    finally:
        await close_connection(conn)