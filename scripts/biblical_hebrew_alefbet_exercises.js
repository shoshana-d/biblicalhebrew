
"use strict";
document.addEventListener('DOMContentLoaded', function() {
    var ii;
    var javascriptListClass = document.getElementsByClassName("javascript-syllables");
   for (ii = 0; ii < javascriptListClass.length; ii++) {
 	  var thisSpec = javascriptListClass[ii];
      crSyllablesExercise(thisSpec);
   }

   var javascriptListClass = document.getElementsByClassName("javascript-cantillation-list");
   for (ii = 0; ii < javascriptListClass.length; ii++) {
 	  var thisSpec = javascriptListClass[ii];
      crCantillationJavascriptList(thisSpec);
   }
   
   var javascriptListClass = document.getElementsByClassName("javascript-cantillation-exercise");
   for (ii = 0; ii < javascriptListClass.length; ii++) {
 	  var thisSpec = javascriptListClass[ii];
      crCantillationExercise(thisSpec);
   }
})

//-----------------------------------------------------------------------------------------------
// consonant+vowel exercises
//------------------------------------------------------------------------------------------------

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





//-----------------------------------------------------------------------------------------------
// cantillation exercises
//------------------------------------------------------------------------------------------------
// split string by one or more spaces
//const arr = str.trim().split(/\s+/);

function removeExistingCantillationExercise(thisSpecId){
	// thisSpecId is the id of the element with the flexbox specifications
 
   var j;
   var thisSpecElement = document.getElementById(thisSpecId);
   if (thisSpecElement==null ) { return;}	
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);
   var targetId = null;
   for (j = 0; j < parameters.length; j++) {
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 if (thisP0 == "id"){
		    targetId = thisP[1].trim();
			break;
		 } 
   }

    // now remove the list if it exists
   if (!(targetId==null )) {	// have to specify an id
	   var thisList = document.getElementById(targetId);	 
       if (!( thisList== null)) {
		  // first,turn off sound if playing because of arrow click
          turnOffArrowSound() ;	   

	   // remove list
	      thisList.parentNode.removeChild(thisList);
       }
   }
 	
}
	
function reCreateCantillationExercise(thisSpecId){
	// thisSpecId is the id of the element with the flexbox specifications
  
   // remove existing exercise (if any) 
   removeExistingCantillationExercise(thisSpecId);
   
   // now create the list again
   var thisSpecElement = document.getElementById(thisSpecId);
   if (thisSpecElement==null ) { return;}	
   crCantillationExercise(thisSpecElement);

}



function reCreateCantillationJavascriptList(thisSpecId){
	// thisSpecId is the id of the element with the flexbox specifications
   // remove existing exercise (if any) 
   removeExistingCantillationExercise(thisSpecId);

   // now create the list again
   var thisSpecElement = document.getElementById(thisSpecId);
   if (thisSpecElement==null ) { return;}	
   crCantillationJavascriptList(thisSpecElement);
	 
}

//------------------------------------------------------------------------------------------------
//--- cantillation exercise (click on stressed syllable as shown by the cantillation mark

function addStressedSyllableEventListener(element){
   // add event listener to add "stressed-syllable" class to the stressed syllable when clicked
   element.addEventListener("click", function() {
	   this.classList.add("stressed-syllable");
	   
	   if (cantillationExerciseFinished(this)) {
	       rewardModal("xx"); 
       }	  

   });
}

function cantillationExerciseFinished(thisSpec){
   // thisSpec is one of the boxes with syllables in the cantillation flexbox
   // this box has is a <span> with class cantillation-click
   // if all the elements with class cantillation-click also have class stressed-syllable then we're finished  
   var i;
   var finished = true;	
   const questionsFlexdiv = thisSpec.parentNode.parentNode.parentNode;
   const syllables = questionsFlexdiv.getElementsByClassName("cantillation-click");
   for (i = 0; i < syllables.length; i++) {
      if (!(syllables[i].classList.contains("stressed-syllable"))){
		 finished = false;
		 break;
	  }	 
   }
   return finished;
}              

function crCantillationExercise(thisSpecElement){

	// thisSpecElement is the paragraph containing the instructions for creating the cantillation exercise
	
    // For each set of inputs:
	//    - sounds specified in <p> separated by |
	//    - hebrew words divided into syllables specified in <div> separated by <p> (tooltips)
   var i;
   var j;

  // set the default specifications for the cantillation exercise 
   var sourceSyllableIds = null;
   var sourceSoundIds  = null; 
   var stress  = null;
   var targetId = null;  // the id of the list to be created
  
   var whichList = "all"
   var audioDir = "words";  

   var flexboxClass = "flex-container-ltr"; // used for all example flexboxes
   var containerClass = "flex-container-cantillation-exercise";  
   var hebrewClass = "hebrew35"; 
   var colorClass = "vocab-color";
   var tooltipsClass = "flex-container-tooltip"; 
   var nSelection = 10; //number of items to be randomly selected for each exercise
  
   // get the specifications for the cantillation exercise
  //------------------------------------------------------
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);

   for (j = 0; j < parameters.length; j++) {
	     var thisParameterSpec = parameters[j];
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 
		 if (thisP0 == "whichlist") {
		    whichList = thisP[1].trim();
         } else if(thisP0 == "sourcesyllables"){
		    sourceSyllableIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "sourcesound"){
		    sourceSoundIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "stress"){
		    stress = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "id"){
		    targetId = thisP[1].trim();
		 } else if (thisP0 == "audio"){
		    audioDir = thisP[1].trim();
         } else if (thisP0 == "selection"){
	        nSelection = thisP[1].trim();
		 } 
   }		

	
  // check same number of sources
    if (!(sourceSyllableIds.split(globalDivider2).length == sourceSoundIds.split(globalDivider2).length)) {return;}
 	if (!(sourceSoundIds.split(globalDivider2).length == stress.split(globalDivider2).length)) {return;}


    // get contents of new flexbox
    //----------------------------
	var sound0 = [];
	var syllables0 = [];
	var whichSyllable0 = [];
    for (i = 0; i < sourceSyllableIds.split(globalDivider2).length; i++) {
	   var sound1 = getFromHTML(sourceSoundIds.split(globalDivider2)[i].trim(), false);
       var syllables1 = getFromHTML(sourceSyllableIds.split(globalDivider2)[i].trim(), true);  // true cos in separate paragraphs
       var whichSyllable1 = [];
       for (j = 0; j < sound1.length; j++) {
		   whichSyllable1[j] = stress.split(globalDivider2)[i].trim();
	   }
	   sound0 = sound0.concat(sound1);
	   syllables0 = syllables0.concat(syllables1);
	   whichSyllable0 = whichSyllable0.concat(whichSyllable1);
	}	

    // check same number of items in both lists
    if (!(syllables0.length == sound0.length)) { return;}

     // randomly select nSelection items
    var syllables = [];
    var sound = [];
	var whichSyllable = [];
	   
    var selectionList = shuffleArray(createIntegerArray(0, syllables0.length-1));
	for (j=0; j < nSelection; j++) { 
	    syllables[j] = syllables0[selectionList[j]];
	    sound[j] = sound0[selectionList[j]];
	    whichSyllable[j] = whichSyllable0[selectionList[j]];
	}	 

       // now create the new flexbox
	   //---------------------------

    const flexdiv = document.createElement("div");
   
	flexdiv.classList.add(flexboxClass);
    flexdiv.classList.add(colorClass);
	flexdiv.classList.add(containerClass);
    flexdiv.setAttribute("id", targetId);
	
	 // now add contents of each flexbox cell
	 
    for (i=0; i < syllables.length; i++){
          const para1 = document.createElement("p");

	      var theseSyllables = syllables[i].trim().split(/\s+/); // split when one or more spaces, Hebrew word split into syllables
          var stressedSyllableNumber =  getStressedSyllableNumber(syllables[i], whichSyllable[i]);
          var thisHebrew = wordFromSyllables(addCantillationToStressedSyllable(syllables[i], stressedSyllableNumber, sound[i],whichList));
		  const celldiv = document.createElement("div");
          const span1 = document.createElement("span");
          const text1= document.createTextNode(thisHebrew);
	      span1.classList.add(hebrewClass);
	      span1.classList.add("soundclick");
          span1.appendChild(text1);
		  para1.appendChild(span1);
		  
          //const thisSound = audioDir + "/" + sound[i].trim();
          const span2 = document.createElement("span");
          const thisSound = addAudioDirToSoundName(sound[i], audioDir);
	      const text2= document.createTextNode(thisSound);
	      span2.classList.add("hidden");
	      span2.appendChild(text2);
          para1.appendChild(span2);
		  
          celldiv.appendChild(para1);
		  
	 
	      // create the cell with the word divided into syllables
          const para4 = document.createElement("p");
	            
		  for (j = 0; j < theseSyllables.length; j++) {
             var text0 = document.createTextNode(theseSyllables[j]);
 	         var span0 = document.createElement("span");
		     span0.classList.add("clickable");
			 if (j  == stressedSyllableNumber) {
				span0.classList.add("cantillation-click");
			 }
	         span0.appendChild(text0);
	         para4.appendChild(span0);
				   
			 // add space between syllables 	   
               //var text00 = document.createTextNode(&emsp);
             var text00 = document.createTextNode(" ");
	         var span00 = document.createElement("span");
	         span00.appendChild(text00);
	         para4.appendChild(span00);
				   
          }
		  para4.classList.add(hebrewClass);
		  para4.classList.add(tooltipsClass); // dotted border

          celldiv.appendChild(para4);
      	  
          flexdiv.appendChild(celldiv);
	}	

 // add event listeners to flexbox
   var flexdivElements =  flexdiv.getElementsByTagName("*");
   for (i=0; i < flexdivElements.length; i++){
     if (flexdivElements[i].classList.contains("soundclick")) {
		 addsoundclickEventListener(flexdivElements[i]);
	 }else  if (flexdivElements[i].classList.contains("cantillation-click")) {
		 addStressedSyllableEventListener(flexdivElements[i]);
	 }	 
	 
   } 
   

 // add flexbox to document	
   //var thisElement = document.getElementById(insertElementId);
   //thisElement.parentNode.insertBefore(flexdiv, thisElement);
   
   thisSpecElement.parentNode.insertBefore(flexdiv, thisSpecElement);

}



//-----------------------------------------------------------------------------------------------------------------------------
//   list of words with cantillation marks, can click on + to show tooltip with stressed syllable
//-----------------------------------------------------------------------------------------------------------------------------

function crCantillationJavascriptList(thisSpecElement){

	// thisSpecElement is the paragraph containing the instructions for creating the flexbox
	
	// this is a cut-down version of createJavascriptList
   var j;
   var i;

   var flexboxClass = "flex-container-rtl"; // used for all hebrew flexboxes with audio
   var containerClass = "flex-container-heb-with-tooltips";  // specifies size of gap between items, default
   var hebrewClass = "hebrew35";  // default								   
   var tooltipsClass = "flex-container-heb30-tooltip"; 
   var colorClass = "vocab-color";

   var sourceHebrewIds = null; // alternative to single source for hebrew and sound
   var sourceSoundIds = null; 
   var targetId = null;  // the id of the list to be created
   var audioDir = null;  //replaces above, name of sub-directory containing audio
   
   var hebrewGroupStressedSyllable = null;     // in cantillation specification:one value for each sourceHebrewId, values "last" "secondlast"
   
   var tooltipsSourceIds = null;
   var tooltipsGroupStressedSyllable = null;     // in tooltipsShowStress specification: one value for each tooltipsSourceIds, values "last" "secondlast"
 
   var tooltipsSeparateParas = true;  
   var hebrewSeparateParas = true;  // if true, Hebrew in separate paragraphs which are contained in a <div>
   var tooltipsShowStress = true;  // in tooltips, show individual Hebrew syllables with stressed syllable marked
                                    // requires tooltips to be divided by spaces into syllables 
   var selection =  true;
   var nSelection = 10;
   var arrow = true;

  // get the specifications for the flexbox list
  //-----------------------------------------------
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);
   for (j = 0; j < parameters.length; j++) {
	     var thisParameterSpec = parameters[j];
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 if (thisP0 == "id"){
		    targetId = thisP[1].trim();
		 } else if (thisP0 == "sourcehebrew"){
		    sourceHebrewIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "sourcesound"){
		    sourceSoundIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "audio"){
		    audioDir = thisP[1].trim();
			
		 } else if (thisP0 == "cantillation"){
		    hebrewGroupStressedSyllable = removeFirstItem(thisParameterSpec);  // allowing for possibly multiple specifications
			
		 } else if (thisP0 == "tooltips"){
		    tooltipsSourceIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "tooltipsshowstress"){
		    tooltipsGroupStressedSyllable = removeFirstItem(thisParameterSpec);  // allowing for possibly multiple specifications
			
         } else if (thisP0 == "selection"){
	        selection = true;
	        nSelection = thisP[1].trim();
		 } 
   }


   // check consistency of specifications
   //-----------------------------------   
		if (hebrewGroupStressedSyllable == null) { return;}
		if (tooltipsGroupStressedSyllable == null) { return;}

   // get contents of new flexbox
   //----------------------------
    var hebrew = [];
    var sound = [];
 	var tips = [];
	var tooltipsStressedSyllable = [];
	
	var hebrewStressedSyllable = [];

    if (sourceHebrewIds != null &  sourceSoundIds != null){
      // hebrew and sounds in separate sources  
      
	  //-- get sounds --
	    var idsArray = sourceSoundIds.split(globalDivider2);
 	    for (i=0; i < idsArray.length; i++) { 
	       var temp = getFromHTML(idsArray[i].trim(), false);
	       sound = sound.concat(temp);
	    }  
   
       //-- get hebrew--
        var idsArray = sourceHebrewIds.split(globalDivider2);
		if (cantillation){ var stressedSyllableArray = hebrewGroupStressedSyllable.split(globalDivider2);}
		
        for (i=0; i < idsArray.length; i++) { 
	       var temp1 = getFromHTML(idsArray[i].trim(), hebrewSeparateParas);
	       hebrew = hebrew.concat(temp1);
		   
		   var temp2 = [];
		   for (j=0; j < temp1.length; j++) {
			   temp2[j] = stressedSyllableArray[i];
		   }
           hebrewStressedSyllable = hebrewStressedSyllable.concat(temp2);			  
	    }  
 
    } else {  return; }

   // check that same number of items in hebrew and sound
      if (hebrew.length !=  sound.length)  { return;  }	// this is an error 

   // read in tooltips  from HTML 
	  	 var idsArray = tooltipsSourceIds.split(globalDivider2);
	  
		 var stressedSyllableArray = tooltipsGroupStressedSyllable.split(globalDivider2);
		 
 	     for (i=0; i < idsArray.length; i++) { 
	        var temp1 = getFromHTML(idsArray[i].trim(), tooltipsSeparateParas);
	        tips = tips.concat(temp1);
			
			var temp2 = [];
			for (j=0; j < temp1.length; j++) {
			   temp2[j] = stressedSyllableArray[i];
			}
            tooltipsStressedSyllable = tooltipsStressedSyllable.concat(temp2);			  
 	     } 
		 
	  // check that same number of items in tooltips as in hebrew and sound
         if (!(hebrew.length ==  tips.length) ) { return;  }	// this is an error 
 
  
     // now get final contents
	 
	  if (selection) {   // need random selection of items
         var tempHebrew = cloneArray(hebrew);
         var tempSound = cloneArray(sound);
 		 var tempHebrewStressedSyllable = cloneArray(hebrewStressedSyllable);   
		 var tempTooltips = cloneArray(tips);
		 var tempTooltipsStressedSyllable = cloneArray(tooltipsStressedSyllable);
		 
		 var nhebrew = hebrew.length;
	   
	     hebrew.length = 0;
		 sound.length = 0;
		 hebrewStressedSyllable.length = 0;
	 	 tips.length = 0;
	 	 tooltipsStressedSyllable.length = 0; 
         var selectionList = shuffleArray(createIntegerArray(0, nhebrew -1));
	 	 for (i=0; i < nSelection; i++) { 
            hebrew[i] = tempHebrew[selectionList[i]];
            sound[i] = tempSound[selectionList[i]];
       	    hebrewStressedSyllable[i] = tempHebrewStressedSyllable[selectionList[i]];
	 		tips[i] = tempTooltips[selectionList[i]];
	 	 	tooltipsStressedSyllable[i] = tempTooltipsStressedSyllable[selectionList[i]]; 
	 	 }
	  }
 
       // now create the new flexbox
	   //---------------------------
  
   var flexdiv = document.createElement("div");

   flexdiv.classList.add(flexboxClass);
   flexdiv.classList.add(containerClass);
   if (!(colorClass == null)) {flexdiv.classList.add(colorClass);}
   if (!(targetId == null)) {flexdiv.setAttribute("id", targetId);}
  
       // add arrow at start 
		var celldiv = document.createElement("div");
 
        var span = document.createElement("span");
        //span.classList.add("hebrew35");
        span.classList.add("start-audio");
		span.classList.add("arrowclick");
		
        celldiv.appendChild(span);
        flexdiv.appendChild(celldiv);
   
	 // now add contents of each flexbox cell

   for (i=0; i < hebrew.length; i++){

     //var thisHebrew = hebrew[i].trim();
	  var celldiv = document.createElement("div");	
 	  
      var thisHebrew = hebrew[i];
	  var thisSound = sound[i];
           // combine hebrew syllables into words 
      var stressedSyllableNumber =  getStressedSyllableNumber(thisHebrew, hebrewStressedSyllable[i]);
      thisHebrew = wordFromSyllables(addCantillationToStressedSyllable(thisHebrew, stressedSyllableNumber, thisSound,"all"));
//test("hello from crCantillationJavascriptList, i="+i);		 
	  var text1= document.createTextNode(thisHebrew);
	  var span1 = document.createElement("span");
 	  span1.appendChild(text1);
	  span1.classList.add(hebrewClass);
	  span1.classList.add("soundclick");
 	  celldiv.appendChild(span1);

	  var span2 = crAudioSpan(addAudioDirToSoundName(thisSound, audioDir));
	  celldiv.appendChild(span2);
		 
      var para3 = document.createElement("p");
	  para3.classList.add("button-plus-minus-tooltip"); // puts some padding at the top of the para
	  var span3 = document.createElement("span");
      span3.classList.add("button-plus");
      span3.classList.add("tooltip-button-marker"); // no CSS, just a marker
      para3.appendChild(span3);
      celldiv.appendChild(para3);
			 
      var para4 = document.createElement("p");
                
      var thisTipsArray = splitIntoArrayAtSpaces(tips[i]);
      var thisStressedSyllableNumber = getStressedSyllableNumber(tips[i],tooltipsStressedSyllable[i]);
	          
      for (j=0; j < thisTipsArray.length; j++){
		 var text1= document.createTextNode(thisTipsArray[j]);
	     var span1 = document.createElement("span");
	     if (thisStressedSyllableNumber == j ){	span1.classList.add("stressed-syllable")};
 	     span1.appendChild(text1);
         para4.appendChild(span1);
					 
		 var text2 = document.createTextNode(" ");
		 para4.appendChild(text2);
	  }	  
 	  para4.classList.add("hidden");
 	  para4.classList.add(tooltipsClass);
	  para4.classList.add("tooltip-marker");  // no CSS content, just a marker 
 
      celldiv.appendChild(para4);

 	  flexdiv.appendChild(celldiv);
 
   }	  
 
   // finished creating the celldiv with the flexbox items
   
 
   // add event listeners to flexbox
    var flexdivElements =  flexdiv.getElementsByTagName("*");
    for (i=0; i < flexdivElements.length; i++){
      if (flexdivElements[i].classList.contains("soundclick")) {
		 addsoundclickEventListener(flexdivElements[i]);
	
	  
	  } else if (flexdivElements[i].classList.contains("arrowclick")) {
		 addArrowclickEventListener(flexdivElements[i]);
 	
	  }
		  
	    // tooltips
      if (flexdivElements[i].classList.contains("tooltip-button-marker")) {
           //addShowHideNextSiblingEventListener(flexdivElements[i]);
           flexdivElements[i].addEventListener("click", function(){ShowHideParentNextSibling(event.target)});
      }

    } 

   // add flexbox to document	
   //thisElement.parentNode.insertBefore(flexdiv, thisElement);
   thisSpecElement.parentNode.insertBefore(flexdiv, thisSpecElement);
   
 
}

//--------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------
function addCantillationToStressedSyllable(syllables, stressedSyllableNumber, audio, whichList = "all")	{
   		   // combine syllables into word with random cantillation mark on stressed syllable
    var j;
	
	var theseSyllables = syllables.trim().split(/\s+/); // split when one or more spaces, Hebrew word split into syllables

	if (whichList == "all"){var thisCantillation = getCantillationCode(audio);}
	else if (whichList == "pashta-kadma"){var thisCantillation = getCantillationCodePashtaKadma();}
	
    if ((thisCantillation[0] == "pashta") && (stressedSyllableNumber == theseSyllables.length - 1)){
       // add pashta at end of last syllable   
	   theseSyllables[theseSyllables.length - 1] = theseSyllables[theseSyllables.length - 1] + "\u0599";
		
    } else {

       theseSyllables[stressedSyllableNumber] = addCantillation(theseSyllables[stressedSyllableNumber], thisCantillation[1]);
	   if (thisCantillation[0] == "pashta") { theseSyllables[theseSyllables.length - 1] = theseSyllables[theseSyllables.length - 1] + "\u0599";} 
	   if (thisCantillation[0] == "sof") { theseSyllables[theseSyllables.length - 1] = theseSyllables[theseSyllables.length - 1] + "\u05C3";} 
    }		   

    var syllablesWithCantillation = theseSyllables[0];
	if (theseSyllables.length > 1 ){
	   for (j = 1; j < theseSyllables.length ; j++) {
		  syllablesWithCantillation = syllablesWithCantillation + " ";
		  syllablesWithCantillation = syllablesWithCantillation + theseSyllables[j];
       }
	}   
    return syllablesWithCantillation;

}	


function addCantillation(inputSyllable, inputCantillation){	
   var i;		  
   var cantillationAdded = false;			  
   var letters = inputSyllable.trim().split("");
   var thisSyllable = letters[0];
   for (i=1; i < letters.length; i++){
	  if (isConsonant(letters[i])) {
		 if (!(cantillationAdded)) {thisSyllable = thisSyllable + inputCantillation;}
		 cantillationAdded = true;
      }
      thisSyllable = thisSyllable + letters[i];				  
   }
   if (!(cantillationAdded)) {thisSyllable = thisSyllable + inputCantillation;}	
   
   return thisSyllable;
}


function getCantillationCode(thisAudio = "xxxx"){
	var i;

    const cantillationCodes1 = ["\u05A5","\u05A3"];
    const cantillationNames1 = ["mercha","munach"];	
	
	  // not sof or etnachta
    const cantillationCodes2 = ["\u0596","\u059B","\u05A5","\u05A3","\u05A4","\u05A7",
	                           "\u0594","\u0595","\u0597","\u059C","\u059E","\u05A1","\u05A8","\u05A8"
							   ];
    const cantillationNames2 = ["tipcha","tvir","mercha","munach","mapach","darga",
	                           "katan","zakef gadol","rvii","azla","gershayim","pazer","kadma","pashta"
							   ];
							   
    const cantillationCodes3 = ["\u05BD","\u0591","\u0591","\u0596","\u059B","\u05A5","\u05A3","\u05A4","\u05A7",
	                           "\u0594","\u0595","\u0597","\u059C","\u059E","\u05A1","\u05A8","\u05A8"
							   ];
    const cantillationNames3 = ["sof","etnachta","etnachta","tipcha","tvir","mercha","munach","mapach","darga",
	                           "katan","zakef gadol","rvii","azla","gershayim","pazer","kadma","pashta"
							   ];
    const audio1 = ["w005_et","w005_vuhet","w007_al","w008_el","w009_asher","w013_bnei","w016_kaasher",
	                      "w024_lifnei","w028_ydei","w033_ad","w039_arei","w044_im","w060_ehn","w071_al"];
	const audio2 = ["w014_ki","w043_hinei","w043_vhinei","w072_acharei","w085_koh","w086_mah","w095_tachat","w095_mitachat"];
	
	var answer = [];
	
	var audioMatch = false;
	var thisAudio = thisAudio.trim().toLowerCase();
	
	for (i = 0; i < audio1.length; i++) {
	   if (thisAudio == audio1[i].trim().toLowerCase()){
          var codeNumber = getRandomInteger(0, cantillationCodes1.length - 1);
	      answer[0] = cantillationNames1[codeNumber];
	      answer[1] = cantillationCodes1[codeNumber];
		  audioMatch = true;
		  break;
	   }	  
	}	
		
	if (!audioMatch) {
	   for (i = 0; i < audio2.length; i++) {
	      if (thisAudio == audio2[i].trim().toLowerCase()){
             var codeNumber = getRandomInteger(0, cantillationCodes2.length - 1);
	         answer[0] = cantillationNames2[codeNumber];
	         answer[1] = cantillationCodes2[codeNumber];
		     audioMatch = true;
		     break;
		  }	 
	   }	  

       if (!audioMatch) {
          var codeNumber = getRandomInteger(0, cantillationCodes3.length - 1);
	      answer[0] = cantillationNames3[codeNumber];
	      answer[1] = cantillationCodes3[codeNumber];
	   }	   

	}	

    return answer;
 }	 

function getCantillationCodePashtaKadma(){

    const cantillationCodes = ["\u05A8","\u05A8"];
    const cantillationNames = ["kadma","pashta"];	

  // Returns a random integer from 0 to 9:
  //Math.floor(Math.random() * 10);
    var codeNumber = Math.floor(Math.random() * cantillationCodes.length);
	var answer = [];
	answer[0] = cantillationNames[codeNumber];
	answer[1] = cantillationCodes[codeNumber];
	
    return answer;
 }	 

	


function testArray(){
	var ttarray = [];
	ttarray[3] = "hello";
	test(ttarray);
	// ok
	ttarray.length = 0;
	test("this is the array with zero length:" + ttarray);
	
}	


function testCantillation(){  

  var p1 = document.getElementById("test1").innerHTML.trim();
  var p2 = document.getElementById("test2").innerHTML.trim();
  
  var cant1 = "";
  var cant2 = "";
  var list = "";
   // sof
  cant1 = "\u05BD";
   // pasuk
  cant2 = "\u05C3";
  list = list + " " + p1 + cant1 + p2 + cant2;
  
   cant2 = ""
 
 // etnachta
   cant1 = "\u0591";
  list = list + " " + p1 + cant1 + p2 + cant2;

 //tipcha
   cant1 = "\u0596";
   list = list + " " + p1 + cant1 + p2 + cant2;

 //tvir
   cant1 = "\u059B";
   list = list + " " + p1 + cant1 + p2 + cant2;
//mercha
   cant1 = "\u05A5";
   list = list + " " + p1 + cant1 + p2 + cant2;
//munach
   cant1 = "\u05A3";
   list = list + " " + p1 + cant1 + p2 + cant2;
//mapach
   cant1 = "\u05A4";
   list = list + " " + p1 + cant1 + p2 + cant2;
//darga
   cant1 = "\u05A7";
   list = list + " " + p1 + cant1 + p2 + cant2;
//katan
   cant1 = "\u0594";
   list = list + " " + p1 + cant1 + p2 + cant2;
//zakef gadol
   cant1 = "\u0595";
   list = list + " " + p1 + cant1 + p2 + cant2;
//rvii
   cant1 = "\u0597";
   list = list + " " + p1 + cant1 + p2 + cant2;
//azla
   cant1 = "\u059C";
   list = list + " " + p1 + cant1 + p2 + cant2;
//gershayim
   cant1 = "\u059E";
   list = list + " " + p1 + cant1 + p2 + cant2;
//pazer
   cant1 = "\u05A1";
   list = list + " " + p1 + cant1 + p2 + cant2;

   // kadma
  cant1 = "\u05A8";
    list = list + " " + p1 + cant1 + p2 + cant2;
 
  // pashta 
   cant1 = "\u05A8";
   cant2 = "\u0599";
   list = list + " " + p1 + cant1 + p2 + cant2;
  
 
 test(list);

}








//-----------------------------------------------------------------------------------------------
// syllables exercises
//------------------------------------------------------------------------------------------------

// -- in alefbet-exercises, exercise to divide hebrew words into syllables

function addConsonantClickEventListener(element){
   // add event listener to make the space to the left of the letter visible when clicked
   element.addEventListener("click", function() {
	   this.nextElementSibling.classList.remove("hidden");
   });
}

function addSpaceClickEventListener(element){
   // add event listener to make the space invisible when clicked
   element.addEventListener("click", function() {
	   this.classList.add("hidden");
   });
}

function addCheckClickEventListener(element){
   element.addEventListener("click", function() {
	   var i;
	   var thisIdNumber = this.parentElement.id.slice(13);   // "syllablesItem" + i
       var thisCorrectAnswer = document.getElementById("syllablesCorrectAnswer" + thisIdNumber).innerHTML;
	   var thisProposedAnswerParent = document.getElementById("syllablesProposedAnswer" + thisIdNumber);
       var thisProposedAnswer = "";
       for (i = 0; i < thisProposedAnswerParent.childElementCount; i++) {
		   if (!(thisProposedAnswerParent.children[i].classList.contains("hidden"))){
			  thisProposedAnswer = thisProposedAnswer + thisProposedAnswerParent.children[i].innerHTML;
		   }	  
	   } 
	   if ( thisProposedAnswer == thisCorrectAnswer ) {
	      this.classList.add("hidden");
	      this.nextElementSibling.classList.remove("hidden");
	      this.previousElementSibling.classList.add("hidden");
		  if (syllablesFinished(this)) {
	         rewardModal("xx"); 
	      }
       } else {
		   syllablesModal(thisCorrectAnswer);
       }	  

	  

   });
}

function syllablesFinished(thisSpec){
   // thisSpec is is the "Check" span
   // if all the elements with the tick are visible then we're finished
   var i;
   var finished = true;	
   const syllablesFlexdiv = thisSpec.parentElement.parentElement;
   const correct = syllablesFlexdiv.getElementsByClassName("tick");
   for (i = 0; i < correct.length; i++) {
      if (correct[i].classList.contains("hidden")){
		 finished = false;
		 break;
	  }	 
   }
   return finished;
}              

function reCreateSyllablesExercise(thisSpecId){
	// thisSpecId is the id of the element with the flexbox specifications

   var j;
   
   	// first, delete existing list
      // get the id of the flexbox list
   var thisSpecElement = document.getElementById(thisSpecId);
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);
   var targetId = null;
   for (j = 0; j < parameters.length; j++) {
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 if (thisP0 == "id"){
		    targetId = thisP[1].trim();
			break;
		 } 
   }
   if (targetId==null ) { return;}	// have to specify an id


    // now remove the list if it exists
   var thisList = document.getElementById(targetId);	 
   if (!( thisList== null)) {
	   // remove list
	   thisList.parentNode.removeChild(thisList);
    }
	
   // now create the list again
   crSyllablesExercise(thisSpecElement); 
}

function crSyllablesExercise(thisSpecElement){

	// thisSpecElement is the paragraph containing the instructions for creating the cantillation exercise
 
    // For each set of inputs:
	//    - sounds specified in <p> separated by |
	//    - hebrew words divided into syllables specified in <div> separated by <p> (tooltips)
    var i;
    var j;

   // set the default specifications for the syllables exercise
    var sourceSoundIds = null;
    var sourceSyllableIds = null;
	var targetId = null;
	
    var audioDir = "words";  
   
    var flexboxClass = "flex-container-ltr"; // used for all example flexboxes
    var containerClass = "flex-container-examples";  
    var hebrewClass = "hebrew35"; 
    var colorClass = "vocab-color";
    var nSelection = 10; //number of items to be randomly selected for each exercise
    //var nSelection = 0;  // use this for testing
	
   // get the specifications for the syllables exercise
  //------------------------------------------------------
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);

   for (j = 0; j < parameters.length; j++) {
	     var thisParameterSpec = parameters[j];
		 var thisP = parameters[j].split(globalDivider2);
		 var thisP0 = thisP[0].trim().toLowerCase();
		 
		 if (thisP0 == "sourcesyllables"){
		    sourceSyllableIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "sourcesound"){
		    sourceSoundIds = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
		 } else if (thisP0 == "id"){
		    targetId = thisP[1].trim();
		 } else if (thisP0 == "audio"){
		    audioDir = thisP[1].trim();
         } else if (thisP0 == "selection"){
	        nSelection = thisP[1].trim();
		 } 
   }		

   // check same number of sources
    if (!(sourceSyllableIds.split(globalDivider2).length == sourceSoundIds.split(globalDivider2).length)) {return;}

    // get contents of new flexbox
    //----------------------------
	var sound0 = [];
	var syllables0 = [];
    for (i = 0; i < sourceSyllableIds.split(globalDivider2).length; i++) {
	   var sound1 = getFromHTML(sourceSoundIds.split(globalDivider2)[i].trim(), false);
       var syllables1 = getFromHTML(sourceSyllableIds.split(globalDivider2)[i].trim(), true);  // true cos in separate paragraphs
	   sound0 = sound0.concat(sound1);
	   syllables0 = syllables0.concat(syllables1);
	}	

    // check same number of items in both lists
    if (!(syllables0.length == sound0.length)) { return;}

      // randomly select nSelection items
     var syllables = [];
     var sound = [];
	  
    if (nSelection > 0) {	  
        var selectionList = shuffleArray(createIntegerArray(0, syllables0.length-1));
	    for (j=0; j < nSelection; j++) { 
	       syllables[j] = syllables0[selectionList[j]];
	       sound[j] = sound0[selectionList[j]];
	    }	 
    } else {
		// only used when testing
	    for (j=0; j < sound0.length; j++) { 
	       syllables[j] = syllables0[j];
	       sound[j] = sound0[j];
	    }	 
    }
	
	
       // now create the new flexbox
	   //---------------------------
	   
    const flexdiv = document.createElement("div");
    
	flexdiv.classList.add(flexboxClass);
	flexdiv.classList.add(containerClass);
    flexdiv.setAttribute("id", targetId);
    if (!(colorClass == null)) {flexdiv.classList.add(colorClass);}
   
	 // now add contents of each flexbox cell
 
    for (i=0; i < syllables.length; i++){
		//var theseSyllables = syllables[i].trim().split(/\s+/); // split when one or more spaces, Hebrew word split into syllables
		               // syllables separated by a single space
		               // in case original had more than one space somewhere

		//var thisHebrewWord = "";
		//---------------------
		//for (j = 0; j < theseSyllables.length; j++) {
		//   thisHebrewWord = thisHebrewWord + theseSyllables[j];
		//}
	
		var thisHebrewWord = wordFromSyllables(syllables[i]);
		//-------------------------------------------------
		
		var thisHebrewWordInSyllables = removeExtraSpaces(syllables[i]); // in case original had more than one space somewhere
		//---------------------------------------
		          
		//for (j = 1; j < theseSyllables.length ; j++) {
		//   thisHebrewWordInSyllables = thisHebrewWordInSyllables + " ";
		//   thisHebrewWordInSyllables = thisHebrewWordInSyllables + theseSyllables[j];
		//}

		var thisHebrewWordLetters = [];
		//-------------------------
        var thisHebrewWordLettersIndex = -1;
		var letters = thisHebrewWord.trim().split("");  // divides into consonants and vowels
        var thisConsonant = letters[0];
        for (j = 1; j < letters.length; j++) {
	       if (isConsonant(letters[j])){
		      thisHebrewWordLettersIndex = thisHebrewWordLettersIndex + 1;
		      thisHebrewWordLetters[thisHebrewWordLettersIndex] = thisConsonant;
		      thisConsonant = letters[j];
	      } else {
		      thisConsonant = thisConsonant + letters[j]  ;
	      }	  
        }
        thisHebrewWordLettersIndex = thisHebrewWordLettersIndex + 1;
        thisHebrewWordLetters[thisHebrewWordLettersIndex] = thisConsonant;

        // create an item in the flexlist for this word
		  const celldiv = document.createElement("div");
          celldiv.setAttribute("id", "syllablesItem" + i);
		  
	      // create the cell with the Hebrew word to be divided, this has sound attached
          const text1= document.createTextNode(thisHebrewWord);
          const span1 = document.createElement("span");
	      span1.classList.add(hebrewClass);
	      span1.classList.add("soundclick");
          span1.appendChild(text1);
          celldiv.appendChild(span1);
 		  
          //const thisSound = audioDir + "/" + sound[i].trim();
          const thisSound = addAudioDirToSoundName(sound[i].trim(), audioDir);
	      const text2= document.createTextNode(thisSound);
          const para2 = document.createElement("para");
	      para2.classList.add("hidden");
	      para2.appendChild(text2);
          celldiv.appendChild(para2);
			  
		  const br1 = document.createElement("br");
	      celldiv.appendChild(br1);
		  const br2 = document.createElement("br");
		  celldiv.appendChild(br2);
	 
	      // create the cell with the word divided into letters (separated at consonants)
          const para3 = document.createElement("para");
	            
		  for (j = 0; j < thisHebrewWordLetters.length -1; j++) {
             var text0 = document.createTextNode(thisHebrewWordLetters[j]);
	         var span0 = document.createElement("span");
		     span0.classList.add("clickable");
		     span0.classList.add("consonantclick");
	         span0.classList.add(hebrewClass);
	         span0.appendChild(text0);
	         para3.appendChild(span0);
				   
			 // add space between letters	   
               //var text00 = document.createTextNode(&emsp);
             var text00 = document.createTextNode(" ");
	         var span00 = document.createElement("span");
	         span00.classList.add(hebrewClass);
		     span00.classList.add("clickable");
		     span00.classList.add("spaceclick");
		     span00.classList.add("hidden");
	         span00.appendChild(text00);
	         para3.appendChild(span00);
				   
          }
		     var text0 = document.createTextNode(thisHebrewWordLetters[thisHebrewWordLetters.length -1]);
	         var span0 = document.createElement("span");
		     span0.classList.add("clickable");
	         span0.appendChild(text0);
	         para3.appendChild(span0);

          para3.setAttribute("id", "syllablesProposedAnswer" + i);
		  para3.classList.add("flex-container-tooltip"); // dotted border
		  para3.classList.add(hebrewClass);
		  
          celldiv.appendChild(para3);
		  
		  const br3 = document.createElement("br");
		  celldiv.appendChild(br3);
		  const br4 = document.createElement("br");
		  celldiv.appendChild(br4);
		  
	      // create button to check whether answer correct
          const text4 = document.createTextNode("Check");
          const span4 = document.createElement("span");
	      span4.classList.add("underline");
	      span4.classList.add("soundclick");
	      span4.classList.add("checkclick");
          span4.appendChild(text4);
		  
		  celldiv.appendChild(span4);
		  
	      // create correct answer indicator
          const text5 = document.createTextNode("");
          const span5 = document.createElement("span");
	      span5.classList.add("hidden");
	      span5.classList.add("tick");
          span5.appendChild(text5);
		  
          celldiv.appendChild(span5);
		  
	      // create the cell with the correct division into syllables, for checking with proposed answer
          const text6 = document.createTextNode(thisHebrewWordInSyllables);
          const span6 = document.createElement("span");
	      span6.classList.add("hidden");
          span6.setAttribute("id", "syllablesCorrectAnswer" + i);
	      span6.classList.add(hebrewClass);
          span6.appendChild(text6);
		  
          celldiv.appendChild(span6);

           	  
          flexdiv.appendChild(celldiv);
	}	
 
 // add order to each cell (used when shuffling)
   const divs = flexdiv.children;
   for (i=0; i < divs.length; i++){ divs[i].style.order = i; }

 // add event listeners to flexbox
   var flexdivElements =  flexdiv.getElementsByTagName("*");
   for (i=0; i < flexdivElements.length; i++){
     if (flexdivElements[i].classList.contains("soundclick")) {
		 addsoundclickEventListener(flexdivElements[i]);
	 }	 
     if (flexdivElements[i].classList.contains("spaceclick")) {
		 addSpaceClickEventListener(flexdivElements[i]);
	 }	 
     if (flexdivElements[i].classList.contains("consonantclick")) {
		 addConsonantClickEventListener(flexdivElements[i]);
	 }	 
     if (flexdivElements[i].classList.contains("checkclick")) {
		 addCheckClickEventListener(flexdivElements[i]);
	 }	 
	 
   } 
   

 // add flexbox to document	
   //var thisElement = document.getElementById(insertElementId);
   //thisElement.parentNode.insertBefore(flexdiv, thisElement);
   
   thisSpecElement.parentNode.insertBefore(flexdiv, thisSpecElement);

}


// end