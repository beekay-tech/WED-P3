let slideIndex = 1;

// Move to the next or previous slide
function plusSlides(n) {
    showSlides(slideIndex + n);
}

// Display a slide when a dot is clicked
function currentSlide(n) {
    showSlides(n);
}

// Show the selected slide
function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (slides.length === 0) {
        return;
    }

    // Allow navigation to wrap around
    slideIndex = ((n - 1) % slides.length + slides.length) % slides.length + 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";

    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add("active");
    }
}

// Lightbox styling
const lightboxCss = {
    overlay: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: "9999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    imageContainer: {
        maxWidth: "90%",
        maxHeight: "90%",
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
    },

    image: {
        maxWidth: "100%",
        maxHeight: "85vh",
        height: "auto",
        display: "block",
        objectFit: "contain"
    },

    closeButton: {
        position: "absolute",
        top: "15px",
        right: "20px",
        backgroundColor: "transparent",
        border: "none",
        color: "#fff",
        fontSize: "32px",
        cursor: "pointer"
    }
};

// Create the lightbox and apply its styles
function createLightbox() {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, lightboxCss.overlay);

    const imageContainer = document.createElement("div");
    Object.assign(imageContainer.style, lightboxCss.imageContainer);

    const enlargedImage = document.createElement("img");
    Object.assign(enlargedImage.style, lightboxCss.image);
    enlargedImage.alt = "";

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&times;";
    closeButton.setAttribute("aria-label", "Close image");
    Object.assign(closeButton.style, lightboxCss.closeButton);

    imageContainer.appendChild(enlargedImage);
    overlay.appendChild(imageContainer);
    overlay.appendChild(closeButton);

    function closeLightbox() {
        overlay.remove();
    }

    closeButton.addEventListener("click", closeLightbox);

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function handleEscape(event) {
        if (event.key === "Escape" && overlay.isConnected) {
            closeLightbox();
            document.removeEventListener("keydown", handleEscape);
        }
    });

    return {
        open: function (src, alt) {
            enlargedImage.src = src;
            enlargedImage.alt = alt;
            document.body.appendChild(overlay);
        }
    };
}

// Initialise the slideshow and image lightbox
document.addEventListener("DOMContentLoaded", function () {
    showSlides(slideIndex);

    const lightbox = createLightbox();
    const images = document.querySelectorAll(".mySlides img");

    images.forEach(function (img) {
        img.style.cursor = "zoom-in";

        img.addEventListener("click", function () {
            lightbox.open(img.src, img.alt);
        });
    });
});
const images = document.querySelectorAll("img:not(.no-zoom)");

