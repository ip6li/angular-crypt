import {AfterViewInit, Component, Injectable, OnInit} from '@angular/core';
import {Config, CryptService} from './crypt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-crypt';
  random: any;
  privateKey: string | undefined;
  publicKey: string | undefined;
  pkcs10: string | undefined;
  config: Config[];


  constructor(private x509: CryptService) {
    this.config = [];
  }

  ngOnInit(): void {
    this.getHeroes();
    this.x509.loadConfig('http://localhost:8080/config').then(() => {
      console.log('ngOnInit: %o', this.x509.getConfig());
    });
  }

  ngAfterViewInit(): void {
    const request = {
      cn: 'My CN'
    };
    setTimeout(() => {
      this.random = this.x509.getRandom();
      this.x509.genKey().then((lKey: any) => {
        this.privateKey = lKey.privateKeyPEM;
        this.publicKey = lKey.publicKeyPEM;
        try {
          this.x509.createPKCS10(lKey, request).then((lPkcs10: any) => {
            this.pkcs10 = lPkcs10;
          });
        } catch (e) {
          console.log('%o', e);
        }
      });
    });
  }

  getHeroes(): void {
    this.x509.getHeroes('http://localhost:8080/config')
      .subscribe(heroes => (this.config = heroes));
  }

  getConfig(): any {
    if (typeof this.config.length === 'undefined') {
      console.log('getConfig(): %o', this.config);
      return this.config;
    }
  }

  getRandom(): any {
    return this.random;
  }

  getPrivateKey(): string {
    return this.privateKey as string;
  }

  getPublicKey(): string {
    return this.publicKey as string;
  }

  getPKCS10(): any {
    return this.pkcs10;
  }
}
