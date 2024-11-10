# Wildberries Tariffs API Project

Проект предназначен для получения данных о тарифах с Wildberries API, их хранения в базе данных PostgreSQL и регулярной выгрузки данных в Google Sheets.

## Требования

- Node.js
- PostgreSQL
- Docker и Docker Compose
- Учетная запись Google Service Account для работы с Google Sheets API

## Установка

Клонируйте репозиторий:
git clone https://github.com/project.git

npm install

## Настройка файла окружения

GOOGLE*PROJECT_ID=ваш*идентификатор*проекта
GOOGLE_PRIVATE_KEY_ID=ваш*приватный*ключ
GOOGLE_PRIVATE_KEY="ваш*закрытый*ключ"
GOOGLE_CLIENT_EMAIL=ваш_email*клиента
GOOGLE*CLIENT_ID=ваш_id*клиента
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=пароль
DB_NAME=wb_db

### Запуск миграции

npx knex --knexfile src/config/knexfile.ts migrate:latest

### Чтобы откатить миграцию:

npx knex migrate:rollback --all --knexfile src/config/knexfile.ts

### Запуск

npx knex migrate:rollback --knexfile src/config/knexfile.ts

### Запуск с использованием Docker

docker-compose up --build

### Использование API

POST /wildberries/fetch-and-save: Запрашивает данные о тарифах у Wildberries API и сохраняет их в базу данных.
POST /google-sheets/export: Экспортирует данные из базы данных в указанные Google Sheets. Пример запроса:
{
"spreadsheetIds": ["<spreadsheetId1>", "<spreadsheetId2>", "<spreadsheetId3>"]
}
