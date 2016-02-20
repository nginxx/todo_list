class TodolistController < ApplicationController
  before_action :is_auth
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
      @projects = Project.where(user_id: current_user.id)
      render 'todolist/index'
  end

  def add_project
    data = {
        name: params[:name][0],
        user_id: current_user.id
    }
    @project = Project.new(data)
    @project.save
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
