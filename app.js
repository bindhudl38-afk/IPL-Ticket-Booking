
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


// Wait until HTML page is loaded
document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling
    const bookButtons = document.querySelectorAll(
        'a[href="#booking"], .book-btn'
    );

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const bookingSection = document.getElementById("booking");

            if (bookingSection) {
                event.preventDefault();

                bookingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                showToast("Redirecting to booking form!");
            }
        });
    });


    // ACTIVITY 8 - Hamburger Menu

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", isOpen);

    });


    // Close menu after clicking a navigation link

    const navItems = document.querySelectorAll(".nav-links a");

    navItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // ACTIVITY 8 - Team Filter

    const teamFilter = document.getElementById("teamFilter");
    const matchCards = document.querySelectorAll(".match-card");

    teamFilter.addEventListener("change", function () {

        const selectedTeam = teamFilter.value;

        matchCards.forEach(function (card) {

            const teams = card.getAttribute("data-teams").split(" ");

            if (selectedTeam === "all" || teams.includes(selectedTeam)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });


    // ACTIVITY 8 - Grid and List View

    const matchContainer = document.getElementById("matchContainer");

    const gridBtn = document.getElementById("gridBtn");
    const listBtn = document.getElementById("listBtn");

    gridBtn.addEventListener("click", function () {

        matchContainer.classList.remove("list-view");

        showToast("Grid View Enabled");

    });

    listBtn.addEventListener("click", function () {

        matchContainer.classList.add("list-view");

        showToast("List View Enabled");

    });


    // Existing Booking Summary Functionality

    const matchSelect = document.getElementById("match");
    const categorySelect = document.getElementById("category");
    const quantityInput = document.getElementById("quantity");

    const summaryMatch = document.getElementById("summaryMatch");
    const summaryCategory = document.getElementById("summaryCategory");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryPrice = document.getElementById("summaryPrice");
    const totalPrice = document.getElementById("totalPrice");
    const summaryMessage = document.getElementById("summaryMessage");


    // Ticket Prices

    const ticketPrices = {
        General: 800,
        Premium: 1500,
        VIP: 3000
    };


    // Update Booking Summary

    function updateBookingSummary() {

        const selectedMatch = matchSelect.value;
        const selectedCategory = categorySelect.value;
        const quantity = Number(quantityInput.value);

        if (
            selectedMatch === "" ||
            selectedCategory === "" ||
            !Number.isInteger(quantity) ||
            quantity < 1 ||
            quantity > 10
        ) {

            summaryMessage.textContent =
                "Please select a match, stand category and valid quantity.";

            return false;
        }

        const price = ticketPrices[selectedCategory];
        const total = price * quantity;

        summaryMatch.textContent = selectedMatch;

        summaryCategory.textContent = selectedCategory;

        summaryQuantity.textContent = quantity + " Tickets";

        summaryPrice.textContent =
            "₹" + price.toLocaleString("en-IN");

        totalPrice.textContent =
            "₹" + total.toLocaleString("en-IN");

        summaryMessage.textContent =
            "Your booking summary has been updated successfully!";

        return true;
    }


    // Change Event Listeners

    matchSelect.addEventListener("change", updateBookingSummary);

    categorySelect.addEventListener("change", updateBookingSummary);

    quantityInput.addEventListener("input", updateBookingSummary);


    // Form Submission

    const bookingForm = document.getElementById("bookingForm");

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (bookingForm.checkValidity()) {

            if (updateBookingSummary()) {
                showToast("Booking Details Submitted Successfully!");
            }

        } else {

            bookingForm.reportValidity();

        }

    });

});
