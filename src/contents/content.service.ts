import { Injectable } from "@nestjs/common";
import { ContentRepository } from "./content.repository";
import { ContentDto } from "./dto";
import { Content } from "@prisma/client";

// definindo que minha classe ContentService é um provider
@Injectable()
export class ContentService {
    // injetando meu ContentRepository no construtor
    constructor(private contentRepository: ContentRepository) { }
    /* método(parâmetro:tipo): tipo_de_retorno*/
    createContent(dto: ContentDto): Promise<Content> {
        return this.contentRepository.createContent(dto)
    }

    getAll(): Promise<Content[]> {
        return this.contentRepository.getAll()
    }

    getById(id: number): Promise<Content> {
        return this.contentRepository.getById(id)
    }

    deleteById(id: number,): Promise<Content> {
        return this.contentRepository.deleteById(id)
    }

    updateContent(id: number, dto: ContentDto): Promise<Content> {
        return this.contentRepository.updateContent(id, dto)
    }

}


//assinatura do método
//método(parâmetro: tipo): tipo_retorno