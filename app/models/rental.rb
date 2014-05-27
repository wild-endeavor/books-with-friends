class Rental < ActiveRecord::Base
  validates :requested_by, :requested_from, :google_id, :presence => true
  validate :book_is_available

  # Statuses
  # N - New
  # A - Approved
  # D - Delivered
  # R - Returned
  # J - Rejected

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

  belongs_to(:book,
    :class_name => "Book",
    :foreign_key => :book_id,
    :primary_key => :id
  )

  def book_is_available
    if self.book.available == "F"
      errors.add(:book, "The book is not available.")
    end
  end

  def overlapping_requests
    conditions = <<-SQL
      (
        (book_id = :book_id)
        AND (status = 'N')
      )
    SQL

    overlapping_requests = Rental.where(conditions, {
      :book_id => self.book_id
    })

    if self.id.nil?
      overlapping_requests
    else
      overlapping_requests.where("id != ?", self.id)
    end

  end
end

