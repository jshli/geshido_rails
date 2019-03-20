class Task < ApplicationRecord
    has_many :timers
    belongs_to :user
    belongs_to :project, optional: true
end
