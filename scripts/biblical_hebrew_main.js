
"use strict";

// conversions
//http://www.javascripter.net/faq/mathsymbols.htm
// left-pointing arrow: HTML:&#8678; Unicode:\u21e6
// thinspace: HTML: &thinsp; or &#8201;  Unicode:\u2009
// enspace: HTML: &ensp; or &#8194;  Unicode:\u2002
// hebrew yod: HTML: &#1497;  Unicode: \u05D9
	  	 //thisP = thisP.split(/\s+/); split by one or more spaces
		 
var globalAudioFolder = "audio";
//var globalCVAudioSubfolder = "consonants_and_vowels";

// characters used for dividing lists into components
var globalDivider1 = "|";
var globalDivider2 = ":";
		 
function test(text){
  var thistest = document.getElementById("mytest");
  if (thistest != null) {thistest.innerHTML = text;}
}

// code executed on load
//----------------------
document.addEventListener('DOMContentLoaded', function() {
    var ii;
	var i;
	var j;
	  	
	// sigh.. not used any more (sfter all that work)
  // create the table of contents
  //const tocSidenav = document.getElementById("TOCSidenav");
  //if (!(tocSidenav == null)) {   createTOC();}.
	
  //--------- code relating to content created in HTML ------------------------	
  //---------------------------------------------------------------------------
  
  // add event listeners to the lists which have been created in HTML 
  // (event listeners for lists created in JS are added when the list is created)

                // in alefbet, alefbet+, not in alefbet-exercises
   var soundclickClass = document.getElementsByClassName("soundclick");
   for (j = 0; j < soundclickClass.length; j++) {addsoundclickEventListener(soundclickClass[j]);}
 
                // only in alefbet
   var soundclickClass = document.getElementsByClassName("arrowclick");
   for (j = 0; j < soundclickClass.length; j++) {
	   addArrowclickEventListener(soundclickClass[j]);
   }
	
                // only in alefbet
  // var soundclickClass = document.getElementsByClassName("arrowbyorderclick");
  // for (j = 0; j < soundclickClass.length; j++) {
  //  // add order to each div which has "soundclick" class
  //      // This is required to make the arrow work
//	   addOrderToFlexdiv(soundclickClass[j].parentElement.parentElement);
//	   addArrowclickEventListener(soundclickClass[j],"arrowbyorder");
  // }

 
  // add event listeners to the headings to show/hide following div
  
   var soundclickClass = document.getElementsByClassName("showhidenextsiblingclick");
   for (j = 0; j < soundclickClass.length; j++) {
	   addShowHideNextSiblingEventListener(soundclickClass[j]);
   }

   // add event listeners to the headings in alefbet-exercises to show/hide selected exercise
  
   var soundclickClass = document.getElementsByClassName("showhidemenuitem");
   for (j = 0; j < soundclickClass.length; j++) {
        addShowHideMenuItemEventListener(soundclickClass[j]);
	}

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

   // create the drag drop flexboxes in JS  (includes event listeners) 
   //  only in alefbet-exercises 
   var onloadDragClass = document.getElementsByClassName("onload-flex-drag-drop");
   for (ii = 0; ii < onloadDragClass.length; ii++) {
    //var thisId = onloadDragClass[ii].id;
      //createFlexDragDrop(thisId);
      var thisSpec = onloadDragClass[ii];
      createFlexDragDrop(thisSpec);
   }	
  

   // only in alefbet-exercises
   //var thisSpec = document.getElementById("cr-syllables-exercise");
   //if (!(thisSpec == null)) { createSyllablesExercise("syllables-exercise"); }
   // only in alefbet-exercises
   var javascriptListClass = document.getElementsByClassName("javascript-syllables");
   for (ii = 0; ii < javascriptListClass.length; ii++) {
 	  var thisSpec = javascriptListClass[ii];
      crSyllablesExercise(thisSpec);
   }


   // only in alefbet-exercises
   var javascriptListClass = document.getElementsByClassName("javascript-cantillation");
   for (ii = 0; ii < javascriptListClass.length; ii++) {
 	  var thisSpec = javascriptListClass[ii];
      crCantillationList(thisSpec);
   }
   
   
   // create the exercise table(s) in JS (includes event listeners) 
     // new version where click on word  in the hebrew, if correct, word is outlined 
	 // ONLY USED IN INDIVIDUAL LESSONS
   var onloadExerciseTable = document.getElementsByClassName("onload-exercise-table");
   for (ii = 0; ii < onloadExerciseTable.length; ii++) {
 	  var thisDiv = onloadExerciseTable[ii];
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
//---------------------------------------------------------------------------


//---- audio (used in all pages)-------------------------
//--------------------------------------------------------

         //---- functions to add event listeners ------------------

function addsoundclickEventListener(element){  
	 // soundclick letter(s) in <span>, letter in following <p> (or <span>) ie next sibling
	 // pathname must be included in the sound reference
   element.addEventListener("click", function() {
       var thisLetter =  this.nextElementSibling.innerHTML;
	   var thisSound = setMp3Name(thisLetter);
	   playSound(thisSound);
   });
}


function addArrowclickEventListener(element){
   // add event listener to arrow at start (RHS) of lists
   element.addEventListener("click", function() {
	  var thisArrow = this;
	  playConsonants1(thisArrow);
   });
}

  //WHERE IS THIS USED??
//function addSoundclick4EventListener(element){
   // soundclick in td element of table, letter in paragraph after textnode with cell text, but within td element
//    element.addEventListener("click", function() {
//       var thisLetter =  this.childNodes[1].innerHTML;
//	   playSound(thisLetter);
 //  });
//}
    //-------- code for playing sounds --------- 
function playSound(sound){
	// expects sound to have directory pathname and .mp3
	   const music = new Audio(sound);
       music.play();
}  

   //-------- utility function to set pathname and add .mp3 to name of soundfile
   //                (name already includes sub-directory where soundfile located)
   //  called from playConsonants2 and addsoundclickEventListener
	
function setMp3Name(thisName){
    var thisMp3 = globalAudioFolder + "/" + thisName.trim() + ".mp3";
  
    return thisMp3;
}

   //-------- utility function to add sub-directory pathname where soundfile located to name of soundfile
   //  called from createJavascriptListFlexbox
function addAudioDirToSoundName(thisName, audioDir){
	
   //var thisAudio = audioDir + "/" + thisName;
 	
	if (audioDir == null) { var thisAudio =  thisName.trim(); }
    else                  { var thisAudio = audioDir.trim() + "/" + thisName.trim();}

    return thisAudio;
}	

       
   //------ play sounds in order after clicking arrow at start of flexlist---
   //----- play items with class "soundclick" in order in flexbox
   //------------------------------------------------------------------
function playConsonants1(thisArrow){
	
   var i;
   var container = thisArrow.parentElement.parentElement;
   
   var audioItems = [];
   var audioItemsCollection = container.getElementsByClassName("soundclick");
   for (i=0; i < audioItemsCollection.length; i++){
       audioItems[i] = audioItemsCollection[i];
   }	  
   
   if (thisArrow.classList.contains("flex-container-arrow-selected")){
        // arrow has already been clicked, second click stops playing
 	 thisArrow.classList.add("stop-sound");
   }else{
        // start
    thisArrow.classList.toggle("flex-container-arrow-selected");
    audioItems[0].classList.toggle("text-border");
    playConsonants2(thisArrow,audioItems, 0);
   }	
}

function playConsonants2(thisArrow,audioItems,  itemNumber){

	  var thisElement = audioItems[itemNumber];
	  var thisItem = thisElement.nextElementSibling.innerHTML;
	  var thisMp3 = setMp3Name(thisItem);
      const music = new Audio(thisMp3);
	  music.addEventListener("ended", function() {
        playConsonants3(thisArrow,audioItems,  itemNumber);
      },{ once: true });
      music.play();
}
 
function playConsonants3(thisArrow,audioItems,  itemNumber){
   audioItems[itemNumber].classList.toggle("text-border");
   if (thisArrow.classList.contains("stop-sound")){// the arrow at the beginning
      thisArrow.classList.remove("stop-sound");
      thisArrow.classList.remove("flex-container-arrow-selected"); 
   }else{
	 itemNumber++;
     if (itemNumber < audioItems.length) {
       audioItems[itemNumber].classList.toggle("text-border");
       playConsonants2(thisArrow,audioItems,  itemNumber);
     }else{
       thisArrow.classList.remove("flex-container-arrow-selected"); // the arrow at the beginning
     } 
   }	 
} 




//-------- utility functions -----------------
//---------------------------------------------

// not needed any more, order only used in drag-drop and added there
// shuffling the flexbox using order didn't work
//-----------------------------------
//function addOrderToFlexdiv(thisFlexdiv){
//	var i;
//	var divs = thisFlexdiv.children;
 //   for (i=0; i < divs.length; i++){ 
 //      divs[i].style.order = i; 
 //   }
//}	

// used in flexbox list and drag drop
//-----------------------------------
function getRandomInteger(min, max) {
	//returns a random number between min and max (both included):
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function cloneArray(thisArray){
	var i;
	var j;
	   // is this an array?
	if (!(Array.isArray(thisArray))){
		// no
		var clonedArray = thisArray;
	} else {
		//yes
		var clonedArray = [];
        for (i = 0; i < thisArray.length; i++) {
           if (Array.isArray(thisArray[i])){
			  var temp = []; 
		      for (j=0; j < thisArray[i].length; j++){
			      temp[j] = thisArray[i][j];
			  }
              clonedArray[i] = temp;			  
		   } else {
              clonedArray[i] = thisArray[i]; 
           }			   
        }
    }
    return clonedArray;	
}	

function createIntegerArray(first, last){
    var j;
    var array = [];
	const arrayLength = last - first + 1;
    for (j = 0; j <= arrayLength - 1; j++) {
        array[j] = j + first;
    }
    return array;
}

// not sure if this is used anywhere
function reverseArray(array){
   var i;
   var rArray = array.slice();
   for (i=0; i < array.length; i++){
      rArray[i] = array[array.length - i - 1];
   }
  return rArray;
}


function shuffleArray(array) {
	var i;
	var j;
	var temp;
    for ( i = array.length - 1; i > 0; i--) { 
  
       // Generate random number 
       j = Math.floor(Math.random() * (i + 1));
                  
       var temp = array[i];
       array[i] = array[j];
       array[j] = temp;
    }
      
    return array;
}



function removeFirstItem(thisString){
	// used to remove  first item from item in list specifying source 
	// For example:  sourcehebrew: one-syllable-hebrew 
	//               sourcehebrew: one-syllable-hebrew : syllables-final-hebrew
	// sourcehebrew is the first item which is removed
	// items are separated by :
	var index = thisString.indexOf(globalDivider2);
	var item =  thisString.slice(index + 1).trim();
	return item;
}
	
function getFromHTML( HTMLId, separateParas){
	// return an array of items from an HTML id
	// items are NOT trimmed (need to leave &thinsp; in some Hebrew
	
	//var i;
	var j;
	var items = [];
	
	var sourceId =  document.getElementById(HTMLId);
		   
    if (sourceId == null) {  return;}
    else{
         if (separateParas){
         // items  in separate paragraphs within a div (because Hebrew)
		     var source = sourceId.children;	
	     } else {	  
 		   // items in single paragraph, separated by |
           var source = sourceId.innerHTML.split(globalDivider1);
        }
	 }
	  
     for (j = 0; j < source.length; j++) {
		  
        if (separateParas){
           // items  in separate paragraphs 
 		      //items[j + startIndex] = source[j].innerHTML.trim();
		   items[j] = source[j].innerHTML;
	    } else {	  
		   // items in single paragraph
 		      //items[j + startIndex] = source[j].trim();
		     items[j] = source[j];
	    }
	  
	}
	
   return items;
}

// used in cantillation and syllables exercise flexboxes
//---------------------------------------------------
function isConsonant(thisChar){
	var i;
    const consonants = [ "\u05D0","\u05D1","\u05D2","\u05D3","\u05D4","\u05D5",
                       "\u05D6","\u05D7","\u05D8","\u05D9","\u05DA","\u05DB" ,
					   "\u05DC" ,"\u05DD" ,"\u05DE" ,"\u05DF" ,
					   "\u05E0" ,"\u05E1" ,"\u05E2" ,"\u05E3" ,"\u05E4" ,
					   "\u05E5" ,"\u05E6" ,"\u05E7" ,"\u05E8" ,"\u05E9" ,
					   "\u05EA" 					   
					   ];
	var found = false;				      
    for (i = 0; i < consonants.length; i++) {
		if (thisChar == consonants[i]) {
			found = true;
			break;
        }
    }		
	return found;
}	

function splitIntoArrayAtSpaces(thisString){
	var theseSyllables = thisString.trim().split(/\s+/); // split when one or more spaces, Hebrew word split into syllables
    return theseSyllables;
}
	
function wordFromSyllables(syllablesString){
		 // used for syllables separated by one or more spaces 
	var j;
	//var theseSyllables = syllablesString.trim().split(/\s+/); // split when one or more spaces
	var theseSyllables = splitIntoArrayAtSpaces(syllablesString);
	var thisHebrewWord = "";
	for (j = 0; j < theseSyllables.length; j++) {
		thisHebrewWord = thisHebrewWord + theseSyllables[j];
	}

	return thisHebrewWord;
}

	
function getStressedSyllableNumber(syllables, stressedSyllable = "last"){
			// compute syllable number of stressed syllable
	//var theseSyllables = syllables.trim().split(/\s+/); // split when one or more spaces, Hebrew word split into syllables
	var theseSyllables = splitIntoArrayAtSpaces(syllables);
	var stressedSyllableNumber = -1;
	if (stressedSyllable == "last") {
	   stressedSyllableNumber = theseSyllables.length -1 ;
	} else if ( stressedSyllable == "secondlast") {
	   stressedSyllableNumber = theseSyllables.length - 2;
	}
	
	return stressedSyllableNumber;

}	

function removeExtraSpaces(syllablesString){
	var j;
	var theseSyllables = syllablesString.trim().split(/\s+/); // split when one or more spaces
	var thisHebrewWordInSyllables = theseSyllables[0];
	for (j = 1; j < theseSyllables.length ; j++) {
		thisHebrewWordInSyllables = thisHebrewWordInSyllables + " ";
		thisHebrewWordInSyllables = thisHebrewWordInSyllables + theseSyllables[j];
	}
	return thisHebrewWordInSyllables;
}	