Rails.application.routes.draw do
  get 'sessions/new'
  post 'sessions', to: 'sessions#create'
  delete 'sessions', to: 'sessions#destroy'
  resources :users
  resources :projects
  resources :timers
  resources :tasks
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
