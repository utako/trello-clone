Trellino::Application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit] do
      resources :lists, only: [:index, :show, :update]
    end
    resources :lists, only: [:show, :update, :destroy, :create] do
      resources :cards, only: [:index]
    end
    resources :cards, only: [:create, :show, :update, :destroy] do
      resources :todo_items, only: [:create, :index]
    end
    resources :todo_items, only: [:show, :update, :destroy]
    resources :card_assignments, only: :destroy
    resources :board_assignments, only: :create
    resource :users, only: :show
  end
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :destroy]
end
