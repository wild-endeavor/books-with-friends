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

  # Return a giant hash, keys are google_ids,
  #   values are arrays of all the user_ids that own them
  def friend_books_catalog
  end

end
