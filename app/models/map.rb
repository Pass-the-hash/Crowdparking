class Map
  include Mongoid::Document

  field :number, type: Integer
  field :coordinates, type: Array

end
