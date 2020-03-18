import { Controller, Get } from '@nestjs/common';
import { PingDTO } from '@base/models/ping.dto';


@Controller()
export class BaseController {
  @Get()
  index(): PingDTO {
    return {
      apiVersion: 20200318001,
      lastUpdated: new Date(2020, 3, 18),
      status: true
    }
  }
}
