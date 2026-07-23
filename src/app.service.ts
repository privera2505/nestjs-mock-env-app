import { Injectable } from '@nestjs/common';

export interface EnvConfig {
  appName: string;
  appEnv: string;
  appVersion: string;
}

@Injectable()
export class AppService {
  getEnvVariables(): EnvConfig {
    return {
      appName: process.env.APP_NAME ?? 'no-definido',
      appEnv: process.env.APP_ENV ?? 'no-definido',
      appVersion: process.env.APP_VERSION ?? 'no-definido',
    };
  }
}
