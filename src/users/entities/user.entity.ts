import { ApiProperty } from "@nestjs/swagger"
import { Photo } from "src/photos/entities/photo.entity"
import { Profile } from "src/profiles/entities/profile.entity"
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({example: '1', description: "Unique id of the user"}) 
    id: number

    @Column({unique: true})
    @ApiProperty({example: 'user@example.com', description: "Email of the user"}) 
    username: string

    @Column()
    @ApiProperty({example: 'password', description: 'Password of the user'}) 
    password: string

    @Column()
    @ApiProperty({example: 'Mikko', description: 'Firstname of the user'}) 
    firstName: string

    @Column()
    @ApiProperty({example: 'Mallikas', description: 'Lastname of the user'}) 
    lastName:string

    @OneToOne(()=> Profile, profile => profile.user)
    @ApiProperty({example: 'gender and photo', description: 'Gender and photo of user'}) 
    @JoinColumn()
    profile?: Profile;

    @OneToMany(() => Photo, (photo) => photo.username)
    photos?: Photo[]
}