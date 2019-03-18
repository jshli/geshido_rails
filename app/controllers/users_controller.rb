class UsersController < ApplicationController
    def create
        user = User.new
        user.first_name = params[:first_name]
        user.last_name = params[:last_name]
        user.email = params[:email]
        user.passsword = params[:password]
        user.save
    end
    
end
