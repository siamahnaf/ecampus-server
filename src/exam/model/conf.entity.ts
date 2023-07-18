import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";

//Entity
import { Class } from "@/class/model/class.entity";
import { Subject } from "@/subject/model/subject.entity";
import { Exam } from "./exam.entity";
import { User } from "@/user/model/user.entity";

@Entity()
export class TotalMarks {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    totalMarks: string;

    @ManyToOne(() => Subject)
    subjectId: Subject;
}

@Entity()
export class Conf {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => Class)
    classId: Class;

    @ManyToMany(() => Exam)
    @JoinTable()
    examId: Exam[];

    @ManyToMany(() => TotalMarks)
    @JoinTable()
    subjects: TotalMarks[];

    @ManyToOne(() => User)
    createdBy: User;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}