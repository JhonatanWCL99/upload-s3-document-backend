import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { UserResponse } from './response/user-response';
import * as moment from 'moment-timezone';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userModel.create(createUserDto);

            const userResponse: UserResponse = {
                _id: newUser._id.toString(),
                fullName: newUser.fullName,
                createdAt: moment(newUser.createdAt).tz('America/La_Paz').format(),
            };

            return userResponse;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id).exec();

        const userResponse: UserResponse = {
            _id: user._id.toString(),
            fullName: user.fullName,
            createdAt: moment(user.createdAt).tz('America/La_Paz').format(),
        };

        return userResponse;
    }

    async findAll() {
        const users = await this.userModel.find().exec();

        return users.map(doc => ({
            _id: doc._id.toString(),
            fullName: doc.fullName,
            createdAt: moment(doc.createdAt).tz('America/La_Paz').format(),
        }));
    }

    private handleExceptions(error: any) {
        if (error.code === 11000) {
            throw new BadRequestException(`User exists in db ${JSON.stringify(error.keyValue)}`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Can't create User - Check server logs`);
    }

}