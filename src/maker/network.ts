const modules = import.meta.glob(['/src/*', '/src/*/*', '/src/*/*/*']);
console.log(modules);

class DynamicLoader {
    readonly dir: string;

    constructor(dir: string) {
        this.dir = dir;
    }

    async loadAsUrl(name: string): Promise<string> {
        let resource = modules[`/src/${this.dir}/${name}`];
        if (resource) {
            return (await resource()).default;
        } else {
            return "";
        }
    }

    async loadAsBase64(name: string): Promise<string> {
        return toDataUrl(await this.loadAsUrl(name));
    }
}
async function toDataUrl(url: string): Promise<string> {
    let xhr = new XMLHttpRequest();
    let p: Promise<string> = new Promise((resolve) => {
        xhr.onload = () => {
            let reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result as string);
            }
            reader.readAsDataURL(xhr.response);
        }
    });
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
    return p;
}

export {DynamicLoader};