"use strict";

//-- create the modal popup used as reward for finishing an exercise
//------------------------------------------------------------------
function closeRewardModal(){
	//test("hi");
	const modal = document.getElementById("rewardModal");
	//modal.style.display="none";
	if (!( modal == null)) {modal.parentNode.removeChild(modal);}
}	
function rewardModal(rewardText){

   const modal = document.createElement("div");
   modal.classList.add("reward-modal");
   modal.setAttribute("id", "rewardModal");

   const modalContent = document.createElement("div");
   modalContent.classList.add("reward-modal-content");
   
   //const closeBtn = document.createElement("span");
   const closeBtn = document.createElement("span");
   closeBtn.classList.add("btn-close");
   closeBtn.addEventListener("click",function(){closeRewardModal();});
   modalContent.appendChild(closeBtn);

   const modalSpan = document.createElement("span");
   modalSpan.classList.add("blink");
   modalSpan.font = "Courier";
   
   var randomIndex1 = Math.floor(Math.random() * 5);
   switch (randomIndex1){
	   case 0:
	      var thisText = "Well done!";
		  break;
	   case 1:	  
	      var thisText = "Good job!";
		  break;
	   case 2:	  
	      var thisText = "Excellent!";
		  break;
	   case 3:	  
	      var thisText = "You're a star!";
		  break;
	   case 4:	  
	      var thisText = "Keep it up!";
		  break;
   }
   //const modalText = document.createTextNode(rewardText); 
   const modalText = document.createTextNode(thisText); 
   modalSpan.appendChild(modalText);
   modalContent.appendChild(modalSpan);
   
   const thisImage = document.createElement("img");
   var randomIndex2 = Math.floor(Math.random() * 5);
   switch (randomIndex2){
	   case 0:
          thisImage.src = "images/How-To-Draw-A-Sunflower.jpg";
		  break;
	   case 1:	  
          thisImage.src = "images/How-To-Draw-A-Daffodil.jpg";
		  break;
	   case 2:	  
          thisImage.src = "images/Lavender-Drawing.jpg";
		  break;
	   case 3:	  
          thisImage.src = "images/Carnation-Drawing.jpg";
		  break;
	   case 4:	  
          thisImage.src = "images/Geranium-Drawing.jpg";
		  break;
   }

   //thisImage.width = 80;
   //thisImage.height = 80;
   thisImage.width = 60;
   thisImage.height = 80;
   thisImage.style.float = "left";
   modalContent.appendChild(thisImage);
 
   modal.appendChild(modalContent);
   //document.getElementById("main").appendChild(modal);
   document.getElementsByTagName("main")[0].appendChild(modal);
   
   var thisSpec = document.getElementById("rewardModal");
   thisSpec.style.display = "block";
   
   const myTimeout = setTimeout(closeRewardModal,5000);
}

//-- create the modal popup used when checking answer in syllables exercise - not correct
//---------------------------------------------------------------------------------------
function closeSyllablesModal(){
	//test("hi");
	const modal = document.getElementById("syllablesModal");
	//modal.style.display="none";
	if  (!( modal == null)) {modal.parentNode.removeChild(modal);}
}	
function syllablesModal(correctAnswer){

   const modal = document.createElement("div");
   modal.classList.add("syllables-modal");
   modal.setAttribute("id", "syllablesModal");

   const modalContent = document.createElement("div");
   modalContent.classList.add("syllables-modal-content");

   //const closeBtn = document.createElement("span");
   const closeBtn = document.createElement("span");
   closeBtn.classList.add("btn-close");
   closeBtn.addEventListener("click",function(){closeSyllablesModal();});
   modalContent.appendChild(closeBtn);

   const span1 = document.createElement("span");
   var message = "Not quite. Keep trying!";
   message = "\u2639"  + " " + message;
   const text1 = document.createTextNode(message); 
   span1.appendChild(text1);
   modalContent.appendChild(span1);


   const para1 = document.createElement("p");
   
   const span2 = document.createElement("span");
   const text2 = document.createTextNode("Show correct answer"); 
   span2.appendChild(text2);
   span2.classList.add("clickable");
   span2.classList.add("underline");
   span2.addEventListener("click",function()
        {this.nextElementSibling.classList.remove("hidden");
		 });
   para1.appendChild(span2);

   const span3 = document.createElement("span");
   const text3 = document.createTextNode(" " + correctAnswer); 
   span3.appendChild(text3);
   span3.classList.add("hebrew35");
   span3.classList.add("hidden");
   para1.appendChild(span3);
   
   modalContent.appendChild(para1);

   modal.appendChild(modalContent);
   //document.getElementById("main").appendChild(modal);
   document.getElementsByTagName("main")[0].appendChild(modal);
   
   var thisSpec = document.getElementById("syllablesModal");
   thisSpec.style.display = "block";
   
   //const myTimeout = setTimeout(closeRewardModal,5000);
}


//-- create the modal popup to communicate why consonant-vowel exercise not created
//---------------------------------------------------------------------------------------
function closeConsonantVowelModal(){
	//test("hi");
	const modal = document.getElementById("consonantVowelModal");
	//modal.style.display="none";
	if (!( modal==null)) {modal.parentNode.removeChild(modal);}
}	
function consonantVowelModal(message){

   const modal = document.createElement("div");
   modal.classList.add("syllables-modal");
   modal.setAttribute("id", "consonantVowelModal");

   const modalContent = document.createElement("div");
   modalContent.classList.add("syllables-modal-content");

   //const closeBtn = document.createElement("span");
   const closeBtn = document.createElement("span");
   closeBtn.classList.add("btn-close");
   closeBtn.addEventListener("click",function(){closeConsonantVowelModal();});
   modalContent.appendChild(closeBtn);


   const para1 = document.createElement("p");
   
   const span1 = document.createElement("span");
   const text1 = document.createTextNode(message); 
   span1.appendChild(text1);
   para1.appendChild(span1);

   
   modalContent.appendChild(para1);

   modal.appendChild(modalContent);
   //document.getElementById("main").appendChild(modal);
   document.getElementsByTagName("main")[0].appendChild(modal);
   
   var thisSpec = document.getElementById("consonantVowelModal");
   thisSpec.style.display = "block";
   
   //const myTimeout = setTimeout(closeRewardModal,5000);
}
