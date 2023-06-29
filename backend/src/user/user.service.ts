import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { ManagerService } from 'src/manager/manager.service';
import { IUser } from './user.type';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    getUsers = async () => {
        return await this.userRepository.find()
    }

    getUser = async (id: string) => {
        return await this.userRepository.findOne({ where: { id } })
    }

    createUser = async (data: IUser) => {
        const user = await this.userRepository.save(data)
        return user
    }

    updateUserToken = async (subdomine: string, access_token: string, refresh_token: string) => {
        await this.userRepository.update({ subdomine }, {
            access_token,
            refresh_token
        })
    }
}
