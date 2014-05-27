# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140526215439) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: true do |t|
    t.integer  "bookshelf_id"
    t.string   "title",                     null: false
    t.string   "author",                    null: false
    t.string   "google_id"
    t.integer  "rating"
    t.string   "reading_status",  limit: 1
    t.text     "review"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "thumbnail_small"
    t.text     "thumbnail"
    t.string   "self_link"
    t.string   "available"
  end

  create_table "bookshelves", force: true do |t|
    t.integer  "user_id",    null: false
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "rank"
  end

  create_table "friendships", force: true do |t|
    t.integer "source_friend", null: false
    t.integer "dest_friend",   null: false
  end

  create_table "rentals", force: true do |t|
    t.integer  "source_user",   null: false
    t.integer  "dest_user",     null: false
    t.date     "approve_date"
    t.date     "delivery_date"
    t.date     "due_date"
    t.string   "status",        null: false
    t.text     "message"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "google_id"
    t.integer  "book_id"
  end

  create_table "users", force: true do |t|
    t.string   "email",                                   null: false
    t.string   "password_digest",                         null: false
    t.string   "session_token",                           null: false
    t.string   "account_status",  limit: 1, default: "N", null: false
    t.string   "omniauthable"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
