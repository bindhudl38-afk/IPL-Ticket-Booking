function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = "show";

    setTimeout(function () {
        toast.className = "";
    }, 3000);
}


// Wait until the HTML page is completely loaded
document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling to booking form
    const bookButtons = document.querySelectorAll(
        'a[href="#booking"], .book-btn'
    );

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const bookingForm = document.getElementById("booking");

            if (bookingForm) {
                event.preventDefault();

                bookingForm.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                showToast("Redirecting to booking form!");
            }
        });
    });


    // Select form elements using DOM selectors
    const matchSelect = document.getElementById("match");
    const categorySelect = document.querySelector("#category");
    const quantityInput = document.getElementById("quantity");


    // Select Booking Summary elements
    const summaryMatch = document.getElementById("summaryMatch");
    const summaryCategory = document.getElementById("summaryCategory");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryPrice = document.getElementById("summaryPrice");
    const totalPrice = document.getElementById("totalPrice");
    const summaryMessage = document.getElementById("summaryMessage");


    // Ticket prices for each stand category
    const ticketPrices = {
        General: 800,
        Premium: 1500,
        VIP: 3000
    };


    // Function to update Booking Summary
    function updateBookingSummary() {

        const selectedMatch = matchSelect.value;
        const selectedCategory = categorySelect.value;
        const quantity = Number(quantityInput.value);


        // Check whether all selections are valid
        if (
            selectedMatch === "" ||
            selectedCategory === "" ||
            !Number.isInteger(quantity) ||
            quantity < 1 ||
            quantity > 10
        ) {

            summaryMessage.textContent =
                "Please select a match, stand category and valid quantity.";

            return;
        }


        // Calculate ticket price and total price
        const price = ticketPrices[selectedCategory];
        const total = price * quantity;


        // Display selected details
        summaryMatch.textContent = selectedMatch;
        summaryCategory.textContent = selectedCategory;
        summaryQuantity.textContent = quantity + " Tickets";

        summaryPrice.textContent =
            "₹" + price.toLocaleString("en-IN");

        totalPrice.textContent =
            "₹" + total.toLocaleString("en-IN");


        summaryMessage.textContent =
            "Your booking summary has been updated successfully!";


        // Display toast notification
        showToast("Booking Summary Updated Successfully!");
    }


    // Add change event listeners
    matchSelect.addEventListener("change", updateBookingSummary);

    categorySelect.addEventListener("change", updateBookingSummary);

    quantityInput.addEventListener("change", updateBookingSummary);


    // Also update immediately while typing quantity
    quantityInput.addEventListener("input", updateBookingSummary);


    // Handle form submission
    const bookingForm = document.getElementById("bookingForm");

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        updateBookingSummary();

        if (bookingForm.checkValidity()) {
            showToast("Booking Details Submitted Successfully!");
        }

    });

});