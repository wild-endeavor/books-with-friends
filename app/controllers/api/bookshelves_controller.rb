class Api::BookshelvesController < ApplicationController
  def index
    # Put in logic to check that we are requesting for the current user
    # or a friend of the current user.
    @bookshelves = Bookshelf.includes(:books).where(:user_id => params[:user_id])
    render :index
  end

end
