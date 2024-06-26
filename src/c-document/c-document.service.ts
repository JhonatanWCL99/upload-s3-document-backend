
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateCDocumentDto } from './dto/create-c-document.dto';
import { CDocument } from './entity/c-document.entity';
import * as AWS from 'aws-sdk';


@Injectable()
export class CDocumentService {
    private readonly s3: AWS.S3;

    constructor(
        @InjectModel(CDocument.name)
        private documentModel: Model<CDocument>,
        private readonly userService: UserService
    ) {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
    }

    async createDocument(createCDocumentDto: CreateCDocumentDto): Promise<CDocument> {
        await this.validateUserExists(createCDocumentDto.uploadedBy);

        const url = await this.uploadFileToS3(createCDocumentDto.document);
        const newDocument = await this.documentModel.create({ ...createCDocumentDto, url });
        return newDocument;
    }

    async getAllDocuments(): Promise<CDocument[]> {
        return this.documentModel.find() .populate('uploadedBy', '_id fullName') .exec();
    }

    async uploadFileToS3(document: Express.Multer.File): Promise<string> {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `${Date.now().toString()}_${document.originalname}`,
            Body: document.buffer,
            ACL: 'public-read',
        };

        const data = await this.s3.upload(params).promise();

        return data.Location;
    }

    async validateUserExists(uploadedBy: string) {
        if (!isValidObjectId(uploadedBy)) {
            throw new BadRequestException(`El ID '${uploadedBy}' no es id válido`);
        }

        const user = await this.userService.findOne(uploadedBy);
        if (!user) {
            throw new BadRequestException(`El usuario con ID '${uploadedBy}' no existe.`);
        }
    }
}
