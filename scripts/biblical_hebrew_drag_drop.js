

"use strict";

// code executed on load
//----------------------
document.addEventListener('DOMContentLoaded', function() {
 	var i;
 
   // create the drag drop flexboxes in JS  (includes event listeners) 
   var onloadDragClass = document.getElementsByClassName("onload-flex-drag-drop");
   for (i = 0; i < onloadDragClass.length; i++) {
      var thisSpec = onloadDragClass[i];
      createFlexDragDrop(thisSpec);
   }	


})



//------- drag-drop flexboxes ----------------------
//--------------------------------------------------

 function createFlexDragDrop(thisSpecElement){
//test("hello from createFlexDragDrop, thisSpecElement id= " + thisSpecElement.id); 
 
	// thisSpecElement is the paragraph containing the instructions for creating the flexbox

   var i;
   var j;

 // get specifications
   var flexId = null; // id of new div that will contain the created drag/drop

   var questionsSourceId = null;
   var questionsSeparateParas = false;

   var answersSourceId = null;
   var answersSeparateParas = false;
   var answersInSyllables = false;  // indicate whether have to be combined into a whole word
                                    // for drag drop matching sounds for words in Tanakh exercise
   
   var questionsAnswersSame = false;  // questions and answers specified in pairs, randomly assigned to question or answer
   var questionsAnswersSourceId = null;
 
   var soundsSpecified = false;
   var soundsSourceId = null;
   var audioDir = null;         // subdirectory of /audio where soundfiles are located
   
   var answerInImage = false; // if true, the answers input is the name of the image file(s); used for standalone vowel marks
   var imagesDir = null;        // if answerInImage, the name of the subdirectory of /images where the image files are located

   var subset =  false;
   var nSubset = 0;

   var matchSounds = false;
   
   var answerClass = "flex-drag-drop-hebrew";
   var questionClass = "flex-drag-drop-hebrew"; 
   var colorClass = "vocab-color";
   var matchSoundsQuestionClass = "ear" ;
    
  // var sourceGlobalCPV = false;
   
    // get the specifications for flexbox questions, answers and sounds
   var parameters = thisSpecElement.innerHTML.split(globalDivider1);
   
   for (j = 0; j < parameters.length; j++) {
	 var thisParameterSpec = parameters[j];
	 var thisP = parameters[j].split(globalDivider2);
	 var thisP0 = thisP[0].toLowerCase().trim();

  	 if (thisP0 == "id"){
		 flexId = thisP[1].trim();
	 
	 } else if (thisP0 == "questions"){
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
		
	 } else if (thisP0 == "questionsanswers"){
		questionsAnswersSame = true;
		questionsAnswersSourceId = thisP[1].trim();  

 	 } else if (thisP0 == "sounds"){
		//soundsSourceId = thisP[1].trim();
		soundsSourceId = removeFirstItem(thisParameterSpec);  // now allowing for possibly multiple sources
	    soundsSpecified = true;
	 } else if (thisP0 == "audio"){
		audioDir = thisP[1].trim();

	  } else if (thisP0 == "answerinimage"){
		 answerInImage = true; 
		 imagesDir = thisP[1].trim();

     } else if (thisP0 == "selection"){
	    subset = true;
	    nSubset = thisP[1].trim();

      } else if (thisP0 == "matchsounds"){  
         matchSounds = true;
		 
       
	  } else if (thisP0 == "questionclass"){
		 questionClass = thisP[1].trim();
      } else if (thisP0 == "answerclass"){
		 answerClass = thisP[1].trim();
      } else if (thisP0 == "colorclass"){
		 colorClass = thisP[1].trim();
		 
  
	  } 
   }


   // some checks
   if (flexId == null  ) { return;  }	// have to specify a target id
   if (soundsSpecified && audioDir==null) {return;}
   if (answerInImage && imagesDir==null) {return;}
   if (matchSounds && !soundsSpecified) {return;}

   if (questionsAnswersSame ){
	   if (questionsAnswersSourceId==null) { return;}
   } else {
       if (answersSourceId==null){ return;}
	   if (!(matchSounds)){
		   if (questionsSourceId==null) {return;}
	   }	   
   }   


   if (matchSounds){ questionClass = matchSoundsQuestionClass;}

   var questions = [];
   var answers = [];
   var sounds = [];
//test("hello from createFlexDragDrop, thisSpecElement id= " + thisSpecElement.id);  

   // get questions, answers, audio
   
   if (questionsAnswersSame){
	   // not prespecified which are the questions and which the answers
	   // questions and answers in the same list, for each set, randomly select which is question and answer
	   // in pairs, each pair separated by | within pairs separated by :
	   // always only one source list
	   var items = getFromHTML(questionsAnswersSourceId, questionsSeparateParas);
	   for (i=0; i < items.length; i++) {
		  // now assign one of each item to question and one to answer
		  var thisItem = items[i].split(globalDivider2);
		  var order = shuffleArray(createIntegerArray(0,thisItem.length - 1));
		  questions[i] = thisItem[order[0]];
		  answers[i] = thisItem[order[1]];
	   }

    	   
   } else {
	   // get answers
	   answers = getDragDropInput(answersSourceId, answersSeparateParas);
	   
	   // if alternatives for any answers, randomly select one 
	   // (needed when 2 Hebrew words have the same pronunciation and matching sounds)
	   answers = selectAlternatives(answers);
	 
	   // combine syllables into words if required
       if (answersInSyllables){ 
          for (i=0; i < answers.length; i++) { answers[i] = wordFromSyllables(answers[i]);}
       }
 	   
	  // get questions (unless matchSounds, where audio is the question
	   if (!matchSounds) {
		   questions = getDragDropInput(questionsSourceId, questionsSeparateParas);
		   
	      // if alternatives for any questions, randomly select one 
	      // (needed when  Hebrew word has more than one translation)
		   questions = selectAlternatives(questions);

		   if (questions.length == 0) {return;}
	   }
   }

   // check
   if (answers.length == 0) {return;}
   if ( questions.length > 0 && !(questions.length == answers.length)) {return;}
   
   if (soundsSpecified) {
       // get sounds
	   sounds = getDragDropInput(soundsSourceId, false); // sounds are never in separate paras
       if (!(sounds.length == answers.length)) {return;}
	   
	   for (i=0; i < sounds.length; i++) {
		   sounds[i] = addAudioDirToSoundName(sounds[i], audioDir);
	   }
   }
//test("hello from createFlexDragDrop, answers= " + answers + "--");  

   if (subset) {
         // random subset of  answers, questions (if any), sounds (if any)
	   var thisSubset = getSubset(nSubset, answers, questions, sounds);
//test("hello from createFlexDragDrop, thissubset= " +thisSubset + "--");  
 
       answers = thisSubset[0];
       questions = thisSubset[1];
       sounds = thisSubset[2];	   
   }
 

  // now create the new flexboxes
  //------------------------------
  
	// overall container
	//-----------------
   const overallFlexdiv = document.createElement("div");
   overallFlexdiv.setAttribute("id", flexId);
   overallFlexdiv.classList.add("exercise-container");
   overallFlexdiv.classList.add(colorClass);
   
   var answersFlexId = flexId + "-answers";
   var questionsFlexId = flexId + "-questions";

	// answers flexbox
	//----------------
   
   var answersFlexdiv = createAnswersFlexbox(answersFlexId, answers, answerClass, answerInImage, imagesDir, sounds);

	 // add answers flexbox to overall container
   overallFlexdiv.appendChild(answersFlexdiv);
   	 // add order to each cell
   // var divs = answersFlexdiv.children;
	//for (i=0; i < divs.length; i++){ divs[i].style.order = i; }
        
  
	// questions flexbox
	//----------------
    const questionsFlexdiv = document.createElement("div");
 	questionsFlexdiv.setAttribute("id", questionsFlexId);
    questionsFlexdiv.classList.add("flex-container-drag-drop");
	
	var nAnswers = answers.length;
	var anySounds = sounds.length > 0;


    for (i=0; i < nAnswers; i++){
 //test("hello from createFlexDragDrop "+  "--" + answers + "--" + questions + "--" + sounds + "--" + i);	       
       var celldiv = document.createElement("div");
       var span1 = document.createElement("span");
       span1.classList.add(questionClass);
       span1.classList.add("flex-drag-drop-content");
       if (anySounds) { span1.classList.add("soundclick");  }
	  
	   if (!(matchSounds)) {    // if matchSounds, questionclass is "ear" which puts the ear image in this span
         var text1= document.createTextNode(questions[i]);
	     span1.appendChild(text1);
	   }	 
	  
	   celldiv.appendChild(span1);
		 
       if (anySounds) {
		  //NB sounds already have subdirectory of /audio added
          var span2 = crAudioSpan(sounds[i]);
		  celldiv.appendChild(span2);
	   }
	 
	   var span3 = document.createElement("span");
       span3.classList.add("query");
       span3.classList.add("flex-drag-drop-query-box");
  	   //span3.setAttribute("id", questionsFlexId + "-" +  i);
	   
	   celldiv.appendChild(span3);
	   
	   if (answerInImage){ 
	     // these are the vowels
	     // now not allowing multiple images, vowels with the same sound have each been combined into a single image
		 // depending on how many vowels in an image (1,2 or 3) the image must be displayed with a different width, so needs different class
		  var element4 = document.createElement("img");
          element4.src = setJpgName(answers[i].trim(), imagesDir);
		  element4.classList.add(getVowelImageClass(answers[i]));

	   }  else {
		  var element4 = document.createElement("span");
          var text4 = document.createTextNode(answers[i]);
          element4.classList.add(answerClass);
		  
	      element4.appendChild(text4);
	   }
		  
	   element4.classList.add("questionsRowAnswer"); // this is needed when shuffling an existing flexbox
       element4.classList.add("hidden");
       element4.classList.add("flex-drag-drop-content");
       if (anySounds) {element4.classList.add("soundclick");  }
		  
	   celldiv.appendChild(element4);
//test("hello from createFlexDragDrop "+ i+ "--" + nAnswers + "-" + anySounds + "--" + answers + "--" + questions + "--" + sounds);		 
		  
       if (anySounds) {
		    //NB sounds already have subdirectory of /audio added
          var span5 = crAudioSpan(sounds[i]);
		  celldiv.appendChild(span5);
	   }
       questionsFlexdiv.appendChild(celldiv);
  
	}	
	
	
	 // add order to each cell
	//var divs = questionsFlexdiv.children;
	//for (i=0; i < divs.length; i++){ divs[i].style.order = i; }
	
	 // add questionsflexbox to overall container
    overallFlexdiv.appendChild(questionsFlexdiv);

     // add event listeners and attributes to flexbox
	 //-----------------------------------------------
    // answers
    var flexdivElements =  answersFlexdiv.getElementsByClassName("flex-drag-drop-content");
    for (i=0; i < flexdivElements.length; i++){
	   var thisElement = flexdivElements[i];	

       if (matchSounds){
          thisElement.addEventListener("click", function(){checkMatchSoundsAnswer(event);});
		  thisElement.classList.add("clickable");
		  
	   } else {
          thisElement.addEventListener("click", function(){selectAnswer(event);});
          thisElement.addEventListener("dragstart",function(){handleDragStart(event);});
 	      thisElement.setAttribute("draggable", true);
       }		   
	   
    } 
	// questions
    var flexdivElements =  questionsFlexdiv.getElementsByTagName("*");
    for (i=0; i < flexdivElements.length; i++){
	   var thisElement = flexdivElements[i];	
	   var thisClassList = flexdivElements[i].classList;
	   
       if (thisClassList.contains("soundclick")) {
		   addsoundclickEventListener(thisElement, false);
       }
	   
	   if (matchSounds){
 	       if (thisClassList.contains("ear")) {
              thisElement.addEventListener("click", function(){selectMatchSoundsQuestion(event);});
		   }  
	   } else {  
 	       if (thisClassList.contains("query")) {
              thisElement.addEventListener("drop", function(){handleDrop(event);});
		      thisElement.addEventListener("dragenter",function(){handleDragEnter(event);});
		      thisElement.addEventListener("dragleave",function(){handleDragLeave(event);});
		      thisElement.addEventListener("dragover",function(){handleDragOver(event);});
		   
		      thisElement.addEventListener("click", function(){checkAnswer(event);});
	       } 
       }		   
    }   
     
	// add overall flexbox to document	
	thisSpecElement.parentNode.insertBefore(overallFlexdiv, thisSpecElement);
	
	// finally, shuffle
	shuffleNewFlexDragDropQuestions(flexId);
	shuffleNewFlexDragDropAnswers(flexId);

}

function  createAnswersFlexbox(answersFlexId, answers, answerClass, answerInImage, imagesDir, sounds){
   var i;
   var j;
   var answersFlexdiv = document.createElement("div");
   answersFlexdiv.setAttribute("id", answersFlexId);
   answersFlexdiv.classList.add("flex-container-drag-drop");
   
   for (i=0; i < answers.length; i++){
	  var celldiv = document.createElement("div");
	  
	  if (answerInImage){ 
	     // now not allowing multiple images, vowels with the same sound have each been combined into a single image
		    var answerElement = document.createElement("img");
            answerElement.src = setJpgName(answers[i].trim(), imagesDir);
//test("hello from createAnswersFlexbox " + answers + "--" + answerInImage + "--" + answers[i]);
			answerElement.classList.add(getVowelImageClass(answers[i]));
		 
	  }  else {
		  var answerElement = document.createElement("span");
          var text1= document.createTextNode(answers[i]);
	      answerElement.appendChild(text1);
		  
          answerElement.classList.add(answerClass);
	  }
	  
      answerElement.classList.add("flex-drag-drop-content");
     // if (anySounds) { answerElement.classList.add("soundclick");  }  // now using click event to select answer
	                                                                    // clicking selected answer gives sound
		  
	  celldiv.appendChild(answerElement);
		  
	  if (sounds.length > 0) {
		    //NB sounds already have subdirectory of /audio added
          var span2 = crAudioSpan(sounds[i]);
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


function shuffleNewFlexDragDropAnswers(thisId) {
    // thisId is the id of the flexbox (not the id of the paragraph with the parameters for the flexbox)
	// this function shuffles a newly created drag drop exercise
  var i;
  var answersId = thisId + "-answers";
  const answersContainer = document.getElementById(answersId);
   if (answersContainer == null){ return;}
  const answersCells = answersContainer.children;  
  const nCells = answersContainer.childElementCount ;

  var shuffleOrder = shuffleArray(createIntegerArray(0, nCells-1));
  for ( i = 0; i < nCells; i++) {
	answersCells[i].style.order = shuffleOrder[i];
  } 

}
function shuffleNewFlexDragDropQuestions(thisId) {
    // thisId is the id of the flexbox (not the id of the paragraph with the parameters for the flexbox)
	// this function shuffles a newly created drag drop exercise
  var i;
  var questionsId = thisId + "-questions";
  const questionsContainer = document.getElementById(questionsId);
   if (questionsContainer == null){ return;}
  const questionsCells = questionsContainer.children;  
  const nCells = questionsContainer.childElementCount ;
 
  var shuffleOrder = shuffleArray(createIntegerArray(0, nCells-1));
  for ( i = 0; i < nCells; i++) {
	questionsCells[i].style.order = shuffleOrder[i];
  } 

}

//---- no longer used, not sure that this works correctly--------------------------------
//  (may not remove droppable from last selected query box)
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
  var questionMarks = questionsContainer.getElementsByClassName("flex-drag-drop-query-box");
  for (i=0; i < questionMarks.length; i++) { 
     questionMarks[i].classList.remove("hidden");
     questionMarks.classList.remove("flex-drag-drop-droppable"); 
  }
  
  var correctAnswers = questionsContainer.getElementsByClassName("questionsRowAnswer");
  for (i=0; i < correctAnswers.length; i++) { correctAnswers[i].classList.add("hidden");}


  shuffleNewFlexDragDropAnswers(thisId);
  shuffleNewFlexDragDropQuestions(thisId);
}

//------ utility functions ------------------
//------------------------------------------------
function getDragDropInput(sourceIdString, separateParas){
	var i;
	var input = [];
	var idsArray = sourceIdString.split(globalDivider2); // allows for input from multiple sources
	for (i=0; i < idsArray.length; i++) { 
	   var temp1 = getFromHTML(idsArray[i].trim(), separateParas);
	   input = input.concat(temp1);
	} 
    return input;	
}

function getSubset(nSubset, answers, questions, sounds){
    var i;
	var answersSubset = [];
	var questionsSubset = [];
	var soundsSubset = [];
	if (answers.length > nSubset){
	   var subsetList = shuffleArray(createIntegerArray(0, answers.length-1));
	   for (i=0; i < nSubset; i++) { 
          answersSubset[i] = answers[subsetList[i]];
		  if (questions.length > 0) {questionsSubset[i] = questions[subsetList[i]];}
		  if (sounds.length > 0) {soundsSubset[i] = sounds[subsetList[i]];}
       }
	} else {
 	   answersSubset = answers;
	   questionsSubset = questions;
	   soundsSubset = sounds;
    }		
	
   var selectedSubsets = [answersSubset, questionsSubset, soundsSubset];
//test("hello from getSubset " + selectedSubsets + "--" );   
   return selectedSubsets;
	
}	
function selectAlternatives(inputList){
	var i;
	var outputList = inputList;
	
	for (i=0; i < inputList.length; i++){
		var thisOutput = inputList[i].split(globalDivider2);
		if (thisOutput.length > 1) {
		    var order = shuffleArray(createIntegerArray(0,thisOutput.length - 1));
			outputList[i] = thisOutput[order[0]];
		}	   
    }
	return outputList;
}

//--- utility functions event listeners ---------------------------
//-------------------------------------------------------------------
function getVowelImageClass(vowelName){
	var nVowels = vowelName.trim().split("_and_").length;
	var thisClass = null;
	if (nVowels == 1){
		thisClass = "vowel-image-drag-drop";
	} else if (nVowels == 2){
		thisClass = "vowel-image2-drag-drop";
    } else{
		thisClass = "vowel-image3-drag-drop";
    }
    return thisClass;			   
} 

function getElementValue(element){
	var elementValue;
	if (element.tagName == 'IMG'){
		// remove _selected from image source (if it's there)
		elementValue = element.src.replace("_selected","");
	} else {
        elementValue = element.innerHTML;
    }
    
    return elementValue;	
}
	
function setSelected(thisElement){
	thisElement.classList.add("flex-drag-drop-selected"); 
	if (thisElement.tagName == 'IMG'){
		thisElement.src = thisElement.src.replace(".jpg", "_selected.jpg");
	}	
}

function setUnselected(thisElement){
	thisElement.classList.remove("flex-drag-drop-selected");
	if (thisElement.tagName == 'IMG') {
		thisElement.src = thisElement.src.replace("_selected.jpg",".jpg");
	}	
}
	
function isSelected(thisElement){
	if (thisElement.classList.contains("flex-drag-drop-selected")) {return true;}
	else                                                          {return false;}
}

function getChildrenWhichAreSelected(thisElement){
	return thisElement.getElementsByClassName("flex-drag-drop-selected");
}	

//------ point and click functions ------------------
//------------------------------------------------

	
function selectAnswer(ev) {
	var i;

    // already selected? if so, play sound
	//if (ev.target.classList.contains("flex-drag-drop-selected")){
	if (isSelected(ev.target)){
       var thisLetter =  ev.target.nextElementSibling.innerHTML;
	   var thisSound = setMp3Name(thisLetter);
	   playSound(thisSound);
	   
    } else {
	   // first, unselect any inputList that are selected
       //var selected = ev.target.parentElement.parentElement.getElementsByClassName("flex-drag-drop-selected");
       var selected = getChildrenWhichAreSelected(ev.target.parentElement.parentElement);
	   for (i=0; i < selected.length; i++) {
		  var thisSelected = selected[i];
	      setUnselected(thisSelected);	
//test("hello from selectAnswer, selected[i]=" + selected[i] + " " + i);
	   }

       // now flag this answer as selected
	   setSelected(ev.target);
	}   
}	

function checkAnswer(ev) {

	// when user clicks on "?" box
	var thisElement = ev.target;
	
	var thisAnswer = getElementValue(thisElement.nextElementSibling);
  // var inputListFlexId = flexId + "-inputList";
  // var questionsFlexId = flexId + "-questions";

	var idQuestionsDiv = thisElement.parentElement.parentElement.id;

    var idAnswersDiv = idQuestionsDiv.slice(0,idQuestionsDiv.indexOf("questions")) + "answers";
//test("hello from checkAnswer, idAnswersDiv=" + idAnswersDiv);		
			
    //var selectedElement = document.getElementById(idinputListDiv).getElementsByClassName("flex-drag-drop-selected");
    var selectedElement = getChildrenWhichAreSelected(document.getElementById(idAnswersDiv));
//test("hello from checkAnswer, thisAnswer=" + thisAnswer + ",selectedElement=" + selectedElement);		
	if (selectedElement.length == 0) {return;}
	else {
		var proposedAnswerElement = selectedElement[0];
//test("hello from checkAnswer, proposedAnswer=" + proposedAnswer + ", thisAnswer=" + thisAnswer);		
		//var proposedAnswer = getElementValue(selectedElement[0]);
		var proposedAnswer = getElementValue(proposedAnswerElement);
		if (proposedAnswer == thisAnswer) {
           thisElement.classList.add("hidden"); //make the query box invisible
           thisElement.nextElementSibling.classList.remove("hidden"); // make answer box visible
		   //selectedElement[0] = setUnselected(selectedElement[0]);
		   setUnselected(proposedAnswerElement);
//test("hello from checkAnswer, selectedElement[0]=" + selectedElement[0]);          
	            // remove the answer from the possible inputList
	       proposedAnswerElement.classList.add("hidden"); 
	       var finished = dragDropFinished(thisElement);
//test("hello from checkAnswer, finished=" + finished);          
	  
	       if (finished) {
	         rewardModal("Well done!"); 
           }	  
        }
    }		
 	
}
	


function selectMatchSoundsQuestion(ev){
	// when user clicks on ear image (on the left of box with "?")
	var i;
	// first, unselect any questions that are selected
    //var selected = ev.target.parentElement.parentElement.getElementsByClassName("flex-drag-drop-selected");
    var selected = getChildrenWhichAreSelected(ev.target.parentElement.parentElement);
	for (i=0; i < selected.length; i++) {	
	   var thisSelected = selected[i];
	   setUnselected(thisSelected);	
	}

     // now flag this answer as selected
	 setSelected(ev.target);
}	


function checkMatchSoundsAnswer(ev) {
	// when user clicks an answer box when matching by audio
    var proposedAnswer = getElementValue(ev.target);
	
	var idAnswersDiv = ev.target.parentElement.parentElement.id;
	var idQuestionsDiv = idAnswersDiv.slice(0,idAnswersDiv.indexOf("answers")) + "questions";
	
	var selected = getChildrenWhichAreSelected(document.getElementById(idQuestionsDiv));
 //test("hello from checkMatchSoundsAnswer, proposedAnswer=" + proposedAnswer + "--" + selected);
   if (selected.length > 0){
		var thisQueryBox = selected[0].nextElementSibling.nextElementSibling; //first span after ear is sound, second is query
		var thisAnswer = getElementValue(thisQueryBox.nextElementSibling);
		if (proposedAnswer == thisAnswer){
           thisQueryBox.classList.add("hidden"); //make the query box invisible
           thisQueryBox.nextElementSibling.classList.remove("hidden"); // make answer box visible
		   ev.target.classList.add("hidden");          // remove the answer from the possible Answers
           setUnselected(thisQueryBox.parentElement.firstChild);
		
	       var finished = dragDropFinished(thisQueryBox);
	  
	       if (finished) {
	          rewardModal("Well done!"); 
           }	  
	    }	

	} 	
}

//------ drag and drop functions ------------------
//------------------------------------------------

function handleDragStart(ev) {
	var i;
	//test(ev.target.id);
	if (!(ev.target.classList.contains("flex-drag-drop-selected"))){
	   // first, unselect any answers that are selected
       //var selected = ev.target.parentElement.parentElement.getElementsByClassName("flex-drag-drop-selected");
       var selected = getChildrenWhichAreSelected(ev.target.parentElement.parentElement);
	   for (i=0; i < selected.length; i++) {	setUnselected(selected[i]);	}

       // now flag this answer as selected
	   setSelected(ev.target);
	}   
   
   //ev.dataTransfer.setData("text", ev.target.id);
   ev.dataTransfer.setData("text", getElementValue(ev.target));
}

function handleDragEnter(ev) {
   if (ev.target.classList.contains("query")){
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
   
   var proposedAnswer = ev.dataTransfer.getData("text");
   //var proposedAnswer = document.getElementById(answerId).innerHTML;
  // var actualAnswer = ev.target.nextElementSibling.innerHTML;
   
 	var thisElement = ev.target;
	var thisAnswer = getElementValue(thisElement.nextElementSibling);
	
 	if (proposedAnswer == thisAnswer) {
       thisElement.classList.add("hidden"); //make the query box invisible
       thisElement.nextElementSibling.classList.remove("hidden"); // make answer box visible
	   
	        // remove the answer from the possible Answers
       var idQuestionsDiv = thisElement.parentElement.parentElement.id;
       var idAnswersDiv = idQuestionsDiv.slice(0,idQuestionsDiv.indexOf("questions")) + "answers";
       //var selectedElement = document.getElementById(idAnswersDiv).getElementsByClassName("flex-drag-drop-selected")[0];
       var selectedElement = getChildrenWhichAreSelected(document.getElementById(idAnswersDiv))[0];
	   setUnselected(selectedElement);
       selectedElement.classList.add("hidden"); 
	   var finished = dragDropFinished(thisElement);
	  
	   if (finished) {
	      rewardModal("Well done!"); 
       }	  
    } else {	 
        thisElement.classList.remove("flex-drag-drop-droppable"); 
                // this removes visual cue due to hovering for attempted drop 
    }				
}



function dragDropFinished(thisSpec){
   // thisSpec is one of the query boxes in the questions flexbox
   // if all the query boxes have the class "hidden" then all the questions have been answered   
   var i;
   const questionsFlexdiv = thisSpec.parentNode.parentNode;
   var queryBoxes = questionsFlexdiv.getElementsByClassName("flex-drag-drop-query-box");
   
   var finished = true;	
   
   for (i=0; i < queryBoxes.length; i++) { 
      if (!(queryBoxes[i].classList.contains("hidden"))){
		  finished = false;
		  break;
      }	
   }
    
    return finished;

}
