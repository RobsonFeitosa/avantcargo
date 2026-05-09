import { Inject, Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import type { UserRepository } from "../domain/repositories/user.repository";
import { CreateSessionDto } from "../infra/http/dtos/create-session.dto";
import authConfig from './../../../config/auth'
import { sign } from 'jsonwebtoken'
import type IHashProvider from "../infra/providers/HashProvider/models/IHashProvider";

@Injectable()
export class AuthenticateUserUseCase {
    constructor(
        @Inject('USER_REPOSITORY_TOKEN')
        private readonly userRepository: UserRepository,

        @Inject('HASH_PROVIDER_TOKEN')
        private readonly hashProvider: IHashProvider,
    ) { }

    async execute({ name, password }: CreateSessionDto) {
        const user = await this.userRepository.findByName(name);

        if (!user) {
            throw new UnauthorizedException('Incorrect name/password combination.');
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if (!passwordMatched) {
            throw new UnauthorizedException('Incorrect name/password combination.');
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign(
            {},
            secret as string,
            {
                subject: user.id,
                expiresIn,
            }
        );

        const newUser = user.toJSON();

        // @ts-ignore
        delete newUser.password;

        return {
            user: newUser,
            token,
        };
    }
}
