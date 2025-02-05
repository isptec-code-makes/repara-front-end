export interface Gestor {
    id?: number;
    nome?: string | null;
    apelido?: string | null;
    role?: string;
    email?: string | null;
    userName?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
}

export interface ManagerLogin {
    username: string;
    password: string;
}

export interface ManagerLoginResponse {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
}

export enum Claims {
    NameTokenKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
    EmailTokenKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    RoleTokenKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
}

export interface LoginResponseDto {
    token: string;
    refreshToken: string;
  }

  export interface RefreshTokenResponseDto {
    accessToken: string;
    refreshToken: string;
  }

  export interface Token {
    raw: string;
    userName: string;
    email: string;
    role: string;
  }

  export enum Role {
    User = 'Cliente',
    Admin = 'Admin',
    Profissional = 'Profissional',
    
  }
  
