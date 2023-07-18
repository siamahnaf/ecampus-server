import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";

//Entity
import { User } from "@/user/model/user.entity";
import { Subject } from "@/subject/model/subject.entity";
import { Result } from "./result.entity";

@Entity()
export class Marks {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => Subject)
    subjectId: Subject;

    @ManyToOne(() => Result, (result) => result.marks)
    result: Result;

    @Column({ type: "bigint", nullable: true })
    fullMarks: number;

    @Column({ type: "bigint", nullable: true })
    cq: number;

    @Column({ type: "bigint", nullable: true })
    mcq: number;

    @Column({ type: "bigint", nullable: true })
    practical: number;

    @Column({ type: "bigint", nullable: true })
    ca: number;

    @Column({ type: "bigint", nullable: true })
    totalMarks: number;

    @Column({ type: "text", nullable: true })
    grade: string;

    @Column({ type: "text", nullable: true })
    grade_point: string;

    @ManyToOne(() => User)
    createdBy: User;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}