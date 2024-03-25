import { Body, Controller, Get, Param, Post, Put, UseGuards, Delete, NotFoundException } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('photos')
export class PhotosController {
    constructor(private photosService: PhotosService) {}

    @Post()
    @ApiOperation({summary:'add a new photo'})
    @ApiCreatedResponse({
        description:'Photo has been successfully added',       
        type: Photo})
    async createPhotoUsingEmail(
        @Body() createPhotoDto:CreatePhotoDto
    ):Promise<Photo>{
        return await this.photosService.insertPhoto(createPhotoDto)
    }

    @Get()
    @ApiOperation({summary:'get all photos'})
    @ApiResponse({status: 200, description: 'OK'})
    @UseGuards(JwtAuthGuard)
    async getPhotos(): Promise<Photo[]>{
        return await this.photosService.getPhotos()
    }

    @Put(':id')
    @ApiOperation({summary:'Update photo'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'Matching id not found'})
    @UseGuards(JwtAuthGuard)
    async updatePhoto(@Param('id') id: string, @Body() updatePhotoDto: CreatePhotoDto): Promise<Photo> {
        return await this.photosService.updatePhoto(id, updatePhotoDto);
        
    }

    @Delete(':id')
    @ApiOperation({summary:'Delete photo'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 204, description: 'Matching id not found'})
    @UseGuards(JwtAuthGuard)
    async deletePhoto(@Param('id') id: string): Promise<string> {
        try {
            await this.photosService.deletePhoto(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`Photo with id ${id} not found`);
            }
            throw error;
        }
        return `Photo with id: ${id} deleted`
    }
}
