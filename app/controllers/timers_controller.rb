class TimersController < ApplicationController
    def show
        task = Task.find(params[:id])
        timers = task.timers
        render json: timers
    end
end
