import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//Entities
import { Settings } from "./model/settings.entity";

//Dto
import { SettingsInput } from "./dto/settings.dto";

@Injectable()
export class SettingService {
    //Constructor
    constructor(
        @InjectRepository(Settings) private settingRepository: Repository<Settings>
    ) { };

    //Get Settings
    async get() {
        const setting = await this.settingRepository.findOne({
            where: {}
        });
        if (!setting) throw new NotFoundException("Settings not found!");
        return setting;
    };

    //Add Settings
    async add(settingInput: SettingsInput) {
        const setting = await this.settingRepository.findOne({
            where: {}
        });
        if (setting) {
            await this.settingRepository.update(setting.id, settingInput);
        } else {
            const newSettings = this.settingRepository.create(settingInput);
            await this.settingRepository.save(newSettings);
        }
        return {
            success: true,
            message: "Settings added successfully!"
        }
    };
}