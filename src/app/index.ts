/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/modules/user';
import { AuthModule } from 'src/modules/auth';
import { AppController } from './controllers';
import { LoggerModule } from 'src/modules/shared/logger';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    UserModule,
    AuthModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
