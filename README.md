# Goods Location

## Запуск

Для запуска необходим `docker compose`

```yarn local:up```
```yarn local:down```

## Swagger

http://localhost:4000/api/swagger


## Тесты (Команда выполняется при запущенной сборке)

```yarn test:e2e``` 

## Миграции

### Создание миграции

```yarn migration:create %MigrationName%```

### Выполнение миграций

```yarn migration:run```

### Отмена последней миграции

```yarn migration:revert```