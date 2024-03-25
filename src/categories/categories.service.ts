import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { In, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category) private categoriesRepository: Repository<Category>
    ){}

    async insertCategory(createCategoryDto: CreateCategoryDto): Promise<Category>{
        const category = new Category()
        category.name = createCategoryDto.name
        category.description = createCategoryDto.description
        return await this.categoriesRepository.save(category)
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoriesRepository.find()
    }

    async findCategoryByNameList(names:string[]): Promise<Category[]>{
        const categories = await this.categoriesRepository.find({where: {name: In(names)}})

        return categories
    }

}