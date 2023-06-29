import { Manager } from "src/manager/manager.model";
import { Template } from "src/template/template.model";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: string

    @Column()
    access_token: string

    @Column()
    refresh_token: string

    @Column()
    expires_in: number

    @Column()
    subdomine: string

    @Column()
    name: string

    @OneToMany(() => Template, template => template)
    templates: Template[]

    @OneToMany(() => Manager, manager => manager)
    managers: Manager[]
}