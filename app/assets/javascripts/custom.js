/**
 * Created by user on 20.02.16.
 */

var minimal_name_length = 5;

$(document).ready(function(){

    var parent = $('.todo-list');
    parent.on('click','.glyphicon-pencil',function(){
        var title = $(this).data('title'),
            project_id = $(this).data('project_id');
        $('#edit_title').val(title);
        $('#project_id').val(project_id);
    });

    parent.on('click','.glyphicon-trash',function(){
        var project_id = $(this).data('project_id'),
            type = $(this).data('type');
        remove_item(project_id,type);
    });

    parent.on('click','.fa-trash',function(){
        var task_id = $(this).data('task_id'),
            type = $(this).data('type');
        remove_item(task_id,type);
    });

    parent.on('click','.fa-pencil',function(){
        var task_id = $(this).data('task_id'),
            name = $(this).data('name'),
            project_id = $(this).data('project_id');
        $('.project_'+project_id+' .task_field').val(name);
    });

    parent.on('change','.is_done',function(){
        var task_id = $(this).data('task_id'),
            status = $(this).prop('checked');
        if(status == true){
            $('.task_'+task_id).css( "background-color", "#DCBFBF" );
        }else{
            $('.task_'+task_id).css( "background-color", "white" );
        }
        $.ajax({
            url: '/done/' + task_id,
            method: 'POST',
            data: {status: status}
        });

    });

    $('#edit_project .btn-primary').click(function(){
        var title = $('#edit_title').val();
        if(title.length < minimal_name_length){
            fail(); return false
        }
        var project_id = $('#project_id').val();
        $('.project_'+project_id+' .pr_name').text(title);
    });

    $('#add_project .btn-primary').click(function(){
        var title = $('#todo-add').val();
        if(title.length < minimal_name_length){
            fail(); return false
        }
    });


    $("[data-target='#add_project']").click(function(){
        $('#todo-add').val('');
    });

});

$(document).ajaxSuccess(function(){
    $('.modal').modal('hide');
    $('.task_field').val('');
});

function remove_item(id,type)
{
    if(type == 'project'){
        $('.project_'+id).remove();
    }else if(type == 'task'){
        $('.task_'+id).remove();
    }
    $.post('/'+type+'/delete/' + id)
}

function fail()
{
    alert('Title should\'t be shorter than '+ minimal_name_length +' symbols!');
}