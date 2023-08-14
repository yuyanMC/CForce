class EnhancedAudioContext {
    readonly actx: AudioContext;
    public audioBuffer: AudioBuffer;
    private volume: number;
    private url: string = "about:blank";
    public startTime = 0;

    constructor(actx: AudioContext) {
        this.actx = actx;
    }

    play() {
        this.startTime = Date.now();
        let source = this.actx.createBufferSource();
        let gainNode = this.actx.createGain();
        source.buffer = this.audioBuffer;
        source.loop = false;
        source.connect(gainNode);
        source.start(0);
        gainNode.gain.value = this.volume
        gainNode.connect(this.actx.destination)
        console.log(`[sound.ts/EnhancedAudioContext] Audio '${this.url}' played.`);
        console.debug(source, gainNode, this.actx, this.audioBuffer);
    }

    async init(arrayBuffer: ArrayBuffer) {
        let that = this;
        return this.actx.decodeAudioData(arrayBuffer, function (buffer) {
            that.audioBuffer = buffer;
        });
    }

    async load(url: string) {
        this.url = url;
        return fetch(url).then(e => e.arrayBuffer()).then(e => this.init(e)).then(e => console.log(`[sound.ts/EnhancedAudioContext] Audio '${url}' loaded.`));
    }

    setVolume(volume: number) {
        this.volume = volume;
    }
}

class SoundManager {
    private enhancedAudioContexts: EnhancedAudioContext[] = [];
    private readonly url: string;
    readonly num: number;
    loaded: boolean = false;

    constructor(url: string, num = 16) {
        this.url = url;
        this.num = num;
    }

    async load() {
        if (this.loaded) {
            throw Error("Already loaded.");
        }
        this.loaded = true;
        for (let i = 0; i < this.num; i++) {
            this.enhancedAudioContexts.push(new EnhancedAudioContext(new AudioContext()));
            await this.enhancedAudioContexts[i].load(this.url);
            console.log(`[sound.ts/SoundManager] Audio '${this.url}' loaded for #${i + 1}/${this.num}`);
        }
    }

    play() {
        console.debug(this.enhancedAudioContexts);
        for (let i = 0; i < this.num; i++) {
            if ((Date.now() - this.enhancedAudioContexts[i].startTime) > this.enhancedAudioContexts[i].audioBuffer.length / this.enhancedAudioContexts[i].audioBuffer.sampleRate) {
                this.enhancedAudioContexts[i].play();
                console.log(`[sound.ts/SoundManager] Audio '${this.url}' played for #${i + 1}/${this.num}`);
                return;
            }
        }
    }

    setVolume(volume: number) {
        for (let i = 0; i < this.num; i++) {
            this.enhancedAudioContexts[i].setVolume(volume);
        }
    }
}

export {EnhancedAudioContext, SoundManager};