import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { BookCopies } from './book-copy.entity';
import { Category } from '../category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category,BookCopies])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
