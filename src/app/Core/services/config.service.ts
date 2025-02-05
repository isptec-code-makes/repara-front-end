import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";
import {Configuration} from "../interfaces/Configuration";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private config!: any;

    constructor(private http: HttpClient) {
    }

    async loadConfig(): Promise<void> {
        try {
            console.log('Carregando config.json');
            this.config = await firstValueFrom(this.http.get(environment.configFile));
        } catch (error) {
            console.error('Erro ao carregar config.json', error);
        }
    }

    get getConfig(): Configuration {
        return this.config;
    }

}
