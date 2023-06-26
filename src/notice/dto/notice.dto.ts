import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class NoticeInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    title: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    pdf: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    description: string;
}