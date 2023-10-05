import { Injectable } from '@nestjs/common';


@Injectable()
export class AuthenticationService {

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }
}
