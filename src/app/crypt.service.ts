import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
// @ts-ignore
import { X509 } from './lib/entry';

export interface KeyAlg {
  modulusLength: number;
  sign: string;
  hash: string;
}

export interface EncAlg {
  name: string;
  length: number;
}

export interface RemoteKeystore {
  server: string;
  ca: string;
}

export interface Config {
  same_enc_sign_cert: string;
  keyAlg: KeyAlg;
  encAlg: EncAlg;
  authURL: string;
  messageURL: string;
  renewURL: string;
  remotekeystore: RemoteKeystore;
}

@Injectable({
  providedIn: 'root'
})
export class CryptService {
  x509: X509;
  config: Config | undefined;
  private readonly handleError: HandleError;


  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
    this.x509 = new X509('myX509', true);
  }

  loadConfig(configURL: any): any {
    return this.x509.loadConfig(configURL);
  }

  getConfig(): any {
    return this.x509.getConfig();
  }

  login(credentials: any): any {
    return this.x509.login(credentials).then((data: any) => {
      return data;
    });
  }

  cryptFetch(message: any): any {
    return this.x509.cryptFetch(message).then((data: any) => {
      return data;
    });
  }

  getRandom(): any {
    return this.x509.getRandom();
  }

  genKey(): Promise<any> {
    return this.x509.genKey();
  }

  createPKCS10(keyPair: any, request: any): any {
    return this.x509.createPKCS10(keyPair, request);
  }

  setCertificate(crt: string): void {
    this.x509.setCertificate(crt);
  }

  getHeroes(configUrl: string): Observable<Config[]> {
    return this.http.get<Config[]>(configUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }
}
