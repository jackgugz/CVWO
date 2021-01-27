Rails.application.routes.draw do
  get 'todos/index'
  get 'todos/create'
  get 'todos/update'
  get 'todos/destroy'
  get 'categories/index'
  get 'categories/create'
  get 'categories/update'
  get 'categories/destroy'
  scope '/api/v1' do
    resources :todos, :categories
  end
end
