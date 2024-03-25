import { ApiProperty } from "@nestjs/swagger"

export class CreateUserWithEmbeddedProfileDto{
    @ApiProperty({example: 'user@example.com', description: "Email of the user"}) 
    username: string

    @ApiProperty({example: 'password', description: 'Password of the user'}) 
    password: string

    @ApiProperty({example: 'Mikko', description: 'Firstname of the user'}) 
    firstName: string

    @ApiProperty({example: 'Mallikas', description: 'Lastname of the user'}) 
    lastName: string

    @ApiProperty({example: '{"gender": "unknown", "photo":"frontview"}', description: 'Gender and photo of user'}) 
    profile: {
        gender: string
        photo: string
    }
}