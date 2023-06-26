import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn, Relation } from "typeorm";

//Orm Entity
import { User } from "@/user/model/user.entity";
import { Class } from "@/class/model/class.entity";
import { Shift } from "@/shift/model/shift.entity";
import { Section } from "@/section/model/section.entity";
import { Group } from "@/group/model/group.entity";

@Entity()
export class Fee {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @ManyToOne(() => Class)
    class: Relation<Class>;

    @ManyToOne(() => Shift)
    shift: Relation<Shift>;

    @ManyToOne(() => Section)
    section: Relation<Section>;

    @ManyToOne(() => Group)
    group: Relation<Group>;

    @ManyToOne(() => User)
    createdBy: Relation<User>;

    @Column({ type: "text", enum: ["once", "monthly", "quarterly", "half-yearly", "yearly"] })
    frequency: string;

    @Column({ type: "text" })
    amount: string;

    @Column({ type: "text", nullable: true })
    late_fee: string;

    @Column({ type: "text", nullable: true })
    payed_in: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}