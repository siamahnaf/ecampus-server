import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Entities
import { Grade } from "./model/grade.entity";

//Service and Resolver
import { GradeService } from "./grade.service";
import { GradeResolver } from "./grade.resolver";

//Module
import { UserModule } from "@/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Grade]),
        UserModule
    ],
    providers: [GradeService, GradeResolver]
})

export class GradeModule { };