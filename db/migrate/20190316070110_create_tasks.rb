class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.text :name
      t.integer :user_id
      t.boolean :is_completed
      t.integer :project_id
      t.boolean :is_priority
      t.integer :current_timer_id

      t.timestamps
    end
  end
end
