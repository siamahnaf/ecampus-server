import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";

//Entity
import { User } from "@/user/model/user.entity";

//Grade Array type
import { GradArrayInput } from "../dto/grade.dto";

@Entity()
export class Grade {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "json" })
    grades: GradArrayInput[];

    @ManyToOne(() => User)
    createdBy: User;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}