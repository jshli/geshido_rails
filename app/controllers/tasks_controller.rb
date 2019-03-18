class TasksController < ApplicationController
    def index
        @tasks = Task.all 
        render :json => @tasks
    end
    
    def create 
        task = Task.new
        task.name = params[:name]
        task.user_id = params[:user_id]
        task.save
    end
    
    def destroy
        task = Task.find(params[:id])
        task.destroy
    end
end
