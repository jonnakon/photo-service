
import { ApiProperty } from "@nestjs/swagger"
import { Photo } from "src/photos/entities/photo.entity"
import { Column, Entity,  ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    @ApiProperty({example: '1', description: "unique id of the category"}) 
    id: number

    @Column()
    @ApiProperty({example: 'cat', description: "name of the category"}) 
    name: string

    @Column()
    @ApiProperty({example: 'cats', description: "description of the category"}) 
    description:string

    @ManyToMany(() => Photo, (photo) => photo.categories)
    photos:Photo[]

}