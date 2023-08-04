import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
declare const crypto:any;
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }
  /**
   * @deprecated
   * Might not work in this environment
   * Using crypto
   * @param text
   */
  public encryptAES256(text:string):string {
    let salt = crypto.randomBytes(128/4);
    let iv = crypto.randomBytes(128/8);
    const cipher = crypto.createCipheriv(environment.CRYPTO_ENC_ALGO, Buffer.from(salt), iv);
    let encryptedData = cipher.update(text);
    encryptedData  = Buffer.concat([encryptedData, cipher.final()]);
    return `${salt.toString('hex')}${iv.toString('hex')}${encryptedData.toString('hex')}`;
  }

  /**
   * @deprecated
   * Using Crypto library (Might not work on this environment)
   * @param encryptData
   */
  public decryptAES256(encryptData:string):string {
    if (!encryptData) return "";
    let salt = Buffer.from(encryptData.substr(0, 64), 'hex');
    let iv = Buffer.from(encryptData.substr(64, 32), 'hex');
    let encryptedText = Buffer.from(encryptData.substr(96), 'hex');
    const decipher = crypto.createDecipheriv(environment.CRYPTO_ENC_ALGO, Buffer.from(salt), iv);
    let decryptedData = decipher.update(encryptedText);
    // @ts-ignore
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);
    return decryptedData.toString();
  }

  /**
   * Using CryptoJS
   * @param text
   */
  public encryptAES(text:string):string {
    let secret = `${environment.AES_ENCRYPTION_SECRET_KEY}`;
    let salt = CryptoJS.lib.WordArray.random(128 / 8);
    let iv = CryptoJS.lib.WordArray.random(128 / 8);
    let encrypted = CryptoJS.AES.encrypt(text, CryptoJS.PBKDF2(secret, salt, { keySize: 256 / 32, iterations: 100 }) /* key */, { iv: iv, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC })
    let transformedEncData:string = salt.toString() + iv.toString() + encrypted.ciphertext.toString();
    return encodeURIComponent(transformedEncData.replace(new RegExp('/', 'g'), '_'));
  }

  /**
   * Using CryptoJS
   * @param data
   */
  public decryptAES(data:string):string {
    let text = decodeURIComponent(data);
    text = text.replace(new RegExp('_', 'g'), '/');
    let secret = `${environment.AES_ENCRYPTION_SECRET_KEY}`;
    let key = CryptoJS.PBKDF2(secret, CryptoJS.enc.Hex.parse(text.substr(0, 32)) /* Salt */, { keySize: 256 / 32, iterations: 100 })
    let cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Hex.parse(text.substring(64))
    });
    let decrypted = CryptoJS.AES.decrypt(cipherParams /* encrypted */, key, { iv: CryptoJS.enc.Hex.parse(text.substr(32, 32)) /* iv */, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC })
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
