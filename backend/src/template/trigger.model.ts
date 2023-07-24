import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TriggerDocument = HydratedDocument<Trigger>

@Schema()
export class Trigger {
    @Prop({ required: true })
    id: string

    @Prop({ required: true })
    templateId: string

    @Prop({ default: 0 })
    totalDeal: number

    @Prop({ default: 0 })
    currentQueueIdx: number
}

export const TriggerSchema = SchemaFactory.createForClass(Trigger)