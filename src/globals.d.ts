declare module "./sounds/*.mp3"
declare module "./sounds/*.wav"
interface ImportMeta{
    glob(p:string|string[]):{[key:string]:(()=>Promise<any>)};
}