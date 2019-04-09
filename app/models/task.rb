class Task < ApplicationRecord
    has_many :timers
    belongs_to :user
    has_many :logs
    belongs_to :project, optional: true
end
