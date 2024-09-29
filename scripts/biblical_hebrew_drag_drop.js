

"use strict";

var globalDragDropQuestions = [];
var globalDragDropAnswers = [];
var globalDragDropSounds = [];

var globalDragDropCPVHebrew = [];  
var globalDragDropCPVSounds = [];

//------- drag-drop flexboxes ----------------------
//--------------------------------------------------
function setGlobalDragDropQuestionsAnswersSounds(thisSpecElement) {


 	// thisSpecElement is the paragraph containing the instructions for creating the flexbox

   var i;
   var j;
   
    // initialize global variables
   globalDragDropQuestions.length = 0;
   globalDragDropAnswers.length = 0;
   globalDragDropSounds.length = 0;
   
  //globalDragDropCantillation = false;
   //globalDragDropStressedSyllable.length = 0;  // used for adding cantillation marks

 
   var questionsSourceId = null;
   var questionsSeparateParas = false;
   var answersSourceId = null;
   var answersSeparateParas = false;
   var answersInSyllables = false;  // indicate whether have to be combined into a whole word
                                    // for drag drop matching sounds for words in Tanakh exercise
   var cantillation = false;       // add cantillation marks to Hebrew. Requires answersInSyllables 
   var answersGroupStressedSyllable = null;     // in cantillation specification:one value for each sourceHebrewId, values "last" "secondlast"

   var questionsAnswersSame = false;  // questions and answers specified in pairs, randomly assigned to question or answer
 
   var includeSounds = false;
   var soundsSourceId = null;
   var audioDir = null;
   
   var noDuplicateSounds = false; // when matching on audio and want to exlude identical sounds

   var selection =  false;
   var nSelection = 0;

   var sourceGlobalCPV = false;
   
    // get the specifications for flexbox questions, answers and sounds
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);
   
   for (j = 0; j < parameters.length; j++) {
	 var thisParameterSpec = parameters[j];
	 var thisP = parameters[j].split(globalDivider2);
	 var thisP0 = thisP[0].toLowerCase().trim();
	 
	 if (thisP0 == "questions"){
	    //questionsSourceId = thisP[1].trim();
		questionsSourceId = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
     } else if (thisP0 == "questionsseparateparas"){
        questionsSeparateParas = true;
	 } else if (thisP0 == "answers"){
	    //answersSourceId = thisP[1].trim();
		answersSourceId = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
     } else if (thisP0 == "answersseparateparas"){
        answersSeparateParas = true;
	 } else if (thisP0 == "answersinsyllables"){
		answersInSyllables = true;
	 } else if (thisP0 == "cantillation"){
		cantillation = true; 
		answersGroupStressedSyllable = removeFirstItem(thisParameterSpec);  // allowing for possibly multiple specifications
		
	 } else if (thisP0 == "questionsanswers"){
		questionsAnswersSame = true;
		questionsSourceId = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources

 	 } else if (thisP0 == "sounds"){
		//soundsSourceId = thisP[1].trim();
		soundsSourceId = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
	    includeSounds = true;
	 } else if (thisP0 == "audio"){
		audioDir = thisP[1].trim();
		
	 } else if (thisP0 == "noduplicatesounds"){
		noDuplicateSounds = true;


     } else if (thisP0 == "selection"){
	    selection = true;
	    nSelection = thisP[1].trim();

     } else if (thisP0 == "sourceglobalcpv"){  
        sourceGlobalCPV = true;
	 } 
   }

   // some checks
   if ( noDuplicateSounds  & !includeSounds) {return;}
   if (cantillation ){
		if (!(answersInSyllables)) { return;}
		if (answersGroupStressedSyllable == null) { return;}
	}	
  
  
   // now get contents
	   
   var questions = [];
   var answers = [];
   var sounds = [];
   if (cantillation) {var answersStressedSyllable = [];}
 
   if (sourceGlobalCPV) {
 	   if (globalFlexlistHebrew.length > 0) {
	      setGlobalDragDropConsonantPlusVowel();  // in biblical_hebrew_consonant_plus_vowel.js
	      answers = globalDragDropCPVHebrew;  // no questions if c+v, audio is the question
          sounds = globalDragDropCPVSounds;	
		  
	   } else { 
	      return; // global variables have not been set	
	   }    
	   
   } else if (questionsAnswersSame){
 
	   // not prespecified which are the questions and which the answers
	   // questions and answers in the same list, for each set, randomly select which is question and answer
	   // in pairs, each pair separated by | within pairs separated by :
	   // always only one source list
	  var items = getFromHTML(questionsSourceId, questionsSeparateParas);
	  for (i=0; i < items.length; i++) {
		  // now assign one of each item to question and one to answer
		 var thisItem = items[i].split(globalDivider2);
		 var order = shuffleArray(createIntegerArray(0,thisItem.length - 1));
		 questions[i] = thisItem[order[0]];
		 answers[i] = thisItem[order[1]];
	  }	
 

   } else if (questionsSourceId != null | answersSourceId != null) {
	    // if matching audio sounds, no questions only answers, audio is the question
		
	// allows for questions from multiple sources
       if (questionsSourceId != null) {
		  var  idsArray =  questionsSourceId.split(globalDivider2);
	  
		  for (i=0; i < idsArray.length; i++) {
			 var temp1 = getFromHTML(idsArray[i].trim(), questionsSeparateParas);
	         questions = questions.concat(temp1);
		  }	  
			  
	      // if more than one item for a question, select one randomly 
          for (i=0; i < questions.length; i++) { 
		     var items = questions[i].split(globalDivider2);
             questions[i] = items[getRandomInteger(0,items.length-1)]; 
	      }
		  
	   }


 	// allows for answers from multiple sources
       if (answersSourceId != null) {
		  var idsArray = answersSourceId.split(globalDivider2);
	 	  if (cantillation){ var stressedSyllableArray = answersGroupStressedSyllable.split(globalDivider2); }
  
	      for (i=0; i < idsArray.length; i++) { 
		     var temp1 = getFromHTML(idsArray[i].trim(), answersSeparateParas);
	         answers = answers.concat(temp1);
				 
		     if (cantillation) {
	    
                var temp2 = [];
			    for (j=0; j < temp1.length; j++) {
				   temp2[j] = stressedSyllableArray[i];
			    }
			
		        answersStressedSyllable = answersStressedSyllable.concat(temp2);	
				
		     }	   
			 
	      }  
	      // if more than one item for an answer, select one randomly (can't be combined with cantillation)
          for (i=0; i < answers.length; i++) { 
		     var items = answers[i].split(globalDivider2);
             answers[i] = items[getRandomInteger(0,items.length-1)]; 
	      }
		  
	   }

       if (questions.length > 0 & answers.length > 0) {
             if (questions.length !=  answers.length ) { return;}
	   }


   } else {
       return;
   }

	 // is there a list of sounds? if so, get them and check that correct number of items
	 // ( if sourceGlobalCPV sounds are already set )
   if (includeSounds ) { 
   	   var idsArray = soundsSourceId.split(globalDivider2);
 	   for (i=0; i < idsArray.length; i++) { 
	      var temp = getFromHTML(idsArray[i].trim(), false);
	       sounds = sounds.concat(temp);
	    } 
		
       if (answers.length !=  sounds.length) { return;  }	// this is an error 

   // deal with case where matching on audio (no questions, audio is questions) and don't want identical or similar audio
       if (noDuplicateSounds){
    
	      var dup1 = ["w097_kol","w071_al","w042_im","w019_bo","w012_lo","w019_ba"];
          var dup2 = ["w010_kol","w007_al","w044_im","w004_bo","w003_lo","w004_bah"];
          var dupToOmit = [];
	      for (i=0; i< dup1.length; i++){
		     var whichDup = getRandomInteger(1,2);
		     if (whichDup == 1) {dupToOmit[i] = dup1[i];}
		     else               {dupToOmit[i] = dup2[i];}
	      }	   
	   // created cloned array of sounds and answers
	      var soundsCopy = cloneArray(sounds);
	      var answersCopy = cloneArray(answers);
	   // set sounds0 and answers0 to []
	      sounds.length = 0;
	      answers.length = 0;
		  if (cantillation) { 
		     var answersStressedSyllableCopy = cloneArray(answersStressedSyllable);
			 answersStressedSyllable.length = 0;
		  }
		  
 	   // copy cloned array to sounds00 and answers0 if sound is not in dupToOmit
	      var j = 0;
	      for (i=0; i< soundsCopy.length; i++){
		      var k = 0;
		      var omit = false;
		      for (k=0; k < dupToOmit.length; k++) {
			     if ( soundsCopy[i] == dupToOmit[k] ) {
				     omit = true;
				     break;
			     }
		      }
              if (!(omit)) {
                  sounds[j] = soundsCopy[i];
                  answers[j] = answersCopy[i];
				  if (cantillation) {answersStressedSyllable[j] = answersStressedSyllableCopy[i];}
                  j++;
              }			   
	      }	 
	   }	// noDuplicateSounds	
   } // includeSounds  
     
   // combine syllables into words if required
   if (answersInSyllables){ 
       if (cantillation){
		  for (i=0; i < answers.length; i++){
             var stressedSyllableNumber =  getStressedSyllableNumber(answers[i], answersStressedSyllable[i]);
             answers[i] = addCantillationToStressedSyllable(answers[i], stressedSyllableNumber, sounds[i],"all");
			                   // in biblical_hebrew_cantillation_exercise.js
          }
	   }	  
    
       for (i=0; i < answers.length; i++) { answers[i] = wordFromSyllables(answers[i]);}
   }
 	  

	// add audio directory
   if (includeSounds | sourceGlobalCPV) {
	   for (i=0; i < sounds.length; i++) {
		   sounds[i] = addAudioDirToSoundName(sounds[i], audioDir);
		}
   }
   
   // if only require some of the questions/answers/sounds, randomly select required number
   if (selection & nSelection < answers.length){
      var selectionList = shuffleArray(createIntegerArray(0, answers.length-1));
	  for (i=0; i < nSelection; i++) { 
	     globalDragDropAnswers[i] = answers[selectionList[i]];
	     if (questions.length > 0 ) {globalDragDropQuestions[i] = questions[selectionList[i]];}
	     if (includeSounds || sourceGlobalCPV) {globalDragDropSounds[i] = sounds[selectionList[i]];}
	  }	 
   } else {		 
	  for (i=0; i < answers.length; i++) { 
         globalDragDropAnswers[i] = answers[i];
         if (questions.length > 0 ) {globalDragDropQuestions[i] = questions[i];}
	     if (includeSounds || sourceGlobalCPV) {globalDragDropSounds[i] = sounds[i];}
	  }
   } 
}

function createFlexDragDrop(thisSpecElement){

	// thisSpecElement is the paragraph containing the instructions for creating the flexbox

   var i;
   var j;

   setGlobalDragDropQuestionsAnswersSounds(thisSpecElement);
 ; 
   var nAnswers = globalDragDropAnswers.length; 
   if (nAnswers == 0){return;}
   var anySounds = globalDragDropSounds.length > 0;

   // get the specifications for displaying flexbox questions, answers and sounds
   
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);
   var flexId = null;
   var answerClass = "flex-drag-drop-hebrew";
   var questionClass = "flex-drag-drop-hebrew"; // "ear" when matching sounds
   var colorClass = "vocab-color";
   var matchSounds = false;
   
   var answerInImage = false; // if true, the answers input is the name of the image file(s); used for standalone vowel marks
   var imagesDir = null;        // if answerInImage, the name of the subdirectory of /images where the image files are located
   
   for (j = 0; j < parameters.length; j++) {
      var thisP = parameters[j].split(globalDivider2);
	  var thisP0 = thisP[0].toLowerCase().trim();
 	  if (thisP0 == "id"){
		 flexId = thisP[1].trim();
      } else if (thisP0 == "questionclass"){
		 questionClass = thisP[1].trim();
      } else if (thisP0 == "answerclass"){
		 answerClass = thisP[1].trim();
      } else if (thisP0 == "colorclass"){
		 colorClass = thisP[1].trim();
      } else if (thisP0 == "matchsounds"){  
         matchSounds = true;
		 
	  } else if (thisP0 == "answerinimage"){
		 answerInImage = true; 
		 imagesDir = thisP[1].trim();
	  }	
   }
   
   if (flexId == null  ) { return;  }	// have to specify a target id
   

	// now create the new flexboxes
   var answersFlexId = flexId + "-answers";
   var questionsFlexId = flexId + "-questions";
	   
	// overall container
	//-----------------
   const overallFlexdiv = document.createElement("div");
   overallFlexdiv.setAttribute("id", flexId);
   overallFlexdiv.classList.add("exercise-container");
   overallFlexdiv.classList.add(colorClass);
   
	// answers flexbox
	//----------------
    var answersFlexdiv = createAnswersFlexbox(answersFlexId, answerClass, anySounds,answerInImage, imagesDir);
 
 	 // add order to each cell
    var divs = answersFlexdiv.children;
	for (i=0; i < divs.length; i++){ divs[i].style.order = i; }
        
	 // add answers flexbox to overall container
    overallFlexdiv.appendChild(answersFlexdiv);
  
	// questions flexbox
	//----------------
    const questionsFlexdiv = document.createElement("div");
 	questionsFlexdiv.setAttribute("id", questionsFlexId);
    questionsFlexdiv.classList.add("flex-container-drag-drop");
    for (i=0; i < nAnswers; i++){
       var celldiv = document.createElement("div");
		 
       var span1 = document.createElement("span");
       span1.classList.add(questionClass);
       span1.classList.add("flex-drag-drop-content");
       if (anySounds) { span1.classList.add("soundclick");  }
	  
	   if (!(matchSounds)) {    // if matchSounds, questionclass is "ear" which puts the ear image in this span
         var text1= document.createTextNode(globalDragDropQuestions[i]);
	     span1.appendChild(text1);
	   }	 
	  
	   celldiv.appendChild(span1);
		 
       if (anySounds) {
		  //NB sounds already have subdirectory of /audio added
          var span2 = crAudioSpan(globalDragDropSounds[i]);
		  celldiv.appendChild(span2);
	   }
	 
	   var span3 = document.createElement("span");
       span3.classList.add("flex-drag-drop-query");
  	   span3.setAttribute("id", questionsFlexId + "-" +  i);
	   
	   celldiv.appendChild(span3);
	   
	   if (answerInImage){ 
	     // now not allowing multiple images, vowels with the same sound have each been combined into a single image
		 //var jpgFiles = globalDragDropAnswers[i].trim().split(/\s+/); //split by one or more spaces
	    // for (j=0; j < jpgFiles.length; j++){
		  var element4 = document.createElement("img");
           // element4.src = setJpgName(jpgFiles[j], imagesDir);
          element4.src = setJpgName(globalDragDropAnswers[i].trim(), imagesDir);
		  
		  var nVowels = globalDragDropAnswers[i].trim().split("_and_").length;
		  if (nVowels == 1){
			  element4.classList.add("vowel-image-drag-drop");
		  } else if (nVowels == 2){
			  element4.classList.add("vowel-image2-drag-drop");
          } else{
			  element4.classList.add("vowel-image3-drag-drop");
          }			  
		 //}	 
		 
	   }  else {
		  var element4 = document.createElement("span");
          var text4 = document.createTextNode(globalDragDropAnswers[i]);
          element4.classList.add(answerClass);
		  
	      element4.appendChild(text4);
	  
	   }
		  
	   element4.classList.add("questionsRowAnswer");
       element4.classList.add("hidden");
       element4.classList.add("flex-drag-drop-content");
       if (anySounds) {element4.classList.add("soundclick");  }
		  
	   celldiv.appendChild(element4);
		  
       if (anySounds) {
		    //NB sounds already have subdirectory of /audio added
          var span5 = crAudioSpan(globalDragDropSounds[i]);
		  celldiv.appendChild(span5);
	   }
		  
		  
       questionsFlexdiv.appendChild(celldiv);
	  
	}	
 	 // add order to each cell
	var divs = questionsFlexdiv.children;
	for (i=0; i < divs.length; i++){ divs[i].style.order = i; }
	
	 // add questionsflexbox to overall container
    overallFlexdiv.appendChild(questionsFlexdiv);

     // add event listeners to flexbox
    var flexdivElements =  overallFlexdiv.getElementsByTagName("*");
    for (i=0; i < flexdivElements.length; i++){
	   var thisElement = flexdivElements[i];	
	   var thisClassList = flexdivElements[i].classList;	
       if (thisClassList.contains("soundclick")) {
		   addsoundclickEventListener(thisElement, false);
	   //} else if (thisClassList.contains("soundclick-cv")) {
		//   addsoundclickEventListener(thisElement, true);
       }

       if (thisClassList.contains("selectdragdropclick")) {
           thisElement.addEventListener("click", function(){selectAnswer(event);});
       }
	   
	   if (thisClassList.contains("flex-drag-drop-query")) {
           thisElement.addEventListener("drop", function(){handleDrop(event);});
		   thisElement.addEventListener("dragenter",function(){handleDragEnter(event);});
		   thisElement.addEventListener("dragleave",function(){handleDragLeave(event);});
		   thisElement.addEventListener("dragover",function(){handleDragOver(event);});
		   
		   thisElement.addEventListener("click", function(){checkAnswer(event);});

	   } 
	   if (thisClassList.contains("flex-draggable")) {
          thisElement.addEventListener("dragstart",function(){handleDragStart(event);});
       }		   
    }   
      
	// add overall flexbox to document	
	thisSpecElement.parentNode.insertBefore(overallFlexdiv, thisSpecElement);
	
	// finally, shuffle
	shuffleNewFlexDragDrop(flexId)
}

function  createAnswersFlexbox(answersFlexId, answerClass, anySounds,answerInImage, imagesDir){
   var i;
   var j;
 
   var answersFlexdiv = document.createElement("div");
   answersFlexdiv.setAttribute("id", answersFlexId);
   answersFlexdiv.classList.add("flex-container-drag-drop");
   
   for (i=0; i < globalDragDropAnswers.length; i++){
	  var celldiv = document.createElement("div");
	  
	  if (answerInImage){ 
	     // now not allowing multiple images, vowels with the same sound have each been combined into a single image
		 //var jpgFiles = globalDragDropAnswers[i].trim().split(/\s+/); //split by one or more spaces
	    // for (j=0; j < jpgFiles.length; j++){
		    var answerElement = document.createElement("img");
  	       // answerElement.src = setJpgName(jpgFiles[j], imagesDir);
  	        //answerElement.setAttribute("id", answersFlexId + j + "-" +  i);
            answerElement.src = setJpgName(globalDragDropAnswers[i].trim(), imagesDir);
			
		    var nVowels = globalDragDropAnswers[i].trim().split("_and_").length;
		    if (nVowels == 1){
			  answerElement.classList.add("vowel-image-drag-drop");
		    } else if (nVowels == 2){
			  answerElement.classList.add("vowel-image2-drag-drop");
            } else{
			  answerElement.classList.add("vowel-image3-drag-drop");
            }			  
			 
		 //}	 
		 
	  }  else {
		  var answerElement = document.createElement("span");
          var text1= document.createTextNode(globalDragDropAnswers[i]);
	      answerElement.appendChild(text1);
		  
          answerElement.classList.add(answerClass);
		  
	  
	  }
          
	  answerElement.setAttribute("id", answersFlexId + "-" +  i);
	  
      answerElement.classList.add("flex-drag-drop-content");
      answerElement.classList.add("flex-draggable");
      answerElement.classList.add("selectdragdropclick");
 	  answerElement.setAttribute("draggable", true);
     // if (anySounds) { answerElement.classList.add("soundclick");  }  // now using click event to select answer
	                                                                    // clicking selected answer gives sound
		  
	  celldiv.appendChild(answerElement);
		  
	  if (anySounds) {
		    //NB sounds already have subdirectory of /audio added
          var span2 = crAudioSpan(globalDragDropSounds[i]);
		  celldiv.appendChild(span2);
	  }

      answersFlexdiv.appendChild(celldiv);

   }  
	
   return answersFlexdiv;
}	

function reCreateFlexDragDrop(thisId){
    // thisId is the id of the paragraph with the parameters for the drag-drop div
   var i;
   var j;
 
   var thisSpecElement = document.getElementById(thisId);
   if (thisSpecElement == null){ return;}

      // get the id of the overall drag-drop div
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);
   var flexId = null;
   for (j = 0; j < parameters.length; j++) {
      var thisP = parameters[j].split(globalDivider2);
	  var thisP0 = thisP[0].toLowerCase().trim();
 	  if (thisP0 == "id"){
		 flexId = thisP[1].trim();
		 break;
	  }	
   }
   if (flexId == null  ) { return;  }	// have to specify a target id
   
       // now remove the drag-drop div if it exists
	 
   var thisDiv = document.getElementById(flexId);	 
   if ( thisDiv != null) {
	   // remove div
	   thisDiv.parentNode.removeChild(thisDiv);
    }
   // now create the list again
   createFlexDragDrop(thisSpecElement);

}


function shuffleNewFlexDragDrop(thisId) {
    // thisId is the id of the flexbox (not the id of the paragraph with the parameters for the flexbox)
	// this function shuffles a newly created drag drop exercise
  var i;
  var answersId = thisId + "-answers";
  var questionsId = thisId + "-questions";
  const answersContainer = document.getElementById(answersId);
   if (answersContainer == null){ return;}
  const answersCells = answersContainer.children;  
  const questionsContainer = document.getElementById(questionsId);
   if (questionsContainer == null){ return;}
  const questionsCells = questionsContainer.children;  
  const nCells = answersContainer.childElementCount ;

  var shuffleOrder = shuffleArray(createIntegerArray(0, nCells-1));
  for ( i = 0; i < nCells; i++) {
	answersCells[i].style.order = shuffleOrder[i];
  } 
  
  var shuffleOrder = shuffleArray(createIntegerArray(0, nCells-1));
  for ( i = 0; i < nCells; i++) {
	questionsCells[i].style.order = shuffleOrder[i];
  } 

}


function shuffleExistingFlexDragDrop(thisId) {
    // thisId is the id of the flexbox (not the id of the paragraph with the parameters for the flexbox)
  var i;
  var answersId = thisId + "-answers";
  var questionsId = thisId + "-questions";
  const answersContainer = document.getElementById(answersId);
   if (answersContainer == null){ return;}
  const questionsContainer = document.getElementById(questionsId);
   if (questionsContainer == null){ return;}
  //const nCells = answersContainer.childElementCount ;

   // unselect any selected answers
   var selected = answersContainer.getElementsByClassName("flex-drag-drop-selected");
   for (i=0; i < selected.length; i++) {	setUnselected(selected[i]);	}
	   
 // make answers visible 
  var answers = answersContainer.getElementsByClassName("flex-drag-drop-content");
  for ( i = 0; i < answers.length; i++) {
	answers[i].classList.remove("hidden");
  } 
    
   // in questions section, make query boxes visible and answers invisible
  var questionMarks = questionsContainer.getElementsByClassName("flex-drag-drop-query");
  for (i=0; i < questionMarks.length; i++) { questionMarks[i].classList.remove("hidden");}
  
  var correctAnswers = questionsContainer.getElementsByClassName("questionsRowAnswer");
  for (i=0; i < correctAnswers.length; i++) { correctAnswers[i].classList.add("hidden");}


  shuffleNewFlexDragDrop(thisId);
}

//------ point and click functions ------------------
//------------------------------------------------
function selectAnswer(ev) {
	var i;

    // already selected? if so, play sound
	if (ev.target.classList.contains("flex-drag-drop-selected")){
       var thisLetter =  ev.target.nextElementSibling.innerHTML;
	   var thisSound = setMp3Name(thisLetter);
	   playSound(thisSound);
	   
    } else {
	   // first, unselect any answers that are selected
       var selected = ev.target.parentElement.parentElement.getElementsByClassName("flex-drag-drop-selected");
	   for (i=0; i < selected.length; i++) {	setUnselected(selected[i]);	}

       // now flag this answer as selected
	   setSelected(ev.target);
	}   
}	

function checkAnswer(ev) {
	// when user clicks on "?" box
	
	var questionId = ev.target.id;
	var questionNum = questionId.slice(questionId.lastIndexOf("-")+1);
	var answerId = questionId.slice(0,questionId.lastIndexOf("-questions")) + "-answers-" + questionNum;
    //test(questionId + " " + answerId);
	
	var thisAnswer = document.getElementById(answerId);
	if (thisAnswer.classList.contains("flex-drag-drop-selected")){
        ev.target.classList.add("hidden"); //make the query box invisible
        ev.target.nextElementSibling.classList.remove("hidden"); // make answer box visible
	    //document.getElementById(answerId).parentElement.classList.add("hidden"); 
	    document.getElementById(answerId).classList.add("hidden"); 
	            // remove the answer from the possible answers

	   var finished = dragDropFinished(ev.target);
	  
	   if (finished) {
	     rewardModal("Well done!"); 
       }	  
	} 	
}
	
function setSelected(thisAnswer){
	thisAnswer.classList.add("flex-drag-drop-selected"); 
	if (thisAnswer.tagName == 'IMG'){
		thisAnswer.src = thisAnswer.src.replace(".jpg", "_selected.jpg");
	}	
}
function setUnselected(thisAnswer){
	thisAnswer.classList.remove("flex-drag-drop-selected");
	if (thisAnswer.tagName == 'IMG') {
		thisAnswer.src = thisAnswer.src.replace("_selected.jpg",".jpg");
	}	
}	

//------ drag and drop functions ------------------
//------------------------------------------------

function handleDragStart(ev) {
	var i;
	//test(ev.target.id);
	if (!(ev.target.classList.contains("flex-drag-drop-selected"))){
	   // first, unselect any answers that are selected
       var selected = ev.target.parentElement.parentElement.getElementsByClassName("flex-drag-drop-selected");
	   for (i=0; i < selected.length; i++) {	setUnselected(selected[i]);	}

       // now flag this answer as selected
	   setSelected(ev.target);
	}   
   
   ev.dataTransfer.setData("text", ev.target.id);
}
function handleDragEnter(ev) {
   if (ev.target.classList.contains("flex-drag-drop-query")){
      ev.target.classList.add("flex-drag-drop-droppable"); 
	          // visual cue showing that this cell available for dropping
   }
}
function handleDragLeave(ev) {
   ev.target.classList.remove("flex-drag-drop-droppable");
}
function handleDragOver(ev) {
   ev.preventDefault();
}

function handleDrop(ev) {
   var i;
   ev.preventDefault();
   
   var answerId = ev.dataTransfer.getData("text");
   //var proposedAnswer = document.getElementById(answerId).innerHTML;
  // var actualAnswer = ev.target.nextElementSibling.innerHTML;
   
   var questionId = ev.target.id;

   if (answerId.slice(answerId.lastIndexOf("-")) == questionId.slice(questionId.lastIndexOf("-"))){
  
      ev.target.classList.remove("flex-drag-drop-droppable");
      ev.target.classList.add("hidden"); //make the query box invisible
      ev.target.nextElementSibling.classList.remove("hidden"); // make answer box visible
	  
	  // dont need this any more cos all vowels merged into one image
	  // make all images (vowel marks) if any in this div visible
	  //var images = ev.target.parentElement.getElementsByTagName("img");
	  //for (i=0; i < images.length; i++) {images[i].classList.remove("hidden");}
	     // if matching on sounds, remove ear symbol - not doing this now
	 // if (ev.target.previousElementSibling.previousElementSibling.classList.contains("ear")) {
	//	  ev.target.previousElementSibling.previousElementSibling.classList.add("hidden");
	 // }	  
	  //document.getElementById(answerId).parentElement.classList.add("hidden"); 
	  document.getElementById(answerId).classList.add("hidden"); 
	            // remove the answer from the possible answers

	  var finished = dragDropFinished(ev.target);
	  
	  if (finished) {
	     rewardModal("Well done!"); 
      }	  

   } else {	 
        ev.target.classList.remove("flex-drag-drop-droppable"); 
                // this removes visual cue due to hovering for attempted drop 
   }				
}

function dragDropFinished(thisSpec){
   // thisSpec is one of the query boxes in the questions flexbox
   // if all the query boxes have the class "hidden" then all the questions have been answered   
   var i;
   const questionsFlexdiv = thisSpec.parentNode.parentNode;
   const questionsDivs = questionsFlexdiv.children;
   
   if (questionsDivs.length == 1){
	   var finished = false;
   } else {	
       var finished = true;	
   
       for (i=0; i < questionsDivs.length; i++) { 
	      var spans = questionsDivs[i].children;
          if (!(spans[2].classList.contains("hidden"))){
		      finished = false;
		      break;
	      }	
       }		  
   }
   return finished;

}