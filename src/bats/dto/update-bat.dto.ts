import { IsString, IsNumber, IsOptional } from 'class-validator';
export class UpdateBatDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  breed: string;
}
