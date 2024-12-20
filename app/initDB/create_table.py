import psycopg2
from psycopg2 import Error
from config import Host, Database, User, Password, Port

try:
    print("Подключение к PostgreSQL...")
    connection = psycopg2.connect(
        host = Host,
        port = Port,
        user=User,
        password = Password,
        database = Database
    )
    cursor = connection.cursor()
    cursor.execute("""
            insert into admins (user_id) values(1)
                   """)
    print("Таблица успешно создана")

    # cursor.execute("""
    #             WITH values_to_insert AS (
    #                 SELECT unnest(string_to_array('Пейзажи, Архитектура, Портреты, Макрофотография, Животные, Природа, Еда, События, Спорт, Мода, Технологии, Городская жизнь, Путешествия, Семья, Здоровье, Бизнес, Интерьеры, Абстракция, Праздники, Дети, Вода, Цветы, Искусство, Музыка, Автомобили, Ремесла, Микроскопия, Культура, Люди, Традиции, Астрономия, Солнце, Ночь, Улыбки, Эмоции, Океан, Снег, Осень, Лето, Весна, Зима, Выставки, Фотожурналистика, Редкие животные, Ветер, Современное искусство, Исторические места, Аллеи, Кофе, Завтраки, Десерты, Творческие мастерские, Наука, Психология, Здоровое питание, Волонтерство, Образование, Сельское хозяйство, Саморазвитие, Приключения, Друзья, Романтика, Пара, Кладбища, Человек и природа, Миграция, Горы, Огород, Туры, Отдых, Экотуризм, Кино, Цветная графика, Ретро, Самолеты, Промышленность, Строительство, Устойчивое развитие, Чудеса света, Сказочные места, Питомцы, Ностальгия, Изучение языков, Хобби, Спокойствие,', ',')) 
    #             ) 
                   
    #             insert into categories (name)
    #             select * from values_to_insert

    #               """)

    connection.commit()

    # cursor.execute("""
    #         select count(name) from categories


    #         """)

    # request1 = cursor.fetchone()
    # print(request1)


except (Exception, Error) as error:
    print("Ошибка при работе с PostgreSQL", error)

finally:
    if connection:
        cursor.close()
        connection.close()
        print("Соединение с PostgreSQL закрыто")


# source back/bd_kp/bin/activate

                   
        # INSERT INTO users (user_login, password_hash)
        # VALUES ()