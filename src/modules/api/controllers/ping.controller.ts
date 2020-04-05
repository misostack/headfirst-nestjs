import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { PingData } from '@api/interfaces';

@ApiTags('api')
@Controller()
export class PingController {
  constructor(private configService: ConfigService) {

  }
  @Get()
  index(): PingData {
    return {
      environment: this.configService.get<string>('environment'),
      apiVersion: '20200318001',
    }
  }
}
