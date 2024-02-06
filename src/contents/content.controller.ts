import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, HttpCode, Put, UseGuards } from "@nestjs/common";
import { ContentService } from "./content.service";
import { ContentDto } from "src/contents/dto";
import { Content } from "@prisma/client";
//import { Roles } from "src/roles/roles";
//import { Role } from "src/roles/role.enum";
//import { RolesGuard } from "src/roles/role.guard";
import { Tokens } from "src/tokens/tokens";
import { Token } from "src/tokens/token.enum";
import { TokensGuard } from "src/tokens/token.guard";

@UseGuards(TokensGuard)
@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService) { }

    @Post('createContent')
    @Tokens(Token.admin)
    // recebe a requisição, valida o body no meu DTO que é do tipo ContentDto e chama o método createContent que é do meu contentService
    createContent(@Body() dto: ContentDto): Promise<Content> {
        return this.contentService.createContent(dto)
    }

    @Get('getAll')
    @Tokens(Token.admin, Token.student)
    // recebe a requisição e chama o método de getAll do meu contentService
    findAll(): Promise<Content[]> {
        return this.contentService.getAll()
    }

    @Get(':id')
    @Tokens(Token.admin, Token.student)
    // recebe a requisição e chama o método getById do meu contentService
    getById(@Param('id', ParseIntPipe) id: number): Promise<Content> {
        return this.contentService.getById(id)
    }

    //@HttpCode(204)
    @Delete(':id')
    @Tokens(Token.admin)
    deleteById(@Param('id', ParseIntPipe) id: number): Promise<Content> {
        return this.contentService.deleteById(id)
    }

    @Put(':id')
    @Tokens(Token.admin)
    updateContent(@Param('id', ParseIntPipe) id: number, @Body() dto: ContentDto): Promise<Content> {
        return this.contentService.updateContent(id, dto)
    }
}