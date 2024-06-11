import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = await this.userModel.create(createUserDto);
            return user;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async findAll() {
        return await this.userModel.find().exec();
    }

    async findOne(id: string) {
        return await this.userModel.findById(id).exec();
    }

    private handleExceptions(error: any) {
        if (error.code === 11000) {
            throw new BadRequestException(`User exists in db ${JSON.stringify(error.keyValue)}`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Can't create User - Check server logs`);
    }

}