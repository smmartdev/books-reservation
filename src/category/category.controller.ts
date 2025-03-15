import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.findAll();
  }
}
