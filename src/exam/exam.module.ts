import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Entities
import { Exam } from "./model/exam.entity";
import { Conf, TotalMarks } from "./model/conf.entity";

//Service and Resolver
import { ExamService } from "./exam.service";
import { ExamResolver } from "./exam.resolver";

//Modules
import { UserModule } from "@/user/user.module";
import { SubjectModule } from "@/subject/subject.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Exam, TotalMarks, Conf]),
        UserModule,
        SubjectModule
    ],
    providers: [ExamService, ExamResolver],
    exports: [TypeOrmModule]
})

export class ExamModule { };