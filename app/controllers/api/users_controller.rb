class Api::UsersController < ApplicationController
  def index
    @user = User.includes(:friends).find(current_user.id)
    p @user
    render :index
  end

  def show
    user = User.includes(:bookshelves, :books).find(params[:id])
    render :json => user
  end

end
