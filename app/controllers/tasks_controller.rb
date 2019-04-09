class TasksController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        if logged_in?
            @user = current_user
            @tasks = current_user.tasks
            @projects = current_user.projects
        else
            redirect_to '/login'
        end
    end

    def today
        if logged_in?
            @user = current_user
            @tasks = @user.tasks.where(is_completed: false).where("due_date <= ?", Time.new.end_of_day)
            @projects = current_user.projects
        else
            redirect_to '/login'
        end
    end
    
    def create 
        if logged_in?
            task = Task.new
            task.name = params[:name]
            task.user_id = params[:user_id]
            task.is_completed = false
            task.due_date = params[:due_date].to_date
            task.project_id = params[:project_id]
            task.total_time = 0
            if task.save
                log = Log.new
                log.description = "Task created"
                log.user_id = current_user.id
                log.task_id = task.id
                log.save
                render json: task
            else
                render json: {error: task.errors.full_messages, status: 500}.to_json
            end
        else
            redirect_to '/login'
        end
    end

    def complete 
        if logged_in?
            task = Task.find(params[:id])
            task.is_completed = !task.is_completed
            if task.save
                log = Log.new
                log.description = "Task completed"
                log.user_id = current_user.id
                log.task_id = task.id
                log.save
                render json: task
            else
                render json: {error: task.errors.full_messages, status: 500}.to_json
            end
        else
            redirect_to '/login'
        end
    end

    def update
        if logged_in?
            task = Task.find(params[:id])
            task.name = params[:name]
            task.is_completed = params[:is_completed]
            task.description = params[:description]
            task.start_date = params[:start_date]
            task.due_date = params[:due_date].to_date
            task.project_id = params[:project_id]
            if task.save
                render json: task
            else
                render json: {error: task.errors.full_messages, status: 500}.to_json
            end
        else
            redirect_to '/login'
        end
    end

    def destroy
        if logged_in?
            task = Task.find(params[:id])
            if task.destroy
                render json: task
            else
                render json: {error: task.errors.full_messages, status: 500}.to_json
            end
        else
            redirect_to '/login'
        end
    end

    def show
        if logged_in?
            @tasks = current_user.tasks
            render :json => @tasks
        else
            redirect_to '/login'
        end
    end
end
