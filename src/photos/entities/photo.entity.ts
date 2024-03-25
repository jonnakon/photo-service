import { ApiProperty } from "@nestjs/swagger"
import { Category } from "src/categories/entities/category.entity"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Photo{
    @PrimaryGeneratedColumn()
    @ApiProperty({example: '1', description: "unique id of the user"}) 
    id: number

    @Column()
    @ApiProperty({example: 'cat', description: "name of the photo"}) 
    name: string

    @Column()
    @ApiProperty({example: 'my lovely cat', description: "description of th e photo"}) 
    description:string

    @Column()
    @ApiProperty({example: 'url-to-the-cat', description: "url to the photo"}) 
    url: string

    @ManyToOne(() => User, (user) => user.photos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'username' })
    @ApiProperty({type: () => User, example: 'mikko.mallikas@gmail.com', description: "owner of the photo"}) 
    username: User

    @ManyToMany(() => Category, (category) => category.photos, {cascade:true}) 
    @JoinTable()
    @ApiProperty({type: () => Category,example: '[animal, cat]', description: "categories for the photo"}) 
    categories: Category[]
}