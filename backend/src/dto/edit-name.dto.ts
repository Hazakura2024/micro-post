import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EditNameDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name: string;
}
