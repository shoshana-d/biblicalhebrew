
"use strict";


//      var consonantSounds = ["silent","b","v","g","d","h","z","ch","t","y","k","l","m","n","s","p","f","ts","r","sh"];
//            var vowelSounds = ["a" ,"a_or_o", "o", "ei" ,"e", "i", "u", "ie", "oi", "ui" , "uh" ]
//var globalDragDropCPVHebrew = [];  // set in biblical_hebrew_consonant_plus_vowels if sourceglobalcpv specified
//var globalDragDropCPVSounds = [];
//------ event listeners ---------------


//------ functions selected by clicking buttons ----------

function selectAll(flexListId){
   var i;
   
   var lettersList = document.getElementById(flexListId);
   if (!( lettersList== null)) {
	  var letters = lettersList.getElementsByClassName("selectletterclick");
      for (i = 0; i < letters.length; i++) {
 		 letters[i].classList.remove("select-letter");
		 letters[i].classList.add("select-letter");
      }		 
   }
   hideExerciseDivs();
   turnOffArrowSound();
}


function unSelectAll(flexListId){
   var i;
   
   var lettersList = document.getElementById(flexListId);
   if (!( lettersList== null)) {
	  var letters = lettersList.getElementsByClassName("selectletterclick");
      for (i = 0; i < letters.length; i++) {
		 letters[i].classList.remove("select-letter");
      }		 
   }
   hideExerciseDivs();
   turnOffArrowSound();
}
	
function hideExerciseDivs(){
     var thisDiv = document.getElementById("cpv-exercise1-div");
     if ( thisDiv == null){ return;}
     else {thisDiv.classList.add("hidden");}
	 
     var thisDiv = document.getElementById("cpv-exercise2-div");
     if ( thisDiv == null){ return;}
     else {thisDiv.classList.add("hidden");}
	 
	turnOffArrowSound();
}
	
//------- function selected by clicking "create exercise" Button --------
	
function crConsonantPlusVowelExercises(consonantListId, vowelListId, vowelsImagesKeyId){

	// consonantListId, vowelListId ids of flexbox lists that user selects consonants and vowels from
   var i;
   
   var hideshowIds = ["cpv-exercise1-div","btn-cpv-exercise1-shuffle","btn-cpv-exercise1-recreate","cpv-exercise2-div"];
   var hideshow = [];
   for (i=0; i < hideshowIds.length; i++) {
      hideshow[i] = document.getElementById(hideshowIds[i]);
      if ( hideshow[i] == null){ return;}
      hideshow[i].classList.add("hidden");
   }


      var selected = getSelectedConsonants(consonantListId);
	  var selectedConsonants = selected[0];
	  var selectedConsonantsSounds = selected[1];
	
  
      var selected = getSelectedVowels(vowelListId, vowelsImagesKeyId);
	  var selectedVowels = selected[0];
	  var selectedVowelsSounds = selected[1];


   
   if (selectedConsonants.length == 0 | selectedVowels.length == 0){
      consonantVowelModal("Please select at least one consonant and at least one vowel");
	  return;
   }
   
    // Create consonant+vowel from user selection
	// NB may include duplicate sounds, doesn't matter for flexlist

   var flexlist = getFlexlistConsonantPlusVowel(selectedConsonants, selectedConsonantsSounds, selectedVowels, selectedVowelsSounds);

   var flexlistHebrew = flexlist[0];
   var flexlistSounds = flexlist[1];

   if (flexlistHebrew.length == 0) {
      consonantVowelModal("Consonant plus vowel does not occur in Biblical Hebrew for this selection of consonant(s) and vowel(s)");
	  return;
   } 
 

  // replace data for list creation
   replaceCVHebrew("cpv-exercise1-hebrew",flexlistHebrew);
   replaceCVSound("cpv-exercise1-sounds",flexlistSounds);
   
  
   // create arrow clickable list with consonant+vowel combinations
   //---------------------------------------------------------------
   hideshow[0].classList.remove("hidden");
   if (!(selectedConsonants.length == 1 && selectedVowels.length == 1)){
      hideshow[1].classList.remove("hidden");
      hideshow[2].classList.remove("hidden");
   }

   reCreateJavascriptList('cr-cpv-exercise1');
   
   // now create the drag-drop sounds matching exercise
   //--------------------------------------------------
   crDragDropConsonantPlusVowel();
   
   hideshow[3].classList.remove("hidden");
  
}
//-----------------------------------------------------------
function getSelectedConsonants(listId){
   var i;
   var selectedConsonants = [];
   var selectedConsonantsSounds = [];
   var lettersList = document.getElementById(listId);
   
   if ( lettersList == null){ 
      return;
   } else {
	  var letterClass = lettersList.getElementsByClassName("select-letter");
      for (i = 0; i < letterClass.length; i++) {
	     selectedConsonants[i] = letterClass[i].innerHTML;
	     selectedConsonantsSounds[i] = letterClass[i].nextSibling.innerHTML;
	  }	 
   }
   
   var selected = [selectedConsonants, selectedConsonantsSounds];
   return selected;
 }	
 
 
 function getSelectedVowels(listId,vowelsImagesKeyId){

   var i;
   var j;
  
   var selectedVowels = [];
   var selectedVowelsSounds = [];
   
   var keyListElement = document.getElementById(vowelsImagesKeyId);
   if ( keyListElement == null){ return; } 

   var keyList = keyListElement.innerHTML.split(globalDivider1);
     // vowel and image file name pairs

   
   var lettersList = document.getElementById(listId);
   if ( lettersList == null){ return;} 
   
   var letterClass = lettersList.getElementsByClassName("select-letter");
   for (i = 0; i < letterClass.length; i++) {
	  // vowels are images, need to get the image file name 
	  var imgFileName = letterClass[i].src;
	  var imgName = imgFileName.slice(imgFileName.lastIndexOf("/")+1, imgFileName.lastIndexOf("."));
	  
	  for (j = 0; j < keyList.length; j++) {
		  var thisPair = keyList[j].split(globalDivider2);
		  if (imgName == thisPair[1].trim()) {
			 selectedVowels[i] = thisPair[0];
			 break;
		  }	 
	  }	  
	  
      selectedVowelsSounds[i] = letterClass[i].nextSibling.innerHTML;
   }
   
   var selected = [selectedVowels, selectedVowelsSounds];
   return selected;

}	


 function getFlexlistConsonantPlusVowel(selectedConsonants, selectedConsonantsSounds, selectedVowels, selectedVowelsSounds){

   var i;
   var j;

   var flexlistHebrew = [];
   var flexlistSound = [];
 
   var nConsonants = selectedConsonants.length;
   var nVowels = selectedVowels.length;
   
   for (i=0; i < nConsonants; i++) {
	  var thisConsonant = selectedConsonants[i]; 
	  for (j=0; j < nVowels; j++) {
		  
          var thisVowel = selectedVowels[j];
		  var consonantPlusVowel = getConsonantPlusVowelHebrew(thisConsonant, thisVowel);
           if (!(consonantPlusVowel == null)){
		     flexlistHebrew.push(consonantPlusVowel);
	         flexlistSound.push(getConsonantPlusVowelSound(selectedConsonantsSounds[i], selectedVowelsSounds[j]));
          }
	  }	  
   }
   
   var flexlist = [flexlistHebrew, flexlistSound];
   return flexlist;

  
}


//function getDragDropConsonantPlusVowel(flexlistHebrew, flexlistSounds){
function crDragDropConsonantPlusVowel(){

  var i;
  var j;
 
   // get input created for flexlist
   var flexlistHebrew = getFromHTML( "cpv-exercise1-hebrew", true, true);
   var flexlistSounds = getFromHTML( "cpv-exercise1-sounds", false, true);
  
     // remove duplicate sounds cos matching on sound

  var hebrew = cloneArray(flexlistHebrew);
  var sounds = cloneArray(flexlistSounds);
//  test("hello from crDragDropConsonantPlusVowel,  " + sounds[hebrew.length-1]);
 
  for (i=0; i < flexlistHebrew.length; i++) { 
   
     if (!( hebrew[i] == "" )){
        var duplicateIndexes = []; 
        duplicateIndexes[0] = i; 
        var thisSound = sounds[i];	 
        for (j=i+1; j < flexlistHebrew.length; j++) { 
           if (sounds[j] == thisSound) {
			   duplicateIndexes.push(j);
           }
        }
	    var nDuplicates = duplicateIndexes.length; 
		// any duplicates?
	    if (nDuplicates > 1 ) {
			// yes, set all but one to ""
		    var duplicateIndexesShuffled = shuffleArray(duplicateIndexes);
            for (j=1; j < duplicateIndexesShuffled.length; j++) { 
			   hebrew[duplicateIndexesShuffled[j]] = "";
			   sounds[duplicateIndexesShuffled[j]] = "";
			}
	    } 
     }
  }

  var dragdropHebrew = []; 
  var dragdropSounds = []; 
  
  for (i=0; i < hebrew.length; i++) { 
      if (!(hebrew[i] == "")){
		  dragdropHebrew.push(hebrew[i]);
		  dragdropSounds.push(sounds[i]);
	  }	  
  }
//test("hello from crDragDropConsonantPlusVowel " + dragdropHebrew + "--" + dragdropSounds);
 
  // replace data for list creation
   replaceCVHebrew("cpv-exercise2-hebrew",dragdropHebrew);
   replaceCVSound("cpv-exercise2-sounds",dragdropSounds);
    
   reCreateFlexDragDrop('cr-cpv-exercise2');
 
}


 function  replaceCVHebrew(listId,flexlistHebrew){
   var i;
   
   var thisListElement = document.getElementById(listId);
   if (thisListElement==null ) { return;}	
 
   while (thisListElement.hasChildNodes()) {
     thisListElement.removeChild(thisListElement.firstChild);
   }

   for (i=0; i < flexlistHebrew.length; i++) {
	  var para = document.createElement("p");
	  para.innerHTML = flexlistHebrew[i];
	  thisListElement.appendChild(para);
   }	   
	 
 }	 


 function  replaceCVSound(listId,flexlistSound){
   var i;
   var sounds = "";
   
   var thisListElement = document.getElementById(listId);
   if (thisListElement==null ) { return;}	
 
   sounds = flexlistSound[0];
   for (i=1; i < flexlistSound.length; i++) {
	  sounds = sounds + " | " + flexlistSound[i];
   }	   
   thisListElement.innerHTML = sounds;
	 
 }	 

  //------- functions for consonant+vowel flexboxes---------
  //-------------------------------------------------------
	
function showSelectedLetter(element){
	var i;
    const divs = element.parentNode.parentNode.children;
    for (i=0; i < divs.length; i++){ divs[i].classList.remove("text-border"); }
    element.parentNode.classList.add("text-border");
}

	
function getConsonantPlusVowelHebrew(consonant, vowel){
   var consonantPlusVowel = null;
   var yod = document.getElementById("yod").innerHTML.trim();
   var vav = document.getElementById("vav").innerHTML.trim();
   var cholam = document.getElementById("cholam").innerHTML.trim();
   var schwah = document.getElementById("schwah").innerHTML.trim();
   var halfVowels = document.getElementById("half-vowels").innerHTML.split(globalDivider1);
   var gutterals = document.getElementById("gutterals").innerHTML.split(globalDivider1);
   
   var ui = document.getElementById("ui").innerHTML.trim();
   var consonantsWithUi = document.getElementById("consonants-with-ui").innerHTML.split(globalDivider1);
   var oy = document.getElementById("oy").innerHTML.trim();
   var consonantsWithOy = document.getElementById("consonants-with-oy").innerHTML.split(globalDivider1);
	
   consonant = consonant.trim();
   vowel = vowel.trim();
   
   if (inList(vowel, halfVowels)){
     if (!(inList(consonant, gutterals)) ){ return null;}
   }
   if (inList(consonant, gutterals) ){
	 if (vowel == schwah ){return null;}
   }
   if (consonant == vav && vowel == cholam) { return null;}
   
   if (vowel == ui){
     if (!(inList(consonant, consonantsWithUi)) ){ return null;}
   }   
   if (vowel == oy){
     if (!(inList(consonant, consonantsWithOy)) ){ return null;}
   }   
  
   
   if (vowel.indexOf(yod) == 0 ){  
	     var temp1 = vowel.replace(yod,"").trim();
		 consonantPlusVowel = consonant + temp1 + yod ;
   } else{
	    consonantPlusVowel = consonant + vowel;
   }	 
	
   return consonantPlusVowel;
}

function getConsonantPlusVowelSound(consonant, vowel){
   var thisConsonant = consonant.trim();
   var thisVowel = vowel.trim(); 

   if (thisConsonant == "silence"){ thisConsonant = ""; };
   if (thisConsonant == "silent") { thisConsonant = ""; } 
   
   if (thisVowel == "ie_or_a") {thisVowel = "ie";}
   else if (thisVowel == "uh_or_silent") { thisVowel = "uh";}

   var consonantPlusVowel = thisConsonant + thisVowel;
   return consonantPlusVowel;
}	

function inList(thisWord, thisList){
   var i;
   var found = false;
   for (i=0; i < thisList.length; i++) {
      if (thisWord.trim() == thisList[i].trim()) {
	     found = true;
		 break;
	  }
    }
	return found;

}




//-------No longer used-------------------------------------------------------
//--------------------------------------------------------------

function setGlobalSelectedConsonants(listId){
var globalSelectedConsonants = [];
var globalSelectedConsonantsSounds = [];
   var i;
 
   var lettersList = document.getElementById(listId);
   
   if ( lettersList == null){ 
      return;
   } else {
	  var letterClass = lettersList.getElementsByClassName("select-letter");
      for (i = 0; i < letterClass.length; i++) {
	     globalSelectedConsonants[i] = letterClass[i].innerHTML;
	     globalSelectedConsonantsSounds[i] = letterClass[i].nextSibling.innerHTML;
	  }	 
   }
 }	

function setGlobalSelectedVowels(listId,vowelsImagesKeyId){
var globalSelectedVowels = [];
var globalSelectedVowelsSounds = [];
   var i;
   var j;
  
   var keyListElement = document.getElementById(vowelsImagesKeyId);
   if ( keyListElement == null){ return; } 

   var keyList = keyListElement.innerHTML.split(globalDivider1);
     // vowel and image file name pairs

   
   var lettersList = document.getElementById(listId);
   if ( lettersList == null){ return;} 
   
   var letterClass = lettersList.getElementsByClassName("select-letter");
   for (i = 0; i < letterClass.length; i++) {
	  // vowels are images, need to get the image file name 
	  var imgFileName = letterClass[i].src;
	  var imgName = imgFileName.slice(imgFileName.lastIndexOf("/")+1, imgFileName.lastIndexOf("."));
	  
	  for (j = 0; j < keyList.length; j++) {
		  var thisPair = keyList[j].split(globalDivider2);
		  if (imgName == thisPair[1].trim()) {
			 globalSelectedVowels[i] = thisPair[0];
			 break;
		  }	 
	  }	  
	  
      globalSelectedVowelsSounds[i] = letterClass[i].nextSibling.innerHTML;
   }

}	

function setGlobalFlexlistConsonantPlusVowel(){
   // inputs
var globalSelectedConsonants = [];
var globalSelectedConsonantsSounds = [];
var globalSelectedVowels = [];
var globalSelectedVowelsSounds = [];
   // outputs
var globalFlexlistHebrew = [];
var globalFlexlistSound = [];

   var i;
   var j;
 
   var nConsonants = globalSelectedConsonants.length;
   var nVowels = globalSelectedVowels.length;
   var nGlobalItems = 0;
   
   for (i=0; i < nConsonants; i++) {
	  var thisConsonant = globalSelectedConsonants[i]; 
	  for (j=0; j < nVowels; j++) {
		  
          var thisVowel = globalSelectedVowels[j];
		  var consonantPlusVowel = getConsonantPlusVowelHebrew(thisConsonant, thisVowel);
           if (!(consonantPlusVowel == null)){
		     nGlobalItems++;
		     globalFlexlistHebrew[nGlobalItems - 1] = consonantPlusVowel;
	         globalFlexlistSound[nGlobalItems - 1] = 
			           getConsonantPlusVowelSound(globalSelectedConsonantsSounds[i], globalSelectedVowelsSounds[j]);
          }
	  }	  
   }
  
}

function setGlobalDragDropConsonantPlusVowel(){
	// create consonant+vowel from selected consonant(s) and vowel(s) with no duplicate sounds
   // inputs
var globalSelectedConsonants = [];
var globalSelectedConsonantsSounds = [];
var globalSelectedVowels = [];
var globalSelectedVowelsSounds = [];
   // outputs
var globalDragDropCPVHebrew = [];  
var globalDragDropCPVSounds = [];
  var i;
  var j;
  var ii;
  var jj;

  globalDragDropCPVHebrew.length = 0; // declared in biblical_hebrew_drag_drop.js
  globalDragDropCPVSounds.length = 0; // declared in biblical_hebrew_drag_drop.js
  
  var consonantSounds = ["silence","b","v","g","d","h","z","ch","t","y","k","l","m","n","s","p","f","ts","r","sh"];
  var vowelSounds = ["a" ,"a_or_o", "o", "ei" ,"e", "i", "u", "ie", "oi", "ui" , "uh" ]
  var selectedConsonants = [];
  var selectedVowels = [];
  for (i=0; i < consonantSounds.length; i++) { selectedConsonants[i] = "";}
  for (i=0; i < vowelSounds.length; i++) { selectedVowels[i] = "";}
  
  for (i=0; i < globalSelectedConsonants.length; i++){
	  var thisConsonant = globalSelectedConsonants[i];
	  var thisConsonantSound = globalSelectedConsonantsSounds[i];
	  for (j=0; j < consonantSounds.length; j++) {
		  if (thisConsonantSound == consonantSounds[j]) {
			  if (selectedConsonants[j].length > 0) {selectedConsonants[j] = selectedConsonants[j] + globalDivider1 + thisConsonant;}
			  else                                  {selectedConsonants[j] = thisConsonant;}
			  break;
		  }
      }		  
  }
    
  for (i=0; i < globalSelectedVowels.length; i++){
	  var thisVowel = globalSelectedVowels[i];
	  var thisVowelSound = globalSelectedVowelsSounds[i];
	  for (j=0; j < vowelSounds.length; j++) {
		  if (thisVowelSound == vowelSounds[j]) {
			  if (selectedVowels[j].length > 0) {selectedVowels[j] = selectedVowels[j] + globalDivider1 + thisVowel;}
			  else                                  {selectedVowels[j] = thisVowel;}
			  break;
		  }
      }		  
  }

  var nGlobalItems = 0;
  for (i=0; i < selectedConsonants.length; i++){
	 var thisConsonant = selectedConsonants[i].trim();

	 if (thisConsonant != "" ){
jloop:  for (j=0; j < selectedVowels.length; j++){
	       var thisVowel = selectedVowels[j].trim();
	       if ( thisVowel != ""){
		// split consonants and vowels at spaces in case more than one
	          var theseConsonants = thisConsonant.split(globalDivider1); 
	          var theseVowels = thisVowel.split(globalDivider1); 

		// randomize order of consonants and vowels if more than one
	         if (theseConsonants.length > 1){	
		        var nInGroup =  theseConsonants.length;
                var shuffleOrder = shuffleArray(createIntegerArray(0,nInGroup - 1 ));
 		        var temp = Array.from(theseConsonants); //"shallow" copy
                for (ii=0; ii < nInGroup; ii++){
		           theseConsonants[ii] = temp[shuffleOrder[ii]];
    	        }
	         }	  
	         if (theseVowels.length > 1){	
		        var nInGroup =  theseVowels.length;
                var shuffleOrder = shuffleArray(createIntegerArray(0,nInGroup - 1 ));
 		        var temp = Array.from(theseVowels); //"shallow" copy
                for (ii=0; ii < nInGroup; ii++){
		           theseVowels[ii] = temp[shuffleOrder[ii]];
    	        }
	         }	  
             for (ii=0; ii < theseConsonants.length; ii++){
             for (jj=0; jj < theseVowels.length; jj++){
		        var consonantPlusVowel = getConsonantPlusVowelHebrew(theseConsonants[ii], theseVowels[jj]);
                if (consonantPlusVowel != null){
				   nGlobalItems++;
				   globalDragDropCPVHebrew[nGlobalItems - 1] = consonantPlusVowel;
	               globalDragDropCPVSounds[nGlobalItems - 1] = 
			           getConsonantPlusVowelSound(consonantSounds[i], vowelSounds[j]);
                   continue jloop;
		        }
	         } // jj
	         }  // ii
		
	      }  // if vowel not blank	
       } // for vowel j
    } // if consonant not blank 
  } // for consonant i

}

