class TodolistController < ApplicationController
  before_action :is_auth
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  respond_to :html, :js

  def index
      @projects = Project.get_user_projects(current_user.id)
      # render plain: @projects.to_yaml
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
    @project = Project.find(params[:project][:id])
    params.permit :name
    @project.update!(params[:project])
    render nothing: true
  end

  def add_task()
      params.permit!
      @task = Task.new(params[:task])
      @task.save!

      respond_to do |format|
        format.js
      end
  end

  def delete_item
    # render plain: params
    type = params[:type]
    id = params[:id]
    if type == 'project'
      Project.delete(id)
    elsif type == 'task'
      Task.delete(id)
    end
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
