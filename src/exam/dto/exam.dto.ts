import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class ExamInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    type: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    description: string;
}