import { Body, Controller, Get, Post } from "@nestjs/common";
import { Public } from "src/shared/infra/http/decorators/public.decorator";
import { GetSectorsUseCase, UpdateSectorsUseCase, UpdateSectorsRequest } from "../../../application/sectors.use-cases";

@Controller('sectors')
export class SectorsController {
    constructor(
        private readonly getSectorsUseCase: GetSectorsUseCase,
        private readonly updateSectorsUseCase: UpdateSectorsUseCase,
    ) {}

    @Get()
    @Public()
    async get() {
        return this.getSectorsUseCase.execute();
    }

    @Post()
    async update(@Body() body: UpdateSectorsRequest) {
        return this.updateSectorsUseCase.execute(body);
    }
}
