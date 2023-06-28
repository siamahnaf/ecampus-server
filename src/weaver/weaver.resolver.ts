import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";

//Service
import { WeaverService } from "./weaver.service";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { WeaverInfo } from "./entities/weaver.entity";

//Dto
import { WeaverInput } from "./dto/weaver.dto";

//Auth guards
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/auth/enum/auth.enum";
import { Roles } from "@/auth/decorator/auth.decorator";

//Req user
import { ReqUser } from "@/auth/Types/user.types";

@Resolver()
export class WeaverResolver {
    //Constructor
    constructor(
        private readonly weaverService: WeaverService
    ) { };

    //Get weavers
    @Query(() => WeaverInfo, { name: "getWeavers" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    gets(
        @Args("id") id: string
    ) {
        return this.weaverService.gets(id);
    };

    //Add weaver
    @Mutation(() => SuccessInfo, { name: "addWeaver" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("weaverInput") weaverInput: WeaverInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.weaverService.add(weaverInput, reqUser);
    };

    //Update weaver
    @Mutation(() => SuccessInfo, { name: "updateWeaver" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("weaverInput") weaverInput: WeaverInput,
        @Args("id") id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.weaverService.update(weaverInput, id, reqUser);
    };

    //Delete weaver
    @Mutation(() => SuccessInfo, { name: "deleteWeaver" })
    @Roles(Role.ACCOUNTANT, Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id") id: string
    ) {
        return this.weaverService.delete(id);
    };
}