/**
 * Created by user on 20.02.16.
 */

var minimal_name_length = 5;

$(document).ready(function(){

    var parent = $('.todo-list');
    parent.on('click','.glyphicon-pencil',function(){
        var title = $(this).data('title');
        var project_id = $(this).data('project_id');
        $('#edit_title').val(title);
        $('#project_id').val(project_id);
    });

    parent.on('click','.glyphicon-trash',function(){
        var project_id = $(this).data('project_id');
        var type = $(this).data('type');
        remove_item(project_id,type);
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