class MapController < ApplicationController

  def index
    if Map.exists?
      @map = Map.all
      render json: @map.coordinates, status: :ok
    else
      render json: "No data", status: :no_content
    end

  end

  def write
    begin
      if Map.exists?
        Map.where(number: 1).update coordinates: params[:coordinates]
      else
        @map = Map.create! number: 1, coordinates: params[:coordinates]
        puts @map.inspect
      end
    rescue => error
      puts error.message
      render json: error.message, status: :internal_server_error
    else
      render json: "Έγινε εγγραφή τοποθεσίας!", status: :ok
    end

  end

=begin
  private

  def map_filter
    params.permit
  end
=end
end
