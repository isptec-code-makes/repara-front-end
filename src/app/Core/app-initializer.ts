import {APP_INITIALIZER, Provider} from '@angular/core';
import {ConfigService} from "./services/config.service";


export const appInitializer: Provider = {
    provide: APP_INITIALIZER,
    useFactory: (configService: ConfigService) => () => configService.loadConfig(),
    deps: [ConfigService],
    multi: true
};
