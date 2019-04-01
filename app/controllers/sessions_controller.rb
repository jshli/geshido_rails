class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def new
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to '/tasks'
    else
      @errors = user.errors.messages
      redirect_to '/login'
    end
end

  def destroy
    session[:user_id] = nil
  end
end
