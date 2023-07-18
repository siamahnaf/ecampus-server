import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";

//Service
import { ExamService } from "./exam.service";

//Dto
import { ExamInput } from "./dto/exam.dto";
import { SearchInput } from "@/section/dto/search.dto";
import { ConfInput } from "./dto/conf.dto";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { GetExams, Exam } from "./entities/exam.entity";
import { GetConf, Conf } from "./entities/conf.entity";

//Auth guards
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/auth/enum/auth.enum";
import { Roles } from "@/auth/decorator/auth.decorator";

//Req user
import { ReqUser } from "@/auth/Types/user.types";

@Resolver()
export class ExamResolver {
    //Constructor
    constructor(
        private readonly examService: ExamService
    ) { };

    //----------------------------------Exam-----------------------------------------//
    //Get all exam with pagination
    @Query(() => GetExams, { name: "getExams" })
    @Roles(Role.TEACHER, Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    gets(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.examService.gets(searchInput);
    };

    //Get all exam without pagination
    @Query(() => [Exam], { name: "getAllExam" })
    @Roles(Role.TEACHER, Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    getAll() {
        return this.examService.getAll();
    };

    //Add Exam
    @Mutation(() => SuccessInfo, { name: "addExam" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("examInput") examInput: ExamInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.examService.add(examInput, reqUser);
    };

    //Update Exam
    @Mutation(() => SuccessInfo, { name: "updateExam" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("examInput") examInput: ExamInput,
        @Args("id") id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.examService.update(examInput, id, reqUser);
    };

    //Delete Exam
    @Mutation(() => SuccessInfo, { name: "deleteExam" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id") id: string
    ) {
        return this.examService.delete(id);
    };

    //-----------------------------------Exam Conf---------------------------------//

    //Get All Exam Conf with pagination
    @Query(() => GetConf, { name: "getConfs" })
    @Roles(Role.TEACHER, Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    getConfs(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.examService.getConfs(searchInput);
    };

    //Get All Exam Conf without pagination
    @Query(() => [Conf], { name: "getAllConfs" })
    @Roles(Role.TEACHER, Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    getAllConf() {
        return this.examService.getAllConf();
    };

    //Add Confs
    @Mutation(() => SuccessInfo, { name: "addConf" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    addConf(
        @Args("confInput") confInput: ConfInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.examService.addConf(confInput, reqUser);
    };

    //Delete Confs
    @Mutation(() => SuccessInfo, { name: "deleteConf" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    deleteConf(
        @Args("id") id: string
    ) {
        return this.examService.deleteConf(id);
    };
}