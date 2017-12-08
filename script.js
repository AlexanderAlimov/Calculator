
function Calculator(id) {
	this.id=id;
	this.memory=0;
	this.operation="";
	this.replace=false;
	this.createDom();
	this.createEvent();
}
Calculator.prototype.createDom=function(){
	var calc=document.getElementById(this.id);
	if(calc==null)
		return alert("There is no ID!");
	calc.setAttribute("id","calculator");
	this.id="calculator";
	var sqrt=String.fromCharCode(8730);
	var lineButtons2=[7,8,9,"/","C"];
	var lineButtons3=[4,5,6,"*",sqrt];
	var lineButtons4=["="];
	var lineButtons5=[1,2,3,"-"];
	var lineButtons6=[0,".","+"];
	for(var i=1;i<=6;i++){
		var div=document.createElement("div");
		div.classList.add("line");
		calc.appendChild(div);
		if(i==1){
			for(var j=1;j<=2;j++){
				var input=document.createElement("input");
				input.setAttribute("type","text");
				input.setAttribute("readonly","true");
				div.appendChild(input);
				if(j==1){
					input.setAttribute("id","top");
					input.setAttribute("value","");
				}
				else{
					input.setAttribute("id","bottom");
					input.setAttribute("value","0");
				}

			}
		}
		else{
			var lineButton=null;
			if(i==2)
				lineButton=lineButtons2;
			else if(i==3)
				lineButton=lineButtons3;
			else if(i==4)
				lineButton=lineButtons4;
			else if(i==5)
				lineButton=lineButtons5;
			else
				lineButton=lineButtons6;
			for(var j=1;j<=lineButton.length;j++){
				var input =document.createElement("input");
				input.setAttribute("type","button");
				input.setAttribute("value",lineButton[j-1]);
				div.appendChild(input);
				if(lineButton[j-1]=="=")
					input.classList.add("equel");
				if(lineButton[j-1]==0)
					input.classList.add("zero");
			}
		}
	}
}
Calculator.prototype.createEvent=function(){
	var self=this;
	var top=document.getElementById("top");
	var bottom=document.getElementById("bottom");
	var calc=document.getElementById(this.id);
	if(calc==null)
		return alert("There is no ID!");
	calc.onmouseover=function(event){
		var target=event.target;
		if(target.tagName=="INPUT"&&target.getAttribute("type")=="button")
			target.classList.add("select");
	}
	calc.onmouseout=function(event){
		//var target=event.target;
		//target.classList.remove("select");
		event.target.classList.remove("select");
	}
	calc.onclick=function(event){
		var target=event.target;
		if(target.tagName!=="INPUT"&&target.getAttribute("type")!=="button")
			return alert("You missed input!");
		var value=parseInt(target.value);
		//console.log(value);
		if(!isNaN(value)){
			self.numberClick(value,bottom);
			return;
		}
		if(target.value=="+"||target.value=="-"||target.value=="*"||target.value=="/"){
			self.operationClick(target.value,top,bottom);
			return;
		}
		if(target.value=="="){
			if(self.operation=="")
				return;
			bottom.value=self.equelClick(self.operation,self.memory,+bottom.value);
			top.value="";
			self.operation="";
			self.memory=0;
			self.replace=true;
			return;
		}
		if(target.value=="C"){
			bottom.value=0;
			top.value="";
			self.operation="";
			self.memory=0;
			self.replace=true;
			return;
		}
		var sqrt=String.fromCharCode(8730);
		if(target.value==sqrt){
			bottom.value=self.sqrtClick(+bottom.value,top,target.value);
			self.operation="";
			self.replace=true;
		}
	}

}
Calculator.prototype.numberClick=function(value,input){
	if(this.replace||+input.value==0){
		input.value=value;
		this.replace=false;
	}
	else{
		input.value+=value;
	}
}
Calculator.prototype.operationClick=function(oper,top,bottom){
	top.value+=bottom.value+oper;
	this.operation=oper;
	this.memory=+bottom.value;
	this.replace=true;
}
Calculator.prototype.equelClick=function(oper,a,b){
	var operFunc={
		"+":function(a,b){
			return a+b;
		},
		"-":function(a,b){
			return a-b;
		},
		"*":function(a,b){
			return a*b;
		},
		"/":function(a,b){
			return a/b;
		}
	}
	var func = operFunc[oper];
	return func(a,b);
}
Calculator.prototype.sqrtClick=function(bottom,top,oper){
	top.value=oper+bottom;
	return bottom.value=Math.sqrt(bottom);
}

