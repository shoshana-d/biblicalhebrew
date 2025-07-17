
"use strict";

// this code contains the code for sound, hide/show and various utility functions 
// conversions
//http://www.javascripter.net/faq/mathsymbols.htm
// left-pointing arrow: HTML:&#8678; Unicode:\u21e6
// thinspace: HTML: &thinsp; or &#8201;  Unicode:\u2009
// enspace: HTML: &ensp; or &#8194;  Unicode:\u2002
// hebrew yod: HTML: &#1497;  Unicode: \u05D9
	  	 //thisP = thisP.split(/\s+/); split by one or more spaces
		 
var globalAudioFolder = "audio";
var globalImagesFolder = "images"

// characters used for dividing lists into components
var globalDivider1 = "|";
var globalDivider2 = ":";
		 
function test(text){
  var thistest = document.getElementById("mytest");
  if (thistest != null) {thistest.innerHTML = text;}
}



// code executed on load
//-----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
   var j;

  // add event listeners to the lists or individual items which have been created in HTML 
  // (event listeners for lists created in JS are added when the list is created)
 
   var soundclickClass = document.getElementsByClassName("soundclick");
   for (j = 0; j < soundclickClass.length; j++) {addsoundclickEventListener(soundclickClass[j]);}
 
})
//---------------------------------------------------------------------


//------- code for sound (audio)--------------------------------------------
//-------------------------------------------------------------------------
function addsoundclickEventListener(element){  
	 // soundclick letter(s) in <span>, letter in following <p> (or <span>) ie next sibling
	 // pathname must be included in the sound reference
   element.addEventListener("click", function() {
       var thisLetter =  this.nextElementSibling.innerHTML;
	   var thisSound = setMp3Name(thisLetter);
	   playSound(thisSound);
   });
}

    //-------- code for playing sounds --------- 
function playSound(sound){
	// expects sound to have directory pathname and .mp3
 	   const music = new Audio(sound);
       music.play();
}  


   //-------- utility function to add sub-directory pathname where soundfile located to name of soundfile
   //  called from biblicalhebrew_flexbox_list.js, biblical_hebrew_drag_drop.js, exercises code
function addAudioDirToSoundName(thisName, audioDir){

	if (audioDir == null) { var thisAudio =  thisName.trim(); }
    else                  { var thisAudio = audioDir.trim() + "/" + thisName.trim();}

    return thisAudio;
}
	
   //-------- utility function to set pathname and add .mp3 to name of soundfile
   //                (name already includes sub-directory where soundfile located)
   //  called from playConsonants2 and addsoundclickEventListener
	
function setMp3Name(thisName){
    var thisMp3 = globalAudioFolder + "/" + thisName.trim() + ".mp3";

    return thisMp3;
}


function crAudioSpan(thisSoundWithDir){
   //  called from biblicalhebrew_flexbox_list.js, biblical_hebrew_drag_drop.js, exercises code

   // thisSoundWithDir should be the filename of the .mp3 file with the subdirectory name
   // for example, if the file is  audio/words/w003_lach.mp3 should be words/w003_lach
   //              audio/ and .mp3 are added at runtime with setMp3Name 
   // use addAudioDirToSoundName to add subdirectory name before calling this function
   var text2= document.createTextNode(thisSoundWithDir);
   var span2 = document.createElement("span");
   span2.classList.add("hidden");
   span2.appendChild(text2);
//test(thisSoundWithDir);   
   return span2;
}

  //------ play sounds in order after clicking arrow at start of flexlist---
 
function addArrowclickEventListener(element){
   // add event listener to arrow at start (RHS) of lists
   element.addEventListener("click", function() {
	  var thisArrow = this;
	  playConsonants1(thisArrow);
   });
}

//--- when recreating a flexbox list need to make sure that the sound from the existing list stops
function turnOffArrowSound(){
   var j;
   var arrow = document.getElementsByClassName("stop-audio");
   for (j = 0; j < arrow.length; j++) {
	   // arrow has already been clicked, second click stops playing
 	   arrow[j].classList.add("stop-sound");
   }   
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
   
   if (thisArrow.classList.contains("stop-audio")){
     // arrow has already been clicked, second click stops playing
 	 thisArrow.classList.add("stop-sound");
   }else{
        // start
    thisArrow.classList.toggle("start-audio");
    thisArrow.classList.toggle("stop-audio");
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
//test("playConsonants3 " + thisArrow.classList + " " + itemNumber + " " + audioItems.length);   
   audioItems[itemNumber].classList.toggle("text-border");
   if (thisArrow.classList.contains("stop-sound")){// the arrow at the beginning
      thisArrow.classList.remove("stop-sound");
      thisArrow.classList.toggle("start-audio");
      thisArrow.classList.toggle("stop-audio");
   }else{
	 itemNumber++;
     if (itemNumber < audioItems.length) {
       audioItems[itemNumber].classList.toggle("text-border");
       playConsonants2(thisArrow,audioItems,  itemNumber);
     }else{
       //thisArrow.classList.remove("flex-container-arrow-selected"); // the arrow at the beginning
        thisArrow.classList.toggle("start-audio");
        thisArrow.classList.toggle("stop-audio");
     } 
   }	 
} 




//-------------------------------------------------------------------------
//------- code for hiding and showing sections of text --------------------------------------------
//-------------------------------------------------------------------------

// July 2025
// When the user clicks on the navbar button in menu at top of page, 
// toggle between hiding and showing the dropdown content 
function showHideNavbarDropdown(dropdownID) {
  document.getElementById(dropdownID).classList.toggle("hidden");
}

// Close the navbar dropdown if the user clicks outside of it
window.onclick = function(e) {
  var j;
  if (!e.target.matches('.navbar-dropbtn')) {
    var toggleClass = document.getElementsByClassName("navbar-dropdown-content");
    for (j = 0; j < toggleClass.length; j++) {
	   if (!(toggleClass[j].classList.contains('hidden'))) {
           toggleClass[j].classList.add('hidden');
       }
	}	

  }
}
//----------------------------------------------------------------------------------------------

  // user has clicked a +/- button
  // replaces showhidenextsiblingclick
function ShowHideParentNextSibling(element){
    var nextSib =  element.parentElement.nextElementSibling;
    nextSib.classList.toggle("hidden"); 

    element.classList.toggle("button-minus");
    element.classList.toggle("button-plus");   
}	


 //----------------------------------------------------------------------------------------------

  // user has clicked a +/- button
  // toggles next element with class nextItem
function ShowHideNextItem(element){

	var i;
    var docElements = document.getElementsByTagName("*");
	var afterElement = false;
    for (i=0; i < docElements.length; i++){
	  if (docElements[i] == element) {afterElement = true; }
      if (afterElement){
        if (docElements[i].classList.contains("nextItem")) {
            docElements[i].classList.toggle("hidden"); 
            element.classList.toggle("button-minus");
            element.classList.toggle("button-plus");   
			break;
		 }	 
	  }		 
    }		 
}	

   //----------------------------------------------------------------------------------------------


function showHideMenuItem(element, hideMenu=false){
	
	// if menu item is already selected (menu-item-selected and content visible) 
	//       sets to unselected and hides content
	// if menu item is not already selected
	//       checks whether any other menu item selected, if so, unselects (removes menu-item-selected and hides content)
	//       sets item to selected (uses the id of the element to show the appropriate content)
	
	var j;	
 	var prefix = "show-";
    var thisMenuItemTextId = element.parentElement.id.slice(prefix.length);
    var thisMenuItemText = document.getElementById(thisMenuItemTextId);

	if (element.parentElement.classList.contains("menu-item-selected")){
		// only applies if hideMenu is false, in which case the selected menu item will have a dotted frame
		// if hideMenu true then can't click on menu item if it's already selected
		
	     //  this exercise has already been selected, flag unselected, and set button to plus
         element.parentElement.classList.remove("menu-item-selected");
		 
		 //var thisPlusMinusButton = element.firstElementChild;
         element.classList.toggle("button-minus");
         element.classList.toggle("button-plus");   
		 
		 // hide text
         if (!(thisMenuItemText == null)) { 
	         if (!(thisMenuItemText.classList.contains("hidden"))) {thisMenuItemText.classList.add("hidden");}
	     }
   
		
	} else{
		// this exercise not currently selected
		
		// if previous selection, unselect it
	    var selected = element.parentElement.parentElement.getElementsByClassName("menu-item-selected");
		if (selected.length > 0) {
			var prevSelected = selected[0];
			// hide previous selected item content
 		    var selectedExerciseId = prevSelected.id.slice(prefix.length);
	        var selectedExercise = document.getElementById(selectedExerciseId);
            if (!(selectedExercise == null)) { 
	           if (!(selectedExercise.classList.contains("hidden"))) {selectedExercise.classList.add("hidden");}
			}
			// remove formatting showing selected from menu item
			// remove selected flag
            prevSelected.classList.remove("menu-item-selected");			
			// set button to plus
            prevSelected.firstElementChild.classList.toggle("button-minus");
            prevSelected.firstElementChild.classList.toggle("button-plus");   

	    }

		// select exercise referred to by this selection
	    if (!(thisMenuItemText == null)) { thisMenuItemText.classList.remove("hidden");}
	   
	   	// flag menu item as selected
        element.parentElement.classList.add("menu-item-selected");
			// set button to plus
        element.classList.toggle("button-minus");
        element.classList.toggle("button-plus");   
		
	// optionally, hide menu 
	   if (hideMenu) {
          element.parentElement.parentElement.classList.add("hidden");
	   }  
    }	
	
}	


function menuContentClose(element){
	// stop any audio that's playing in arrow of javascript list
	var arrowClick = document.getElementsByClassName("arrowclick");
    if (arrowClick.length > 0){	turnOffArrowSound();}  // in biblical_hebrew_flexbox_list.js
	
	// hide this menu item content
	element.parentElement.parentElement.classList.add("hidden");
	
	// mark item in menu as unselected
 	var prefix = "show-";
    var thisMenuItemId = prefix + element.parentElement.parentElement.id;
	var thisMenuItem = document.getElementById(thisMenuItemId);
    thisMenuItem.classList.remove("menu-item-selected");

    thisMenuItem.firstElementChild.classList.toggle("button-minus");
    thisMenuItem.firstElementChild.classList.toggle("button-plus");   

	// show menu
	thisMenuItem.parentElement.classList.remove("hidden");
	
	// remove + from optional Contents header
	var contents = thisMenuItem.parentElement.previousElementSibling;
	if (contents.classList.contains("showhidemenuclick")) {
	   contents.firstElementChild.classList.remove("button-plus");
	}   
	
}	

 
   // when called from Javascript
   // used in biblical_hebrew_lessons_start_template.js to add sound listener to consonants and vowels
function JSshowHideJsToggle(ev){
	var buttonId = ev.target.id;

 	var prefix = "btn-";
    var elementId = buttonId.slice(prefix.length);
	showHideJsToggle(elementId, buttonId);
}
	
function showHideJsToggle(elementId, buttonId){
	// only used with onclick
	// hides/shows child elements with class list "js-toggle" in the specified element
	// toggles +/- in the button
	var j;

	var parentDiv = document.getElementById(elementId);

    var toggleClass = parentDiv.getElementsByClassName("js-toggle");
    for (j = 0; j < toggleClass.length; j++) {
		toggleClass[j].classList.toggle("hidden");
	}	
	
 	var button = document.getElementById(buttonId);

    button.classList.toggle("button-plus");
    button.classList.toggle("button-minus");  
	
}	

	
function showHideJsToggleParentParent(element){
	// only used with onclick
	// hides/shows child elements with class list "js-toggle" 
	//    in the parent element of parent element of specified element
	// toggles +/- in the specified element (should be a button)
	// for use in flexbox list where each item is in a div
	var j;

	var parentDiv = element.parentElement.parentElement;

    var toggleClass = parentDiv.getElementsByClassName("js-toggle");
    for (j = 0; j < toggleClass.length; j++) {
		toggleClass[j].classList.toggle("hidden");
	}	
	
    element.classList.toggle("button-plus");
    element.classList.toggle("button-minus");  
	
}	


//-------------------------------------------------------------------------
//----- various utlity functions -----------------------------------------
//------------------------------------------------------------------------


   //-------- utility function to set pathname and add .jpg to name of imagefile
   //  called from exercises which include vowels image files
	
function setJpgName(thisName, imageDir){
	
	var thisImage =  thisName.trim();
	
	if (!(imageDir == null)) {  thisImage = imageDir.trim() + "/" + thisImage;}
	
    var thisJpg = globalImagesFolder + "/" + thisImage + ".jpg";

    return thisJpg;
}

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

 /* Randomize array in-place using Durstenfeld shuffle algorithm */
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
	
function getFromHTML( HTMLId, separateParas, trim=false){
	// return an array of items from an HTML id
	// items are NOT trimmed by default (need to leave &thinsp; in some Hebrew - but this may not be necessary any more now that vowels are images)
	
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
	
	if (trim) {
		for (j = 0; j < items.length; j++) {
			items[j] = items[j].trim();
	    }		
	}	
	
   return items;
}


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

