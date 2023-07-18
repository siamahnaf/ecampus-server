import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsOptional } from "class-validator";

@InputType()
export class ResultPramsInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    classId: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    shiftId: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    sectionId: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    groupId: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    examId: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    session: string;
}