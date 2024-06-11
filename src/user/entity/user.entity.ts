import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

    @Prop({
        unique: true,
        index: true,
    })
    fullName: string;

    @Prop({
        index: true,
        default: Date.now,
    })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);