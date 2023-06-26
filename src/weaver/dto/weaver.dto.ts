import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class WeaverInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    fee: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    discount: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    discountUnit: string;

    @Field(() => String, { nullable: false })
    frequency: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    student: string;
}