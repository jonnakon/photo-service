import { Body, Controller, Get, NotFoundException, Param, Post, Put, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserWithEmbeddedProfileDto } from './dto/create-user-with-embedded-profile';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post()
    @ApiOperation({summary:'create a new user'})
    @ApiCreatedResponse({
        description:'user has been successfully created',       
        type: User})
    async createUserWithEmbeddedProfile(@Body() createUserWithEmbeddedProfileDto: CreateUserWithEmbeddedProfileDto): Promise<User> {
        console.log(`createUserWithEmbeddedProfileDto: ${JSON.stringify(createUserWithEmbeddedProfileDto)}`)
        return await this.usersService.insertUserWithEmbeddedProfile(createUserWithEmbeddedProfileDto)

    }

    @Get()
    @ApiOperation({summary:'get users'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'Users not found'})
    @UseGuards(JwtAuthGuard)
    async getUsers(): Promise<User[]>{
        return await this.usersService.getUsers()
    }
    
    @Put(':id')
    @ApiOperation({summary:'Update user'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 404, description: 'Matching id not found'})
    @UseGuards(JwtAuthGuard)
    async updateUser(
        @Param('id') id: string, 
        @Body() updateUserDto: CreateUserWithEmbeddedProfileDto) {
        return await this.usersService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    @ApiOperation({summary:'Delete user'})
    @ApiResponse({status: 200, description: 'OK'})
    @ApiResponse({status: 204, description: 'Matching id not found'})
    @UseGuards(JwtAuthGuard)
    async deleteUser(@Param('id') id: string): Promise<string> {
        try {
            await this.usersService.deleteUser(id)
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`User with id ${id} not found`)
            }
            throw error;
        }
        return `User with id: ${id} deleted`
    }
}
