class Renamefriendstable < ActiveRecord::Migration
  def change
    rename_table :friends_tables, :friendships
  end
end
