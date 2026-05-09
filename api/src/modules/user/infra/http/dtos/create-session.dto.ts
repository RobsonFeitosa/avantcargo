import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class CreateSessionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password: string;
}
