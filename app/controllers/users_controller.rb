class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    params.permit!
    @user = User.new(params[:user])
    if @user.save
      redirect_to :log_in, :notice => "Signed up! Please Log In"
    else
      render "new"
    end
  end
end
