class AddBookIdToRental < ActiveRecord::Migration
  def change
    add_column :rentals, :google_id, :string
  end
end
