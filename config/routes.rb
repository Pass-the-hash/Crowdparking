Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # { constraints:  'format: json' }

  get '/map', to: 'map#index'
  put '/map', to: 'map#write'

  post '/charge/init', to: 'stripe/payments#create_intent'
  patch '/charge/success', to: 'stripe/payments#success'

  get '/user/wallet', to: 'user#wallet'
  get '/user/ticket', to: 'user#ticket'
  patch '/user/ticket/new', to: 'user#set_ticket'

end
