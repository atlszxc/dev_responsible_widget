import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './user.model';
import { Model } from 'mongoose';
import { QueueFactory } from 'src/template/queueTemplate.factory';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly queueFactory: QueueFactory
    ) {}

    public async gerUsersIds(): Promise<string[]> {
        const users = await this.userModel.find()
        return users.map(user => user.id)
    }

    public async getUser(id: string): Promise<UserDocument> {
        try {
            return await this.userModel.findOne({ id })
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getUserById(user: User) {
        return await this.userModel.findOne(user)
    }

    public async createUser(data: User): Promise<UserDocument> {
        try {
            const newUser = new this.userModel(data)
            this.queueFactory.add(newUser.id)
            return await newUser.save()
        } catch (error) {
            console.log(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async updateAccessTokens(subdomain: string, access_token: string, refresh_token: string): Promise<void> {
        try {
            await this.userModel.findOneAndUpdate({ subdomain }, {
                $set: {
                    access_token,
                    refresh_token,
                }
            })
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
