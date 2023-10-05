import { Injectable } from '@nestjs/common';
import { Bat } from './interfaces/bat.interface';

@Injectable()
export class BatsService {
  private readonly bats: Bat[] = [];

  create(bat: Bat) {
    this.bats.push(bat);
  }

  findAll(): Bat[] {
    return this.bats;
  }
}
