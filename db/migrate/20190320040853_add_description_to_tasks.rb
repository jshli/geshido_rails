class AddDescriptionToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :description, :text
    add_column :tasks, :start_date, :text
    add_column :tasks, :due_date, :text
  end
end
