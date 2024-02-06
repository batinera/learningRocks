import { IsEnum, IsNotEmpty, IsString } from "class-validator"

// setando que meu type agora é um ContentType e que pode receber apenas 3 valores
enum contentType {
    video = 'video',
    pdf = 'pdf',
    image = 'image'
}

// exportando a classe e definindo o model pra validações de campos obrigatórios e os tipos (que no caso são strings)
export class ContentDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    @IsEnum(contentType)
    type: contentType
}