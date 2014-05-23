class ChangeBookColumns < ActiveRecord::Migration
  def change
    remove_column :books, :thumbnail_small
    remove_column :books, :thumbnail

    add_column :books, :thumbnail_small, :text
    add_column :books, :thumbnail, :text
    add_column :books, :self_link, :string

  end
end
