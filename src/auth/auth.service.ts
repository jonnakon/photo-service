import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService){}

    async validateUser(username:string, password:string): Promise<User>{
        const user = await this.usersService.findUserByUsername(username)

        if(user && user.password === password){
            const result = {
                id: user.id,
                username: user.username,
                password: "",
                firstName: user.firstName,
                lastName: user.lastName
            }
            return result
        }
        return null
    }
    async login(user: User){
        const payload = {username: user.username, sub: user.id}
        return {accessToken: this.jwtService.sign(payload)}
    }
}
