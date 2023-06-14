import { ApiProperty, OmitType } from "@nestjs/swagger";

export class IndexUsersSwagger {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  roles: number;
}

export class UserFindSwagger extends OmitType(IndexUsersSwagger, [
  "password",
]) {}

export class InvalidPasswordResponse {
  @ApiProperty()
  statusCode: 400;
  @ApiProperty()
  message: [
    "The password must == Capital letter, lowercase, numbers, special caracters and have at least 6 digits."
  ];
  @ApiProperty()
  error: "Bad Request";
}
