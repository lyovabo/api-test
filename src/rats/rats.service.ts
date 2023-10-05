import { Injectable, OnModuleInit } from '@nestjs/common';
import { Rat } from './interfaces/rat.interface';

@Injectable()
export class RatsService implements OnModuleInit {
  onModuleInit() {
    console.log('ratsService inited');
  }
  private readonly rats: Rat[] = [];

  create(rat: Rat) {
    this.rats.push(rat);
  }

  findAll(): Rat[] {
    return this.rats;
  }
}
