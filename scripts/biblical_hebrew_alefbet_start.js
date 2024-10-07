
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

   var thisClass = document.getElementsByClassName("soundclick");
   for (j = 0; j < thisClass.length; j++) {addsoundclickEventListener(thisClass[j]);}
 
    // only in alefbet 
    var thisClass = document.getElementsByClassName("arrowclick");
    for (j = 0; j < thisClass.length; j++) {
	   addArrowclickEventListener(thisClass[j]);
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
	   
   //------ code creating content----------------------------------------
   
   //      only in alefbet-exercises 
   //-------------------------------------------------------------------

   // create the drag drop flexboxes in JS  (includes event listeners) 
   var onloadDragClass = document.getElementsByClassName("onload-flex-drag-drop");
   for (ii = 0; ii < onloadDragClass.length; ii++) {
    //var thisId = onloadDragClass[ii].id;
      //createFlexDragDrop(thisId);
      var thisSpec = onloadDragClass[ii];
      createFlexDragDrop(thisSpec);
   }	

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
    
//---------------------------------------------------------------------------

})

