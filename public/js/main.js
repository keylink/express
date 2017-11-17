
function time () {
  var watch = new Date();
  $("#time").text(watch);
}

function gotoNode() {
  console.log($("#test").text());
}

$("#test").click(function () {
  var userId = $("#test").text();
  $.post('/delete/'+userId);

  $.ajax({
    url: '/delete/'+userId,
    type: "POST",
    success: function() {
      window.location = '/login';
    },
    error: function() {
      console.log("error")
    }
  });
});


setInterval(function() {
  time();
}, 1000);
