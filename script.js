const textChoiceButton = document.getElementById("text-choice");
const audioChoiceButton = document.getElementById("audio-choice");
const textInputSection = document.getElementById("text-input-section");
const audioInputSection = document.getElementById("audio-input-section");
const submitTextButton = document.getElementById("submit-text");
const submitAudioButton = document.getElementById("submit-audio");
const loadingContainer = document.getElementById("loading-container");
const outputContainer = document.getElementById("output-container");
const toggleProcess = document.getElementById("toggle-process");
const loadingProgress = document.querySelector(".loading-progress");

window.addEventListener("load", () => {
	textChoiceButton.click();
});

textChoiceButton.addEventListener("click", () => {
	textInputSection.classList.remove("hide");
	audioInputSection.classList.add("hide");
	textChoiceButton.style.border = "2px solid #b06ab3";
	audioChoiceButton.style.border = "";
	outputContainer.classList.remove("active");
	// textInputSection.style.display = "block";
	// audioInputSection.style.display = "none";
});

audioChoiceButton.addEventListener("click", () => {
	audioInputSection.classList.remove("hide");
	textInputSection.classList.add("hide");
	audioChoiceButton.style.border = "2px solid #b06ab3";
	textChoiceButton.style.border = "";
	outputContainer.classList.remove("active");
	// audioInputSection.style.display = "block";
	// textInputSection.style.display = "none";
});

audioInputSection.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		submitAudioButton.click();
	}
});

textInputSection.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		submitTextButton.click();
	}
});

const simulateLoading = () => {
	loadingContainer.classList.add("active");

	let steps = ["Pre-Processing...", "Analyzing...", "Detecting Sarcasm..."];
	let index = 0;
	let progress = 0;
	const stepElement = document.querySelector(".loading-step");

	// Function to update the loading text at fixed intervals
	const updateLoadingText = () => {
		if (index < steps.length) {
			stepElement.textContent = steps[index];
			index++;
			setTimeout(updateLoadingText, 2500); // Update text every second
		}
	};

	// Function to smoothly fill the loading bar
	const smoothLoadingBar = () => {
		//let progress = 0; // Start at 0%
		const duration = 7500; // Total duration for bar to fill (in ms)
		const interval = 10; // Update interval (in ms)
		const step = 100 / (duration / interval); // Increment per interval

		const progressInterval = setInterval(() => {
			progress += step;
			if (progress >= 100) {
				progress = 100;
				clearInterval(progressInterval);
				setTimeout(() => {
					loadingContainer.classList.remove("active");
					outputContainer.classList.add("active");
				}, 500); // Show results after loading completes
			}
			loadingProgress.style.width = `${progress}%`;
		}, interval);
	};

	// Start both transitions independently
	updateLoadingText();
	smoothLoadingBar();
};

// const simulateLoading = () => {
// 	loadingContainer.classList.add("active");

// 	let steps = ["Pre-Processing...", "Analyzing...", "Detecting Sarcasm..."];
// 	let index = 0;
// 	let progress = 0;
// 	const stepElement = document.querySelector(".loading-step");

// 	const updateProgress = () => {
// 		if (progress < 100) {
// 			progress += 1; // Increment progress by 1%
// 			loadingProgress.style.width = `${progress}%`; // Update the loading bar width
// 		}
// 	};

// 	const changeStep = () => {
// 		if (index < steps.length) {
// 			stepElement.textContent = steps[index];
// 			index++;
// 			if (progress < 100) {
// 				setTimeout(() => {
// 					updateProgress(); // Increment progress
// 					// changeStep(); // Change the text step
// 				}, 100); // Repeat every 100ms for smooth progress and step changes
// 			}
// 		} else {
// 			setTimeout(() => {
// 				loadingContainer.classList.remove("active");
// 				outputContainer.classList.add("active");
// 			}, 500); // Simulate loading completion
// 		}
// 	};
// 	changeStep();
// 	// setTimeout(() => {
// 	// 	loadingContainer.classList.remove("active");
// 	// 	outputContainer.classList.add("active");
// 	// }, 3000);
// };

submitTextButton.addEventListener("click", (e) => {
	e.preventDefault();
	const textInput = document.getElementById("text-input");
	const alertParagraph = document.querySelector(".alert");
	if (textInput.checkValidity()) {
		alertParagraph.classList.add("hide");
		simulateLoading();
	} else {
		alertParagraph.classList.remove("hide");
		// alert("Invalid input. Please enter at least 5 characters.");
	}
});

submitAudioButton.addEventListener("click", (e) => {
	e.preventDefault();
	const audioInput = document.getElementById("audio-input");
	const alertParagraph = document.querySelector(".alert");
	if (audioInput.files.length > 0 && audioInput.files[0].size <= 1048576) {
		alertParagraph.classList.add("hide");
		simulateLoading();
	} else {
		alertParagraph.classList.remove("hide");
		// alert("Invalid input. Please upload an audio file less than 1MB.");
	}
});

toggleProcess.addEventListener("click", () => {
	const processFlowImg = document.getElementById("process-flow-img");
	if (processFlowImg.style.display === "none") {
		processFlowImg.style.display = "block";
		toggleProcess.textContent = "Hide Process Flow";
	} else {
		processFlowImg.style.display = "none";
		toggleProcess.textContent = "Show Process Flow";
	}
});
