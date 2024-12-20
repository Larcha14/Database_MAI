from .connect import create_connection, close_connection
import asyncio
from schemas.user import UserLogin, UserLoginRegister
import bcrypt
import uuid
from datetime import timedelta, datetime

async def get_all_users(user_id: int):
    conn = await create_connection()
    try:
        # query = """
        #     select user_id, user_login, first_name, last_name
        #     from users join profile using(user_id)
        # """

        query = """
SELECT DISTINCT ON (u.user_id)
    u.user_id, 
    u.user_login, 
    p.first_name, 
    p.last_name, 
    COALESCE(a.admin_id, 0) AS admin_id,
    CASE
        WHEN u.user_id = $1 THEN 1
        ELSE 0
    END AS status
FROM 
    users AS u
JOIN 
    profile AS p ON u.user_id = p.user_id
LEFT JOIN 
    admins AS a ON u.user_id = a.user_id
;
        """

        rows = await conn.fetch(query, user_id)  # Используем fetch для получения строк
        return rows
    finally:
        await close_connection(conn)

async def delete_user(user_id: int):
    conn = await create_connection()
    try:
        query = """
        Delete from users where user_id = $1
        """

        rows = await conn.execute(query, user_id)  # Используем fetch для получения строк
        return rows
    finally:
        await close_connection(conn)

async def set_admin(user_id: int):
    conn = await create_connection()
    try:
        query = """
        INSERT INTO admins (user_id) VALUES ($1)
        """

        rows = await conn.execute(query, user_id)  # Используем fetch для получения строк
        return rows
    finally:
        await close_connection(conn)
