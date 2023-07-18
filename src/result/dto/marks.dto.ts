import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class MarksInput {
    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    cq: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    mcq: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    practical: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    ca: number;

    @Field(() => Float, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    totalMarks: number;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    grade: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    grade_point: string;
}