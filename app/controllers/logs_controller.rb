class LogsController < ApplicationController
    def create
        log = Log.new
        log.user_id = current_user.id
        log.task_id = params[:task_id]
        log.save
    end

    def show 
        task = Task.find(params[:id])
        logs = task.logs
        render json: logs
    end
end
