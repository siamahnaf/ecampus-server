import { UseGuards } from "@nestjs/common/decorators";
import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";

//Service
import { ResultService } from "./result.service";

//Dto
import { ResultSearchInput } from "./dto/result-search.dto";
import { MarksInput } from "./dto/marks.dto";
import { ResultPramsInput } from "./dto/result-prams.dto";

//Entities
import { Result } from "./entities/result.entity";
import { SuccessInfo } from "@/user/entities/success.entity";

//Auth guards
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/auth/enum/auth.enum";
import { Roles } from "@/auth/decorator/auth.decorator";

//Req user
import { ReqUser } from "@/auth/Types/user.types";

@Resolver()
export class ResultResolver {
    //Constructor
    constructor(
        private readonly resultService: ResultService
    ) { };


    //Get all result
    @Query(() => [Result], { name: "getResults" })
    @Roles(Role.TEACHER, Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    gets(
        @Args("resultPramsInput") resultPramsInput: ResultPramsInput
    ) {
        return this.resultService.gets(resultPramsInput);
    };

    //Search for Result by subjects
    @Mutation(() => [Result], { name: "getSubjectResult" })
    @Roles(Role.TEACHER, Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    getSubjectResult(
        @Args("resultSearchInput") resultSearchInput: ResultSearchInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.resultService.getSubjectResult(resultSearchInput, reqUser);
    };

    //Update marks
    @Mutation(() => SuccessInfo, { name: "updateMarks" })
    @Roles(Role.TEACHER, Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("marksInput") marksInput: MarksInput,
        @Args("id") id: string
    ) {
        return this.resultService.update(marksInput, id);
    };
}
