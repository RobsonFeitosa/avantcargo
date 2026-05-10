import { Inject, Injectable } from "@nestjs/common";
import { User as UserDomain } from "../domain/entities/user.entity";
import type { UserRepository } from "../domain/repositories/user.repository";
import { CreateUserDto } from "../infra/http/dtos/create-user.dto";
import type IHashProvider from "../infra/providers/HashProvider/models/IHashProvider";
import { NameAlreadyExists } from "../domain/errors/name-already-exists";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('USER_REPOSITORY_TOKEN')
        private readonly userRepository: UserRepository,

        @Inject('HASH_PROVIDER_TOKEN')
        private readonly hashProvider: IHashProvider,
    ) { }

    public async execute(payload: CreateUserDto) {
        const checkUserExists = await this.userRepository.findByName(
            payload.name,
        )

        if (checkUserExists) {
            throw new NameAlreadyExists();
        }

        const hashedPassword = await this.hashProvider.generateHash(
            payload.password,
        )

        const { name, user_id, role } = payload

        const user = await this.userRepository.create(new UserDomain({
            id: user_id,
            name,
            role,
            password: hashedPassword,
        }))

        const newUser = user.toJSON();
        delete (newUser as any).password;

        return newUser;
    }
}