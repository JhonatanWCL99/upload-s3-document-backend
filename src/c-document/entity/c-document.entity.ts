import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/user/entity/user.entity";
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class CDocument extends Document {
    @ApiProperty({
        description: 'URL donde esta almacenado el documento',
    })
    @Prop({
        unique: true,
        index: true,
        required: true,
    })
    url: string;

    @ApiProperty({
        description: 'Fecha cuando se creo el documento',
    })
    @Prop({
        index: true,
        default: Date.now,
    })
    createdAt: Date ;

    @ApiProperty({
        description: 'Usuario quien registro el documento',
        type: () => User
    })
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    uploadedBy: User;
}

export const CDocumentSchema = SchemaFactory.createForClass(CDocument);