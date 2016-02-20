class TodolistController < ApplicationController
  before_action :is_auth
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
      @projects = Project.get_user_projects(current_user.id)
      # render plain: @projects.to_yaml
      render 'todolist/index'
  end

  def add_project
    data = {
        name: params[:name][0],
        user_id: current_user.id
    }
    @project = Project.new(data)
    @project.save!
  end

  def delete_item()
    type = params[:type]
    id = params[:id]
    if type == 'project'
      Project.delete(id)
    elsif type == 'task'
      # finish for tasks todo
    end
  end

  def add_task()
      data = {
          project_id: params[:id],
          name: params[:task]
      }
      @task = Task.new(data)
      @task.save!
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
