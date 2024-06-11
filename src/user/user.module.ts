import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entity/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            }
        ])
    ]
})

export class UserModule { }