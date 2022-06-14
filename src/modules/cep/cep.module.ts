import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CepIntegrationService } from './services/cep.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ViaCepService } from './services/viacep.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        baseURL: 'https://viacep.com.br/ws/',
        validateStatus: () => true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [CepIntegrationService, ViaCepService],
  exports: [CepIntegrationService, ViaCepService],
})
export class CepModule {}
