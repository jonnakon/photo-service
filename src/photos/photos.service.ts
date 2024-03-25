import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';


@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(Photo) private photosRepository: Repository<Photo>,
        @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
        private categoriesService: CategoriesService
    ){}

    async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const user = await this.usersService.findUserByUsername(createPhotoDto.username)

        if(!user){
            throw new NotFoundException("User not found!")
        }
        console.log(`insertPhoto user found ${user.username}`)

        const categoryNames:string[] = createPhotoDto.categories
        const existingCategories = await this.categoriesService.findCategoryByNameList(categoryNames)

        const newCategoryNames = categoryNames.filter((name) => !existingCategories.some((category) => category.name ===name))
        const createdCategories: Category[] = [];
        for(const newCategoryName of newCategoryNames){
                const createCategoryDto ={
                    name: newCategoryName,
                    description: ''
                }
            
                const createdCategory = await this.categoriesService.insertCategory(createCategoryDto);
                createdCategories.push(createdCategory);
        }


        const photo = new Photo()
        photo.name = createPhotoDto.name
        photo.description = createPhotoDto.description
        photo.url = createPhotoDto.url
        photo.username = user
        photo.categories = [...existingCategories, ...createdCategories];

        return await this.photosRepository.save(photo)

    }


    async findPhotoById(id:string): Promise<Photo>{
          return await this.photosRepository.findOneBy({id: parseInt(id)})
    }

    async getPhotos(): Promise<Photo []>{
        return this.photosRepository.find({relations:["username", "categories"]})
    }

    async updatePhoto(id: string, updatePhotoDto:CreatePhotoDto): Promise<Photo> {
        const photo = await this.findPhotoById(id)

        if(!photo){
            throw new NotFoundException(`Photo with id ${id} not found!`)
        }

        photo.name = updatePhotoDto.name || photo.name
        photo.description = updatePhotoDto.description || photo.description
        photo.url = updatePhotoDto.url || photo.url
        return await this.photosRepository.save(photo)
    }

    async deletePhoto(id:string): Promise<void>{
        const photo = await this.findPhotoById(id)

        if (!photo) {
            throw new NotFoundException(`Photo with id ${id} not found`)
        }

        await this.photosRepository.remove(photo)
  
    }

    async deletePhotosByUser(user: User): Promise<void> {
        const photos = await this.photosRepository.find({ where: { username: user } })
        await this.photosRepository.remove(photos)
      }

}
