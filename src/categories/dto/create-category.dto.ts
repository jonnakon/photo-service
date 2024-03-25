import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoryDto{
    @ApiProperty({example: 'cat', description: "name of the category"}) 
    name: string
    @ApiProperty({example: 'cats', description: "description of the category"}) 
    description: string
}