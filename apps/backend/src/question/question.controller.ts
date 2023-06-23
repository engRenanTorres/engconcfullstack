import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { AuthUser } from "../decorators/auth.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../users/entities/role.enum";
import { ReqHeaders } from "../auth/models/req-headers.model";

@Controller("question")
@ApiTags("Questions")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  create(
    @Body() createQuestionDto: CreateQuestionDto,
    @Headers() { authorization }: ReqHeaders
  ) {
    console.log(authorization);

    return this.questionService.create(createQuestionDto, authorization);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  update(
    @Param("id") id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Headers() { authorization }: ReqHeaders
  ) {
    return this.questionService.update(+id, updateQuestionDto, authorization);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  remove(@Param("id") id: string) {
    return this.questionService.remove(+id);
  }
}
