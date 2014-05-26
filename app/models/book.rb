class Book < ActiveRecord::Base
  before_validation :fill_in_author
  validates :bookshelf, :title, :author, :google_id, :presence => true

  belongs_to :bookshelf

  has_one :owner, :through => :bookshelf, :source => :user

  private

  def fill_in_author
    self.author = "no_author" if self.author.empty?
    true
  end
end
