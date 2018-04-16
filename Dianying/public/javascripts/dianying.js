  $(document).ready(function(){
    // var row = $("div class = 'row'><div class = 'col s6'><input type = 'text' class = 'input-field col s12 white'></div><div class = 'col s6'><i class='fas fa-plus plus'></i></div></div>");

	  $("a").click(function(){
	    $("#special").append("<div class = 'row'><div class = 'col s6'><input type = 'text' class = 'input-field col s12 white' /></div></div>");
	  });
	  $(".button-collapse").sideNav();
    $('select').material_select();
    $('#selection').change(function(){
        var val = $(this).val();
        $("#option").text(String(val))
    });
  });
