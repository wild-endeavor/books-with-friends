class Api::UsersController < ApplicationController
  def show
    user = User.includes(:bookshelves, :books).find(params[:id])
    render :json => user
  end

end
