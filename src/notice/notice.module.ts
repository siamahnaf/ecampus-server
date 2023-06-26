import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm Entity
import { Notice } from "./model/notice.entity";

//Service and Resolver
import { NoticeService } from "./notice.service";
import { NoticeResolver } from "./notice.resolver";

//Modules
import { UserModule } from "@/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Notice]),
        UserModule
    ],
    providers: [NoticeService, NoticeResolver]
})

export class NoticeModule { };