import { PartialType } from "@nestjs/swagger";
import { CreateInstituteDto } from "./create-institute.dto";

export class UpdateInstituteDto extends PartialType(CreateInstituteDto) {}
