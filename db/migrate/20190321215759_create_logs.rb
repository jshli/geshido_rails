class CreateLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :logs do |t|
      t.text :description
      t.integer :task_id
      t.integer :user_id

      t.timestamps
    end
  end
end
