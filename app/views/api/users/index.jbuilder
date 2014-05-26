json.extract! @user, :id, :email, :created_at
json.friends @user.friends, :partial => "api/users/user", :as => :user
