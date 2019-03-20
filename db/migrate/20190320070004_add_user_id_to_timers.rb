class AddUserIdToTimers < ActiveRecord::Migration[5.2]
  def change
    add_column :timers, :user_id, :integer
  end
end
