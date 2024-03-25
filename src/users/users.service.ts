import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserWithEmbeddedProfileDto } from './dto/create-user-with-embedded-profile';
import { ProfilesService } from 'src/profiles/profiles.service';
import { PhotosService } from 'src/photos/photos.service';
import { Profile } from 'src/profiles/entities/profile.entity';




@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>, 
        @InjectRepository(Profile) private profilesRepository: Repository<Profile>,
        private readonly profilesService: ProfilesService,
        private photosService: PhotosService,
        ){}
    insertUser(createUserDto:CreateUserDto):Promise<User>{
        const user = new User()
        user.firstName = createUserDto.firstName
        user.lastName = createUserDto.lastName
        user.username = createUserDto.username
        user.password = createUserDto.password

        return this.usersRepository.save(user)
        
    }

    async insertUserWithEmbeddedProfile(createUserWithEmbeddedProfileDto: CreateUserWithEmbeddedProfileDto):Promise<User>{
        
        const profile = await this.profilesService.insertProfile(
            createUserWithEmbeddedProfileDto.profile.gender,
            createUserWithEmbeddedProfileDto.profile.photo
        )
        
        const user = new User()
        user.firstName = createUserWithEmbeddedProfileDto.firstName
        user.lastName = createUserWithEmbeddedProfileDto.lastName
        user.username = createUserWithEmbeddedProfileDto.username
        user.password = createUserWithEmbeddedProfileDto.password
        user.profile = profile
        console.log(`saving ${JSON.stringify(user)}`)

        return this.usersRepository.save(user)
        
    }

    async createFirstAdminUser(): Promise<User> {
        // Check if there are any users in the database, if not, create first admin user
        const existingUsers = await this.usersRepository.find()
        if (existingUsers.length === 0) {
            const adminUserDto: CreateUserWithEmbeddedProfileDto = {
                username: 'admin', 
                password: 'password',    
                firstName: 'Admin',
                lastName: 'User',
                profile: {
                    gender: 'unknown',
                    photo: 'unknown'
                }
                
          };console.log(`Admin user created. username: ${adminUserDto.username} password: ${adminUserDto.password} `)
      
            return this.insertUserWithEmbeddedProfile(adminUserDto)
        }
    
      }
    

    async getUsers(): Promise<User[]>{
        return await this.usersRepository.find({relations:["profile"]})
    }

    async findUserByUsername(username:string): Promise<User>{
        return await this.usersRepository.findOne({where: {username: username}})
    }

    async findUserById(id:string): Promise<User>{
        return await this.usersRepository.findOneBy({id: parseInt(id)})
    }

    async updateUser(id: string, updateUserDto: CreateUserWithEmbeddedProfileDto): Promise<User> {
        const user = await this.findUserById(id)

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`)
        }

        const profile = await this.profilesRepository.findOneBy({id: parseInt(id)})
        if (profile){
            profile.gender = updateUserDto.profile.gender || profile.gender
            profile.photo = updateUserDto.profile.photo || profile.photo
            await this.profilesRepository.save(profile)
        }

        user.firstName = updateUserDto.firstName || user.firstName
        user.lastName = updateUserDto.lastName || user.lastName
        user.username = updateUserDto.username || user.username
        user.password = updateUserDto.password || user.password

        await this.usersRepository.save(user)
        return (user)

    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.findUserById(id)

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`)
        }

        //first delete users photos
        await this.photosService.deletePhotosByUser(user)

        //then user
        await this.usersRepository.remove(user)
    }
}
