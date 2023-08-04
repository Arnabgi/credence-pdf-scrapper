// Routine tab list start

$(document).ready(function() {    

$('#routine-tab a:not(:first)').addClass('inactive');
$('.routine-list-view').hide();
$('.routine-list-view:first').show();
    
$('#routine-tab a').click(function(){
    var t = $(this).attr('id');
  if($(this).hasClass('inactive')){ //this is the start of our condition 
    $('#routine-tab a').addClass('inactive');           
    $(this).removeClass('inactive');
    
    $('.routine-list-view').hide();
    $('#'+ t + 'R').fadeIn('slow');
 }
});

});

// Routine tab list end