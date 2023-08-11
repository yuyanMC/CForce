class EnhancedAudioContext{
    readonly actx: AudioContext;
    public audioBuffer: AudioBuffer;
    private volume: number=1;
    private url: string="about:blank";
    public startTime=0;
    private source: AudioBufferSourceNode;
    constructor(actx:AudioContext) {
        this.actx=actx;
        this.source = this.actx.createBufferSource();
    }
    play(t) {
        this.startTime=Date.now()-t;
        this.source = this.actx.createBufferSource();
        let gainNode = this.actx.createGain();
        this.source.buffer = this.audioBuffer;
        this.source.loop = false;
        this.source.connect(gainNode);
        this.source.start(0,t);
        gainNode.gain.value = this.volume
        gainNode.connect(this.actx.destination)
        console.log(`[sound.ts/EnhancedAudioContext] Audio '${this.url}' played.`);
    }
    pause(){
        try {
            this.source.stop();
        }catch (e) {
            console.error(e);
        }
    }
    async init(arrayBuffer:ArrayBuffer) {
        let that=this;
        this.pause();
        return this.actx.decodeAudioData(arrayBuffer, function(buffer) {
            that.audioBuffer = buffer;
        });
    }

    async load(url:string) {
        this.url=url;
        this.pause();
        return fetch(url).then(e=>e.arrayBuffer()).then(e=>this.init(e)).then(()=>console.log(`[sound.ts/EnhancedAudioContext] Audio '${url}' loaded.`));
    }
    setVolume(volume:number){
        this.volume=volume;
    }
}
class SoundManager{
    private enhancedAudioContexts:EnhancedAudioContext[]=[];
    private readonly url:string;
    readonly num:number;
    loaded:boolean=false;
    constructor(url:string,num=16) {
        this.url=url;
        this.num=num;
    }
    async load(){
        if(this.loaded){
            throw Error("Already loaded.");
        }
        this.loaded=true;
        for(let i=0;i<this.num;i++){
            this.enhancedAudioContexts.push(new EnhancedAudioContext(new AudioContext()));
            await this.enhancedAudioContexts[i].load(this.url);
            console.log(`[sound.ts/SoundManager] Audio '${this.url}' loaded for #${i+1}/${this.num}`);
        }
    }
    play(){
       console.debug(this.enhancedAudioContexts);
        for(let i=0;i<this.num;i++){
            if((Date.now()-this.enhancedAudioContexts[i].startTime)>this.enhancedAudioContexts[i].audioBuffer.length/this.enhancedAudioContexts[i].audioBuffer.sampleRate){
                this.enhancedAudioContexts[i].play(0);
                console.log(`[sound.ts/SoundManager] Audio '${this.url}' played for #${i+1}/${this.num}`);
                return;
            }
        }
    }
    setVolume(volume:number){
        for(let i=0;i<this.num;i++){
            this.enhancedAudioContexts[i].setVolume(volume);
        }
    }
}

export {EnhancedAudioContext,SoundManager};