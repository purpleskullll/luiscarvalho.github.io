class Obj {
  constructor(x,y,w,h,base=''){this.x=x;this.y=y;this.w=w;this.h=h;this.base=base;
  this.frame=1;this.frameCount=4;this.ft=0;this.ftMax=8;}
  draw(ctx){
    const key=this.base+this.frame;const img=IMAGES[key]||IMAGES[this.base];
    if(img){ctx.drawImage(img,this.x,this.y,this.w,this.h);return;}
    ctx.fillStyle='magenta';ctx.fillRect(this.x,this.y,this.w,this.h);
  }
  anim(){this.ft++;if(this.ft>=this.ftMax){this.ft=0;this.frame++;if(this.frame>this.frameCount)this.frame=1;}}
}
class Abelha extends Obj{
  constructor(x,y,w,h,b='bee'){super(x,y,w,h,b);this.speed=5;this.dir=0;this.l=3;this.score=0;}
  update(){this.x+=this.dir*this.speed;if(this.x<0)this.x=0;if(this.x+this.w>window.GW)this.x=window.GW-this.w;this.anim();}
  hit(o){return(this.x<o.x+o.w&&this.x+this.w>o.x&&this.y<o.y+o.h&&this.y+this.h>o.y);}
}
class Aranha extends Obj{
  constructor(x,y,w,h,b='spider'){super(x,y,w,h,b);this.sy=2+Math.random()*2;}
  update(){this.y+=this.sy;if(this.y>window.GH)this.reset();this.anim();}
  reset(){this.y=-this.h-Math.random()*200;this.x=Math.random()*(window.GW-this.w);this.sy=2+Math.random()*3;}
}
class Flor extends Aranha{
  constructor(x,y,w,h,b='flower'){super(x,y,w,h,b);this.frameCount=2;this.sy=1+Math.random()*1.5;}
  reset(){this.y=-this.h-Math.random()*600;this.x=Math.random()*(window.GW-this.w);this.sy=1+Math.random()*2;}
}
class Bg extends Obj{
  constructor(x,y,w,h,b='bg'){super(x,y,w,h,b);}
  move(speed){this.y+=speed;if(this.y>=window.GH)this.y=-window.GH;}
  draw(ctx){
    const img=IMAGES[this.base];
    if(img){ctx.drawImage(img,this.x,this.y,this.w,this.h);return;}
    ctx.fillStyle='#0a6';ctx.fillRect(this.x,this.y,this.w,this.h);
  }
}
class Texto{
  constructor(t,x,y,f='24px Arial',c='#fff',a='left'){this.t=t;this.x=x;this.y=y;this.f=f;this.c=c;this.a=a;}
  draw(ctx){ctx.save();ctx.font=this.f;ctx.fillStyle=this.c;ctx.textAlign=this.a;ctx.fillText(this.t,this.x,this.y);ctx.restore();}
  set(t){this.t=t;}
}