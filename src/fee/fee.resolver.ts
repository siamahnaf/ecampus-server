import { UseGuards } from "@nestjs/common/decorators";
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";

//Service
import { FeeService } from "./fee.service";

//Dto
import { FeeInput } from "./dto/fee.dto";
import { FeeByClassInput } from "./dto/fee-by-class.dto";
import { SearchInput } from "@/section/dto/search.dto";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Fee } from "./entities/fee.entity";

//Auth guards
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/auth/enum/auth.enum";
import { Roles } from "@/auth/decorator/auth.decorator";

//Req user
import { ReqUser } from "@/auth/Types/user.types";

@Resolver()
export class FeeResolver {
    //Constructor
    constructor(
        private readonly feeService: FeeService
    ) { };

    //Get fee list
    @Query(() => [Fee], { name: "getFees" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    gets(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.feeService.gets(searchInput);
    };

    //Get Fees by class
    @Query(() => [Fee], { name: "getFeeByClass" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    getByClass(
        @Args("feeByClassInput") feeByClassInput: FeeByClassInput
    ) {
        return this.feeService.getsByClass(feeByClassInput)
    };

    //Add Fees
    @Mutation(() => SuccessInfo, { name: "addFees" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("feeInput") feeInput: FeeInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.feeService.add(feeInput, reqUser);
    };

    //Update fees
    @Mutation(() => SuccessInfo, { name: "updateFees" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("feeInput") feeInput: FeeInput,
        @Args("id") id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.feeService.update(id, feeInput, reqUser);
    };

    //Delete Fees
    @Mutation(() => SuccessInfo, { name: "deleteFees" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id") id: string
    ) {
        return this.feeService.delete(id);
    };
}