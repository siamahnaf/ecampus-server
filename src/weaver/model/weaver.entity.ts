import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

//Entities
import { Fee } from "src/fee/model/fee.entity";
import { Student } from "src/student/model/student.entity";
import { User } from "src/user/model/user.entity";

@Entity()
export class Weaver {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Fee)
    fee: Fee;

    @Column({ type: "text" })
    discount: string;

    @Column({ type: "text", enum: ["flat", "percent"] })
    discountUnit: string;

    @Column({ type: "text", enum: ["once", "always"] })
    frequency: string;

    @ManyToOne(() => Student)
    student: Student;

    @ManyToOne(() => User)
    createdBy: User;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}