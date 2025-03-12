
"use strict";


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



