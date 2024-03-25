import { ApiProperty } from "@nestjs/swagger"

export class CreateProfileDto{
    @ApiProperty({example: 'unknown', description: "Gender of the user"})
    gender: string
    @ApiProperty({example: 'frontview', description: "photo of the user"}) 
    photo: string
}