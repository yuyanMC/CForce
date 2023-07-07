interface _CaSingleObj{
    text:string;
    color:string|undefined;
    bold:boolean|undefined;
}
interface _CaListObj{
    [keys:string]:_CaListObj|_CaSingleObj[]
};
interface CaTextObj{
    config:{
        default_color?:string|undefined;
        default_bold?:boolean|undefined;
        auto_newline?:boolean|undefined;
    };
    [keys:string]:_CaListObj|{
        default_color?:string|undefined;
        default_bold?:boolean|undefined;
        auto_newline?:boolean|undefined;
    };
}
class CaParser{
    sr: CaTextObj;
    constructor(s:CaTextObj){
        s.config=(s.config==undefined?{}:s.config);
        s.config.default_color=(s.config.default_color==undefined?"white":s.config.default_color);
        s.config.default_bold=(s.config.default_bold==undefined?false:s.config.default_bold);
        s.config.auto_newline=(s.config.auto_newline==undefined?true:s.config.auto_newline);
        this.sr=s;
    }
    toDocumentElement(s: string[],d:any=document.createElement("div")):any|HTMLDivElement{
        let st:CaTextObj|_CaListObj|_CaSingleObj[]=this.sr;
        s.forEach((e: string)=>{
            st=(st as _CaListObj)[e] as _CaListObj|_CaSingleObj[];
            if(st==undefined){return d;}
        });
        let a=document.createElement("div");
        (st as unknown as _CaSingleObj[]).forEach((e: _CaSingleObj)=>{
            e.color=(e.color==undefined?this.sr.config.default_color:e.color);
            e.bold=(e.bold==undefined?this.sr.config.default_bold:e.bold);
            let c=document.createElement("span");
            c.style.color=e.color!;
            c.style.fontWeight=e.bold?"bold":"normal";
            c.innerHTML=e.text;
            a.append(c);
        });
        return a;
    }
    toRawHTML(s: any,d=""){
        let dElement:"default"|HTMLDivElement=this.toDocumentElement(s,"default");
        if(dElement=="default"){
            return d;
        }else{
            return dElement.innerHTML;
        }
    }
}
// export {CaParser, CaTextObj};