import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Exam } from "@/exam/entities/exam.entity";
import { Class } from "@/class/entities/class.entity";
import { Shift } from "@/shift/entity/shift.entity";
import { Section } from "@/section/entities/section.entity";
import { Group } from "@/group/entities/group.entity";
import { Conf } from "@/exam/entities/conf.entity";
import { Grade } from "@/grade/entities/grade.entity";
import { Student } from "@/student/entities/student.entity";
import { Marks } from "./marks.entity";

@ObjectType()
export class Result {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => Exam, { nullable: true })
    examId: Exam;
    @Field(() => Class, { nullable: true })
    classId: Class;
    @Field(() => Shift, { nullable: true })
    shiftId: Shift;
    @Field(() => Section, { nullable: true })
    sectionId: Section;
    @Field(() => Group, { nullable: true })
    groupId: Group;
    @Field(() => Student, { nullable: true })
    studentId: Student;
    @Field(() => Conf, { nullable: true })
    confId: Conf;
    @Field(() => Grade, { nullable: true })
    gradeId: Grade;
    @Field(() => String, { nullable: false })
    session: string;
    @Field(() => [Marks], { nullable: true })
    marks: Marks[];
    @Field(() => Date, { nullable: false })
    updated_at: Date;
    @Field(() => Date, { nullable: false })
    created_at: Date;
}