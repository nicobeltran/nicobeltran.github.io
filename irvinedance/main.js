let slideIndex = 1;


function init() {
	var galleries = document.querySelectorAll('.slideshow-container');
	console.log(galleries.length);
	for (let i = 0 ;i < galleries.length; i++) {
	    displaySlides(slideIndex, galleries[i].id);
	}
	console.log("init");
}

function nextSlide(n, slideshow) {
	// console.log("next");
	displaySlides(slideIndex += n, slideshow);
}

function currentSlide(n, slideshow) {
	displaySlides(slideIndex = n, slideshow);
}

function displaySlides(n, slideshow) {
	//get all slides in gallery of "slideshow" 
	let slides = document.querySelectorAll('#' + slideshow + " .imageSlide");

	//if n is greater than amount of slides, reset back to beginning
	if (n > slides.length) {
		slideIndex = 1;
	}

	// if n is less than 1, go to end of slides
	if (n < 1) {
		slideIndex = slides.length;
	}

	// for each slide, set display = none
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}

	// for slide that needs to be shown, set display = block
	slides[slideIndex-1].style.display = "block";
	console.log("done");
}

