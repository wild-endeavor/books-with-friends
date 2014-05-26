class Rental < ActiveRecord::Base
  validates :requested_by, :requested_from, :google_id, :presence => true

  belongs_to(:requested_by,
    :class_name => "User",
    :foreign_key => :source_user,
    :primary_key => :id
  )

  belongs_to(:requested_from,
    :class_name => "User",
    :foreign_key => :dest_user,
    :primary_key => :id
  )

end


