import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column( {length: 50, nullable: true, unique: true} )
    firstName: string;    
    
    @Column( {length: 50, nullable: true} )
    lastName: string;

}
