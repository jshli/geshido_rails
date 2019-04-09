class Task < ApplicationRecord
    has_many :timers
    belongs_to :user
    has_many :logs
    belongs_to :project, optional: true
    # scope :today, ->{ where.not(due_date: "").where("DATE(due_date) <= ?", Time.now.to_date) }
end
