
"use strict";


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
	  var span = document.createElement("span");
	  span.classList.add("button-plus");
      soundclickClass[j].insertBefore(span,soundclickClass[j].firstChild );
      addShowHideNextSiblingEventListener(soundclickClass[j]);
   }

   // add event listeners to the headings in alefbet-exercises to show/hide selected exercise
  
   var soundclickClass = document.getElementsByClassName("showhidemenuitemclick");
   for (j = 0; j < soundclickClass.length; j++) {
	  var span = document.createElement("span");
	  span.classList.add("button-plus");
      soundclickClass[j].insertBefore(span,soundclickClass[j].firstChild );
        addShowHideMenuItemEventListener(soundclickClass[j]);
	}
	
  // add event listeners to the menu items in alefbet+ to hide/show an item

   var soundclickClass = document.getElementsByClassName("alefbetplusmenuclick");
   for (j = 0; j < soundclickClass.length; j++) {
      addShowHideMenuItemAlefbetPlusEventListener(soundclickClass[j]);
	}

  // add event listeners to show/hide element with specified id

   var soundclickClass = document.getElementsByClassName("showhidespecifiedidclick");
   for (j = 0; j < soundclickClass.length; j++) {
      addShowHideSpecifiedIdEventListener(soundclickClass[j]);
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
   var javascriptListClass = document.getElementsByClassName("javascript-cantillation");
   for (ii = 0; ii < javascriptListClass.length; ii++) {
 	  var thisSpec = javascriptListClass[ii];
      crCantillationList(thisSpec);
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
   

})
//---------------------------------------------------------------------------

