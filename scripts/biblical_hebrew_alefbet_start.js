
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
  
  //--------- startup common to all pages --------------------------------------
  //----------------------------------------------------------------------------
 
      //--------- code relating to content created in HTML ------------------------	
      //---------------------------------------------------------------------------
  
  // add event listeners to the lists which have been created in HTML 
  // (event listeners for lists created in JS are added when the list is created)

   var soundclickClass = document.getElementsByClassName("soundclick");
   for (j = 0; j < soundclickClass.length; j++) {addsoundclickEventListener(soundclickClass[j]);}
 
 
  // add event listeners to the headings to show/hide following div
  
   var soundclickClass = document.getElementsByClassName("showhidenextsiblingclick");
   for (j = 0; j < soundclickClass.length; j++) {
	  var span = document.createElement("span");
	  span.classList.add("button-plus");
      soundclickClass[j].insertBefore(span,soundclickClass[j].firstChild );
      addShowHideNextSiblingEventListener(soundclickClass[j]);
   }
	
   // add event listeners to the headings to show/hide the next item with class="nextItem"

   var soundclickClass = document.getElementsByClassName("showhidenextitemclick");
   for (j = 0; j < soundclickClass.length; j++) {
	  soundclickClass[j].classList.add("button-plus");
      addShowHideNextItemEventListener(soundclickClass[j]);
   }
	
   // add event listeners to  menu items 
   //    menu flexbox to show/hide selected div specified by id
   //-------------------------------------------------------------------------
   // element with event listener has id "show-xx"
   // when clicked, div with id "xx" is hidden/unhidden
 
 
  // optional header ("Contents"), when menu hidden has + which can be clicked to show menu
  // only in alefbetplus
   var soundclickClass = document.getElementsByClassName("showhidemenuclick");
   for (j = 0; j < soundclickClass.length; j++) {
	  var span = document.createElement("span");
      soundclickClass[j].insertBefore(span,soundclickClass[j].firstChild );
      addShowHideMenuEventListener(soundclickClass[j]);
   }
  	// if menu item is already selected (menu-item-selected and content visible) 
	//       sets to unselected and hides content
	// if menu item is not already selected
	//       checks whether any other menu item selected, if so, unselects (removes menu-item-selected and hides content)
	//       sets item to selected (uses the id of the element to show the appropriate content)
	
	// hides menu (only used in alefbetplus)
   var soundclickClass = document.getElementsByClassName("showhidemenuitemhidemenuclick");
   for (j = 0; j < soundclickClass.length; j++) {
	  var span = document.createElement("span");
	  span.classList.add("button-plus");
      soundclickClass[j].insertBefore(span,soundclickClass[j].firstChild );
      
	  addShowHideMenuItemHideMenuEventListener(soundclickClass[j]);
	}
		
 
	// if menu item is already selected (menu-item-selected and content visible) 
	//       sets to unselected and hides content
	// if menu item is not already selected
	//       checks whether any other menu item selected, if so, unselects (removes menu-item-selected and hides content)
	//       sets item to selected (uses the id of the element to show the appropriate content)
	
	// doesn't hide menu
   var soundclickClass = document.getElementsByClassName("showhidemenuitemclick");
   for (j = 0; j < soundclickClass.length; j++) {
	  var span = document.createElement("span");
	  span.classList.add("button-plus");
      soundclickClass[j].insertBefore(span,soundclickClass[j].firstChild );
 	  addShowHideMenuItemEventListener(soundclickClass[j]);
	}
	

	
   // hides the content of the selected menu item
   // sets the menu item to unselected
   // sets menu to visible (may already be visible)
   // removes + in optional header
   var soundclickClass = document.getElementsByClassName("closebtnclick");
   for (j = 0; j < soundclickClass.length; j++) {
      addMenuContentCloseBtnEventListener(soundclickClass[j]);
   }


  
     // only in alefbet 
    //---------------------------------------------------------------------------
    var soundclickClass = document.getElementsByClassName("arrowclick");
   for (j = 0; j < soundclickClass.length; j++) {
	   addArrowclickEventListener(soundclickClass[j]);
   }
    //---------------------------------------------------------------------------
	
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

  
  //-------- startup used only in index, alefbet, alefbet-exercises and alefbet+
  //----------------------------------------------------------------------------
	
 


   //------ code creating content----------------------------------------
   //-------------------------------------------------------------------

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

