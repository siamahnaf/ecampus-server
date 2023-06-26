import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn, Relation } from "typeorm";

//Orm Entity
import { User } from "@/user/model/user.entity";

@Entity()
export class Notice {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "text", nullable: true })
    pdf: string;

    @ManyToOne(() => User)
    createdBy: Relation<User>;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}