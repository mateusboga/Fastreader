var C = document.getElementById("C");
var ctx = C.getContext("2d");

var ding = new Audio(); ding.src = "right.wav";
var dong = new Audio(); dong.src = "wrong.wav";

var drag = 0;

var mouse = {}; countdown = 0; countcool = 30;
var timer = 0, score = 0, lastscore = 0, hiscore = {greek:0,hebrew:0,cyrillic:0};
var alphabet = []; var letter = {str:""}; var option = {37:"",40:"",39:""}; var select = 0;
var greekAlphabet = [
	{name:"Alpha",str:"\u03b1",pho:"a"},
	{name:"Beta",str:"\u03b2",pho:"v"},
	{name:"Gamma",str:"\u03b3",pho:"g"},
	{name:"Delta",str:"\u03b4",pho:"d"},
	{name:"Epsilon",str:"\u03b5",pho:"e"},
	{name:"Zeta",str:"\u03b6",pho:"z"},
	{name:"Eta",str:"\u03b7",pho:"i"},
	{name:"Theta",str:"\u03b8",pho:"th"},
	{name:"Iota",str:"\u03b9",pho:"i"},
	{name:"Kappa",str:"\u03ba",pho:"k"},
	{name:"Lambda",str:"\u03bb",pho:"l"},
	{name:"Mu",str:"\u03bc",pho:"m"},
	{name:"Nu",str:"\u03bd",pho:"n"},
	{name:"Xi",str:"\u03be",pho:"ks"},
	{name:"Omicron",str:"\u03bf",pho:"o"},
	{name:"Pi",str:"\u03c0",pho:"p"},
	{name:"Rho",str:"\u03c1",pho:"r"},
	{name:"Sigma",str:"\u03c2",pho:"s"},
	{name:"Tau",str:"\u03c4",pho:"t"},
	{name:"Upsilon",str:"\u03c5",pho:"y"},
	{name:"Phi",str:"\u03c6",pho:"f"},
	{name:"Chi",str:"\u03c7",pho:"kh"},
	{name:"Psi",str:"\u03c8",pho:"ps"},
	{name:"Omega",str:"\u03c9",pho:"o"}
]
var cyrillicAlphabet = [
	{name:"A",str:"\u0430",pho:"a"},
	{name:"Be",str:"\u0431",pho:"b"},
	{name:"Ve",str:"\u0432",pho:"v"},
	{name:"Ge",str:"\u0433",pho:"g"},
	{name:"De",str:"\u0434",pho:"d"},
	{name:"Ye",str:"\u0435",pho:"je"},
	{name:"Zhe",str:"\u0436",pho:"\u0290"},
	{name:"Ze",str:"\u0437",pho:"z"},
	{name:"I",str:"\u0438",pho:"i"},
	{name:"I Kratkoe",str:"\u0439",pho:"j"},
	{name:"Ka",str:"\u043a",pho:"k"},
	{name:"El",str:"\u043b",pho:"l"},
	{name:"Em",str:"\u043c",pho:"m"},
	{name:"En",str:"\u043d",pho:"n"},
	{name:"O",str:"\u043e",pho:"o"},
	{name:"Pe",str:"\u043f",pho:"p"},
	{name:"Er",str:"\u0440",pho:"r"},
	{name:"Es",str:"\u0441",pho:"s"},
	{name:"Te",str:"\u0442",pho:"t"},
	{name:"U",str:"\u0443",pho:"u"},
	{name:"Ef",str:"\u0444",pho:"f"},
	{name:"Kha",str:"\u0445",pho:"x"},
	{name:"Tse",str:"\u0446",pho:"ts"},
	{name:"Che",str:"\u0447",pho:"t\u0255"},
	{name:"Sha",str:"\u0448",pho:"\u0282"},
	{name:"Chsha",str:"\u0449",pho:"\u0255\u0255"},
	{name:"Yery",str:"\u044b",pho:"\u0268"},
	{name:"E",str:"\u044d",pho:"\u025b"},
	{name:"Yu",str:"\u044e",pho:"ju"},
	{name:"Ya",str:"\u044f",pho:"ja"},
]
var hebrewAlphabet = [
	{name:"Aleph",str:"\u05d0",pho:"\u0294"},
	{name:"Beth",str:"\u05d1",pho:"v"},
	{name:"Gimel",str:"\u05d2",pho:"g"},
	{name:"Daleth",str:"\u05d3",pho:"d"},
	{name:"He",str:"\u05d4",pho:"h"},
	{name:"Waw",str:"\u05d5",pho:"v"},
	{name:"Zayin",str:"\u05d6",pho:"z"},
	{name:"Heth",str:"\u05d7",pho:"\u0127"},
	{name:"Teth",str:"\u05d8",pho:"\u03b8"},
	{name:"Yod",str:"\u05d9",pho:"j"},
	{name:"Kaph",str:"\u05db",pho:"k"},
	{name:"Final Kaph",str:"\u05da",pho:"k"},
	{name:"Lamed",str:"\u05dc",pho:"l"},
	{name:"Mem",str:"\u05de",pho:"m"},
	{name:"Final Mem",str:"\u05dd",pho:"m"},
	{name:"Nun",str:"\u05e0",pho:"n"},
	{name:"Final Nun",str:"\u05df",pho:"n"},
	{name:"Samekh",str:"\u05e1",pho:"s"},
	{name:"Ayin",str:"\u05e2",pho:"\u0294"},
	{name:"Pe",str:"\u05e4",pho:"p"},
	{name:"Final Pe",str:"\u05e3",pho:"p"},
	{name:"Sadhe",str:"\u05e6",pho:"ts"},
	{name:"Final Sadhe",str:"\u05e5",pho:"ts"},
	{name:"Qoph",str:"\u05e7",pho:"q"},
	{name:"Resh",str:"\u05e8",pho:"r"},
	{name:"Shin",str:"\u05e9",pho:"\u0283"},
	{name:"Taw",str:"\u05ea",pho:"t"}
]
var ctrx, ctry;
var state = 0;

window.onload=function(){
	res();
	ctx.font = "Bold 70px Serif";
}

function res(){
	C.width = $(window).width();
	C.height = $(window).height();
}

window.setInterval(function(){
	timer+=(1/60);
	if( countdown > 0 ){ countcool--; if( countcool < 0 ){ countcool = 30; countdown-- }; }
	drag += (0-drag)/5
	
	draw();
	
	if( C.width != $(window).width() || C.height != $(window).height() ){ res(); }
},1000/60)

function draw(){
	ctrx = C.width/2; ctry = C.height/2;
	ctx.clearRect(0,0,C.width,C.height);
	if( state == 0 ){
		ctx.textAlign = "center";
		ctx.font = "Bold 50px Serif";
		ctx.fillText("Greek Alphabet [ h.s. "+hiscore.greek+" ]",ctrx,ctry-200);
		ctx.fillText("Hebrew Alphabet [ h.s. "+hiscore.hebrew+" ]",ctrx,ctry-100);
		ctx.fillText("Russian Alphabet [ h.s. "+hiscore.cyrillic+" ]",ctrx,ctry);
	}
	else if( state == 1 ){
		if( countdown <= 0 ){
			ctx.textAlign = "center";
			ctx.font = "Bold 50px Serif";
			ctx.fillText("Single Letter",ctrx,ctry-200);
		}else{
			ctx.textAlign = "center";
			ctx.font = "Bold 180px Serif";
			ctx.fillText(countdown,ctrx,ctry);
		}
	}
	else if( state == 2 ){
		s = " ";
		ctx.textAlign = "center";
		ctx.font = "Bold 180px Serif";
		if( letter.str != "undefined" ){ctx.fillText(letter.str,ctrx,ctry);}
		ctx.font = "Bold 50px Serif";
		ctx.fillText("score: "+score,ctrx,60);
		ctx.fillText(timer.toFixed(2),ctrx,100);
		ctx.font = "20px Serif";
		ctx.fillText("\u2190 A F J ",ctrx-200+drag,ctry-80);
		ctx.fillText("\u2192 D H L ",ctrx+200-drag,ctry-80);
		ctx.fillText("\u2193 S G K ",ctrx,ctry+200-drag-80);
		ctx.font = "Bold 80px Serif";
		if( select == 37 ){ if( option[37] == letter.pho ){ ctx.fillStyle = "#0a0"; }else{ ctx.fillStyle = "#a00"; } s = "";}
		ctx.fillText("["+s+option[37]+s+"]",ctrx-200+drag,ctry); ctx.fillStyle = "#000"; s = " ";
		if( select == 39 ){ if( option[39] == letter.pho ){ ctx.fillStyle = "#0a0"; }else{ ctx.fillStyle = "#a00"; } s = "";}
		ctx.fillText("["+s+option[39]+s+"]",ctrx+200-drag,ctry); ctx.fillStyle = "#000"; s = " ";
		if( select == 40 ){ if( option[40] == letter.pho ){ ctx.fillStyle = "#0a0"; }else{ ctx.fillStyle = "#a00"; } s = "";}
		ctx.fillText("["+s+option[40]+s+"]",ctrx,ctry+200-drag); ctx.fillStyle = "#000"; s = " ";
	}
	else if( state == 3 ){
		ctx.textAlign = "center";
		ctx.font = "Bold 80px Serif";
		ctx.fillText("Game Over!",ctrx,100);
		ctx.font = "Bold 50px Georgia";
		ctx.fillText("score: "+lastscore,ctrx,150);
		ctx.fillText("press any key to restart",ctrx,ctry);
		ctx.font = "Bold 30px Georgia";
		ctx.fillText("click to return to menu",ctrx,ctry+50);
	}
}

function randGlyph(){
	select = 0; timer = 0; drag = 100;
	n = Math.floor(Math.random()*alphabet.length);
	if( alphabet[n] == letter ){ n+=1 }; if( n >= alphabet.length ){ n-=alphabet.length };
	rn1 = Math.floor(Math.random()*alphabet.length); rn2 = Math.floor(Math.random()*alphabet.length);
	if( alphabet[rn1].pho == alphabet[n].pho ){ rn1+=1 };
	if( rn1 >= alphabet.length ){ rn1-=alphabet.length };
	if( alphabet[rn2].pho == alphabet[n].pho ){ rn2-=1 }; if( rn2 < 0 ){ rn2+=alphabet.length };
	if( alphabet[rn2].pho == alphabet[rn1].pho ){ rn2-=1 }; 
	letter = alphabet[n];
	
	n1 = Math.floor(Math.random()*3);
	if( n1 == 0 ){ option[37] = letter.pho; option[40] = alphabet[rn1].pho; option[39] = alphabet[rn2].pho; }
	else if( n1 == 1 ){ option[40] = letter.pho; option[37] = alphabet[rn1].pho; option[39] = alphabet[rn2].pho; }
	else if( n1 == 2 ){ option[37] = alphabet[rn1].pho; option[39] = letter.pho; option[40] = alphabet[rn2].pho; }
	
	return letter.name;
}

function answer(n){
	if( option[n] == letter.pho ){
		ding.currentTime = 0; ding.play();
		score+= Math.floor(1000/(1+timer*60));
		setTimeout(function(){
			randGlyph(); correct = false;
		},100);
		return true;
	} else{
		dong.currentTime = 0; dong.play();
		lastscore = score;
		score = 0;
		if( lastscore > hiscore.greek && alphabet == greekAlphabet ){ hiscore.greek = lastscore }
		else if( lastscore > hiscore.hebrew && alphabet == hebrewAlphabet ){ hiscore.hebrew = lastscore }
		else if( lastscore > hiscore.cyrillic && alphabet == cyrillicAlphabet ){ hiscore.cyrillic = lastscore }
		setTimeout(function(){state = 3;},100);
		return false; 
	}
}

function click(){
	if( state == 0 ){
		if( mouse.x > ctrx-300 && mouse.x < ctrx+300 && mouse.y > ctry-200-50 && mouse.y < ctry-200+50 ){
			state = 1;
			alphabet = greekAlphabet;
		}
		else if( mouse.x > ctrx-300 && mouse.x < ctrx+300 && mouse.y > ctry-100-50 && mouse.y < ctry-100+50 ){
			state = 1;
			alphabet = hebrewAlphabet;
		}
		else if( mouse.x > ctrx-300 && mouse.x < ctrx+300 && mouse.y > ctry-50 && mouse.y < ctry+50 ){
			state = 1;
			alphabet = cyrillicAlphabet;
		}
	}
	else if( state == 1 ){
		if( mouse.x > ctrx-300 && mouse.x < ctrx+300 && mouse.y > ctry-200-50 && mouse.y < ctry-200+50 ){
			countdown = 3;
			setTimeout(function(){ state = 2; randGlyph(); },(1000/60)*90);
		}
	}
	else if( state == 2 ){
		if( mouse.x > ctrx-100 && mouse.x < ctrx+100 && mouse.y > ctry+200-100 && mouse.y < ctry+200+100 ){
			answer(40); select = 40;
		}
		if( mouse.x > ctrx-200-100 && mouse.x < ctrx-200+100 && mouse.y > ctry-100 && mouse.y < ctry+100 ){
			answer(37); select = 37;
		}
		if( mouse.x > ctrx+200-100 && mouse.x < ctrx+200+100 && mouse.y > ctry-100 && mouse.y < ctry+100 ){
			answer(39); select = 39;
		}
	}
	else if( state == 3 ){
		state = 0;
	}
};

$('#C').mousedown(function(e) {
	switch (e.which) {
		case 1: //Left mouse button
			click();
			break;
		case 2: //Middle mouse button
			
			break;
		case 3: //Right mouse button
			
			break;
	}
});
window.onkeydown = function (e){
	if( state == 3 ){ state = 2; randGlyph() }
	else{
	key = e.keyCode ? e.keyCode : e.which;
	switch(key){
		case 65: case 70: case 74:
		case 37: //keyleft
			answer(37); select = 37;
			break;
		case 68: case 72: case 76:
		case 39: //keyright
			answer(39); select = 39;
			break;
		case 83: case 71: case 75:
		case 40: //keydown
			answer(40); select = 40;
			break;
		default: console.log(key);
	}}
}
window.oncontextmenu = function(){
	return false;
};
C.addEventListener('mousemove', function(evt) {
		//When the mouse is moved
		var rekt = C.getBoundingClientRect();
		mouse.x = evt.clientX - rekt.left;
		mouse.y = evt.clientY - rekt.top;
}, false);