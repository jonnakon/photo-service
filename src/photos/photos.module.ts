import { Module, forwardRef } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { Photo } from './entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';


@Module({
  imports: [TypeOrmModule.forFeature([Photo]), forwardRef(() => UsersModule), CategoriesModule],
  controllers: [PhotosController],
  providers: [PhotosService],
  exports:[PhotosService]
})
export class PhotosModule {}
