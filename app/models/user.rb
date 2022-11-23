class User
  include Mongoid::Document

  embeds_one :balance

  has_one :ticket

  field :name, type: String
  field :surname, type: String
  field :email, type: String
  field :phone, type: String
  field :address, type: String
  field :postal_code, type: String
end
