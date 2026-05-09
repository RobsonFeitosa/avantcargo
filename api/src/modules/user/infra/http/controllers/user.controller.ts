import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserResponseDto } from "../dtos/user-response.dto";
import { CreateUserUseCase } from "src/modules/user/application/create-user.use-case";
import { Public } from "src/shared/infra/http/decorators/public.decorator";

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
    ) { }

    @Public()
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserResponseDto })
    @ApiResponse({ status: 400, description: 'Internal validation error.' })
    @ApiResponse({ status: 409, description: 'User already exists.' })
    async createUser(@Body() payload: CreateUserDto) {
        return this.createUserUseCase.execute(payload);
    }
}