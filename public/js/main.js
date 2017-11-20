
//time
function time () {
  var watch = new Date();
  $("#time").text(watch);
}

//AJAX request to Api which delete product

$(".test").click(function () {
  var productId = $(this).text();
  var prod = $(this);

  //function delete
  function deleteProduct() {
    console.log(prod);
    prod.parent().remove();
  }

  $.ajax({
    url: '/deleteProduct/'+productId,
    method: "POST",
    datatype: "json"
  })
    .done(function() {
      deleteProduct();
    })
    .fail(function() {
      console.log( "error" );
    });
});


setInterval(function() {
  time();
}, 1000);
