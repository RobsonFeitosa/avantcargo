import { NameAlreadyExists } from "../domain/errors/name-already-exists";
import { UserRepository } from "../domain/repositories/user.repository";
import { CreateUserUseCase } from "./create-user.use-case";

describe('CreateUserUseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let userRepository: jest.Mocked<UserRepository>;
    let hashProvider: any;

    beforeEach(() => {
        userRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        } as any;

        hashProvider = {
            generateHash: jest.fn().mockResolvedValue('hashed_password'),
            compareHash: jest.fn(),
        };

        createUserUseCase = new CreateUserUseCase(userRepository, hashProvider);
    })

    it('should create a user when name is not taken', async () => {
        const payload = {
            name: 'John Doe',
            password: 'password123',
        };

        userRepository.findByName.mockResolvedValue(null);
        userRepository.create.mockImplementation(async (user) => user);

        const result = await createUserUseCase.execute(payload);

        expect(userRepository.findByName).toHaveBeenCalledWith(payload.name);
        expect(userRepository.create).toHaveBeenCalled();
        expect(result.name).toBe(payload.name);
    })

    it('should throw NameAlreadyExists when name is taken', async () => {
        const payload = {
            name: 'John Doe',
            password: 'password123',
        };

        userRepository.findByName.mockResolvedValue({} as any);

        await expect(createUserUseCase.execute(payload)).rejects.toThrow(NameAlreadyExists);
    })
})