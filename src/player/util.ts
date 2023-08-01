function calculateAngle(cx: number, cy: number, ax: number, ay: number) {
    if (ay == cy) {
        return Math.PI;
    }
    if (ay < cy) {
        return Math.PI / 2 - Math.atan((ax - cx) / (ay - cy)) + Math.PI;
    }
    return Math.PI / 2 - Math.atan((ax - cx) / (ay - cy));
}
function getQueryString(name: string) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
export {calculateAngle,getQueryString};