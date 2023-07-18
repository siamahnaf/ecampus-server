import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { User } from "@/user/entities/user.entity";

@ObjectType()
export class GradArray {
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    percent_upto: string;
    @Field(() => String, { nullable: false })
    percent_from: string;
    @Field(() => String, { nullable: false })
    grade_point: string;
}

@ObjectType()
export class Grade {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => User, { nullable: true })
    createdBy: User;
    @Field(() => [GradArray], { nullable: false })
    grades: GradArray[];
    @Field(() => Date, { nullable: false })
    updated_at: Date;
    @Field(() => Date, { nullable: false })
    created_at: Date;
}