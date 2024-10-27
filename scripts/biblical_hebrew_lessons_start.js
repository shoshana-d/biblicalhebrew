
"use strict";


// code executed on load
//----------------------
document.addEventListener('DOMContentLoaded', function() {
   var ii;
   var i;
   var j;

 //------------------ create page template ------------------------------
 
 // get first div 
   var firstDiv= document.getElementById("firstdiv");
	
 // get lesson Number from first (hidden) para in first div
   var lessonNum = firstDiv.firstElementChild.innerHTML;

 // top menubar
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
	   a.classList.add("w3-bar-item");
	   a.classList.add("w3-button");
	   topMenu.appendChild(a);
   }   
   document.body.prepend(topMenu);
   
 // header
   var header = document.createElement("header");
   header.classList.add("w3-container-h1"); 
   var headerText = document.createElement("h1");
   headerText.innerHTML = "Getting started in Biblical Hebrew: Lesson " +  lessonNum;
   header.appendChild(headerText);
   document.body.prepend(header);
 
 // main
   var main = document.getElementsByTagName("main")[0];
   main.classList.add("main-color" );
   
   
  // lists of consonants, vowels, cantillation marks
   var listDiv = document.createElement("div");
   listDiv.classList.add("flex-container-ltr");
   listDiv.classList.add("flex-container-menu-items");
   listDiv.classList.add("lessons-lists-menu-color");
   
   var btnIds = ["btn-consonants","btn-vowels","btn-cantillation"];
   var menuTexts = ["Consonants", "Vowels", "Cantillation marks"];
   var listIds = ["consonants","vowels","cantillation"];

   for (i=0; i < btnIds.length; i++){
      var thisDiv = document.createElement("div");
      var btn = document.createElement("span");
	  btn.setAttribute("id", btnIds[i]);
	  btn.classList.add("button-plus");
	  btn.addEventListener("click", function(){JSshowHideJsToggle(event)});
	  thisDiv.appendChild(btn);
	  var thisText = document.createElement("span");
	  thisText.innerHTML = menuTexts[i];
      thisDiv.appendChild(thisText);
      listDiv.appendChild(thisDiv);
    }
	
   firstDiv.appendChild(listDiv);
   
   for (i=0; i < btnIds.length; i++){
	  var thisListDiv = document.createElement("div");
      thisListDiv.setAttribute("id",listIds[i]);
	  if (listIds[i] == "consonants") {
		  var thisDiv = crConsonantsList();
	  } else if (listIds[i] == "vowels") {
		  var thisDiv = crVowelsList();
	  } else if (listIds[i] == "cantillation") {
		  var thisDiv = crCantillationList();
      }
      thisDiv.classList.add("js-toggle");
      thisDiv.classList.add("hidden");
		  
	  thisListDiv.appendChild(thisDiv)
 	  firstDiv.appendChild(thisListDiv);
   }

   
 // footer
    var footer = document.createElement("footer");
	var footerContent = document.createElement("p");
	footerContent.innerHTML = "\u00A9 2023 Susan Donath ";
	footer.appendChild(footerContent);
    main.parentNode.insertBefore(footer, main.nextSibling);

//---------------------------------------------------------------------------
 
      //--------- code relating to content created in HTML ------------------------	
      //---------------------------------------------------------------------------
 
   var soundclickClass = document.getElementsByClassName("soundclick");
   for (j = 0; j < soundclickClass.length; j++) {addsoundclickEventListener(soundclickClass[j]);}
 
 

   //------ code creating content----------------------------------------
   //-------------------------------------------------------------------

     // create the clickable flexbox lists in JS  (includes event listeners)  
     //  (ii required, i doesn't work, seems to get reset in function that's called)
     //  June 2022. Was because i was not declared in called function so became global
	 //  Now using "use strict;" everywhere to avoid this happening again
 
   var javascriptListClass = document.getElementsByClassName("javascript-list");
   for (ii = 0; ii < javascriptListClass.length; ii++) {
	  
 	  var thisSpec = javascriptListClass[ii];
      createJavascriptList(thisSpec); 
   }


  // ------- extra just for lessons ---------------------------
  //-----------------------------------------------------------

   //------ code creating content----------------------------------------
   //-------------------------------------------------------------------
   
   // create list of cantillation marks at the top of the page
   crCantillationList();
   
    // verb reference tables
   //----------------------
    // create generic verb reference table
   var onloadTable = document.getElementsByClassName("onload-generic-verb-reference-table");
   for (ii = 0; ii < onloadTable.length; ii++) {
	  var thisDiv = onloadTable[ii];
      crGenericVerbReferenceTable(thisDiv);
   }

    // create  verb reference tables

   var onloadTable = document.getElementsByClassName("onload-verb-reference-table");
   for (ii = 0; ii < onloadTable.length; ii++) {
	  var thisDiv = onloadTable[ii];
	// amar  	  
	  if (onloadTable[ii].classList.contains("amar")) {  crAmarVerbReferenceTable(thisDiv);}
	  else if (onloadTable[ii].classList.contains("haya")) {  crHayaVerbReferenceTable(thisDiv);}
 
	}

    // other reference tables
   //----------------------
    // create possessive suffix reference table
   var onloadTable = document.getElementsByClassName("onload-possessive-suffix-table");
   for (ii = 0; ii < onloadTable.length; ii++) {
	  var thisDiv = onloadTable[ii];
      crPossessiveSuffixTable(thisDiv);
   }

    // create object suffix reference table
   var onloadTable = document.getElementsByClassName("onload-object-suffix-table");
   for (ii = 0; ii < onloadTable.length; ii++) {
	  var thisDiv = onloadTable[ii];
      crObjectSuffixOnPrepositionReferenceTable(thisDiv);
   }



   // create the exercise table(s) in JS (includes event listeners) 
     // new version where click on word  in the hebrew, if correct, word is outlined 
	 // ONLY USED IN INDIVIDUAL LESSONS
   var onloadTable = document.getElementsByClassName("onload-exercise-table");
   for (ii = 0; ii < onloadTable.length; ii++) {
 	  var thisDiv = onloadTable[ii];
      createExerciseTable(thisDiv);
   }
 
     // original tables with click button to show answer (not currently in use)   
  // var onloadExerciseTable = document.getElementsByClassName("onload-exercise-table-button");
  // for (ii = 0; ii < onloadExerciseTable.length; ii++) {
 //	  var thisDiv = onloadExerciseTable[ii];
 //     createExerciseTableButton(thisDiv);
 //  }
   

     // create Lesson 1 exercise (who spoke to whom)   
   var onloadLesson1Exercise = document.getElementsByClassName("onload-lesson1-exercise");
   for (ii = 0; ii < onloadLesson1Exercise.length; ii++) {
	  var thisDiv = onloadLesson1Exercise[ii];
      createLesson1Exercise(thisDiv);
   }	

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
	flexdiv.classList.add("flex-container-heb-lessons");
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
	flexdiv.classList.add("flex-container-heb-lessons");
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
	cantillationDiv.classList.add("flex-container-heb-lessons");
 	
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


