class CreateTimers < ActiveRecord::Migration[5.2]
  def change
    create_table :timers do |t|
      t.integer :task_id
      t.text :start_time
      t.text :end_time
      t.integer :total_time

      t.timestamps
    end
  end
end
