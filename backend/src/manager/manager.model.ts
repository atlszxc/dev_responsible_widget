import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ManagerDocument = HydratedDocument<Manager>

@Schema()
export class Manager {
    @Prop({ required: true })
    managerId: number

    @Prop({ required: true, default: '' })
    templateId: string

    @Prop({ required: true })
    count: number

    @Prop()
    maxCount: number

    @Prop({ required: true })
    percent: number

    @Prop({ default: 0 })
    currentPercentCount: number

    @Prop()
    maxPercentCount: number
}

export const ManagerSchema = SchemaFactory.createForClass(Manager)