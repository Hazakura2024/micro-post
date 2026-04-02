import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  message: string;
}
