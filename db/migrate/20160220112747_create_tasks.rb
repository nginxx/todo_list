class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.string :completed, default: 'false'
      t.integer :project_id, null: false
      t.integer :position, null: true
      t.timestamps null: false
    end
    add_foreign_key :tasks, :projects, on_delete: :cascade
  end
end
