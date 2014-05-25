class Api::BookshelvesController < ApplicationController
  def index
    # Put in logic to check that we are requesting for the current user
    # or a friend of the current user.
    @bookshelves = Bookshelf.includes(:books).where(:user_id => params[:user_id])
    render :index
  end

  def create
    user = User.find(params[:user_id])
    last_bookshelf = user.bookshelves.sort_by(&:rank).last
    rank = last_bookshelf ? last_bookshelf.rank + 1 : 1
    shelf = Bookshelf.new(:user_id => params[:user_id], :rank => rank, :name => params[:name])
    if shelf.save
      render :json => shelf
    else
      render :json => shelf.errors.full_messages, :status => :unprocessable_entity
    end
  end

  private

  def bookshelf_params
    params.require(:bookshelf).permit(:name)
  end

end
