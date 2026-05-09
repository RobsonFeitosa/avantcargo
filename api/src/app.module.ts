import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/infra/database/database.module';
import { UserModule } from './modules/user/user.module';
import { MainBannerModule } from './modules/main-banner/main-banner.module';
import { MainServicesModule } from './modules/main-services/main-services.module';
import { WorkStepsModule } from './modules/work-steps/work-steps.module';
import { AboutUsModule } from './modules/about-us/about-us.module';
import { SectorsModule } from './modules/sectors/sectors.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { HomeContactModule } from './modules/home-contact/home-contact.module';
import { FooterModule } from './modules/footer/footer.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/infra/http/guards/auth.guard';
import { GeneralContactModule } from './modules/general-contact/general-contact.module';
import { ContactMessageModule } from './modules/contact-messages/contact-messages.module';
import { AirRepresentationModule } from './modules/air-representation/air-representation.module';
import { UploadModule } from './shared/infra/http/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    MainBannerModule,
    MainServicesModule,
    WorkStepsModule,
    AboutUsModule,
    SectorsModule,
    TestimonialsModule,
    HomeContactModule,
    FooterModule,
    GeneralContactModule,
    ContactMessageModule,
    AirRepresentationModule,
    UploadModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }