Rails.application.routes.draw do
  namespace :api, :defaults => { :format => :json } do
    resources :users, :only => [:show] do
      resources :bookshelves, :only => [:index]
    end
  end

  resources :users do
    resources :bookshelves, :only => [:index, :new, :create]
  end

  resource :bookshelves, :only => [:show, :destroy, :update] do
    resource :books, :only => [:index, :new, :create]
  end

  resources :books, :only => [:show]

  resource :session, :only => [:create, :destroy, :new]

  root :to => "users#show"
end
