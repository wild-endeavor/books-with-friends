Rails.application.routes.draw do
  resources :users do
    resources :bookshelves, :only => [:index, :new, :create]
  end

  resource :bookshelves, :only => [:show, :destroy, :update] do
    resource :books, :only => [:index, :new, :create]
  end

  resource :session, :only => [:create, :destroy, :new]

  root :to => "users#show"
end
