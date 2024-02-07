import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { Content } from "@prisma/client";
import { suite, test } from "@testdeck/jest";
import { ContentRepository } from "src/contents/content.repository";
import { ContentService } from "src/contents/content.service";
import { PrismaService } from "src/prisma/prisma.service";

@suite
export class ContentServiceTest {
    private contentService
    private contentRepository
    private contents = [{
        id: 1
    } as Content]

    async before() {
        const module = await Test.createTestingModule({
            providers: [
                ContentService, ContentRepository, PrismaService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('learningRocks'),
                    },
                },
            ]
        }).compile()

        this.contentService = module.get(ContentService)
        this.contentRepository = module.get(ContentRepository)
    }

    @test
    async '[getAll] should call content repository'() {
        const repositoryMethod = jest.spyOn(this.contentRepository, 'getAll').mockReturnValue(this.contents)
        await this.contentService.getAll()

        expect(repositoryMethod).toHaveBeenCalled()
    }

    @test
    async '[getById] should call content repository'() {
        const repositoryMethod = jest.spyOn(this.contentRepository, 'getById').mockReturnValue(this.contents[0])
        await this.contentService.getById()

        expect(repositoryMethod).toHaveBeenCalled()
    }

    @test
    async '[createContent] should call content repository'() {
        const repositoryMethod = jest.spyOn(this.contentRepository, 'createContent').mockReturnValue(this.contents[0])
        await this.contentService.createContent()

        expect(repositoryMethod).toHaveBeenCalled()
    }

    @test
    async '[updateContent] should call content repository'() {
        const repositoryMethod = jest.spyOn(this.contentRepository, 'updateContent').mockReturnValue(this.contents[0])
        await this.contentService.updateContent()

        expect(repositoryMethod).toHaveBeenCalled()
    }

    @test
    async '[deleteById] should call content repository'() {
        const repositoryMethod = jest.spyOn(this.contentRepository, 'deleteById').mockReturnValue(this.contents[0])
        await this.contentService.deleteById()

        expect(repositoryMethod).toHaveBeenCalled()
    }
}