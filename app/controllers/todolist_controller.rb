class TodolistController < ApplicationController
  before_action :is_auth
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    # render plain: 1
      @projects = Project.find(current_user.id)
  end

  def add_project

  end


  def is_auth
    if !current_user
      redirect_to root_path
    end
  end

  private
  def not_found
    render 'todolist/index'
  end
end
