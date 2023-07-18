import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";

//Service
import { GradeService } from "./grade.service";

//Dto
import { GradeInput } from "./dto/grade.dto";
import { SearchInput } from "@/section/dto/search.dto";

//Entity
import { SuccessInfo } from "@/user/entities/success.entity";
import { Grade } from "./entities/grade.entity";

//Auth guards
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/auth/enum/auth.enum";
import { Roles } from "@/auth/decorator/auth.decorator";

//Req user
import { ReqUser } from "@/auth/Types/user.types";

@Resolver()
export class GradeResolver {
    //Constructor
    constructor(
        private readonly gradeService: GradeService
    ) { };

    //Get all grades
    @Query(() => [Grade], { name: "getGrades" })
    gets(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.gradeService.gets(searchInput);
    };

    //Add grade
    @Mutation(() => SuccessInfo, { name: "addGrade" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("gradeInput") gradeInput: GradeInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.gradeService.add(gradeInput, reqUser);
    };

    //Update Grade
    @Mutation(() => SuccessInfo, { name: "updateGrade" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("gradeInput") gradeInput: GradeInput,
        @Args("id") id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.gradeService.update(gradeInput, id, reqUser);
    };

    //Delete Grade
    @Mutation(() => SuccessInfo, { name: "deleteGrade" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id") id: string
    ) {
        return this.gradeService.delete(id);
    };
}