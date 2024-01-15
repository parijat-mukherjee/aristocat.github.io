let isClickable = false;
document.addEventListener("DOMContentLoaded", function () {
  // Loading screen management
  function disableInteraction() {
    document.body.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";
  }

  function enableInteraction() {
    document.body.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
  }

  var loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "flex";
  disableInteraction();

  window.addEventListener("load", function () {
    var loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "none";

    enableInteraction();
  });

  // Parallax Scroll Code

  const layerBackgroundBuildings = document.querySelector(
    ".layer-background-buildings"
  );
  let lastScrollPosition = 0;

  function updateParallax() {
    const scrollPosition = window.scrollY;
    const translateY = scrollPosition * 0.2;

    layerBackgroundBuildings.style.transform = `translateY(${translateY}px)`;

    lastScrollPosition = scrollPosition;
    requestAnimationFrame(updateParallax);
  }

  window.addEventListener("scroll", function () {
    if (!lastScrollPosition) {
      lastScrollPosition = window.scrollY;
    }

    requestAnimationFrame(updateParallax);
  });

  // Parallax effect code ends

  // dotlottie code begins

  // Function to check visibility

  const isElementFullyInView = (element) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate the visible height as the intersection of the element with the viewport
    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);

    // Calculate the percentage of the element's height that is visible
    const visiblePercentage = (visibleHeight / rect.height) * 100;

    const isInView = visiblePercentage > 60;
    const isOutOfView = visiblePercentage < 10;

    return {
      isInView,
      isOutOfView,
    };
  };

  //Handling Door Animations

  // Array of door class names
  const doorClassNames = [
    ".animation-lottie-door",
    ".content-lottie-door",
    ".webdev-lottie-door",
    ".illustration-lottie-door",
  ];

  // Object to track the door states for each door element
  const doorStates = {};

  // Function to handle scroll events for a given door element
  const handleScroll = (element) => {
    const { isInView, isOutOfView } = isElementFullyInView(element);
    const elementId = element.id || element.className; // Use ID or class as a unique identifier for the element

    if (
      isInView &&
      element.className.includes("door") &&
      !doorStates[elementId]
    ) {
      // If the door is in view and not already open, open it

      element.play();
      doorStates[elementId] = true;
      isClickable = true;
    } else if (
      isOutOfView &&
      element.className.includes("door") &&
      doorStates[elementId]
    ) {
      // If the door is out of view and currently open, close it

      element.stop();
      doorStates[elementId] = false;
      isClickable = false;
    }
  };

  // Loop through door class names
  doorClassNames.forEach((className) => {
    // Get door elements with the current class
    const doorElements = document.querySelectorAll(className);

    // Attach the handleScroll function to the window's scroll event for each element
    doorElements.forEach((element) => {
      window.addEventListener("scroll", () => handleScroll(element));

      // Initial check on page load for each element
      handleScroll(element);
    });
  });

  // Handling Animations
  const podClassNames = [
    ".animation-lottie",
    ".content-lottie",
    ".webdev-lottie",
    ".illustration-lottie",
    ".spray-painter-lottie",
    ".disc-jockey-lottie",
    ".smoker-cat-lottie",
    ".smoke-lottie",
    ".roof-lottie",
    ".testimonial-lottie",
    ".reach-out-lottie",
  ];

  // Object to track the animation states
  const animationStates = {};

  // Function to handle scroll events for a given element
  const handlePodScroll = (element) => {
    const { isInView, isOutOfView } = isElementFullyInView(element);
    const elementId = element.id || element.className; // Use ID or class as a unique identifier for the element

    if (isInView && !animationStates[elementId]) {
      // If the element is in view and not already playing, play the animation
      element.play();
      animationStates[elementId] = true;
    } else if (isOutOfView && animationStates[elementId]) {
      // If the element is out of view and currently playing, pause the animation
      element.stop();
      animationStates[elementId] = false;
    }
  };

  // Loop through class names
  podClassNames.forEach((className) => {
    // Get elements with the current class
    const podElements = document.querySelectorAll(className);

    // Attach the handleLottieScroll function to the window's scroll event for each element
    podElements.forEach((element) => {
      window.addEventListener("scroll", () => handlePodScroll(element));

      // Initial check on page load for each element
      handlePodScroll(element);
    });
  });
});

//modal handling code

const openIllustrationModal = document.getElementById(
  "illustration-hidden-div"
);

const openAnimationModal = document.getElementById("animation-hidden-div");
const openContentModal = document.getElementById("content-hidden-div");
const openWebDevModal = document.getElementById("webdev-hidden-div");
const modalOverlay = document.getElementById("overlay");
const showMoreButton = document.getElementById("show-more-button");
const closeModal = document.getElementById("closeModal");
const sliderTexts = document.querySelectorAll(".slider-text");

function handleTabButtonEvents() {
  illustrationTabButton.addEventListener("click", function () {
    activateIllustrationModal();
  });
  animationTabButton.addEventListener("click", function () {
    activateAnimationModal();
  });
  contentTabButton.addEventListener("click", function () {
    activateContentModal();
  });
  webDevTabButton.addEventListener("click", function () {
    activateWebDevModal();
  });
}

function activateIllustrationModal() {
  deactivateModal();
  document.querySelector(".main-img").src = "./pics/illustration.png";
  modalOverlay.classList.add("illustration-overlay");
  modalOverlay.style.display = "flex";
  showMoreButton.classList.add("show-more-illustration");
  sliderTexts.forEach((sliderText) =>
    sliderText.classList.add("slider-text-illustration")
  );
  illustrationTabButton.classList.add("tab-button-active");
  animationTabButton.classList.remove("tab-button-active");
  contentTabButton.classList.remove("tab-button-active");
  webDevTabButton.classList.remove("tab-button-active");
  disableScroll();
  handleTabButtonEvents();
}

function activateAnimationModal() {
  deactivateModal();
  document.querySelector(".main-img").src = "./pics/animation.png";
  modalOverlay.classList.add("animation-overlay");
  modalOverlay.style.display = "flex";
  showMoreButton.classList.add("show-more-animation");
  sliderTexts.forEach((sliderText) =>
    sliderText.classList.add("slider-text-animation")
  );
  illustrationTabButton.classList.remove("tab-button-active");
  animationTabButton.classList.add("tab-button-active");
  contentTabButton.classList.remove("tab-button-active");
  webDevTabButton.classList.remove("tab-button-active");
  disableScroll();
  handleTabButtonEvents();
}

function activateContentModal() {
  deactivateModal();
  document.querySelector(".main-img").src = "./pics/content.png";
  modalOverlay.classList.add("content-overlay");
  modalOverlay.style.display = "flex";
  showMoreButton.classList.add("show-more-content");
  sliderTexts.forEach((sliderText) =>
    sliderText.classList.add("slider-text-content")
  );
  illustrationTabButton.classList.remove("tab-button-active");
  animationTabButton.classList.remove("tab-button-active");
  contentTabButton.classList.add("tab-button-active");
  webDevTabButton.classList.remove("tab-button-active");
  disableScroll();
  handleTabButtonEvents();
}

function activateWebDevModal() {
  deactivateModal();
  document.querySelector(".main-img").src = "./pics/webdev.png";
  modalOverlay.classList.add("webdev-overlay");
  modalOverlay.style.display = "flex";
  showMoreButton.classList.add("show-more-webdev");
  sliderTexts.forEach((sliderText) =>
    sliderText.classList.add("slider-text-webdev")
  );

  illustrationTabButton.classList.remove("tab-button-active");
  animationTabButton.classList.remove("tab-button-active");
  contentTabButton.classList.remove("tab-button-active");
  webDevTabButton.classList.add("tab-button-active");
  disableScroll();
  handleTabButtonEvents();
}

function deactivateModal() {
  modalOverlay.style.display = "none";
  modalOverlay.classList.remove(
    "illustration-overlay",
    "animation-overlay",
    "content-overlay",
    "webdev-overlay"
  );
  showMoreButton.classList.remove(
    "show-more-illustration",
    "show-more-animation",
    "show-more-content",
    "show-more-webdev"
  );

  sliderTexts.forEach((sliderText) =>
    sliderText.classList.remove(
      "slider-text-illustration",
      "slider-text-animation",
      "slider-text-content",
      "slider-text-webdev"
    )
  );
  enableScroll();
}

openIllustrationModal.addEventListener("click", function () {
  activateIllustrationModal();
});

openAnimationModal.addEventListener("click", function () {
  activateAnimationModal();
});

openContentModal.addEventListener("click", function () {
  activateContentModal();
});

openWebDevModal.addEventListener("click", function () {
  activateWebDevModal();
});

closeModal.addEventListener("click", function () {
  deactivateModal();
});

window.addEventListener("click", function (event) {
  if (event.target === modalOverlay) {
    deactivateModal();
  }
});

//Slider Code

const sliders = document.querySelectorAll(".slider");
const nextArrow = document.querySelector(".next-container");
const prevArrow = document.querySelector(".prev-container");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function showNextSlider() {
  const currentSlider = sliders[currentIndex];
  const nextIndex = (currentIndex + 1) % sliders.length;
  const nextSlider = sliders[nextIndex];

  currentSlider.style.opacity = 0;
  nextSlider.style.opacity = 1;

  currentIndex = nextIndex;
}

function showPrevSlider() {
  const currentSlider = sliders[currentIndex];
  const prevIndex = (currentIndex - 1 + sliders.length) % sliders.length;
  const prevSlider = sliders[prevIndex];

  currentSlider.style.opacity = 0;
  prevSlider.style.opacity = 1;

  currentIndex = prevIndex;
}

function activateNextDot() {
  const nextDotIndex = currentIndex % dots.length;
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === nextDotIndex);
  });
}

function activatePrevDot() {
  const prevDotIndex = (currentIndex + dots.length) % dots.length;
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === prevDotIndex);
  });
}

function startInterval() {
  intervalId = setInterval(() => {
    showNextSlider();
    activateNextDot();
  }, 5000);
}

sliders[currentIndex].style.opacity = 1;

nextArrow.addEventListener("click", () => {
  clearInterval(intervalId);
  showNextSlider();
  activateNextDot();
  startInterval();
});

prevArrow.addEventListener("click", () => {
  clearInterval(intervalId);
  showPrevSlider();
  activatePrevDot();
  startInterval();
});

startInterval();

//Contact Us Form Section

const reachOutButton = document.getElementById("reach-out-button");
const contactForm = document.querySelector(".contact-form");
reachOutButton.addEventListener("click", function () {
  contactForm.scrollIntoView({ behavior: "smooth" });
});

function handleSubmit() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var query = document.getElementById("query").value;

  if (!name || !email || !query) {
    alert("Please fill in all the fields.");
    return;
  }

  alert("Your message has been sent. Thank you for reaching out!");

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("query").value = "";

  var apiUrl = "API_URL/submit-form";

  var data = {
    name: name,
    email: email,
    query: query,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      console.log("Server response:", responseData);
      alert("Form submitted successfully!");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("Form submission failed. Please try again later.");
    });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const chevronLeft = document.querySelector(".chevron-left");
const chevronRight = document.querySelector(".chevron-right");

const illustrationTabButton = document.querySelector("#tab-button-1");
const animationTabButton = document.querySelector("#tab-button-2");
const contentTabButton = document.querySelector("#tab-button-3");
const webDevTabButton = document.querySelector("#tab-button-4");

chevronLeft.addEventListener("click", handleBackwardModalSwitch);
chevronRight.addEventListener("click", handleForwardModalSwitch);

// JavaScript to disable scroll
function disableScroll() {
  document.addEventListener("wheel", disableScrollHandler, { passive: false });
}

function disableScrollHandler(event) {
  event.preventDefault();
}

function enableScroll() {
  document.removeEventListener("wheel", disableScrollHandler);
}

let modalNum = 1;

function handleModalSwitch() {
  switch (modalNum) {
    case 1:
      activateIllustrationModal();
      break;

    case 2:
      activateAnimationModal();
      break;

    case 3:
      activateContentModal();
      break;

    case 4:
      activateWebDevModal();
      break;
  }
}

function handleForwardModalSwitch() {
  if (modalNum < 4) {
    modalNum++;
    handleModalSwitch();
  } else {
    modalNum = 1;
    handleModalSwitch();
  }
}

function handleBackwardModalSwitch() {
  if (modalNum > 1) {
    modalNum--;
    handleModalSwitch();
  } else {
    modalNum = 4;
    handleModalSwitch();
  }
}
