
// Select booking form elements using DOM selectors
const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");

// Select booking summary elements
const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryQuantity = document.getElementById("summaryQuantity");
const totalPrice = document.getElementById("totalPrice");

// Toast notification function
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(function () {
        toast.style.display = "none";
    }, 2000);
}

// Function to update booking summary
function updateSummary() {

    // Read selected values
    const selectedMatch = matchSelect.value;

    const selectedStand =
        standSelect.options[standSelect.selectedIndex].text;

    const ticketPrice = Number(standSelect.value);

    let quantity = Number(quantityInput.value);

    // Validate ticket quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
        quantity = 1;
        quantityInput.value = 1;
    }

    if (quantity > 10) {
        quantity = 10;
        quantityInput.value = 10;
    }

    // Calculate total ticket price
    const total = ticketPrice * quantity;

    // Update booking summary
    summaryMatch.textContent = selectedMatch;
    summaryStand.textContent = selectedStand.split(" - ")[0];
    summaryQuantity.textContent = quantity;
    totalPrice.textContent = total.toLocaleString("en-IN");

    // Show confirmation message
    showToast("Booking summary updated!");
}

// Add change event listeners
matchSelect.addEventListener("change", updateSummary);
standSelect.addEventListener("change", updateSummary);
quantityInput.addEventListener("change", updateSummary);

// Also update immediately while typing quantity
quantityInput.addEventListener("input", updateSummary);

// Confirm booking button
document.getElementById("bookBtn").addEventListener("click", function () {
    updateSummary();
    showToast("Booking details confirmed!");
});

// Display initial booking summary
updateSummary();
