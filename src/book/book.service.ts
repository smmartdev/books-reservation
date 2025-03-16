import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { BookCopies } from './book-copy.entity';
import { Category } from './CategoryEnum';


@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(BookCopies)
    private readonly bookCopiesRepository: Repository<BookCopies>,
    
  ) { }

  async findAll(): Promise<Book[]> {
    console.log("findAll called in book service")
    return this.booksRepository.find();

  }

  
  async findBooksByCategory(category: Category): Promise<Book[]> { 
    return this.booksRepository.find({
      where: { category }, // Directly compare the category string
    });
  }
  

  async findBookById(id: number): Promise<Book | null> {
    return this.booksRepository.findOne({
      where: { id },
    });
  }

  async getBookCopies(bookId: number): Promise<BookCopies[]> {
    return this.bookCopiesRepository.find({
      where: { book: { id: bookId } },
      relations: ['book'],
    });
  }

  async searchBooks(query: string): Promise<Book[]> {
    return this.booksRepository
      .createQueryBuilder('book')
      .where('book.title LIKE :query OR book.author LIKE :query', { query: `%${query}%` })
      .leftJoinAndSelect('book.copies', 'copies')
      .getMany();
  }



}
