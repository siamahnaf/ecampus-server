import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Entities
import { Settings } from "./model/settings.entity";

//Service and Resolver
import { SettingService } from "./settings.service";
import { SettingResolver } from "./settings.resolver";

//Modules
import { UserModule } from "@/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Settings]),
        UserModule
    ],
    providers: [SettingService, SettingResolver]
})

export class SettingModule { };