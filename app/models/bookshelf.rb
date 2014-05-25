class Bookshelf < ActiveRecord::Base
  before_validation :ensure_rank
  validates :user, :rank, :presence => true

  belongs_to :user
  has_many :books

  private

  def ensure_rank
    last_bookshelf = self.user.bookshelves.sort_by(&:rank).last
    if last_bookshelf != nil
      self.rank = last_bookshelf.rank + 1
    else
      self.rank = 1
    end
    true
  end

end
