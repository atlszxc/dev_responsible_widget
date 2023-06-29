import { User } from "src/user/user.model";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Template } from "src/template/template.model";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    managerId: number

    @Column()
    name: string

    @Column()
    percent: number

    @Column()
    count: number

    @ManyToOne(() => User)
    user: User

    @ManyToMany(() => Template, template => template)
    @JoinTable()
    templates: Template[]
}