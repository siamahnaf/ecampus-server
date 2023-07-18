import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn, OneToMany } from "typeorm";

//Entity
import { Exam } from "@/exam/model/exam.entity";
import { Class } from "@/class/model/class.entity";
import { Shift } from "@/shift/model/shift.entity";
import { Section } from "@/section/model/section.entity";
import { Group } from "@/group/model/group.entity";
import { Student } from "@/student/model/student.entity";
import { Conf } from "@/exam/model/conf.entity";
import { Grade } from "@/grade/model/grade.entity";
import { Marks } from "./marks.entity";

@Entity()
export class Result {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => Exam)
    examId: Exam;

    @ManyToOne(() => Class)
    classId: Class;

    @ManyToOne(() => Shift)
    shiftId: Shift;

    @ManyToOne(() => Section)
    sectionId: Section;

    @ManyToOne(() => Group)
    groupId: Group;

    @ManyToOne(() => Student)
    studentId: Student;

    @ManyToOne(() => Conf)
    confId: Conf;

    @ManyToOne(() => Grade)
    gradeId: Grade;

    @Column({ type: "text" })
    session: string;

    @OneToMany(() => Marks, (marks) => marks.result, { cascade: true })
    marks: Marks[];

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}