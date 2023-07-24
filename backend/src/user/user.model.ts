import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Template } from "src/template/template.model";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ required: true })
    id: string

    @Prop({ required: true })
    access_token: string

    @Prop({ required: true })
    refresh_token: string

    @Prop({ required: true })
    subdomain: string

    @Prop({ required: true })
    code: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Template' }], default: [] })
    templates: Template[]

}

export const UserSchema = SchemaFactory.createForClass(User)