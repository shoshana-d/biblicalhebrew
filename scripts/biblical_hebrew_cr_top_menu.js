
"use strict";
// create the navigation menu at the top of the page

// code executed on load
//----------------------
document.addEventListener('DOMContentLoaded', function() {
   var i;
 
 // get name of calling .html file
   var htmlFilename= document.getElementById("htmlfilename").innerHTML.trim();
   
  // top menubar
   var topMenu = document.createElement("nav");
   topMenu.classList.add("navbar");
   topMenu.classList.add("w3-card-4");
   
   var a = document.createElement('a');
   var reftext = document.createTextNode("About");
   a.appendChild(reftext);
   a.href = "lessons-index.html"; 
   topMenu.appendChild(a);
   
   var dropdownRefs = ["lessons-alefbet.html","lessons-alefbet-exercises.html","lessons-alefbetplus.html"];
   var dropdownRefsTexts = ["Learn alefbet","Practise alefbet","Alefbet extra"];
   
   var dropdown = document.createElement('div');
   dropdown.classList.add("navbar-dropdown");
   for (i=0; i < dropdownRefs.length; i++){
	  if (dropdownRefs[i] == htmlFilename ){
		  dropdown.classList.add("this-page");
	  }	  
   }	  
   var dropdownbtn = document.createElement('button');
   dropdownbtn.classList.add("navbar-dropbtn");
   var btntext = document.createTextNode("Alefbet");
   dropdownbtn.appendChild(btntext); 
   dropdownbtn.onclick = function() {showHideNavbarDropdown('navbarDropdown1')};
   dropdown.appendChild(dropdownbtn);
   
   var dropdowncontent = document.createElement('div');
   dropdowncontent.classList.add("navbar-dropdown-content");
   dropdowncontent.classList.add("hidden");
   dropdowncontent.id = 'navbarDropdown1';
   for (i=0; i < dropdownRefs.length; i++){
      var a = document.createElement('a');
      var reftext = document.createTextNode(dropdownRefsTexts[i]);
      a.appendChild(reftext); 
      a.href = dropdownRefs[i]; 
      dropdowncontent.appendChild(a);
   }
   dropdown.appendChild(dropdowncontent); 
   topMenu.appendChild(dropdown);
   
   var otherRefs = ["lessons.html","lessons-extra-vocabulary.html","reference-tables.html","lessons-resources.html"];
   var otherRefsTexts = ["Lessons","Extra vocabulary","Reference tables","Resources"];
   for (i=0; i < otherRefs.length; i++){
      var a = document.createElement('a');
      var reftext = document.createTextNode(otherRefsTexts[i]);
      a.appendChild(reftext); 
      a.href = otherRefs[i]; 
      topMenu.appendChild(a);
   }

   //document.body.prepend(topMenu);
   // insert menu after header
   var pageHeader = document.getElementsByTagName("header")[0];
   pageHeader.parentNode.insertBefore(topMenu, pageHeader.nextSibling); 

   var pageHeader = document.getElementsByTagName("nav")[0];
   var atags = pageHeader.getElementsByTagName("a");
   for (i=0; i < atags.length; i++){
      var lastSlashIndex = Math.max(atags[i].href.lastIndexOf('/'), atags[i].href.lastIndexOf('\\'));
      var atagFilename = atags[i].href.substring(lastSlashIndex + 1);
	  if (atagFilename == htmlFilename){
		  atags[i].classList.add("this-page");
	  }	  
   }		   

}) 

