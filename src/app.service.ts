import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  obterUsuario(): string {
    return 'Hello World!';
  }
}
