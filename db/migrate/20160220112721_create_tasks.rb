class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.integer :completed, defaul: 0
      t.integer :project_id, null: false
    end
    add_foreign_key :tasks, :projects, on_delete: :cascade
  end
end
