class Stripe::PaymentsController < ApplicationController
  # require 'net/http'

  def create_intent
    begin
      amount = params[:charge]

      # Create a PaymentIntent with amount and currency
      payment_intent = Stripe::PaymentIntent.create(
        amount: amount,
        currency: 'eur',
        payment_method_types: [
          'bancontact',
          'card',
          'eps',
          'giropay',
          'ideal',
          'p24',
          'sepa_debit',
          'sofort',
        ],
      )

      puts payment_intent.inspect
      render json: { id: payment_intent['id'], clientSecret: payment_intent['client_secret'] }
    end
  end

  def charge
    intent = Stripe::PaymentIntent.update(
      params[:intent_id],
      {amount: params[:amount]}
    )
  end


  def success
    @user = User.find_by email: 'maurom1999@gmail.com'
    @balance = @user.balance
    @balance.update amount: @balance.amount + params[:charge].to_f
    render json: { balance: @balance.amount }
    # @user.
  end

end
