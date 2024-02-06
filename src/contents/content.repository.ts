import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ContentDto } from "./dto";
import { Content } from "@prisma/client";

// definindo minha classe como um provider
@Injectable()
export class ContentRepository {
    // injetando meu PrismaService no construtor
    constructor(private prismaService: PrismaService) { }
    /* método(parâmetro:tipo): tipo_de_retorno -> método que cria o conteúdo, pegando o parâmetro do dto que é do tipo ContentDto
    e que está esperando uma Promise do tipo content */
    async createContent(dto: ContentDto): Promise<Content> {

        // save the new content in the db

        try {
            // const content inserindo informações do objeto data no banco através do método .create do Prisma
            const content = await this.prismaService.content.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                    type: dto.type
                },
                // response da API
                select: {
                    id: true,
                    name: true,
                    description: true,
                    type: true,
                    createdAt: true,
                    updatedAt: true
                }
            })

            // return the saved content
            return content
        } catch (error) {
            throw new BadRequestException('Invalid data provided')
        }
    }

    async getAll(): Promise<Content[]> {
        try {
            const contents = await this.prismaService.content.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    type: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
            return contents
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('Contents not found')
            } else {
                throw new BadRequestException('Invalid data provided')
            }
        }

    }

    //adicionar try-catch
    async getById(id: number): Promise<Content | null> {
        const content = await this.prismaService.content.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                description: true,
                type: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if(!content) {
            throw new NotFoundException(`Content with ID ${id} not found`)
        }
        return content
    }

    // validar se faz sentido manter 204 ou 200 com corpo
    async deleteById(id: number): Promise<Content> {
        try {
            const deletedContent = await this.prismaService.content.delete({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    type: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
            return deletedContent
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('Content not found')
            } else {
                throw new BadRequestException('Invalid data provided')
            }
        }
    }

    // adicionar try-catch
    async updateContent(id: number, dto: ContentDto): Promise<Content> {
        const existingContent = await this.prismaService.content.findUnique({
            where: {
                id: id
            }
        })

        if (!existingContent) {
            throw new NotFoundException('Content not found')
        }

        const updatedContent = await this.prismaService.content.update({
            where: {
                id: id
            },
            data: {
                name: dto.name,
                description: dto.description,
                type: dto.type
            },
            select: {
                id: true,
                name: true,
                description: true,
                type: true,
                createdAt: true,
                updatedAt: true
            }
        })
        return updatedContent
    }
}
