document.addEventListener("DOMContentLoaded", () => {
    // 1. Display Today's Date
    const dateElement = document.getElementById("current-date");
    if (dateElement) {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = `Today is ${today.toLocaleDateString(undefined, options)}`;
    }

    // 2. Dynamic Greeting
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        const hour = new Date().getHours();
        let greetingText = "Welcome to My Portfolio";

        if (hour < 12) {
            greetingText = "Good Morning! Welcome to My Portfolio";
        } else if (hour < 18) {
            greetingText = "Good Afternoon! Welcome to My Portfolio";
        } else {
            greetingText = "Good Evening! Welcome to My Portfolio";
        }

        greetingElement.textContent = greetingText;
    }
});