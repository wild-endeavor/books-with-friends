class Api::BooksController < ApplicationController

  def show
  end

  # used for querying a user's books - in the search view mainly, when getting the book model
  # when a search returns a book that a friend already has.
  def index
    @books = []
    if (params[:q])
      @books = Book.where(params[:q])
    end
    render :json => @books
  end

  def create
    p book_params
    book = Book.new(book_params)
    if book.save
      render :json => book
    else
      render :json => book.errors.full_messages, :status => :unprocessable_entity
    end
  end

  def update
  end

  def destroy
    book = Book.find(params[:id])
    if book.owner != current_user
      render :json => ["You are not the owner of this book."], :status => :unprocessable_entity
    elsif book.destroy
      render :json => book
    else
      render :json => book.errors.full_messages
    end
  end

  private

  def book_params
    params.require(:book).permit(
      :bookshelf_id,
      :google_id,
      :title,
      :author,
      :rating,
      :reading_status,
      :review,
      :thumbnail,
      :thumbnail_small,
      :self_link
    )
  end

end
