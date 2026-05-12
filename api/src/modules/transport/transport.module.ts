import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TransportConfigController } from './infra/http/controllers/TransportConfigController';
import { GetTransportConfigUseCase } from './application/use-cases/GetTransportConfigUseCase';
import { UpdateHomeContactUseCase } from '../home-contact/application/home-contact.use-cases';
import { TransportConfigRepository } from './infra/typeorm/repositories/TransportConfigRepository';
import { TypeOrmHomeContactRepository } from '../home-contact/infra/typeorm/repositories/typeorm-home-contact.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportConfig } from './domain/entities/TransportConfig';
import { HomeContactConfig } from '../home-contact/domain/entities/home-contact-config.entity';
import { UpdateTransportConfigUseCase } from './application/use-cases/UpdateTransportConfigUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([TransportConfig, HomeContactConfig])],
  controllers: [TransportConfigController],
  providers: [TransportService, GetTransportConfigUseCase, UpdateHomeContactUseCase, UpdateTransportConfigUseCase,
    {
      provide: 'ITransportConfigRepository',
      useClass: TransportConfigRepository,
    },
    {
      provide: 'HOME_CONTACT_REPOSITORY_TOKEN',
      useClass: TypeOrmHomeContactRepository,
    },
  ],
  exports: [GetTransportConfigUseCase, UpdateHomeContactUseCase, UpdateTransportConfigUseCase]
})
export class TransportModule { }
