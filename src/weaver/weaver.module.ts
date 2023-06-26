import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Entity
import { Weaver } from "./model/weaver.entity";

//Service and Resolver
import { WeaverService } from "./weaver.service";
import { WeaverResolver } from "./weaver.resolver";

//Modules
import { UserModule } from "src/user/user.module";
import { StudentModule } from "src/student/student.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Weaver]),
        UserModule,
        StudentModule
    ],
    providers: [WeaverService, WeaverResolver]
})

export class WeaverModule { }