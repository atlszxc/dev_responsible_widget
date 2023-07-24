import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Manager } from "src/manager/manager.model";

export type TemplateDocument = HydratedDocument<Template>

type Trigger = {
    id: string,
    currentManagerIdx: number
}

@Schema()
export class Template {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    userId: string

    @Prop({ required: true })
    algorithm: string

    @Prop({ default: 0 })
    totalDealCount: number

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manager' }] })
    managers: Manager[]

    @Prop({ default: [] })
    triggers: Trigger[]

    @Prop({ default: '' })
    timeAcceptDeal: string

    @Prop({ default: 0 })
    rounds: number
}

export const TemplateSchema = SchemaFactory.createForClass(Template)