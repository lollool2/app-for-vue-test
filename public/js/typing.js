import config from "../js/config.json" assert { type: "json" };
$(document).ready(()=>{
  $("#cargador").hide();
});
$("#tmoTimer").on("change",()=>{
  $("#cargador").show();
  $("#tmo").hide();
    var settings = {
        "url": `https://${config.ip}:9035/tmo`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "fi": $("#tmoTimer").val()
        }
      };
      
      $.ajax(settings).done(function (response) {
        $("#cargador").hide();
        $("#tmo").show();
        $("#tmo").val(`${response.tmo}%`)
      });
});