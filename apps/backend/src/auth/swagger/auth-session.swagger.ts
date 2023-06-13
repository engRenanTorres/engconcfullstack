import { ApiProperty } from '@nestjs/swagger';
import { UserFindSwagger } from '../../users/swagger/index-users.swagger';

export class SessionReponseOk {
  @ApiProperty()
  valid: boolean;
  @ApiProperty()
  credencials: UserFindSwagger;
}

export class SessionResponseInvalid {
  @ApiProperty()
  statusCode: 400;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
}
