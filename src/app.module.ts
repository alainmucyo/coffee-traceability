import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './config/db/db';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { LocaleStrategy } from './auth/local.strategy';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { CoffeeShipmentModule } from './coffee-shipment/coffee-shipment.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60000s' },
    }),
    CoffeeShipmentModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    AuthService,
    LocaleStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
