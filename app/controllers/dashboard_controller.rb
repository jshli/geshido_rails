class DashboardController < ApplicationController
  def index
    if logged_in?
      @user = current_user
    else
      redirect_to '/login'
    end
  end
end
