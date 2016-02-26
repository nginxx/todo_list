class TodolistController < ApplicationController
  before_action :is_auth
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  respond_to :html, :js

  def index
      @projects = Project.get_user_projects(current_user.id)
      render 'todolist/index'
  end

  def add_project
    params[:project][:user_id] = current_user.id
    params.permit!
    @project = Project.new(params[:project])
    @project.save!

    respond_to do |format|
      format.js
    end
  end

  def edit_project
    params.permit!
    Project.update(params[:project][:id],params[:project])
    render nothing: true
  end

  def add_task()
      position = Task.get_max_position
      if position.nil?
        position = 0
      else
        position += 1
      end
      @task = Task.new(name:params[:name],project_id:params[:project_id],position:position)
      @task.save!

      respond_to do |format|
        format.js
      end
  end

  def edit_task
    Task.update(params[:task_id], name: params[:name], project_id: params[:project_id])
    render nothing: true
  end

  def delete_item
    type = params[:type]
    id = params[:id]
    if type == 'project'
      Project.delete(id)
    elsif type == 'task'
      Task.delete(id)
    end
    render nothing: true
  end

  def is_done
    @task = Task.update(params[:id],completed: params[:status])
    render nothing: true
  end

  def is_auth
    if !current_user
      redirect_to log_in_path
    end
  end

  private
  def not_found
    render 'todolist/index'
  end
end
