import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { PhotosModule } from 'src/photos/photos.module';
import { Profile } from 'src/profiles/entities/profile.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Profile]), ProfilesModule, forwardRef(() => PhotosModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService] 
})
export class UsersModule {}
