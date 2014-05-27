
# Users
alice = User.create!(:email => "alice@swift.com", :password => "password")
bob = User.create!(:email => "bob@swift.com", :password => "password")
eve = User.create!(:email => "eve@swift.com", :password => "password")
amy = User.create!(:email => "amy@tardis.com", :password => "password")
rory = User.create!(:email => "rory@tardis.com", :password => "password")

# Friendships - two by two
Friendship.create!(:source_friend => alice.id, :dest_friend => bob.id)
Friendship.create!(:source_friend => bob.id, :dest_friend => alice.id)
Friendship.create!(:source_friend => amy.id, :dest_friend => rory.id)
Friendship.create!(:source_friend => rory.id, :dest_friend => amy.id)
Friendship.create!(:source_friend => eve.id, :dest_friend => rory.id)
Friendship.create!(:source_friend => rory.id, :dest_friend => eve.id)
Friendship.create!(:source_friend => bob.id, :dest_friend => rory.id)
Friendship.create!(:source_friend => rory.id, :dest_friend => bob.id)
Friendship.create!(:source_friend => eve.id, :dest_friend => amy.id)
Friendship.create!(:source_friend => amy.id, :dest_friend => eve.id)


# Bookshelves
alice_math = Bookshelf.create!(:user_id => alice.id, :name => "Math")
alice_cooking = Bookshelf.create!(:user_id => alice.id, :name => "Cooking")
alice_naval_history = Bookshelf.create!(:user_id => alice.id, :name => "Naval History")
amy_travel = Bookshelf.create!(:user_id => amy.id, :name => "Time Travel")
amy_travel = Bookshelf.create!(:user_id => amy.id, :name => "Roman History")
rory_london = Bookshelf.create!(:user_id => rory.id, :name => "London")
rory_medical = Bookshelf.create!(:user_id => rory.id, :name => "Medical")


# Books
Book.create!(:bookshelf_id => alice_math.id,
  :title => "The Math Book",
  :author => "Clifford A. Pickover",
  :google_id => "JrslMKTgSZwC",
  :thumbnail_small => "http://bks3.books.google.com/books?id=JrslMKTgSZwC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72MOPlRMRzApdI9-PBj62RPJCXJTJDApqZXcdc-WcvmOuauyqTPg8-cFCh__MaN5zojrZUGsUuUS9C1QyP02syny5i0hDC4wY1kg6eFYPMZPOqV2Xk&source=gbs_api",
  :thumbnail => "http://bks3.books.google.com/books?id=JrslMKTgSZwC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70N6a8HOf4YpsRNH9-m3p7QGCOe4YeCeLiYC0G8wt8N4RGf4y4JfGg8B2kYO0Kt_-a3IRwe9JBY6ru1YXekUZ9PzbHLmgTcbtREFEjUz2k5ahi0dxY&source=gbs_api",
  :self_link => "https://www.googleapis.com/books/v1/volumes/JrslMKTgSZwC"
)

Book.create!(:bookshelf_id => alice_math.id,
  :title => "Math",
  :author => "Marilyn Burns",
  :google_id => "dAE_Ewwz1TsC",
  :thumbnail_small => "http://bks2.books.google.com/books?id=dAE_Ewwz1TsC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70vfdtDzgcGUzc8Hj7RRS71wQeHOKbrF1sawsPiMNLpMSYs39yXnT8UclsQeMrfAQrfebEXnb7psIhFL5HAmTjKNSrVoZJIQ0vwLB31uhCC02L_AgI&source=gbs_api",
  :thumbnail => "http://bks2.books.google.com/books?id=dAE_Ewwz1TsC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71lylyWhdTZ0aLgaSxnksMNB0n8YbCyk6lRVYDvHS-jH3iTfCYcXiB44RyU4Kj3klp0qVfLmvVyfMoMPuio1SqFMLyRG9Ho_JoCMc9H8A_63nUCEGw&source=gbs_api"
)

Book.create!(:bookshelf_id => alice_math.id,
  :title => "Problem Solving Stragtegies",
  :author => "Arthur Engel",
  :google_id => "wj3_FxnRz5kC",
  :thumbnail_small => "http://bks3.books.google.com/books?id=wj3_FxnRz5kC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71BtmTJqjPIoTSrHTFed_ncDOpLY-3wkut5B5mm1-9h9ycKOQInrtW5K_Bmb1ShqQDycfn8lzp6D5Q-Ogtbe_FaCJNYnJAq08cGvDDorxlDhs7kRjo&source=gbs_api",
  :thumbnail => "http://bks3.books.google.com/books?id=wj3_FxnRz5kC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72qk4XWSd-V2K7dG6WfB3IbMJWdJJwMaGo_T5DxF2zP2udfbHFYPCats6Nmg2J6C1SF4OGOj9IJ4AlZffVQ_a8ZP-blt1UWfr2q_rZY0VjCzOlVc3o&source=gbs_api"
)

Book.create!(:bookshelf_id => alice_cooking.id,
  :title => "Miette",
  :author => "Meg Ray",
  :google_id => "Paefqk3kgewC",
  :thumbnail_small => "http://bks2.books.google.com/books?id=Paefqk3kgewC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72PDQmS1GawyldjgurWp57S2r72XqbImIa5Pt7ir4SlFaIZh60HJeUCyEC2v1F-_WAI2fJd6n-8cLaazMOTs1NmVNZDkYXFPtjBhpKxhEvQ6Yg8wts&source=gbs_api",
  :thumbnail => "http://bks2.books.google.com/books?id=Paefqk3kgewC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71BaDUGbMOiMPjgDDiuxVQhbjtEAhX54gxZZ_-jcg_ra6s1wVYVeyH-ddtDEB8EOYuIVSfTeS_BzqPHtSBaVwNS3FPTJlOv6WzNGg_8G-KkFokTVUE&source=gbs_api"
)

Book.create!(:bookshelf_id => alice_cooking.id,
  :title => "Plating for Gold",
  :author => "Tish Boyle",
  :google_id => "Ro3_xQ86qxMC",
  :thumbnail_small => "http://bks8.books.google.com/books?id=Ro3_xQ86qxMC&printsec=frontcover&img=1&zoom=5&imgtk=AFLRE70Gw9KPAnvoscIFxtgm3GSy2ON4nh3GlrTv3WFircRHFS4lQE8VS_udjnxMBjROERqwqf3cM0qD4V3lUGmGwg3MC-sJMrBOzYjIo5KmHXZid7Pfxj4&source=gbs_api",
  :thumbnail => "http://bks8.books.google.com/books?id=Ro3_xQ86qxMC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70cCuCZ0oOfBN-wf06OEgL9MzJskkWmeakhl1K6SheLaOCcAtaengt8yAHBXJp8FeExmnz6dGuiWyqp3QA_eJhwxmhOpvnjBTIFV4XMfZqgNU1-r-I&source=gbs_api"
)

# Book.create!(:bookshelf_id => ,
#   :title => ,
#   :author => ,
#   :google_id => ,
#   :thumbnail_small => ,
#   :thumbnail
# )


