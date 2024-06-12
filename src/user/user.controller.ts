import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from "./entity/user.entity";
@ApiTags('Usuario')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Listado de usuarios' })
    @ApiResponse({ status: 200, description: 'Listado de usuarios.', type: [User] })
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Devuelve el usuario registrado.', type: User })
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
}