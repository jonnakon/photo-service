import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto{
    @ApiProperty({example: 'user@example.com', description: "Email of the user"}) 
    username: string
    
    @ApiProperty({example: 'password', description: 'Password of the user'}) 
    password: string

    @ApiProperty({example: 'Mikko', description: 'Firstname of the user'}) 
    firstName: string
    
    @ApiProperty({example: 'Mallikas', description: 'Lastname of the user'}) 
    lastName: string
}