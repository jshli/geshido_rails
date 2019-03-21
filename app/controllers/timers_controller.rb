class TimersController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        task = Task.find(params[:id])
        timers = task.timers
        render json: timers
    end

    def show
        timer = Timer.find(params[:id])
        render json: timer
    end

    def create
        timer = Timer.new
        timer.task_id = params[:task_id]
        timer.user_id = params[:user_id]
        timer.start_time = Time.new
        if timer.save
            task = Task.find(timer.task_id)
            task.current_timer_id = timer.id
            task.save
            render json: timer
        else
            render json: {error: timer.errors.full_messages, status: 500}.to_json
        end
    end

    def stop
        timer = Timer.find(params[:id])
        timer.end_time = Time.new
        timer.total_time = (TimeDifference.between(timer.start_time, timer.end_time).in_minutes).round
        if timer.save
            task = Task.find(timer.task_id)
            task.current_timer_id = nil
            task.save
            render json: timer
        else
            render json: {error: timer.errors.full_messages, status: 500}.to_json
        end
    end
end
