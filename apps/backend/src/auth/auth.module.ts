import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "../strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "../strategies/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    UsersModule,
    JwtModule.register({
      privateKey: process.env.TOKEN_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
