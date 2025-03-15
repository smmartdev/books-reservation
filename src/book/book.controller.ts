import { Controller, Get, Param, Query } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(@Query('category') category?: string, @Query('search') search?: string) {
    if (category) return this.bookService.findBooksByCategory(category);
    if (search) return this.bookService.searchBooks(search);
    return this.bookService.findAll();
  }

  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return this.bookService.findById(id);
  }

  @Get(':id/copies')
  async getBookCopies(@Param('id') bookId: number) {
    return this.bookService.getBookCopies(bookId);
  }
}