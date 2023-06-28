import { ObjectType, Field } from "@nestjs/graphql";

//Fee
import { Meta } from "@/section/entities/meta.entity";
import { Fee } from "@/fee/entities/fee.entity";
import { Student } from "@/student/entities/student.entity";
import { User } from "@/user/entities/user.entity";

@ObjectType()
export class Weaver {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => Fee, { nullable: true })
    fee: Fee;
    @Field(() => String, { nullable: false })
    discount: string;
    @Field(() => String, { nullable: false })
    discountUnit: string;
    @Field(() => String, { nullable: false })
    frequency: string;
    @Field(() => Student, { nullable: true })
    student: Student;
    @Field(() => User, { nullable: true })
    createdBy: User;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
    @Field(() => Date, { nullable: false })
    created_at: Date;
}

@ObjectType()
export class WeaverInfo {
    @Field(() => Student, { nullable: true })
    student: Student;
    @Field(() => [Weaver], { nullable: true })
    weavers: Weaver[];
}

