
"use strict";


// code executed on load
//----------------------
document.addEventListener('DOMContentLoaded', function() {
   var ii;
 

  // ------- extra just for lessons ---------------------------
  //-----------------------------------------------------------

   
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




