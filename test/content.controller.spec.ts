import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { Content } from "@prisma/client";
import { suite, test } from "@testdeck/jest";
import { ContentController } from "src/contents/content.controller";
import { ContentRepository } from "src/contents/content.repository";
import { ContentService } from "src/contents/content.service";
import { PrismaService } from "src/prisma/prisma.service";

@suite
export class ContentControllerTest {
    private contentController
    private contentService
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
            ],
            controllers: [
                ContentController
            ]
        }).compile()

        this.contentController = module.get(ContentController)
        this.contentService = module.get(ContentService)
    }

    @test
    async '[findAll] should call content service'() {
        const serviceMethod = jest.spyOn(this.contentService, 'getAll').mockReturnValue(this.contents)
        await this.contentController.findAll()

        expect(serviceMethod).toHaveBeenCalled()
    }

    @test
    async '[getById] should call content service'() {
        const serviceMethod = jest.spyOn(this.contentService, 'getById').mockReturnValue(this.contents[0])
        await this.contentController.getById()

        expect(serviceMethod).toHaveBeenCalled()
    }

    @test
    async '[createContent] should call content service'() {
        const serviceMethod = jest.spyOn(this.contentService, 'createContent').mockReturnValue(this.contents[0])
        await this.contentController.createContent()

        expect(serviceMethod).toHaveBeenCalled()
    }

    @test
    async '[updateContent] should call content service'() {
        const serviceMethod = jest.spyOn(this.contentService, 'updateContent').mockReturnValue(this.contents[0])
        await this.contentController.updateContent()

        expect(serviceMethod).toHaveBeenCalled()
    }

    @test
    async '[deleteById] should call content service'() {
        const serviceMethod = jest.spyOn(this.contentService, 'deleteById').mockReturnValue(this.contents[0])
        await this.contentController.deleteById()

        expect(serviceMethod).toHaveBeenCalled()
    }
}