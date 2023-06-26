import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class MoreInfo {
    @Field(() => String, { nullable: true })
    title: string;
    @Field(() => String, { nullable: true })
    value: string;
}

@ObjectType()
export class Social {
    @Field(() => String, { nullable: true })
    icon: string;
    @Field(() => String, { nullable: true })
    url: string;
}

@ObjectType()
export class Settings {
    @Field(() => String, { nullable: true })
    icon: string;
    @Field(() => String, { nullable: true })
    logo: string;
    @Field(() => String, { nullable: true })
    name: string;
    @Field(() => String, { nullable: true })
    slogan: string;
    @Field(() => String, { nullable: true })
    url: string;
    @Field(() => String, { nullable: true })
    metaTitle: string;
    @Field(() => String, { nullable: true })
    ogTitle: string;
    @Field(() => String, { nullable: true })
    metaDescription: string;
    @Field(() => String, { nullable: true })
    ogDescription: string;
    @Field(() => String, { nullable: true })
    metaTag: string;
    @Field(() => String, { nullable: true })
    ogImage: string;
    @Field(() => String, { nullable: true })
    ogUrl: string;
    @Field(() => String, { nullable: true })
    email: string;
    @Field(() => String, { nullable: true })
    phone: string;
    @Field(() => String, { nullable: true })
    office: string;
    @Field(() => String, { nullable: true })
    headOffice: string;
    @Field(() => [MoreInfo], { nullable: true })
    moreInfo: MoreInfo[];
    @Field(() => [Social], { nullable: true })
    socials: Social[];
}