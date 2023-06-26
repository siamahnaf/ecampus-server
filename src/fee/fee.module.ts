import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm entity
import { Fee } from "./model/fee.entity";

//Service and Resolver
import { FeeService } from "./fee.service";
import { FeeResolver } from "./fee.resolver";

//Modules
import { UserModule } from "@/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Fee]),
        UserModule
    ],
    providers: [FeeService, FeeResolver],
    exports: [TypeOrmModule]
})

export class FeeModule { };