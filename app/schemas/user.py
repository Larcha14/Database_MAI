from pydantic import BaseModel, EmailStr, Field
from datetime import date

class UserLogin(BaseModel):
    login: str = Field(default=..., min_length=1, max_length=50, description="Login length must be more than 0 and less then 51")
    password: str = Field(default=..., min_length=6, max_length=50, description="Password length must be more than 5 and less then 51")
    

class UserLoginRegister(BaseModel):
    login: str = Field(default=..., min_length=1, max_length=50, description="Login length must be more than 0 and less then 51")
    firstname: str 
    lastname: str
    email: EmailStr = Field(default=..., description="Email")
    password: str = Field(default=..., min_length=6, max_length=50, description="Password length must be more than 5 and less then 51")

class UserInfo(BaseModel):
    login: str = Field(default=..., min_length=1, max_length=50, description="Login length must be more than 0 and less then 51")
    firstname: str 
    lastname: str
    email: EmailStr = Field(default=..., description="Email")
    website_link: str | None
    date_of_birthday: date | None
    description: str | None

class DelUsers(BaseModel):
    user_id: int 