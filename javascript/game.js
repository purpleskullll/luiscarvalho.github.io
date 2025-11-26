window.GW=414;window.GH=736;
const cv=document.getElementById('game');const ctx=cv.getContext('2d');
window.IMAGES={};
const ASSETS=['bee1','bee2','bee3','bee4','spider1','spider2','spider3','spider4','flower1','flower2','bg','start','gameover','you win'];
let loaded=0;

function load(arr,cb){arr.forEach(n=>{let i=new Image();i.src='imagem/'+n+'.png';i.onload=()=>{IMAGES[n]=i;if(++loaded===arr.length)cb();};i.onerror=()=>{if(++loaded===arr.length)cb();};});}
const S={c:new Audio('sfx/collect.mp3'),h:new Audio('sfx/hit.mp3'),g:new Audio('sfx/gameover.mp3')};

let bee,bgs=[],sp=[],fl=[],tL,tF,tT,start=false,play=false,lose=false,win=false,t=60,n=5,ti;

load(ASSETS,init);
function init(){
 bgs=[new Bg(0,0,GW,GH,'bg'),new Bg(0,-GH,GW,GH,'bg')];
 bee=new Abelha(GW/2-32,GH-120,60,60,'bee');
 for(let i=0;i<4;i++)sp.push(new Aranha(Math.random()*(GW-60),-Math.random()*600,60,60,'spider'));
 for(let i=0;i<6;i++)fl.push(new Flor(Math.random()*(GW-40),-Math.random()*1200,40,40,'flower'));
 tL=new Texto('',15,40);tF=new Texto('',15,75);tT=new Texto('',GW-15,40,'20px Arial','#fff','right');

 window.addEventListener('keydown',e=>{
  if(e.key!=='Enter')return;
  if(!start){start=true;startGame();}
  else if(lose||win){reset();startGame();}
 });

 window.addEventListener('keydown',e=>{
  if(!play)return;
  if(e.key==='a'||e.key==='ArrowLeft')bee.dir=-1;
  if(e.key==='d'||e.key==='ArrowRight')bee.dir=1;
});
 window.addEventListener('keyup',e=>{
  if((e.key==='a'||e.key==='ArrowLeft')&&bee.dir===-1)bee.dir=0;
  if((e.key==='d'||e.key==='ArrowRight')&&bee.dir===1)bee.dir=0;
});

 requestAnimationFrame(loop);
}

function startGame(){bee.l=3;bee.score=0;t=60;lose=false;win=false;play=true;sp.forEach(s=>s.reset());fl.forEach(f=>f.reset());
 if(ti)clearInterval(ti);
 ti=setInterval(()=>{if(!play)return;t--;if(t<=0){t=0;bee.score<n?go():vict();}},1000);
}
function reset(){if(ti)clearInterval(ti);play=false;start=false;bee.x=GW/2-32;bee.y=GH-120;sp.forEach(s=>s.reset());fl.forEach(f=>f.reset());}
function go(){play=false;lose=true;if(ti)clearInterval(ti);S.g.play().catch(()=>{});}
function vict(){play=false;win=true;if(ti)clearInterval(ti);}
function hit(){sp.forEach(s=>{if(bee.hit(s)&&play){S.h.play().catch(()=>{});bee.l--;s.reset();if(bee.l<=0)go();}});fl.forEach(f=>{if(bee.hit(f)&&play){bee.score++;S.c.play().catch(()=>{});f.reset();if(bee.score>=n)vict();}});}
function upd(){if(play){bgs.forEach(b=>b.move(1));bee.update();sp.forEach(s=>s.update());fl.forEach(f=>f.update());hit();}else{bee.anim();sp.forEach(s=>s.anim());fl.forEach(f=>f.anim());}
tL.set('Vidas: '+bee.l);tF.set('Flores: '+bee.score+'/'+n);tT.set('Tempo: '+t);}
function draw(){ctx.clearRect(0,0,GW,GH);bgs.forEach(b=>b.draw(ctx));
 if(!start){
  const im=IMAGES['start'];if(im)ctx.drawImage(im,GW/2-im.width/2,GH/2-im.height/2);
  ctx.fillStyle='#fff';ctx.font='24px Arial';ctx.textAlign='center';
  return;
 }
 fl.forEach(f=>f.draw(ctx));sp.forEach(s=>s.draw(ctx));bee.draw(ctx);
 tL.draw(ctx);tF.draw(ctx);tT.draw(ctx);
 if(lose){const im=IMAGES['gameover'];if(im)ctx.drawImage(im,GW/2-im.width/2,GH/2-im.height/2);}
 if(win){
  ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,GW,GH);
  ctx.fillStyle='#ffeb3b';ctx.font='42px Arial';ctx.textAlign='center';
  ctx.fillText('PARABÉNS!',GW/2,GH/2-20);
  ctx.fillStyle='#fff';ctx.font='22px Arial';
  ctx.fillText('Você coletou todas as flores!',GW/2,GH/2+20);
  ctx.fillText('Pressione ENTER para jogar de novo',GW/2,GH/2+60);
 }
}
function loop(){upd();draw();requestAnimationFrame(loop);}