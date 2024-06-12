import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
    @ApiProperty({
        description: 'Nombre completo del usuario',
    })
    @Prop({
        unique: true,
        index: true,
    })
    fullName: string;

    @ApiProperty({
        description: 'Fecha cuando se creo el usuario',
    })
    @Prop({
        index: true,
        default: Date.now,
    })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);