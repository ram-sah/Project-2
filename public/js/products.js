//click on ID function
let productList;
$("#save-product").on("click", () => {
  event.preventDefault();
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
  console.log(dbProd);
  productList = dbProd;
  // add a row for every product to the DOM
  $("#wineList").empty();
  for (let i = 0; i < dbProd.length; i++) {
    const cardWine = `<div class="column5">
  <div class="card1">
      <p>${dbProd[i].productname}</p>
  </div>
  </div>`;
    $("#wineArea").prepend(cardWine);
    $("#wineList").append(
      `<option value=${i}>${dbProd[i].productname}</option>`
    );
  }
});

$("#wineList").change(() => {
  // console.log("value selected:", event.target.value);
  // console.log(productList[event.target.value]);
  $("#price").text(productList[event.target.value].price);
  $("#vendor").text(productList[event.target.value].vendor);
  $("#cost").text(productList[event.target.value].unitcost);
  $("#size").text(productList[event.target.value].unitsize);
  $("#country").text(productList[event.target.value].country);
});
