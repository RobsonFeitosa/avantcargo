import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateContactMessageUseCase } from "../../../application/use-cases/CreateContactMessageUseCase";
import { ListContactMessagesUseCase } from "../../../application/use-cases/ListContactMessagesUseCase";
import { DeleteContactMessageUseCase } from "../../../application/use-cases/DeleteContactMessageUseCase";
import { MarkContactMessageAsReadUseCase } from "../../../application/use-cases/MarkContactMessageAsReadUseCase";
import { Public } from "src/shared/infra/http/decorators/public.decorator";

@Controller('contact-messages')
export class ContactMessageController {
    constructor(
        private createContactMessageUseCase: CreateContactMessageUseCase,
        private listContactMessagesUseCase: ListContactMessagesUseCase,
        private deleteContactMessageUseCase: DeleteContactMessageUseCase,
        private markContactMessageAsReadUseCase: MarkContactMessageAsReadUseCase
    ) {}

    @Public()
    @Post()
    async create(@Body() data: any) {
        return this.createContactMessageUseCase.execute(data);
    }

    @Get()
    async list() {
        return this.listContactMessagesUseCase.execute();
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.deleteContactMessageUseCase.execute(id);
    }

    @Patch(':id/read')
    async markAsRead(@Param('id') id: string) {
        return this.markContactMessageAsReadUseCase.execute(id);
    }
}
