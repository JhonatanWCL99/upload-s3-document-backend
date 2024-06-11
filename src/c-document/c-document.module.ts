import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { CDocumentController } from './c-document.controller';
import { CDocument, CDocumentSchema } from './entity/c-document.entity';
import { CDocumentService } from './c-document.service';

@Module({
    controllers: [CDocumentController],
    providers: [CDocumentService],
    imports: [
        UserModule,
        MongooseModule.forFeature([
            {
                name: CDocument.name,
                schema: CDocumentSchema,
            }]),
    ],

})
export class CDocumentModule { }
