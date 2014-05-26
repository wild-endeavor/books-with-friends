class Droprequestdate < ActiveRecord::Migration
  def change
    remove_column :rentals, :request_date
  end
end
