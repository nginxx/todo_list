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
        var answer = confirm('Are you sure ?');
        if(!answer) return false;
        var project_id = $(this).data('project_id'),
            type = $(this).data('type');
        remove_item(project_id,type);
    });

    parent.on('click','.fa-trash',function(){
        var answer = confirm('Are you sure ?');
        if(!answer) return false;
        var task_id = $(this).data('task_id'),
            type = $(this).data('type');
        remove_item(task_id,type);
    });

    parent.on('click','.fa-pencil',function(){
        var task_id = $(this).data('task_id'),
            name = $(this).data('name'),
            project_id = $(this).data('project_id');
        $('.task_field'+project_id).val(name);
        $('.project_'+project_id+' .btn-edit_task').removeClass('hidden');
        $('.project_'+project_id+' .btn-edit_task').attr('data-task_id',task_id);
        $('.project_'+project_id+' .btn-add_task').addClass('hidden')
        $('.project_'+project_id+' .fa-ban').removeClass('hidden');
    });

    parent.on('change','.is_done',function(){
        var task_id = $(this).data('task_id'),
            status = $(this).prop('checked');
        if(status == true){
            $('.task_'+task_id).css( "background-color", "#DFFFE4" );
        }else{
            $('.task_'+task_id).css( "background-color", "" );
        }
        $.ajax({
            url: '/done/' + task_id,
            method: 'POST',
            data: {status: status}
        });

    });

    parent.on('click','.fa-ban',function(){
        $('.fa-ban').addClass('hidden');
        $('.form-control').val('');
        $('.btn-edit_task').addClass('hidden');
        $('.btn-add_task').removeClass('hidden');

    });

    $('#edit_project .btn-primary').click(function(){
        var title = $('#edit_title').val().trim();
        if(title.length < minimal_name_length){
            fail(); return false
        }
        var project_id = $('#project_id').val();
        $('.project_'+project_id+' .pr_name').text(title);
    });

    $('#add_project .btn-primary').click(function(){
        var title = $('#todo-add').val().trim();
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
    $('.form-control').val('');
    $('.btn-edit_task').addClass('hidden');
    $('.btn-add_task').removeClass('hidden');
    $('.fa-ban').addClass('hidden');
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

function add_task(project_id)
{
    var name = $('.task_field'+project_id).val().trim();
    if(name.length < minimal_name_length){
        fail(); return false
    }

    $.ajax({
        url: '/add_task',
        method: 'POST',
        data: {project_id:project_id, name:name}
    });
}

function edit_task(project_id)
{
    var name = $('.project_'+project_id+' .task_field'+project_id).val().trim();
    if(name.length < minimal_name_length){
        fail(); return false
    }
    var task_id = $('.project_'+project_id+' .btn-edit_task').attr('data-task_id');
    $.ajax({
        url: '/edit_task',
        method: 'POST',
        data: {project_id:project_id, name:name, task_id:task_id},
        success:function(){
            $('.task_'+task_id+' .task_name').text(name);
            $('.fa-ban').addClass('hidden');
        }
    });
}

function fail()
{
    alert('Title should\'t be shorter than '+ minimal_name_length +' symbols!');
}
