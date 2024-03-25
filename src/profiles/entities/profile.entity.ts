import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/users/entities/user.entity"
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    @ApiProperty({example: '1', description: "Unique id of the profile"}) 
    id: number

    @Column()
    @ApiProperty({example: 'unknown', description: "Gender of the user"}) 
    gender: string

    @Column()
    @ApiProperty({example: 'frontview', description: "photo of the user"}) 
    photo:string

    @OneToOne(()=> User, user => user.profile)
    user:User
}