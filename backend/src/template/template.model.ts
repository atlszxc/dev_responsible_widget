import { Manager } from "src/manager/manager.model";
import { User } from "src/user/user.model";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Template {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    alghoritm: string

    @Column()
    timeAcceptDeal: string

    @Column()
    rounds: number

    @ManyToOne(() => User)
    user: User

    @ManyToMany(() => Manager, managers => managers, { cascade: true })
    @JoinTable()
    managers: Manager[]
    
}