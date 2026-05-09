import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserController } from './infra/http/controllers/user.controller';
import { CreateUserUseCase } from './application/create-user.use-case';
import { User } from './domain/entities/user.entity';
import { TypeOrmUserRepository } from './infra/database/repositories/typeorm-user.repository';
import { AuthenticateUserUseCase } from './application/authenticate-user.use-case';
import { AuthenticateUserController } from './infra/http/controllers/authenticate-user.controller';
import BCryptHashProvider from './infra/providers/HashProvider/implementations/BCryptHashProvider';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UserController, AuthenticateUserController],
    providers: [
        CreateUserUseCase, 
        AuthenticateUserUseCase,

        {
            provide: 'USER_REPOSITORY_TOKEN',
            useFactory: (ormRepo: Repository<User>) => new TypeOrmUserRepository(ormRepo),
            inject: [getRepositoryToken(User)],
        },

        {
            provide: 'HASH_PROVIDER_TOKEN',
            useClass: BCryptHashProvider,
        },
    ],
    exports: ['USER_REPOSITORY_TOKEN', 'HASH_PROVIDER_TOKEN']
})
export class UserModule { }