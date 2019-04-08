class ProjectsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        @user = current_user
        @tasks = current_user.tasks
        @projects = current_user.projects
    end
    
    
    def show 
        user = User.find(params[:id])
        projects = user.projects 
        render json: projects
    end
    
    def new 
        @user = current_user
        @tasks = current_user.tasks
        @projects = current_user.projects
    end

    def project 
        project = Project.find(params[:id])
        render json: project
    end
    
    def create
        project = Project.new
        project.name = params[:name]
        project.user_id = params[:user_id]
        if project.save 
            render json: project
        else
            render json: {error: project.errors.full_messages, status: 500}.to_json
        end
    end
end
