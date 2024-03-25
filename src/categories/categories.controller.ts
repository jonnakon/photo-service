import { Body, Controller, Post, Get, Put, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Post()
    @ApiOperation({summary:'create a new category'})
    @ApiCreatedResponse({
        description:'Category has been successfully created',       
        type: Category})
    @UseGuards(JwtAuthGuard)
    async createCategory(
        @Body() createCategoryDto:CreateCategoryDto
    ):Promise<Category>{
        return await this.categoriesService.insertCategory(createCategoryDto)
    }

    @Get()
    @ApiOperation({summary:'get categories'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'No categories found'})
    @UseGuards(JwtAuthGuard)
    async getCategories(): Promise<Category[]>{
        return await this.categoriesService.getCategories()
    }

}
