class User < ApplicationRecord
    has_secure_password
    has_many :tasks
    has_many :timers
    has_many :projects
end
