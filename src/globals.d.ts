declare module "./sounds/*.mp3";
declare module "./sounds/*.wav";
declare module "./*.vue";
interface ImportMeta{
    glob(p:string|string[]):{[key:string]:(()=>Promise<any>)};
}