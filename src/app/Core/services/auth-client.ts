import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { LoginResponseDto, RefreshTokenResponseDto } from '../types/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {

  private readonly configService = inject(ConfigService);

  constructor(private http: HttpClient) {}

  private get apiUrl(): string {
    return this.configService.getConfig.apiUrl;
  }

  public login(
    username: string,
    password: string
  ): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(
      this.apiUrl + 'auth/login',
      {
        username: username,
        password: password,
      }
    );
  }

  public socialLogin(
    email: string,
    provider: string,
    accessToken: string
  ): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(
      this.apiUrl + 'auth/social-login',
      {
        email: email,
        provider: provider,
        accessToken: accessToken,
      }
    );
  }

  public register(username: string, email: string, password: string) {
    return this.http.post(this.apiUrl + '/auth/register', {
      username: username,
      email: email,
      password: password,
    });
  }

  public refreshToken(
    accessToken: string,
    refreshToken: string
  ): Observable<RefreshTokenResponseDto> {
    return this.http.post<RefreshTokenResponseDto>(
      this.apiUrl + '/auth/refresh-token',
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
    );
  }
}
