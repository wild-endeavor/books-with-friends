class Api::BooksController < ApplicationController

  def show
  end

  def create
  end

  def update
  end

  def destroy
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
