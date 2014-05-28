json.extract! book, :id, :bookshelf_id, :title, :author, :google_id, :rating, :reading_status, :review, :created_at, :updated_at, :thumbnail, :thumbnail_small
json.owner_id book.owner.id

if current_user.id == book.owner.id
  json.mode "own"
else
  json.mode "friend"
end
