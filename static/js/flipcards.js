document.addEventListener("DOMContentLoaded", function() {
    const flipButton1 = document.getElementById("flip-button-1");
    const flipBackButton1 = document.getElementById("flip-back-button-1");
    const flipButton2 = document.getElementById("flip-button-2");
    const flipBackButton2 = document.getElementById("flip-back-button-2");

    flipButton1.addEventListener("click", function() {
        const cardInner = this.closest(".flip-card-inner");
        cardInner.style.transform = "rotateY(180deg)";
    });

    flipBackButton1.addEventListener("click", function() {
        const cardInner = this.closest(".flip-card-inner");
        cardInner.style.transform = "rotateY(0deg)";
    });

    flipButton2.addEventListener("click", function() {
        const cardInner = this.closest(".flip-card-inner");
        cardInner.style.transform = "rotateY(180deg)";
    });

    flipBackButton2.addEventListener("click", function() {
        const cardInner = this.closest(".flip-card-inner");
        cardInner.style.transform = "rotateY(0deg)";
    });
});