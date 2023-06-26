import { ObjectType, Field } from "@nestjs/graphql";

//User Entity
import { User } from "@/user/entities/user.entity";
import { Meta } from "@/section/entities/meta.entity";

@ObjectType()
export class Notice {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    title: string;
    @Field(() => String, { nullable: false })
    description: string;
    @Field(() => String, { nullable: true })
    pdf: string;
    @Field(() => User, { nullable: true })
    createdBy: User;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
    @Field(() => Date, { nullable: false })
    created_at: Date;
}


@ObjectType()
export class GetNotice {
    @Field(() => [Notice], { nullable: true })
    results: Notice[];
    @Field(() => Meta, { nullable: true })
    meta: Meta;
}