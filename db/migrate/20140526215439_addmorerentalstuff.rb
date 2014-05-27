class Addmorerentalstuff < ActiveRecord::Migration
  def change

    add_column :books, :available, :string
    add_column :rentals, :book_id, :integer

  end

end
