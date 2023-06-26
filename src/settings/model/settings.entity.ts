import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Settings {
    @PrimaryGeneratedColumn("identity")
    id: string;
    @Column({ type: "text", nullable: true })
    icon: string;
    @Column({ type: "text", nullable: true })
    logo: string;
    @Column({ type: "text", nullable: true })
    name: string;
    @Column({ type: "text", nullable: true })
    slogan: string;
    @Column({ type: "text", nullable: true })
    url: string;
    @Column({ type: "text", nullable: true })
    metaTitle: string;
    @Column({ type: "text", nullable: true })
    ogTitle: string;
    @Column({ type: "text", nullable: true })
    metaDescription: string;
    @Column({ type: "text", nullable: true })
    ogDescription: string;
    @Column({ type: "text", nullable: true })
    metaTag: string;
    @Column({ type: "text", nullable: true })
    ogImage: string;
    @Column({ type: "text", nullable: true })
    ogUrl: string;
    @Column({ type: "text", nullable: true })
    email: string;
    @Column({ type: "text", nullable: true })
    phone: string;
    @Column({ type: "text", nullable: true })
    office: string;
    @Column({ type: "text", nullable: true })
    headOffice: string;
    @Column({ type: "json", nullable: true })
    moreInfo: { title: string, value: string }[];
    @Column({ type: "json", nullable: true })
    socials: { icon: string, url: string }[];
    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;
    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}