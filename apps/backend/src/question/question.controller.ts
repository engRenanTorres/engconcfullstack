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
  Query,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../users/entities/role.enum";
import { ReqHeaders } from "../auth/models/req-headers.model";
import { PageableQueries } from "./queries/pageable-queries.dto";

@Controller("api/question")
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

  @Get("/pageable")
  @ApiQuery({ name: "page", type: "int", required: false })
  @ApiQuery({ name: "limit", type: "int", required: false })
  findAllPageable(@Query() { page, limit }: PageableQueries) {
    return this.questionService.findAllPageable(page, limit);
  }

  @Get("/countx")
  @ApiQuery({ name: "areaid", type: "int", required: false })
  getCounAllPerArea(@Query('areaid') areaid: number) {
    console.log(areaid);
    return this.questionService.getCountAllPerArea(areaid);
  }

  @Get("/count")
  findCountAllQuestion() {
    return this.questionService.getQtdTotalQuestions();
  }

  @Get("/by-keyword/:keyword")
  @ApiParam({ name: "keyword", type: "string", required: true })
  findQuestionsByKeyword(@Param("keyword") keyword: string) {
    return this.questionService.findQuestionsWithKeyword(keyword);
  }

  @Get("/by-area-id/:areaId")
  @ApiParam({ name: "areaId", type: "int", required: true })
  findQuestionsByAreaId(@Param("areaId") areaId: number) {
    return this.questionService.findAllByAreaId(areaId);
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
