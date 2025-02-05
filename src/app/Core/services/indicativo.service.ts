import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

type restCountry = {
    idd: {
        root: string,
        suffixes: string[]
    }
};

@Injectable({
    providedIn: "root"
})
export class IndicativoService {
    private readonly apiUrl = "https://restcountries.com/v3.1";

    constructor(private http: HttpClient) {
    }

    getIndicativo(pais: string): Observable<restCountry[]> {
        return this.http.get<restCountry[]>(`${this.apiUrl}/name/${pais}`).pipe(map => map);
    }
}
