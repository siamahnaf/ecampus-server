import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class FeeInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    class: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    shift: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    section: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    group: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    frequency: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    amount: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    late_fee: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    payed_in: string;
}