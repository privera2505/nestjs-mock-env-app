import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, EnvConfig } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockEnvConfig: EnvConfig = {
    appName: 'mock-app',
    appEnv: 'test',
    appVersion: '9.9.9',
  };

  // Mock del AppService: no leemos variables de entorno reales,
  // simulamos el valor que retornaría el servicio.
  const mockAppService = {
    getEnvVariables: jest.fn().mockReturnValue(mockEnvConfig),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('debe retornar el status ok', () => {
      expect(appController.getHealth()).toEqual({ status: 'ok' });
    });
  });

  describe('GET /config', () => {
    it('debe retornar las 3 variables de entorno mockeadas', () => {
      const result = appController.getConfig();

      expect(result).toEqual(mockEnvConfig);
      expect(result).toHaveProperty('appName');
      expect(result).toHaveProperty('appEnv');
      expect(result).toHaveProperty('appVersion');
    });

    it('debe llamar una sola vez a appService.getEnvVariables', () => {
      appController.getConfig();

      expect(appService.getEnvVariables).toHaveBeenCalledTimes(1);
    });
  });
});
