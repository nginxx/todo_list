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
    if(task.length < 5){
        alert('Title should\'t be shorter than 5 symbols!');
        return false;
    }
    $.ajax({
        url: '/add_task/' + project_id,
        method: 'POST',
        data: {'task': task}
    })
}