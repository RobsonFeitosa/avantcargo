import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsIn, IsOptional } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    password: string;

    @ApiProperty({ example: 'uuid-1234', description: 'The user ID' })
    @IsString()
    @IsOptional()
    user_id?: string;

    @ApiPropertyOptional({ example: 'customer', description: 'The role of the user', enum: ['customer', 'shopkeeper'] })
    @IsString()
    @IsIn(['customer', 'shopkeeper'])
    @IsOptional()
    role?: 'customer' | 'shopkeeper' = 'customer';
}