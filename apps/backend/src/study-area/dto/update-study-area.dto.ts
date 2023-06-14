import { PartialType } from "@nestjs/swagger";
import { CreateStudyAreaDto } from "./create-study-area.dto";

export class UpdateStudyAreaDto extends PartialType(CreateStudyAreaDto) {}
