class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, :null => false
      t.string :password_digest, :null => false
      t.string :session_token, :null => false
      t.string :account_status, :null => false, :limit => 1, :default => "N"
      t.string :omniauthable
      t.timestamps
    end
  end
end
