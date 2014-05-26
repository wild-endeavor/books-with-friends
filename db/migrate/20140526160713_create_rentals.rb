class CreateRentals < ActiveRecord::Migration
  def change
    create_table :rentals do |t|
      t.integer :source_user, :null => false
      t.integer :dest_user, :null => false
      t.date    :request_date, :null => false
      t.date    :approve_date
      t.date    :delivery_date
      t.date    :due_date
      t.string  :status, :null => false, :length => 1
      t.text    :message
      t.timestamps
    end
  end
end
