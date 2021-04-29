# Setup

```
docker exec -it postgres bash
psql -U postgres
```

```
CREATE USER authtesting WITH PASSWORD 'authtesting';
CREATE DATABASE authtesting OWNER authtesting ENCODING 'utf-8;'
```
