import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class ResultSearchInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    classId: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    shiftId: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    sectionId: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    groupId: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    examId: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    subjectId: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    session: string;
}