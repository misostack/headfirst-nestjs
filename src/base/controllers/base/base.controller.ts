import { Controller, Get } from '@nestjs/common';
import { PingDTO } from '@base/models/ping.dto';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('base')
@Controller()
export class BaseController {
  constructor(private configService: ConfigService) {

  }
  @Get()
  index(): PingDTO {
    return {
      environment: this.configService.get<string>('environment'),
      apiVersion: 20200318001,
      lastUpdated: new Date(2020, 3, 18),
      status: true
    }
  }
}
