class UsersController < ApplicationController
    def index 
    end
    def create
        user = User.new
        user.first_name = params[:first_name]
        user.last_name = params[:last_name]
        user.email = params[:email]
        user.password = params[:password]
        user.save
            redirect_to '/login'

    end

end
