import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class MoreInfoInput {
    @Field(() => String, { nullable: true })
    title: string;
    @Field(() => String, { nullable: true })
    value: string;
}

@InputType()
export class SocialInput {
    @Field(() => String, { nullable: true })
    icon: string;
    @Field(() => String, { nullable: true })
    url: string;
}

@InputType()
export class SettingsInput {
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
    @Field(() => [MoreInfoInput], { nullable: true })
    moreInfo: MoreInfoInput[];
    @Field(() => [SocialInput], { nullable: true })
    socials: SocialInput[];
}