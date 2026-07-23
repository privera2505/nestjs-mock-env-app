import { Controller, Get } from '@nestjs/common';
import { AppService, EnvConfig } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): { status: string } {
    return { status: 'ok' };
  }

  @Get('config')
  getConfig(): EnvConfig {
    return this.appService.getEnvVariables();
  }
}
