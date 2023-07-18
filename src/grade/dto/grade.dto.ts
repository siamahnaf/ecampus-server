import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsArray } from "class-validator";


@InputType()
export class GradArrayInput {
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    percent_upto: string;
    @Field(() => String, { nullable: false })
    percent_from: string;
    @Field(() => String, { nullable: false })
    grade_point: string;
};

@InputType()
export class GradeInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => [GradArrayInput], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    grades: GradArrayInput[];
}