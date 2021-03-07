import { Module } from '@nestjs/common';
import { UserModule } from './module/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './module/auth.module';


@Module({
  controllers: [],
  providers: [],
  imports: [ConfigModule, DatabaseModule, UserModule,AuthModule],
})
export class AppModule {
  static port:number|string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
