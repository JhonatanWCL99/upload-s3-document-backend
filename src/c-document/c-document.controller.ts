// src/document/document.controller.ts
import { Controller, Post, Body, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCDocumentDto } from './dto/create-c-document.dto';
import { CDocumentService } from './c-document.service';

@Controller('document')
export class CDocumentController {
    constructor(private readonly documentService: CDocumentService) { }

    @Post()
    @UseInterceptors(FileInterceptor('document'))
    async createDocument(
        @UploadedFile() document: Express.Multer.File,
        @Body('uploadedBy') uploadedBy
    ) {
        const createCDocumentDto = new CreateCDocumentDto();
        createCDocumentDto.document = document;
        createCDocumentDto.uploadedBy = uploadedBy;
        return this.documentService.createDocument(createCDocumentDto);
    }

    @Get()
    async getAllDocuments() {
        return this.documentService.getAllDocuments();
    }
}
