json.extract! bookshelf, :user_id, :name
json.books bookshelf.books, :partial => "api/books/book", :as => :book