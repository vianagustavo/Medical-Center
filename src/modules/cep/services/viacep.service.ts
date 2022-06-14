import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ViaCepService {
  constructor(public httpService: HttpService) {}
}
