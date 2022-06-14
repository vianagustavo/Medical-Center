import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ViaCepService } from './viacep.service';

export interface IAddressInfo {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Injectable()
export class CepIntegrationService {
  constructor(private viaCepService: ViaCepService) {}

  async getAddressInfo(zipcode: number): Promise<IAddressInfo> {
    const response = await lastValueFrom(
      this.viaCepService.httpService.get(`${zipcode}/json/`),
    );

    return response.data;
  }
}
