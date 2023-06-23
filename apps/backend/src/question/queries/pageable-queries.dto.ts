import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsNumberString } from "class-validator";

export class PageableQueries {
  @IsNumberString()
  @ApiProperty({ description: "Paging questions." })
  page: number;

  @IsNumberString()
  @ApiProperty({
    type: "int",
    description: "Answer of the question.",
  })
  limit: number;
}
