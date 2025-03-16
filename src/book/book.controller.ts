import { Controller, Get, Param, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Category } from './CategoryEnum';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetBooksDto } from './dto/get-books.dto';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Books list retreived successfully' })
  @ApiResponse({ status: 404, description: 'No books found' })
  // @ApiBody({ type: LoginDto }) // Enables Swagger testing
  async getBooks(@Query() query: GetBooksDto) {
    const { category, search } = query;
    if (category) return this.bookService.findBooksByCategory(category);
    if (search) return this.bookService.searchBooks(search);
    return this.bookService.findAll();
  }



  @Get(':id')
  @ApiOperation({ summary: 'Get book details by ID' }) // Describes the endpoint
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Book ID' }) // Documents the `id` param
  @ApiResponse({ status: 200, description: 'Book retrieved successfully' }) // Success response
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid book ID format' }) // Invalid request
  @ApiResponse({ status: 404, description: 'Book not found' }) // Not found error
  async getBookById(@Param('id') id: number) {
    return this.bookService.findBookById(id);
  }

  @Get(':id/copies')
  async getBookCopies(@Param('id') bookId: number) {
    return this.bookService.getBookCopies(bookId);
  }
}