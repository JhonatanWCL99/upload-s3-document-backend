import { IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';
export class CreateCDocumentDto {
    @ApiProperty({
        description: 'El archivo del documento',
        type: 'string',
        format: 'binary',
    })
    @IsNotEmpty()
    document: Express.Multer.File;

    @ApiProperty({
        description: 'El id del usuario quien subio el archivo',
        example: '60d5ec49ebf1d70d888ac4f5',
    })
    @IsNotEmpty()
    @IsMongoId()
    uploadedBy: string;
}