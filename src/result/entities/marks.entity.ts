import { ObjectType, Field } from "@nestjs/graphql";

//User Entity
import { User } from "@/user/entities/user.entity";
import { Subject } from "@/subject/entities/subject.entity";
import { Result } from "./result.entity";

@ObjectType()
export class Marks {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => Subject, { nullable: true })
    subjectId: Subject;
    @Field(() => Result, { nullable: true })
    result: Result;
    @Field(() => String, { nullable: true })
    fullMarks: string;
    @Field(() => String, { nullable: true })
    cq: string;
    @Field(() => String, { nullable: true })
    mcq: string;
    @Field(() => String, { nullable: true })
    practical: string;
    @Field(() => String, { nullable: true })
    ca: string;
    @Field(() => String, { nullable: true })
    totalMarks: string;
    @Field(() => String, { nullable: true })
    grade: string;
    @Field(() => String, { nullable: true })
    grade_point: string;
    @Field(() => User, { nullable: true })
    createdBy: User;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
    @Field(() => Date, { nullable: false })
    created_at: Date;
}
