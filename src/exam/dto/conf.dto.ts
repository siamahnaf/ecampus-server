import { InputType, Field } from "@nestjs/graphql";


@InputType()
export class TotalMarksInput {
    @Field(() => String, { nullable: false })
    subjectId: string;
    @Field(() => String, { nullable: false })
    totalMarks: string;
}

@InputType()
export class ConfInput {
    @Field(() => String, { nullable: false })
    classId: string;
    @Field(() => [String], { nullable: false })
    examId: string[];
    @Field(() => [TotalMarksInput], { nullable: false })
    subjects: TotalMarksInput[];
}