class AddThumbnailLinks < ActiveRecord::Migration
  def change

    add_column :books, :thumbnail_small, :string
    add_column :books, :thumbnail, :string

    add_column :bookshelves, :rank, :integer
    
  end
end
