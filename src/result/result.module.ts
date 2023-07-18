import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Entities
import { Result } from "./model/result.entity";
import { Marks } from "./model/marks.entity";

//Service & Resolver
import { ResultService } from "./result.service";
import { ResultResolver } from "./result.resolver";

//Modules
import { UserModule } from "@/user/user.module";
import { StudentModule } from "@/student/student.module";
import { ExamModule } from "@/exam/exam.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Result, Marks]),
        UserModule,
        StudentModule,
        ExamModule
    ],
    providers: [ResultService, ResultResolver]
})

export class ResultModule { };