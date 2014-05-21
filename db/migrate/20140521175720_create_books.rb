class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.integer :bookshelf_id
      t.string  :title, :null => false
      t.string  :author, :null => false
      t.string  :google_id
      t.integer :rating
      t.string  :reading_status, :limit => 1
      t.text    :review
      t.timestamps
    end
  end
end
