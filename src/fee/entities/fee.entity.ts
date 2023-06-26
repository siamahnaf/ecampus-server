import { ObjectType, Field } from "@nestjs/graphql";

//User Entity
import { User } from "@/user/entities/user.entity";
import { Class } from "@/class/entities/class.entity";
import { Shift } from "@/shift/entity/shift.entity";
import { Section } from "@/section/entities/section.entity";
import { Group } from "@/group/entities/group.entity";

@ObjectType()
export class Fee {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => Class, { nullable: true })
    class: Class;
    @Field(() => Shift, { nullable: true })
    shift: Shift;
    @Field(() => Section, { nullable: true })
    section: Section;
    @Field(() => Group, { nullable: true })
    group: Group;
    @Field(() => String, { nullable: false })
    frequency: string;
    @Field(() => String, { nullable: false })
    amount: string;
    @Field(() => User, { nullable: true })
    createdBy: User;
    @Field(() => String, { nullable: true })
    late_fee: string;
    @Field(() => String, { nullable: true })
    payed_in: string;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
    @Field(() => Date, { nullable: false })
    created_at: Date;
}
