class CreateFriendsTable < ActiveRecord::Migration
  def change
    create_table :friends_tables do |t|
      t.integer :source_friend, :null => false
      t.integer :dest_friend, :null => false
    end
  end
end
