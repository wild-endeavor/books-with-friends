json.array! @rentals do |rental|
  json.extract! rental, :source_user, :dest_user,
    :approve_date, :delivery_date, :due_date,
    :status, :message, :created_at, :updated_at,
    :google_id, :book_id, :id
  json.extract! rental.book, :title, :author,
    :thumbnail, :thumbnail_small
  json.source_email rental.requested_by.email
  json.source_id rental.requested_by.id
  json.dest_email rental.requested_from.email
  json.dest_id rental.requested_from.id
end

