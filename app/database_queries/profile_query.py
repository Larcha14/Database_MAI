from .connect import create_connection, close_connection
import asyncio
from schemas.user import UserLogin, UserLoginRegister
import bcrypt
import uuid
from datetime import timedelta, datetime

async def get_user_data(user_id: int):
    conn = await create_connection()
    try:
        query = """
            select * from profile where user_id = $1
        """
        user = await conn.fetchrow(query, user_id)
        return user
    finally:
        await close_connection(conn)


async def change_user_data(user_id: int):
    conn = await create_connection()
    try:
        query = """
            select * from profile where user_id = $1
        """
        user = await conn.fetchrow(query, user_id)
        return user
    finally:
        await close_connection(conn)