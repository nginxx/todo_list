/**
 * Created by user on 20.02.16.
 */
$(document).ready(function(){
    $('.btn-add_todo').click(function(){
        var name = $('form input.form-control').val();
        if(name.length < 5){
            alert('Title should\'t be shorter than 5 symbols!')
            return false;
        }
    });
});
