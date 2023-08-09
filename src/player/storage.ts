import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const key="I guess no one knows that I am using two keys for this simple game so I don't think putting the key here is dangerous. CForce is an open source project so you have many ways to get this key. Right?";

function getStorage(name: string) {
    let decrypt:{[k:string]:any}=JSON.parse(AES.decrypt(localStorage["CForce"]||"U2FsdGVkX18h7IezIum4hFS8K+sbtoVanVVs15DmeQI=",key).toString(Utf8));
    return decrypt[name];
}

function setStorage(name:string, obj: any){
    let decrypt:{[k:string]:any}=JSON.parse(AES.decrypt(localStorage["CForce"]||"U2FsdGVkX18h7IezIum4hFS8K+sbtoVanVVs15DmeQI=",key).toString(Utf8));
    decrypt[name]=obj;
    localStorage["CForce"]=AES.encrypt(JSON.stringify(decrypt),key).toString();
}

export {getStorage,setStorage};