"use strict";
;
class CaParser {
    constructor(s) {
        s.config = (s.config == undefined ? {} : s.config);
        s.config.default_color = (s.config.default_color == undefined ? "white" : s.config.default_color);
        s.config.default_bold = (s.config.default_bold == undefined ? false : s.config.default_bold);
        s.config.auto_newline = (s.config.auto_newline == undefined ? true : s.config.auto_newline);
        this.sr = s;
    }
    toDocumentElement(s, d = document.createElement("div")) {
        let st = this.sr;
        s.forEach((e) => {
            st = st[e];
            if (st == undefined) {
                return d;
            }
        });
        let a = document.createElement("div");
        st.forEach((e) => {
            e.color = (e.color == undefined ? this.sr.config.default_color : e.color);
            e.bold = (e.bold == undefined ? this.sr.config.default_bold : e.bold);
            let c = document.createElement("span");
            c.style.color = e.color;
            c.style.fontWeight = e.bold ? "bold" : "normal";
            c.innerHTML = e.text;
            a.append(c);
        });
        return a;
    }
    toRawHTML(s, d = "") {
        let dElement = this.toDocumentElement(s, "default");
        if (dElement == "default") {
            return d;
        }
        else {
            return dElement.innerHTML;
        }
    }
}
// export {CaParser, CaTextObj};
