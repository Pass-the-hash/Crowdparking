class Ticket
  include Mongoid::Document

  belongs_to :user

  field :email, type: String
  field :date, type: Date
  field :price, type: BigDecimal
  field :minutes, type: String
  field :location, type: Array
end
