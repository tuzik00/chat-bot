docker run -d \
--name some-postgres \
-e POSTGRES_DB=test \
-e POSTGRES_USER=admin \
-e POSTGRES_PASSWORD=admin \
-p 5432:5432 \
postgres
