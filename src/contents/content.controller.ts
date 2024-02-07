import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, HttpCode, Put, UseGuards } from "@nestjs/common";
import { ContentService } from "./content.service";
import { ContentDto } from "src/contents/dto";
import { Content } from "@prisma/client";
import { Auths } from "src/auth/auths";
import { Auth } from "src/auth/auth.enum";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService) { }

    @Get('getAll')
    @Auths(Auth.admin, Auth.student)
    // recebe a requisição e chama o método de getAll do contentService
    findAll(): Promise<Content[]> {
        return this.contentService.getAll()
    }

    @Get(':id')
    @Auths(Auth.admin, Auth.student)
    // recebe a requisição e chama o método getById do contentService
    getById(@Param('id', ParseIntPipe) id: number): Promise<Content> {
        return this.contentService.getById(id)
    }

    @Post('createContent')
    @Auths(Auth.admin)
    // recebe a requisição, valida o body no meu DTO que é do tipo ContentDto e chama o método createContent do contentService
    createContent(@Body() dto: ContentDto): Promise<Content> {
        return this.contentService.createContent(dto)
    }

    @Put(':id')
    @Auths(Auth.admin)
    // recebe a requisição, valida o body no meu DTO que é do tipo ContentDto e chama o método de updateContent do contentService
    updateContent(@Param('id', ParseIntPipe) id: number, @Body() dto: ContentDto): Promise<Content> {
        return this.contentService.updateContent(id, dto)
    }

    @Delete(':id')
    @HttpCode(204)
    @Auths(Auth.admin)
    // recebe a requisição, valida o parâmetro passado e chama o método de deleteById do contentService
    async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.contentService.deleteById(id)
    }
}