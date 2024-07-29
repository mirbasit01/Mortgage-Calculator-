/** @format */
// JavaScript

// Function to calculate mortgage
function calculateMortgage() {
  var homePrice = parseFloat(document.getElementById("homePrice").value);
  var downPayment = parseFloat(document.getElementById("downPayment").value);
  var loanTerm = parseFloat(document.getElementById("loanTerm").value);
  var interestRate = parseFloat(document.getElementById("interestRate").value);
  var startDate = new Date(document.getElementById("startDate").value);
  // after chek condition
  var additionalCosts = document.getElementById("additionalCosts").checked;
  var propertyTaxes = additionalCosts
    ? parseFloat(document.getElementById("propertyTaxes").value)
    : 0;
  var homeInsurance = additionalCosts
    ? parseFloat(document.getElementById("homeInsurance").value)
    : 0;
  var pmiInsurance = additionalCosts
    ? parseFloat(document.getElementById("pmiInsurance").value)
    : 0;
  var hoaFee = additionalCosts
    ? parseFloat(document.getElementById("hoaFee").value)
    : 0;
  var otherCosts = additionalCosts
    ? parseFloat(document.getElementById("otherCosts").value)
    : 0;
  // loan amount calculate
  var loanAmount = homePrice - downPayment;
  // monthly intrest rate calulate
  var monthlyInterestRate = interestRate / 100 / 12;
  // total month calculate
  var totalPayments = loanTerm * 12;
  // pr month payment
  var monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
  // total payment calculate
  var totalPayment = monthlyPayment * totalPayments;
  // total intrest calculte
  var totalInterest = totalPayment - loanAmount;
  // monthly property tax calculate
  var monthlyPropertyTax = propertyTaxes / 12;
  // yearly porperty tax
  var yearlyPropertyTax = monthlyPropertyTax * totalPayments;
  // monthly payment
  var totalPaymentRounded = totalPayment.toFixed(2);
  // yearly intrest
  var totalInterestRounded = totalInterest.toFixed(2);
  // monthly insurenc
  var monthlyHomeInsurance = homeInsurance / 12;
  //  yearly insurance
  var yearHomeInsure = monthlyHomeInsurance * totalPayments;
  // monthly hoafeecalculate
  var monthlyHOAfee = hoaFee / 12;
  // yearly hoa fee
  var yearlyHOAfee = monthlyHOAfee * totalPayments;
  // monthly Other cost
  var monthlyOtherCost = otherCosts / 12;
  // yearly Other cost
  var yearlyOtherCost = monthlyOtherCost * totalPayments;
  // totalmonthly payment
  var totalMonthlyPayment =
    monthlyPayment + monthlyHomeInsurance + monthlyHOAfee + monthlyOtherCost;
  var totalyearlypayments =
    totalPayment + yearHomeInsure + yearlyHOAfee + yearlyOtherCost;
  // total pay of date
  var payoffDate = new Date(startDate);
  payoffDate.setMonth(payoffDate.getMonth() + totalPayments);
  // yearly tax
  document.getElementById("yeartax").textContent =
    " $" + yearlyPropertyTax.toFixed(2);
  // montly tax
  document.getElementById("tax").textContent =
    " $" + monthlyPropertyTax.toFixed(2);
  // monthlyhoafee
  document.getElementById("monthlyhoa").textContent =
    " $" + monthlyHOAfee.toFixed(2);
  // yearlyhoa
  document.getElementById("yearlyhoa").textContent =
    " $" + yearlyHOAfee.toFixed(2);
  // monthluinsurence
  document.getElementById("homeIns").textContent =
    " $" + monthlyHomeInsurance.toFixed(2);
  // year insurenc
  document.getElementById("yearlyInsurenc").textContent =
    " $" + yearHomeInsure.toFixed(2);

  // monthly othercost
  document.getElementById("mothyOthercost").textContent =
    " $" + monthlyOtherCost.toFixed(2);
  // yearly Other cost
  document.getElementById("yearlyOthercost").textContent =
    " $" + yearlyOtherCost.toFixed(2);
  // monthlytotalpayments
  document.getElementById("monthlytotalpayments").textContent =
    " $" + totalMonthlyPayment.toFixed(2);
  // yearlytotalpayment
  document.getElementById("yearlytotalpayment").textContent =
    " $" + totalyearlypayments.toFixed(2);
  // totalpay
  document.getElementById("totalpay").textContent =
    " $" + totalPayment.toFixed(2);
  // monthlypay
  document.getElementById("monthlypay").innerHTML =
    " $" + monthlyPayment.toFixed(2);
  document.getElementById("monthlprice").textContent =
    " $" + monthlyPayment.toFixed(2);
  // countPayment
  document.getElementById("countPayment").textContent = totalPayments;
  // down payment
  document.getElementById("DownPayment").textContent =
    " $" + downPayment.toFixed(2);
  // hiuse price
  document.getElementById("housePrice").textContent =
    " $" + homePrice.toFixed(2);
  // loan Amount

  document.getElementById("principleAmount").textContent =
    "$" + loanAmount.toFixed(2);

  // total payment
  document.getElementById("totalPayments").textContent =
    "$" + totalPaymentRounded;
  // total intrset
  document.getElementById("totalInterest").textContent =
    " $" + totalInterestRounded;
  // confrm end date
  document.getElementById("payoffDate").textContent =
    "" + payoffDate.toDateString();
  // graph code

  var percentageTotalPayment = (totalPayment / totalyearlypayments) * 100;
  var percentageYearHomeInsure = (yearHomeInsure / totalyearlypayments) * 100;
  var percentageYearlyproperty =
    (yearlyPropertyTax / totalyearlypayments) * 100;
  var percentageYearlyOtherCost = (yearlyOtherCost / totalyearlypayments) * 100;

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Task", "Hours per Day"],
      ["Principle Amount", percentageTotalPayment],
      ["Home Insurance", percentageYearHomeInsure],
      ["Property Taxes", percentageYearlyproperty],
      ["Other Costs", percentageYearlyOtherCost],
    ]);

    var options = {
      // title: "My Daily Activities",
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("piechart")
    );

    chart.draw(data, options);
  }
}

// Event Listener for additionalCosts checkbox change
document.addEventListener("DOMContentLoaded", function () {
  var additionalCostsCheckbox = document.getElementById("additionalCosts");
  var additionalCostsInputs = document.getElementById("additionalCostsInputs");

  // Initially set additionalCostsInputs display based on checkbox state
  if (additionalCostsCheckbox.checked) {
    additionalCostsInputs.style.display = "block";
  } else {
    additionalCostsInputs.style.display = "none";
  }

  // Add event listener to handle changes
  additionalCostsCheckbox.addEventListener("change", function () {
    if (this.checked) {
      additionalCostsInputs.style.display = "block";
    } else {
      additionalCostsInputs.style.display = "none";
    }
  });

  // Check the checkbox by default
  additionalCostsCheckbox.checked = true;

  // Show or hide inputs based on default checkbox state
  if (additionalCostsCheckbox.checked) {
    additionalCostsInputs.style.display = "block";
  } else {
    additionalCostsInputs.style.display = "none";
  }
});

// Event Listener for mortgageForm submit
document
  .getElementById("mortgageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    calculateMortgage();
  });

// Run calculateMortgage() on page load
window.onload = function () {
  calculateMortgage();
};
// garph code
