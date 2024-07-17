// src/document/document.controller.ts
import { Controller, Post, Body, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCDocumentDto } from './dto/create-c-document.dto';
import { CDocumentService } from './c-document.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { CDocument } from './entity/c-document.entity';
@ApiTags('Documento')
@Controller('document')
export class CDocumentController {
    constructor(private readonly documentService: CDocumentService) { }

    @ApiOperation({ summary: 'Crear un nuevo documento' })
    @ApiResponse({ status: 201, description: 'Devuelve el documento creado.', type: CDocument })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: CreateCDocumentDto })
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

    @ApiOperation({ summary: 'Listado de los documentos' })
    @ApiResponse({ status: 200, description: 'Listado de los documentos.', type: [CDocument] })
    @Get()
    async getAllDocuments() {
        return this.documentService.getAllDocuments();
    }
}
