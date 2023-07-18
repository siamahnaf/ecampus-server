import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";

//Entity
import { Grade } from "@/grade/model/grade.entity";
import { User } from "@/user/model/user.entity";

@Entity()
export class Exam {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @ManyToOne(() => Grade)
    type: Grade;

    @Column({ type: "text", nullable: true })
    description: string;

    @ManyToOne(() => User)
    createdBy: User;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}