
# Users
alice = User.create!(:email => "alice@swift.com", :password => "password")
bob = User.create!(:email => "bob@swift.com", :password => "password")
eve = User.create!(:email => "eve@swift.com", :password => "password")
amy = User.create!(:email => "amy@tardis.com", :password => "password")
rory = User.create!(:email => "rory@taris.com", :password => "password")

# Bookshelves
alice_math = Bookshelf.create!(:user_id => alice.id, :name => "Math")
alice_cooking = Bookshelf.create!(:user_id => alice.id, :name => "Cooking")

# Books
Book.create!(:bookshelf_id => alice_math.id,
  :title => "The Math Book",
  :author => "Clifford A. Pickover",
  :google_id => "JrslMKTgSZwC"
)

Book.create!(:bookshelf_id => alice_math.id,
  :title => "Math",
  :author => "Marilyn Burns",
  :google_id => "dAE_Ewwz1TsC"
)

Book.create!(:bookshelf_id => alice_math.id,
  :title => "Problem Solving Stragtegies",
  :author => "Arthur Engel",
  :google_id => "wj3_FxnRz5kC"
)

Book.create!(:bookshelf_id => alice_cooking.id,
  :title => "Miette",
  :author => "Meg Ray",
  :google_id => "Paefqk3kgewC"
)

Book.create!(:bookshelf_id => alice_cooking.id,
  :title => "Plating for Gold",
  :author => "Tish Boyle",
  :google_id => "Ro3_xQ86qxMC"
)

# Book.create!(:bookshelf_id => ,
#   :title => ,
#   :author => ,
#   :google_id => 
# )

# Book.create!(:bookshelf_id => ,
#   :title => ,
#   :author => ,
#   :google_id => 
# )

# Book.create!(:bookshelf_id => ,
#   :title => ,
#   :author => ,
#   :google_id => 
# )

