import { DataSource } from 'typeorm';
import { Book } from './book/book.entity';  // Make sure to import your entities
import { BookCopies } from './book/book-copy.entity';  // Similarly import other entities

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 3306, // use the actual port
  username: 'root',
  password: 'root',
  database: 'books_reservation',
  entities: [Book, BookCopies],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false,
});
