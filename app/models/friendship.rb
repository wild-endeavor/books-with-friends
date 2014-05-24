class Friendship < ActiveRecord::Base
  validates :source_friend, :dest_friend, :presence => true

  belongs_to(:owner,
    :class_name => "User",
    :foreign_key => :source_friend,
    :primary_key => :id
  )

  belongs_to(:friend,
    :class_name => "User",
    :foreign_key => :dest_friend,
    :primary_key => :id
  )
  
end
