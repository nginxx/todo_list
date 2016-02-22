/**
 * Created by user on 20.02.16.
 */

var minimal_name_length = 5;

$(document).ready(function(){

    $('.btn-add_todo').click(function(){
        var name = $('form input.form-control').val();
        if(name.length < minimal_name_length){
            fail();
        }
    });

    $('#todo_form').on('show.bs.modal', function (event) {
        var modal = $(this),
                    button = $(event.relatedTarget),
                    new_title = button.data('form_name'),
                    old_title = button.data('todo_title');
        modal.find('.modal-title').text(new_title);
        if(old_title){
           $('#todo-input').val(old_title);
            $('.modal-footer .btn-primary').text('Save');
            modal.find('form').attr('action','edit_project/'+button.data('project_id'));
        }else{
            $('#todo-input').val('');
            $('.modal-footer .btn-primary').text('Add list');
            modal.find('form').attr('action','add_project/');
        }
    });

    $('.modal-footer .btn-primary').click(function(){
        if($('#todo-input').val().length < minimal_name_length)  fail();
    });
});
function remove_item(id,type)
{
    if(type == 'project'){
        $('.project_'+id).remove();
    }else if(type == 'task'){
        $('.task_'+id).remove();
    }
    if($('table').length == 0){
        $('.empty_projects').removeClass('hidden');
        $('.btn-add_todo_1').remove();
    }

    $.post('/'+type+'/delete/' + id)
}

function add_task(project_id)
{
    var task = $('.project_'+project_id+' input.task_filed').val();
    if(task.length < minimal_name_length){
        fail();
    }
    $.ajax({
        url: '/add_task/' + project_id,
        method: 'POST',
        data: {'task': task}
    })
}

function fail()
{
    alert('Title should\'t be shorter than '+ minimal_name_length +' symbols!');
    return false;
}