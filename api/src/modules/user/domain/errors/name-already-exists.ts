import { ConflictException } from "@nestjs/common";

export class NameAlreadyExists extends ConflictException {
    constructor() {
        super('User name already exists');
    }
}
