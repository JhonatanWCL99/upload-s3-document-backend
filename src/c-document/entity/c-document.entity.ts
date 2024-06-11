import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/user/entity/user.entity";

@Schema()
export class CDocument extends Document {

    @Prop({
        unique: true,
        index: true,
        required:true,
    })
    url: string;

    @Prop({
        index: true,
        default: Date.now,
    })
    createdAt: Date;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    })
    uploadedBy: User;
}

export const CDocumentSchema = SchemaFactory.createForClass(CDocument);