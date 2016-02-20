class TodolistController < ApplicationController
  before_action :is_auth

  def index3
    render 'todolist/index3'
  end

  def is_auth
    if !current_user
      redirect_to root_path
    end
  end
end
