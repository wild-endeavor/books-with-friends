class User < ActiveRecord::Base
  before_validation :ensure_session_token
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, :presence => true, :format => { :with => VALID_EMAIL_REGEX }
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :password_digest, :presence => true
  validates :session_token, :presence => true

  has_many :bookshelves
  has_many :books, :through => :bookshelves, :source => :books
  has_many(:friendships,
    :class_name => "Friendship",
    :foreign_key => :source_friend,
    :primary_key => :id
  )
  has_many :friends, :through => :friendships, :source => :friend

  def self.find_by_credentials(email, plain_text)
    user = User.find_by_email(email)
    if (user && user.is_password?(plain_text))
      return user
    end
    nil
  end

  def is_password?(plain_text)
    BCrypt::Password.new(self.password_digest) == plain_text
  end

  def password
    @password
  end

  def password=(plain_text)
    @password = plain_text
    self.password_digest = BCrypt::Password.create(plain_text)
  end

  def reset_session_token!
    self.session_token = SecureRandom.hex
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.hex
    true
  end
  
end
