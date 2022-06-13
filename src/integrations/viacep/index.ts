import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export interface IAddressInfo {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Injectable()
export class ViaCepIntegration {
  constructor(private httpService: HttpService) {}

  async getAddressInfo(zipcode: number): Promise<IAddressInfo> {
    const response = await lastValueFrom(
      this.httpService.get(`https://viacep.com.br/ws/${zipcode}/json/`),
    );

    return response.data;
  }
}
