class Api::FriendsBooksController < ApplicationController
  def index
    catalog = Hash.new { |h,k| h[k] = Array.new }
    friends_books = User.find(current_user.id).friends_books.includes(:owner)
    friends_books.each do |book|
      catalog[book.google_id].push(book.owner.id)
    end
    render :json => catalog
  end
end
