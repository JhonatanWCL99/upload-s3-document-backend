import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCDocumentDto {
    @IsNotEmpty()
    document: Express.Multer.File;

    @IsNotEmpty()
    @IsMongoId()
    uploadedBy: string;
}