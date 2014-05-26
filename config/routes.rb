Rails.application.routes.draw do
  namespace :api, :defaults => { :format => :json } do
    resources :users, :only => [:index, :show] do
      resources :bookshelves, :only => [:index, :create]
      resources :rentals, :only => [:create] # current user borrowing from user X
    end

    resources :bookshelves, :only => [:show, :destroy, :update] do
      resources :books, :only => [:create]
    end

    resources :rentals, :only => [:index, :update] # listing all your rentals (both ways) and updating statuses

    resources :books, :only => [:destroy]
  end

  resources :users do
    resources :bookshelves, :only => [:index, :new, :create]
  end

  # resource :bookshelves, :only => [:show, :destroy, :update] do
  #   resource :books, :only => [:index, :new, :create]
  # end

  resource :session, :only => [:create, :destroy, :new]

  root :to => "users#show"
end
