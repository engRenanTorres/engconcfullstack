import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { TokenPayload } from "../auth/models/jwt-payload.model";

const extractAuthUser = async (
  autorization: string,
  userService: UsersService
) => {
  if (!autorization)
    throw new ForbiddenException("Autorization header  is missing.");
  const accessToken = autorization.slice(7);
  const jwtService = new JwtService();
  try {
    await jwtService.verify(accessToken, {
      publicKey: process.env.TOKEN_KEY,
    });
  } catch (error) {
    throw new UnauthorizedException(
      "The Authorization Token is not Valid: " + error.message
    );
  }
  const decodedToken = jwtService.decode(accessToken) as TokenPayload;

  let user: User;
  try {
    user = await userService.findById(+decodedToken.sub);
  } catch (error) {
    throw new NotFoundException("Usuário inexistente: " + error.message);
  }
  return user;
};

export default extractAuthUser;
