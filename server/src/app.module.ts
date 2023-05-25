import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HeroModule } from './hero/hero.module';

@Module({
  imports: [
    // налаштування модуля ServeStaticModule для сервірування статичних файлів.
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://qwerr19942017:Ij1fZm0UKgmlCCQT@cluster0.zf6vdpr.mongodb.net/?retryWrites=true&w=majority',
    ),
    HeroModule,
    FileModule,
  ],
})
export class AppModule {}
