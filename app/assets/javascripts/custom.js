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

    //$('.btn-add_todo').click(function(){
    //    var name = $('form input.form-control').val();
    //    if(name.length < minimal_name_length){
    //        fail();
    //    }
    //});

    //edit_form.on('show.bs.modal', function (event) {
    //    var button = $(event.relatedTarget),
    //                 title = $(button).data('title'),
    //                 project_id = $(button).data('project_id');
    //    $('#edit_title').val(title);
    //    $('#project_id').val(project_id);
    //});

    //$('#edit_project').find('button.btn-primary').click(function () {
    //    var title = $('#edit_title').val();
    //    if(title.length < minimal_name_length){
    //        fail();
    //    }
    //    var project_id = $('#project_id').val();
    //    $('.project_'+project_id+' .pr_name').text(title);
    //})

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




//function remove_item(id,type)
//{
//    if(type == 'project'){
//        $('.project_'+id).remove();
//    }else if(type == 'task'){
//        $('.task_'+id).remove();
//    }
//    if($('table').length == 0){
//        $('.empty_projects').removeClass('hidden');
//        $('.btn-add_todo_1').remove();
//    }
//
//    $.post('/'+type+'/delete/' + id)
//}

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
}