json.extract! board, :id, :title, :created_at, :updated_at
json.lists board.lists, partial: 'api/lists/list', as: :list

# json.set! :lists do
#   json.array! board.lists do |list|
#     json.partial! "api/lists/list", list: list
#   end
# end

json.members board.members, partial: 'api/users/user', as: :user 