  $(document).ready(function(){
    $('select').material_select();
    $('#selection').change(function(){
        var val = $(this).val();
        $("#option").text(String(val))
    });
  });
