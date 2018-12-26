function popupimage(img) { 
titre="Thierry Gauthier"; 
w=open("",'image','width=400,height=400,toolbar=no,scrollbars=no,resizable=no,top=0,left=300'); 
w.document.write("<html><head><title>"+titre+"</title></head>"); 
w.document.write("<script language=javascript>function checksize() { if (document.images[0].complete) { window.resizeTo(document.images[0].width+10,document.images[0].height+30); window.focus();} else { setTimeout('checksize()',250) } }</"+"script>"); 
w.document.write("<body onload='checksize()' onblur='window.close()' onclick='window.close()' leftMargin=0 topMargin=0 marginwidth=0 marginheight=0>");
w.document.write("<table width='100%' bgcolor='white' border='0' cellspacing='0' cellpadding='0' height='100%'><tr>");
w.document.write("<td valign='middle' align='center'><img src='"+img+"' border=0 alt=''>"); 
w.document.write("</td></tr></table>");
w.document.write("</body></html>"); 
w.document.close(); 
} 


/*=================================================================
Function: checkform
Purpose:  validate form
==================================================================*/

var fieldstocheck = new Array();
    fieldnames = new Array();

function checkform() {
  for (i=0;i<fieldstocheck.length;i++) {
    if (eval("document.subscribeform.elements['"+fieldstocheck[i]+"'].value") == "") {
      alert("Please enter your email /  Votre courriel S.V.P "+fieldnames[i]);
      eval("document.subscribeform.elements['"+fieldstocheck[i]+"'].focus()");
      return false;
    }
  }
}


function addFieldToCheck(value,name) {
  fieldstocheck[fieldstocheck.length] = value;
  fieldnames[fieldnames.length] = name;
}

function compareEmail()
{
  return (document.subscribeform.elements["email"].value == document.subscribeform.elements["emailconfirm"].value);
}



/*=================================================================
Function: popup
Purpose:  pop a new html window
==================================================================*/
function popup(poste,tailleW,tailleH,titleImg) {
  window.open(poste,"poste","Width="+tailleW+",Height="+tailleH+",titre="+titleImg+",scrollbars=yes,menubar=no,resizable=yes");
}


/*=================================================================
Function: newImage, ChangeImages, preloadImages
Purpose:  loading des mouseovers
==================================================================*/
function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

function changeImages() {
	if (document.images && (preloadFlag == true)) {
		for (var i=0; i<changeImages.arguments.length; i+=2) {
			document[changeImages.arguments[i]].src = changeImages.arguments[i+1];
		}
	}
}

var preloadFlag = false;
function preloadImages() {
	if (document.images) {
		home_fr_over = newImage("image/language/home_fr_over.gif");
		home_en_over = newImage("image/language/home_en_over.gif");
		preloadFlag = true;
	}
}



/*=================================================================
Function: langue
Purpose:  change /en for /fr and vice-versa for language change
==================================================================*/
function langue()
{
	var the_url = document.URL;
	if (the_url.indexOf("/en/", 0)!=-1){
		document.location = the_url.replace(/((?:\/)|(?:%2F))en\1/gi, "$1fr$1");
	}	
	else if (the_url.indexOf("/de/", 0)!=-1){
		document.location = the_url.replace(/((?:\/)|(?:%2F))de\1/gi, "$1fr$1");
	}	
	else if (the_url.indexOf("/fr/", 0)!=-1){
		document.location = the_url.replace(/((?:\/)|(?:%2F))fr\1/gi, "$1en$1");
	}
	else {
	}	
}


// <!-- 743138704
// This script is (C) Copyright 2004 Jim Tucek
// Leave these comments alone!  For more info, visit
// www.jracademy.com/~jtucek/email/ 

function drink(alchemy,box,calculation) {
alchemy += ' ';
var quality = alchemy.length;
var house = 0;
var cavern = '';
for(var science = 0; science < quality; science++) {
house = 0;
while(alchemy.charCodeAt(science) != 32) {
house = house * 10;
house = house + alchemy.charCodeAt(science)-48;
science++;
}
cavern += String.fromCharCode(hurt(house,box,calculation));
}
parent.location = 'm'+'a'+'i'+'l'+'t'+'o'+':'+cavern;
}

function fling(coordinated,extravagance,hour) {
coordinated += ' ';
var furnace = coordinated.length;
var broad = 0;
for(var wood = 0; wood < furnace; wood++) {
broad = 0;
while(coordinated.charCodeAt(wood) != 32) {
broad = broad * 10;
broad = broad + coordinated.charCodeAt(wood)-48;
wood++;
}
//document.write('&');
//document.write('#');
//document.write(hurt(broad,extravagance,hour));
document.write(String.fromCharCode(hurt(broad,extravagance,hour)));
}
}

function hurt(magic,maximum,mind) {
if (mind % 2 == 0) {
method = 1;
for(var watched = 1; watched <= mind/2; watched++) {
mile = (magic*magic) % maximum;
method = (mile*method) % maximum;
}
} else {
method = magic;
for(var optician = 1; optician <= mind/2; optician++) {
mile = (magic*magic) % maximum;
method = (mile*method) % maximum;
}
}
return method;
}