{
  "type": "mysql",
  "host": "authdb",
  "port": 3306,
  "username": "root",
  "password": "grocery123",
  "database": "auth",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": false,
  "cli": {
    "migrationsDir": "src/migrations"
  }
}