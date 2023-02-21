import { DataSource } from 'typeorm';

export default async function db(entities = []): Promise<DataSource> {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: entities,
    synchronize: true,
    logging: false,
  });

  return await AppDataSource.initialize();
}
