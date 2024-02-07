import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ContentDto } from "./dto";
import { Content } from "@prisma/client";

// definindo que minha classe ContentRepository é um provider
@Injectable()
export class ContentRepository {
    constructor(private prismaService: PrismaService) { }

    // GET
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
            throw new BadRequestException('Failed to retrieve contents')
        }
    }

    // GET by ID
    async getById(id: number): Promise<Content | null> {
        try {
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

            if (!content) {
                throw new NotFoundException(`Content with ID ${id} not found`)
            }
            return content
        } catch (error) {
            throw new BadRequestException('Failed to retrieve contents')
        }
    }

    // POST content
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
            throw new BadRequestException('Failed to retrieve contents')
        }
    }

    // PUT by ID all content
    async updateContent(id: number, dto: ContentDto): Promise<Content> {

        try {
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
        } catch (error) {
            throw new BadRequestException('Failed to retrieve contents')
        }
    }

    // DELETE content by ID
    async deleteById(id: number): Promise<void> {
        try {
            await this.prismaService.content.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new BadRequestException('Failed to retrieve contents')
        }
    }
}