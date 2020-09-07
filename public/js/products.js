//click on ID function
let productList;
$("#save-product").on("click", () => {
  // event.preventDefault();
  const product = {
    upc: $("#upc").val(),
    productname: $("#productname").val(),
    unitcost: $("#unitcost").val(),
    price: $("#price").val(),
    vendor: $("#vendor").val(),
    country: $("#country").val(),
    geoone: $("#geoone").val(),
    geotwo: $("#geotwo").val(),
    typeone: $("#typeone").val(),
    typetwo: $("#typetwo").val(),
    typethree: $("#typethree").val(),
    unitsize: $("#unitsize").val()
  };
  console.log("product:", product);
  $.post("/api/product", product, result => {
    console.log("product", result);
    location.reload();
  });
});

$.get("/api/product", dbProd => {
  // console.log(dbProd);
  productList = dbProd;
  // add a row for every product to the DOM
  $("#wineList").empty();
  const vendor = [];
  for (let i = 0; i < dbProd.length; i++) {
    const cardWine = `<div class="column5">
  <div class="card1">
      <p>${dbProd[i].productname}<br>(Price: $${dbProd[i].price})</p>
  </div>
  </div>`;
    $("#wineArea").prepend(cardWine);
    $("#wineList").append(
      `<option value=${i}>${dbProd[i].productname}</option>`
    );
    if (vendor.indexOf(dbProd[i].vendor) === -1) {
      vendor.push(dbProd[i].vendor);
      $("#vendorList").append(`<option>${dbProd[i].vendor}</option>`);
    }
  }
});
// For page 3rd
$("#wineList").change(() => {
  // console.log("value selected:", event.target.value);
  // console.log(productList[event.target.value]);
  $("#upc").text(productList[event.target.value].upc);
  $("#vendor").text(productList[event.target.value].vendor);
  $("#price").text(productList[event.target.value].price);
  $("#cost").text(productList[event.target.value].unitcost);
  $("#size").text(productList[event.target.value].unitsize);
  $("#country").text(productList[event.target.value].country);
  $("#typeone").text(productList[event.target.value].typeone);
  $("#typetwo").text(productList[event.target.value].typetwo);
});

//vendor list here
$("#vendorList").change(() => {
  const selectVendor = event.target.value;
  console.log("Selected Vendor:", selectVendor);
  $("#vendorWine").empty();
  for (let i = 0; i < productList.length; i++) {
    // console.log("here are list", productList[i].vendor);
    // console.log(productList[event.target.value]);
    if (productList[i].vendor.includes(selectVendor)) {
      // console.log("show", i);
      $("#vendorWine").append(`<p>${productList[i].productname}</p>`);
    }
  }
});
