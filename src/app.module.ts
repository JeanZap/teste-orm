import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note/note.entity';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '127.0.0.1',
      port: 1433,
      username: 'sa',
      password: 'reallyStrongPwd123',
      database: 'testeorm',
      options: {
        encrypt: false,
      },
      synchronize: true,
      entities: [Note],
    }),
    NoteModule,
  ],
})
export class AppModule {}
