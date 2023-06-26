import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";

//Service
import { SettingService } from "./settings.service";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Settings } from "./entities/settings.entity";

//Dto
import { SettingsInput } from "./dto/settings.dto";

//Auth guards
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/auth/enum/auth.enum";
import { Roles } from "@/auth/decorator/auth.decorator";

@Resolver()
export class SettingResolver {
    //Constructor
    constructor(
        private readonly settingService: SettingService
    ) { };

    //Get settings
    @Query(() => Settings, { name: "getSettings" })
    get() {
        return this.settingService.get();
    };

    @Mutation(() => SuccessInfo, { name: "addSettings" })
    @Roles(Role.PRINCIPAL)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("settingInput") settingInput: SettingsInput
    ) {
        return this.settingService.add(settingInput);
    };
}