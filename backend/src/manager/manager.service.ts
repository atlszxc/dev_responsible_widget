import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Manager, ManagerDocument } from './manager.model';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(Manager.name) private readonly managerModel: Model<Manager>
    ) {}

    public async getManager(id: number, templateId: string): Promise<ManagerDocument> {
        return await this.managerModel.findOne({ managerId: id, templateId })
    }

    public async createManagers(data: Manager[]) {
        try {
            return await this.managerModel.insertMany(data)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    public async updateCount(managerId: number, templateId: ObjectId, count: number): Promise<void> {
        try {
            const manager = await this.managerModel.findOne({ managerId, templateId })
            manager.count = count
            await manager.save()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async updateMaxCount(managerId: number, templateId: ObjectId, count: number): Promise<void> {
        try {
            const manager = await this.managerModel.findOne({ managerId, templateId })
            manager.maxCount = count
            await manager.save()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async updateCurrentPercentCount(managerId: number, templateId: string): Promise<void> {
        try {
            await this.managerModel.findOneAndUpdate({ managerId, templateId }, {
                $inc: {
                    currentPercentCount: 1
                }
            })
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async updateMaxPercentCount(managerId: number, templateId: string, count: number): Promise<void> {
        try {
            const manager = await this.managerModel.findOne({ managerId, templateId })
            manager.maxPercentCount = count
            await manager.save()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async createManager(data: Manager): Promise<ManagerDocument> {
        try {
            const newManager = new this.managerModel(data)
            return await newManager.save()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
