# Backend development

* Enter the backend directory, install the python packages using poetry:

```bash
cd /project/backend/app
poetry install
```
## Setting up Postgres
This backend of this app will not start correctly if no db is configured.
Add exisiting postgres db info in config.py, either add URI directly or configure the following with config.py:
```
POSTGRES_SERVER = "host:port"
POSTGRES_USER = "postgres"
POSTGRES_PASSWORD = "password"
```

* Create a new database:
If you do not currently have a postgres db, create one (I recommend creating a postgres container in docker).
See [this](https://dev.to/andre347/how-to-easily-create-a-postgres-database-in-docker-4moj) for more info.

* Start backend using uvicorn:

```bash
uvicorn backend.app.app.main:app --reload
```
