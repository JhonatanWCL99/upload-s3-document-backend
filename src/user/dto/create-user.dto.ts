import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Pepe Gonzales',
  })
  @IsNotEmpty()
  fullName: string;
}