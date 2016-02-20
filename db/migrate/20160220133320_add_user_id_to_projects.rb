class AddUserIdToProjects < ActiveRecord::Migration
  change_table :projects do |t|
    t.integer :user_id, null: false
  end
end
