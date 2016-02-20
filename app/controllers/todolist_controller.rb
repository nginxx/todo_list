class TodolistController < ApplicationController
  before_action :is_auth

  def index
    render 'todolist/index'
  end

  def is_auth
    if !current_user
      redirect_to root_path
    end
  end
end
