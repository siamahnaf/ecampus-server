import { ObjectType, Field } from "@nestjs/graphql";

//Entity
import { Meta } from "@/section/entities/meta.entity";
import { User } from "@/user/entities/user.entity";
import { Subject } from "@/subject/entities/subject.entity";
import { Exam } from "./exam.entity";
import { Class } from "@/class/entities/class.entity";


@ObjectType()
export class TotalMarks {
    @Field(() => String, { nullable: false })
    totalMarks: string;
    @Field(() => Subject, { nullable: true })
    subjectId: Subject;
}

@ObjectType()
export class Conf {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => Class, { nullable: true })
    classId: Class;
    @Field(() => [Exam], { nullable: true })
    examId: Exam[];
    @Field(() => [TotalMarks], { nullable: true })
    subjects: TotalMarks[];
    @Field(() => User, { nullable: true })
    createdBy: User;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
    @Field(() => Date, { nullable: false })
    created_at: Date;
}

@ObjectType()
export class GetConf {
    @Field(() => [Conf], { nullable: true })
    results: Conf[];
    @Field(() => Meta, { nullable: true })
    meta: Meta;
}