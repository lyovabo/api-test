import { IsString, Max, Min } from 'class-validator';
export class CreateRegistrationDto {
  @IsString()
  @Min(5)
  @Max(15)
  public username: string;

  @IsString()
  @Min(8)
  @Max(20)
  public password: string;

  @IsString()
  @Min(2)
  @Max(50)
  public email: string;
}
