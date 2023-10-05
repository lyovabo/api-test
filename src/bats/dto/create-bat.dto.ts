import { IsString, IsNumber } from 'class-validator';

export class CreateBatDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;
}
