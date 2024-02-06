import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    //usar variáveis do .env
                    url: 'postgresql://batinera:leo310410@localhost:5434/nest?schema=public'
                }
            }
        })
    }
}
