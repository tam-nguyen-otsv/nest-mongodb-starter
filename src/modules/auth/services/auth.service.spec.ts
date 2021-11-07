import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '.';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { of } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let httpService: HttpService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [AuthService],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    httpService = app.get(HttpService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getHealthCheck()', () => {
    it('getHealthCheck return Ok string', async () => {
      const rs = authService.getHealthCheck();
      expect(rs).toEqual('OK');
    });
  });

  describe('isTokenActive()', () => {
    it('isTokenActive return true', async () => {
      const result = {
        data: { active: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'post').mockImplementation(() => of(result));
      const rs = await authService.isTokenActive('token');
      expect(rs).toEqual(true);
    });

    it('isTokenActive return false', async () => {
      const result = {
        data: { active: false },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'post').mockImplementation(() => of(result));
      const rs = await authService.isTokenActive('token');
      expect(rs).toEqual(false);
    });

    it('isTokenActive return false when response do not have active', async () => {
      const result = {
        data: null,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'post').mockImplementation(() => of(result));
      const rs = await authService.isTokenActive('token');
      expect(rs).toEqual(false);
    });
  });
});
