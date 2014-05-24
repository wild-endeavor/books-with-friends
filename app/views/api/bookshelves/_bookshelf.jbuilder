json.extract! bookshelf, :user_id, :name, :id, :rank
json.books bookshelf.books, :partial => "api/books/book", :as => :book