
"use strict";

var globalSelectedConsonants = [];
var globalSelectedConsonantsSounds = [];
var globalSelectedVowels = [];
var globalSelectedVowelsSounds = [];


function clearGlobalArrays(){
    globalFlexlistHebrew.length = 0;  // declared in biblical_hebrew_flexbox_list.js
    globalFlexlistSound.length = 0;   // declared in biblical_hebrew_flexbox_list.js
    globalSelectedConsonants.length = 0;
    globalSelectedConsonantsSounds.length = 0;
    globalSelectedVowels.length = 0;
    globalSelectedVowelsSounds.length = 0;
}


//      var consonantSounds = ["silent","b","v","g","d","h","z","ch","t","y","k","l","m","n","s","p","f","ts","r","sh"];
//            var vowelSounds = ["a" ,"a_or_o", "o", "ei" ,"e", "i", "u", "ie", "oi", "ui" , "uh" ]
//var globalDragDropCPVHebrew = [];  // set in biblical_hebrew_consonant_plus_vowels if sourceglobalcpv specified
//var globalDragDropCPVSounds = [];
//------ event listeners ---------------

function addSelectLetterEventListener(element){
    // selectletter in <span>, letter in following <p> (or <span>)

   element.addEventListener("click", function() {
      this.classList.toggle("select-letter");
      hideExerciseDiv();
	  turnOffArrowSound();
   });
}

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
   hideExerciseDiv();
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
   hideExerciseDiv();
   turnOffArrowSound();
}
	
function hideExerciseDiv(){
     var thisDiv = document.getElementById("cpv-exercises1");
     if ( thisDiv == null){ return;}
     else {thisDiv.classList.add("hidden");}
	 
     var thisDiv = document.getElementById("cpv-exercises2");
     if ( thisDiv == null){ return;}
     else {thisDiv.classList.add("hidden");}
}
	
//------- function selected by clicking "create exercise" Button --------
	
function crConsonantPlusVowelExercises(consonantListId, vowelListId){
	
	// consonantListId, vowelListId ids of flexbox lists that user selects consonants and vowels from
 
   var i;
   
   var hideshowIds = ["cpv-exercises1","btn-cpv-javascript-list-shuffle","btn-cpv-javascript-list-recreate","cpv-exercises2"];
   var hideshow = [];
   for (i=0; i < hideshowIds.length; i++) {
      hideshow[i] = document.getElementById(hideshowIds[i]);
      if ( hideshow[i] == null){ return;}
      hideshow[i].classList.add("hidden");
   }
   
   clearGlobalArrays();
   
   // set global consonant and vowels from the selected letters in flexboxes consonantListId and vowelListId
   setGlobalSelectedConsonants(consonantListId);
   setGlobalSelectedVowels(vowelListId);
   
   if (globalSelectedConsonants.length == 0 | globalSelectedVowels.length == 0){
      consonantVowelModal("Please select at least one consonant and at least one vowel");
	  return;
   }
   
   // populate the global variables with the consonant+vowels combinations 
   // from tbe selected consonants and vowels in the global variables
    // NB may include duplicate sounds, doesn't matter for flexlist
   setGlobalFlexlistConsonantPlusVowel();

   if (globalFlexlistHebrew.length == 0) {
      consonantVowelModal("Consonant plus vowel does not occur in Biblical Hebrew for this selection of consonant(s) and vowel(s)");
	  return;
   } 
   
   // create arrow clickable list with consonant+vowel combinations
   //---------------------------------------------------------------
   //if ( globalSelectedConsonants.length == 1 | globalSelectedVowels.length == 1){ var show = "all" ;}
   //else                                                                         { var show = "selection";}
   hideshow[0].classList.remove("hidden");
   if (!(globalSelectedConsonants.length == 1 && globalSelectedVowels.length == 1)){
      hideshow[1].classList.remove("hidden");
      hideshow[2].classList.remove("hidden");
   }
  // if (show == "selection" & (!(globalFlexlistHebrew.length <= 15))) {hideshow[2].classList.remove("hidden");}

   //reCreateJavascriptList('cr-cpv-javascript-list', show);
   reCreateJavascriptList('cr-cpv-javascript-list');
   
   // now create the drag-drop sounds matching exercise
   //--------------------------------------------------
    
   hideshow[3].classList.remove("hidden");
   reCreateFlexDragDrop('cr-consonant-vowel2');
   
}


function setGlobalSelectedConsonants(listId){
//var globalSelectedConsonants = [];
//var globalSelectedConsonantsSounds = [];
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

function setGlobalSelectedVowels(listId){
//var globalSelectedVowels = [];
//var globalSelectedVowelsSounds = [];
   var i;
  
   var lettersList = document.getElementById(listId);
 
   if ( lettersList == null){ 
      return;
   } else {
	  var letterClass = lettersList.getElementsByClassName("select-letter");
      for (i = 0; i < letterClass.length; i++) {
         globalSelectedVowels[i] = letterClass[i].innerHTML;
         globalSelectedVowelsSounds[i] = letterClass[i].nextSibling.innerHTML;
	  }	
   }
}	
function setGlobalFlexlistConsonantPlusVowel(){
   // inputs
//var globalSelectedConsonants = [];
//var globalSelectedConsonantsSounds = [];
//var globalSelectedVowels = [];
//var globalSelectedVowelsSounds = [];
   // outputs
//var globalFlexlistHebrew = [];
//var globalFlexlistSound = [];

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
//var globalSelectedConsonants = [];
//var globalSelectedConsonantsSounds = [];
//var globalSelectedVowels = [];
//var globalSelectedVowelsSounds = [];
   // outputs
//var globalDragDropCPVHebrew = [];  
//var globalDragDropCPVSounds = [];
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

  //------- functions for consonant+vowel flexboxes---------
  //-------------------------------------------------------
	
function showSelectedLetter(element){
	var i;
    const divs = element.parentNode.parentNode.children;
    //for (i=0; i < divs.length; i++){ divs[i].classList.remove("flex-container-heb-selected"); }
    for (i=0; i < divs.length; i++){ divs[i].classList.remove("text-border"); }
    //element.parentNode.classList.add("flex-container-heb-selected");
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


