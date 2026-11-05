
const bookingForm = document.querySelector("#bookingForm");
const message = document.querySelector("#message");

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const match = document.querySelector("#match").value;
    const tickets = document.querySelector("#tickets").value;

    message.textContent =
        "Thank you, " + name + "! Your booking request for " +
        tickets + " ticket(s) for " + match + " has been received.";
    
    bookingForm.reset();
});
