class Balance
  include Mongoid::Document

  embedded_in :user

  field :email, type: String
  field :amount, type: BigDecimal
end
