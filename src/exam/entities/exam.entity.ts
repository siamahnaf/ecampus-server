import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Meta } from "@/section/entities/meta.entity";
import { User } from "@/user/entities/user.entity";
import { Grade } from "@/grade/entities/grade.entity";

@ObjectType()
export class Exam {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => Grade, { nullable: true })
    type: Grade;
    @Field(() => String, { nullable: true })
    description: string;
    @Field(() => User, { nullable: true })
    createdBy: User;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
    @Field(() => Date, { nullable: false })
    created_at: Date;
}

@ObjectType()
export class GetExams {
    @Field(() => [Exam], { nullable: true })
    results: Exam[];
    @Field(() => Meta, { nullable: true })
    meta: Meta;
}