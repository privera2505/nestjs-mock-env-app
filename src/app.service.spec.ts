import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  const originalEnv = process.env;

  beforeEach(async () => {
    // Copia limpia de process.env para cada test
    process.env = { ...originalEnv };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = moduleRef.get<AppService>(AppService);
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('debe retornar las variables de entorno cuando están definidas', () => {
    process.env.APP_NAME = 'demo-app';
    process.env.APP_ENV = 'production';
    process.env.APP_VERSION = '1.2.3';

    expect(service.getEnvVariables()).toEqual({
      appName: 'demo-app',
      appEnv: 'production',
      appVersion: '1.2.3',
    });
  });

  it('debe retornar "no-definido" cuando las variables no existen', () => {
    delete process.env.APP_NAME;
    delete process.env.APP_ENV;
    delete process.env.APP_VERSION;

    expect(service.getEnvVariables()).toEqual({
      appName: 'no-definido',
      appEnv: 'no-definido',
      appVersion: 'no-definido',
    });
  });
});
