import { Injectable } from "@nestjs/common";
import { ContentRepository } from "./content.repository";
import { ContentDto } from "./dto";
import { Content } from "@prisma/client";

// definindo que minha classe ContentService é um provider
@Injectable()
export class ContentService {
    constructor(private contentRepository: ContentRepository) { }

    getAll(): Promise<Content[]> {
        return this.contentRepository.getAll()
    }

    getById(id: number): Promise<Content> {
        return this.contentRepository.getById(id)
    }

    createContent(dto: ContentDto): Promise<Content> {
        return this.contentRepository.createContent(dto)
    }

    updateContent(id: number, dto: ContentDto): Promise<Content> {
        return this.contentRepository.updateContent(id, dto)
    }

    async deleteById(id: number,): Promise<void> {
        await this.contentRepository.deleteById(id)
    }

}

//assinatura do método
//método(parâmetro: tipo): tipo_retorno