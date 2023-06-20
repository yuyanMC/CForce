function renderText(text:string,x:number,y:number,align:CanvasTextAlign="left",fontSize:number=50,alpha:number=1){
    ctx.fillStyle=`rgba(255,255,255,${alpha})`;
    ctx.font=`${fontSize}px 'Courier New'`;
    ctx.textAlign=align;
    ctx.fillText(text,x,y);
}
bus.on("tick",t=>{
    if(t>=0&&t<=5){
        renderText("欢迎来到CForce的新手教程！",1600,900,"center",50,(t<1?t:t>4?5-t:1));
    }
    if(t>=6&&t<=10){
        renderText("<-这是判定球",(t<8?1300+t*100:2100),900,"center",50,(t<7?t-6:t>9?10-t:1));
    }
    if(t>=10&&t<=12.5){
        renderText("CForce的音符分为Click和Clack",1600,1100,"center",50,(t<11?t-10:t>11.5?12.5-t:1));
    }
    if(t>=12.5&&t<=15){
        renderText("每个音符可以出现在Track A或者Track B上",1600,1100,"center",50,(t<13.5?t-12.5:t>14?15-t:1));
    }
    if(t>=15&&t<=20){
        renderText("这是一个出现在Track A上的Click音符，在它落到判定球上时按下[A]",1600,1100,"center",50,(t<16?t-15:t>19?20-t:1));
    }
    if(t>=20&&t<=25){
        renderText("这是一个出现在Track B上的Click音符，在它落到判定球上时按下[L]",1600,1100,"center",50,(t<21?t-20:t>24?25-t:1));
    }
    if(t>=25&&t<=30){
        renderText("这是一个出现在Track A上的Clack音符，按住[A]直到音符结束（tip:别看了没做呢）",1600,1100,"center",50,(t<26?t-25:t>29?30-t:1));
    }
    if(t>=30&&t<=35){
        renderText("判定球可以移动，也可以变成多个",1600,1100,"center",50,(t<31?t-30:t>34?35-t:1));
    }
    if(t>=35&&t<=40){
        renderText("CForce的新手教程至此结束",1600,900,"center",50,(t<36?t-35:t>39?40-t:1));
    }
});
