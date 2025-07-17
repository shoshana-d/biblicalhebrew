
"use strict";


// code executed on load
//----------------------
document.addEventListener('DOMContentLoaded', function() {
   var i;

 //------------------ create page template ------------------------------
 // get first div 
   var firstDiv= document.getElementById("firstdiv");
	
 // get lesson Title from first (hidden) para in first div
   var lessonTitle = firstDiv.firstElementChild.innerHTML;
   
   
  // top menubar
   var topMenu = document.createElement("nav");
   topMenu.classList.add("navbar");
   topMenu.classList.add("w3-card-4");
   
   var a = document.createElement('a');
   var reftext = document.createTextNode("About");
   a.appendChild(reftext); 
   a.href = "lessons-index.html"; 
   topMenu.appendChild(a);
   
   var dropdown = document.createElement('div');
   dropdown.classList.add("navbar-dropdown");
   var dropdownbtn = document.createElement('button');
   dropdownbtn.classList.add("navbar-dropbtn");
   var btntext = document.createTextNode("alefbet");
   dropdownbtn.appendChild(btntext); 
   dropdownbtn.onclick = function() {showHideNavbarDropdown('navbarDropdown1')};
   dropdown.appendChild(dropdownbtn);
   
   var dropdowncontent = document.createElement('div');
   dropdowncontent.classList.add("navbar-dropdown-content");
   dropdowncontent.classList.add("hidden");
   dropdowncontent.id = 'navbarDropdown1';
   var dropdownRefs = ["lessons-alefbet.html","lessons-alefbet-exercises.html","lessons-alefbet-plus.html"];
   var dropdownRefsTexts = ["Learn alefbet","Practise alefbet","alefbet extra"];
   for (i=0; i < dropdownRefs.length; i++){
      var a = document.createElement('a');
      var reftext = document.createTextNode(dropdownRefsTexts[i]);
      a.appendChild(reftext); 
      a.href = dropdownRefs[i]; 
      dropdowncontent.appendChild(a);
   }
   dropdown.appendChild(dropdowncontent); 
   topMenu.appendChild(dropdown);
   
   var otherRefs = ["lessons.html","lessons-extra-vocabulary.html","reference-tables.html","lessons-resources.html"];
   var otherRefsTexts = ["Lessons","Extra vocabulary","Reference tables","Resources"];
   for (i=0; i < otherRefs.length; i++){
      var a = document.createElement('a');
      var reftext = document.createTextNode(otherRefsTexts[i]);
      a.appendChild(reftext); 
      a.href = otherRefs[i]; 
	  if (i==0){a.classList.add("this-page")};
      topMenu.appendChild(a);
   }	   
   document.body.prepend(topMenu);
 
 
 /* old menu 
   var topMenu = document.createElement("nav");
   topMenu.classList.add("w3-bar");
   topMenu.classList.add("w3-card-4");
   var topMenuRefs = ["index.html","alefbet.html","alefbet-exercises.html","alefbetplus.html","lessons.html","reference-tables.html","resources.html"]
   var topMenuTexts = ["About","Alefbet","Alefbet exercises","Alefbet\uFF0B","Lessons","Reference tables","Resources"]
   for (i=0; i < topMenuRefs.length; i++){
	   var a = document.createElement('a');
	   var reflink = document.createTextNode(topMenuTexts[i]);
	   a.appendChild(reflink); 
	   a.href = topMenuRefs[i]; 
	   if (i==1||i==2||i==3){
	      a.classList.add("w3-bar-item-alefbet");
	   } else {	   
	      a.classList.add("w3-bar-item");
	   }	  
	   a.classList.add("w3-button");
	   topMenu.appendChild(a);
   }   
   document.body.prepend(topMenu);
 */  

 // header
   var header = document.createElement("header");
   //header.classList.add("w3-container-h1"); 
   var headerText = document.createElement("h1");
   headerText.innerHTML = lessonTitle;
   header.appendChild(headerText);
   document.body.prepend(header);

 // main
   var main = document.getElementsByTagName("main")[0];
   main.classList.add("main-color" );
   
   
  // lists of consonants, vowels, cantillation marks
//   var listDiv = document.createElement("div");
//   listDiv.classList.add("flex-container-ltr");
//   listDiv.classList.add("flex-container-menu-items");
//   listDiv.classList.add("lessons-lists-menu-color");
   
//   var btnIds = ["btn-consonants","btn-vowels","btn-cantillation"];
//   var menuTexts = ["Consonants", "Vowels", "Cantillation marks"];
//   var listIds = ["consonants","vowels","cantillation"];

//   for (i=0; i < btnIds.length; i++){
//      var thisDiv = document.createElement("div");
//      var btn = document.createElement("span");//
//	  btn.setAttribute("id", btnIds[i]);
//	  btn.classList.add("button-plus");
//	  btn.addEventListener("click", function(){JSshowHideJsToggle(event)});
//	  thisDiv.appendChild(btn);
//	  var thisText = document.createElement("span");
//	  thisText.classList.add("lessons-help-lists");
//	  thisText.innerHTML = menuTexts[i];
//      thisDiv.appendChild(thisText);
//      listDiv.appendChild(thisDiv);
//    }
	
//   firstDiv.appendChild(listDiv);
   
//   for (i=0; i < btnIds.length; i++){
//	  var thisListDiv = document.createElement("div");
//      thisListDiv.setAttribute("id",listIds[i]);
//	  if (listIds[i] == "consonants") {
//		  var thisDiv = crConsonantsList();
//	  } else if (listIds[i] == "vowels") {
//		  var thisDiv = crVowelsList();
//	  } else if (listIds[i] == "cantillation") {
//		  var thisDiv = crCantillationList();
 //     }
//      thisDiv.classList.add("js-toggle");
//      thisDiv.classList.add("hidden");
		  
//	  thisListDiv.appendChild(thisDiv)
// 	  firstDiv.appendChild(thisListDiv);
//   }

   
 // footer
    var footer = document.createElement("footer");
	var footerContent = document.createElement("p");
	footerContent.innerHTML = "\u00A9 2023 Susan Donath ";
	footer.appendChild(footerContent);
    main.parentNode.insertBefore(footer, main.nextSibling);

   
   // create list of cantillation marks at the top of the page
   crCantillationList();
}) 

//------ template functions -------------------------------------------------
//---------------------------------------------------------------------------
function crSpacingDiv(){
       var thisDiv = document.createElement("div");	   
       var thisSpan = document.createElement("span");
       thisSpan.classList.add("example-spacing");
       thisDiv.appendChild(thisSpan);
	   return thisDiv;
}	
function crImgElement(imgName, imgDir, imgClass){
  	var imgElement = document.createElement("img");
	imgElement.src = setJpgName(imgName, imgDir);
	imgElement.classList.add(imgClass);
    return imgElement;
}	

function crConsonantsList(){
	var i;
	var colorClass = "consonant-color";
    var sound = ["silent","b","v","g","d","h","v","z","ch","t","y","k","ch","ch","l","m","m","n","n","s","silent","p","f","f","ts","ts",
   "k","r","sh","s","t"];
	var audioDir = "alefbet_consonants_and_vowels";
	var hebrew = ["\u05D0","\u05D1\u05BC","\u05D1","\u05D2","\u05D3","\u05D4","\u05D5","\u05D6","\u05D7","\u05D8","\u05D9","\u05DB\u05BC",
                   "\u05DB","\u05DA","\u05DC","\u05DE","\u05DD","\u05E0","\u05DF","\u05E1","\u05E2","\u05E4\u05BC","\u05E4","\u05E3","\u05E6",
				   "\u05E5","\u05E7","\u05E8","\u05E9\u05C1","\u05E9\u05C2","\u05EA"];
	var hebrewClass = "hebrew35" 
				   
	
	var flexdiv = document.createElement("div");
	flexdiv.classList.add("flex-container-rtl");
	flexdiv.classList.add("flex-container-heb-lessons-lists");
    flexdiv.classList.add(colorClass);
	
	 // now add contents of each flexbox cell
   for (i=0; i < hebrew.length; i++){
	  var celldiv = document.createElement("div");	
 	  
      var thisHebrew = hebrew[i];
	  var thisSound = sound[i];
	  
	  var text1= document.createTextNode(thisHebrew);
	  var span1 = document.createElement("span");
 	  span1.appendChild(text1);
	  span1.classList.add(hebrewClass);
	  span1.classList.add("clickable");
	  addsoundclickEventListener(span1);
		 
	  celldiv.appendChild(span1);
		 
	  var span2 = crAudioSpan(addAudioDirToSoundName(thisSound, audioDir));
	  celldiv.appendChild(span2);
		
	  flexdiv.appendChild(celldiv);
 		
   }	  
 
   return flexdiv;
}

function crVowelsList(){
	var i;
  
	var colorClass = "vowel-color";
    var sound = [ "a","a","a_or_o","o","o","o","ei","ei","e","e","e","i","i","u","u","uh_or_silent","ie","ie","oi","ui"];
	var audioDir = "alefbet_consonants_and_vowels";
	
	var imageDir = "vowels";
	var imageClass = "vowel-image-intext2";
	var hebrew = [ "a1","a2","a_or_o","o1","o2","o3","ei1","ei2","e1","e2","e3","i1","i2","u1","u2","uh_or_silent","ie1","ie2","oi","ui"];
	
	var flexdiv = document.createElement("div");
	flexdiv.classList.add("flex-container-rtl");
	flexdiv.classList.add("flex-container-heb-lessons-lists");
    flexdiv.classList.add(colorClass);

	 // now add contents of each flexbox cell
    for (i=0; i < hebrew.length; i++){
 	   var thisDiv = document.createElement("div");
       var thisImg = crImgElement(hebrew[i], imageDir, imageClass);	  
	   addsoundclickEventListener(thisImg);
	   thisImg.classList.add("clickable");
	   thisDiv.appendChild(thisImg);

	   thisDiv.appendChild(crAudioSpan(addAudioDirToSoundName(sound[i], audioDir)));
		
	   flexdiv.appendChild(thisDiv);
    }	  
 
    return flexdiv;
}
		
function  crCantillationList(){
	var i;
	
	var cantillationDiv = document.createElement("div");
	cantillationDiv.classList.add("flex-container-rtl");
	cantillationDiv.classList.add("flex-container-heb-lessons-lists");
 	
	var imageDir = "vowels";
	var imageClass1 = "cantillation-image-lesson";
	var cantillation1 = ["sofpasuk", "etnachta", "tipcha", "tvir", "mercha", "munach", 
	                         "mapach", "darga", "katon", "zakefgadol", "rvii", "azla", "gershayim",
							 "pazer", "kadma"];
	for (i=0; i < cantillation1.length; i++) {
		var thisDiv = document.createElement("div");
        thisDiv.appendChild(crImgElement(cantillation1[i], imageDir, imageClass1));
		cantillationDiv.appendChild(thisDiv);
	}
    cantillationDiv.appendChild(crSpacingDiv());
 
	var imageClass2 = "cantillation-image2-lesson";
	
	var thisDiv = document.createElement("div");
    thisDiv.appendChild(crImgElement("pashta", imageDir, imageClass2));
    cantillationDiv.appendChild(thisDiv);

    cantillationDiv.appendChild(crSpacingDiv());
	   
	var cantillation2 = ["segol", "zarka", "tlisha_ktana", "tlisha_gdola"];
	for (i=0; i < cantillation2.length; i++) {
		var thisDiv = document.createElement("div");
        thisDiv.appendChild(crImgElement(cantillation2[i], imageDir, imageClass2));
		cantillationDiv.appendChild(thisDiv);
	}
 	
   return cantillationDiv;
}	


