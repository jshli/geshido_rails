class AddTotalTimeToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :total_time, :integer
  end
end
