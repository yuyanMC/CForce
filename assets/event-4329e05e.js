var o=Object.defineProperty;var c=(i,t,e)=>t in i?o(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var p=(i,t,e)=>(c(i,typeof t!="symbol"?t+"":t,e),e);class h{constructor(){p(this,"map",new Map)}on(t,e){let s=this.map.get(t);s||(s=new Set,this.map.set(t,s)),s.add(e)}emit(t,e){const s=this.map.get(t);if(!s)return;[...s].forEach(a=>a(e))}}export{h as EventBus};
