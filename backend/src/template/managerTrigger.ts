import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose'

export type ManagerTemplateDocument = HydratedDocument<managerTrigger>

@Schema()
export class managerTrigger {
    @Prop()
    triggerId: string

    @Prop()
    managerId: number

    @Prop()
    percent: number

    @Prop({ default: 0 })
    currentPercentCount: number

    @Prop({ default: 0 })
    count: number

    @Prop()
    maxCount: number
}

export const ManagerTriggerSchema = SchemaFactory.createForClass(managerTrigger)