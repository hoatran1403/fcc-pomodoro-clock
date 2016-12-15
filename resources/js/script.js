$('document').ready(function(){
  var intId = 0;
  var isSectionTime = true;


  var startTimer = function(sectionLength,breakLength,display){
    var timer = sectionLength, minutes, seconds;

    intId = setInterval(function(){
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.text(minutes + ":" + seconds);


      if(isSectionTime){
        $("#notification").html("Section Time!");
        $("#notification").removeClass("label-danger").addClass("label-success");
      }else{
        $("#notification").html("Break Time!");
        $("#notification").removeClass("label-success").addClass("label-danger");
      }

      if(--timer < 0){
        if(isSectionTime){
          timer = breakLength;
          isSectionTime = false;
        }else{
          timer = sectionLength;
          isSectionTime = true;
        }
      }
    }, 1000);
  };



  var init = function(){

    $("#stop").click(function(){
      //disable control
      $("#section-length").attr("disabled",false);
      $("#break-length").attr("disabled",false);
      $("#start").attr("disabled",false);

      //clear notification
      $("#notification").html("");
      clearInterval(intId);
    });

    $("#start").click(function(){

      //get user input for timer
      var breakLength = $("#break-length").val() * 60;
      var sectionLength = $("#section-length").val() * 60;
      var display = $("#display");
      startTimer(sectionLength,breakLength,display);

      //disable control
      $("#section-length").attr("disabled","disabled");
      $("#break-length").attr("disabled","disabled");
      $("#start").attr("disabled","disabled");

    });

    for(var i = 1; i <= 60; i++){
      if(i == 5){
        $('#break-length').append('<option selected value:"' + i +'>' + i +'</button>' );
      }else{
        $('#break-length').append($('<option>',{
          value: i,
          text: i
        }));
      }
      if(i == 25){
        $('#section-length').append('<option selected value:"' + i +'>' + i +'</button>' );
        $('#display').html(i + ":00");
      }else{
        $('#section-length').append($('<option>',{
          value: i,
          text: i
        }));

      }
    }

  }

  init();

});
