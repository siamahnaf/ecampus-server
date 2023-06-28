import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Relation } from "typeorm";

//Entities
import { Fee } from "@/fee/model/fee.entity";
import { Student } from "@/student/model/student.entity";
import { User } from "@/user/model/user.entity";

@Entity()
export class Weaver {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => Fee)
    fee: Relation<Fee>;

    @Column({ type: "text" })
    discount: string;

    @Column({ type: "text", enum: ["flat", "percent"] })
    discountUnit: string;

    @Column({ type: "text", enum: ["once", "always"] })
    frequency: string;

    @ManyToOne(() => Student)
    student: Relation<Student>;

    @ManyToOne(() => User)
    createdBy: Relation<User>;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}