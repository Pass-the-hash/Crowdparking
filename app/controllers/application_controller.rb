class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  rescue_from Exception do |e|
    render json: e.to_json, status: 500
  end
end
