class Book < ActiveRecord::Base
  validates :bookshelf, :title, :author, :google_id, :presence => true

  belongs_to :bookshelf

  has_one :owner, :through => :bookshelf, :source => :user
  
end
