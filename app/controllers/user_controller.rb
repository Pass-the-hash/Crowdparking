class UserController < ApplicationController

  def show
    @user = User.find_by email: params[:email]
    render json: @user, status: :ok
  end

  def wallet
    @user = User.find_by email: 'maurom1999@gmail.com'
    puts @user.balance.inspect
    render json: { balance: @user.balance.amount, status: :ok }
  end

  def ticket
    @ticket = Ticket.find_by email: params[:email]
    render json: { ticket: @ticket, status: :ok }
  end

  def set_ticket
    @user = User.find_by email: 'maurom1999@gmail.com'
    @user.ticket = Ticket.new ticket_filter
    @ticket = @user.ticket
    @balance = @user.balance
    puts @ticket.inspect
    render json: {message: 'Ανεπαρκές υπόλοιπο', status: :precondition_failed} if @ticket.price > @balance.amount
    @balance.update amount: @balance.amount - @ticket.price
    render json: { balance: @balance.amount, status: :ok }
  end

  private

  def ticket_filter
    params.require(:ticket).permit(:email, :minutes, :price, :date)
  end

end
