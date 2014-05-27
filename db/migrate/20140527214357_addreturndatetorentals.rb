class Addreturndatetorentals < ActiveRecord::Migration
  def change
    add_column :rentals, :return_date, :date
  end
end
