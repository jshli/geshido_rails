 Rails.application.routes.draw do
  resources :logs
  get '/api/logs/:id', to:'logs#show'
  get '/dashboard', to: 'dashboard#index'
  get 'home/index'
  get '/', to: 'home#index'
  get '/login', to: 'sessions#new'
  post 'sessions', to: 'sessions#create'
  delete 'sessions', to: 'sessions#destroy'
  resources :users
  get '/sign-up', to: 'users#index'
  resources :projects
  get '/api/projects', to: 'projects#show'
  resources :timers
  get '/api/timers/:id', to: 'timers#index'
  put '/timers/:id/stop', to: 'timers#stop'
  resources :tasks
  get '/api/tasks', to: 'tasks#show'
  put '/tasks/:id/complete', to: 'tasks#complete'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
