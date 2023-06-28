import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class FeeByClassInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    classId: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    shiftId: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    sectionId: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    groupId: string;
}