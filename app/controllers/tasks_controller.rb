class TasksController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        @user = current_user
        @tasks = current_user.tasks
        @projects = current_user.projects
        @timers = current_user.timers
    end
    
    def create 
        task = Task.new
        task.name = params[:name]
        task.user_id = params[:user_id]
        task.is_completed = params[:is_completed]
        if task.save
            render json: task
        else
            render json: {error: task.errors.full_messages, status: 500}.to_json
        end
    end

    def complete 
        task = Task.find(params[:id])
        task.is_completed = !task.is_completed
        if task.save
            render json: task
        else
            render json: {error: task.errors.full_messages, status: 500}.to_json
        end
    end

    def update
        task = Task.find(params[:id])
        task.name = params[:name]
        task.name = params[:is_completed]
        task.description = params[:description]
        task.start_date = params[:start_date]
        task.due_date = params[:start_date]
        if task.save
            render json: task
        else
            render json: {error: task.errors.full_messages, status: 500}.to_json
        end
    end
    def destroy
        task = Task.find(params[:id])
        if task.destroy
            render json: task
        else
            render json: {error: task.errors.full_messages, status: 500}.to_json
        end
    end

    def show
        @tasks = current_user.tasks
        render :json => @tasks
    end
end
