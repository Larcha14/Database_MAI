CREATE TABLE IF NOT EXISTS users ( 
    user_id BIGINT generated always as identity PRIMARY KEY, 
    user_login VARCHAR(100) NOT NULL, 
    password_hash VARCHAR(255) NOT NULL 
); 

CREATE TABLE IF NOT EXISTS admins ( 
    admin_id BIGINT generated always as identity PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS sessions_table ( 
    session_id VARCHAR(100) PRIMARY KEY,
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE,
    creation_time TIMESTAMP
); 

 
-- Таблица профилей 
CREATE TABLE IF NOT EXISTS profile ( 
    profile_id BIGINT generated always as identity PRIMARY KEY, 
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE, 
    first_name VARCHAR(100), 
    last_name VARCHAR(100), 
    email VARCHAR(150), 
    website_url VARCHAR(255), 
    date_of_birthday DATE, 
    description TEXT, 
    avatar_path VARCHAR(255) 
); 
 
-- Таблица информации о фотографиях 
CREATE TABLE IF NOT EXISTS photo_info ( 
    photo_id BIGINT generated always as identity PRIMARY KEY, 
    profile_id BIGINT REFERENCES profile(profile_id) ON DELETE CASCADE, 
    download_date DATE, 
    filename VARCHAR(255), 
    file_directory VARCHAR(255), 
    price DECIMAL(10, 2) 
); 
 
-- Таблица корзины 
CREATE TABLE IF NOT EXISTS cart ( 
    cart_id BIGINT generated always as identity PRIMARY KEY, 
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE, 
    photo_id BIGINT REFERENCES photo_info(photo_id) ON DELETE CASCADE 
); 
 
-- Таблица подписок 
CREATE TABLE IF NOT EXISTS subscription ( 
    subscription_id BIGINT generated always as identity PRIMARY KEY, 
    subscriber_user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE, 
    profile_id BIGINT REFERENCES profile(profile_id) ON DELETE CASCADE 
); 
 
-- Таблица избранных фотографий 
CREATE TABLE IF NOT EXISTS favorites ( 
    favorites_id BIGINT generated always as identity PRIMARY KEY, 
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE, 
    photo_id BIGINT REFERENCES photo_info(photo_id) ON DELETE CASCADE 
); 
 
-- Таблица загруженных файлов 
CREATE TABLE IF NOT EXISTS download_files ( 
    file_id BIGINT generated always as identity PRIMARY KEY, 
    name VARCHAR(255), 
    purchase_date DATE, 
    path VARCHAR(255), 
    user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE 
); 
 
-- Таблица комментариев 
CREATE TABLE IF NOT EXISTS comments ( 
    comments_id BIGINT generated always as identity PRIMARY KEY, 
    author_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE, 
    photo_id BIGINT REFERENCES photo_info(photo_id) ON DELETE CASCADE, 
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    value TEXT 
); 
 
-- Таблица категорий 
CREATE TABLE IF NOT EXISTS categories ( 
    category_id BIGINT generated always as identity PRIMARY KEY, 
    name VARCHAR(100) 
); 
 
-- Промежуточная таблица для категорий фотографий 
CREATE TABLE IF NOT EXISTS photo_category ( 
    id BIGINT PRIMARY generated always as identity KEY, 
    photo_id BIGINT REFERENCES photo_info(photo_id) ON DELETE CASCADE, 
    category_id BIGINT REFERENCES categories(category_id) ON DELETE CASCADE 
);


WITH values_to_insert AS (
    SELECT unnest(string_to_array('Пейзажи, Архитектура, Портреты, Макрофотография, Животные, Природа, Еда, События, Спорт, Мода, Технологии, Городская жизнь, Путешествия, Семья, Здоровье, Бизнес, Интерьеры, Абстракция, Праздники, Дети, Вода, Цветы, Искусство, Музыка, Автомобили, Ремесла, Микроскопия, Культура, Люди, Традиции, Астрономия, Солнце, Ночь, Улыбки, Эмоции, Океан, Снег, Осень, Лето, Весна, Зима, Выставки, Фотожурналистика, Редкие животные, Ветер, Современное искусство, Исторические места, Аллеи, Кофе, Завтраки, Десерты, Творческие мастерские, Наука, Психология, Здоровое питание, Волонтерство, Образование, Сельское хозяйство, Саморазвитие, Приключения, Друзья, Романтика, Пара, Кладбища, Человек и природа, Миграция, Горы, Огород, Туры, Отдых, Экотуризм, Кино, Цветная графика, Ретро, Самолеты, Промышленность, Строительство, Устойчивое развитие, Чудеса света, Сказочные места, Питомцы, Ностальгия, Изучение языков, Хобби, Спокойствие,', ',')) 
) 

insert into categories (name)
select * from values_to_insert;