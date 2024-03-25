import { ApiProperty } from "@nestjs/swagger"

export class CreatePhotoDto {
    @ApiProperty({example: 'cat', description: "name of the photo"}) 
    name: string

    @ApiProperty({example: 'my lovely cat', description: "description of th e photo"}) 
    description: string

    @ApiProperty({example: 'url-to-the-cat', description: "url to the photo"}) 
    url: string

    @ApiProperty({example: 'mikko.mallikas@gmail.com', description: "owner of the photo"}) 
    username: string
    
    @ApiProperty({example: '[animal, cat]', description: "categories for the photo"}) 
    categories: string[]
}