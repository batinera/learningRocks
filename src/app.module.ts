import { Module } from '@nestjs/common';
import { ContentModule } from './contents/content.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ContentModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  })]
})
export class AppModule { }
