class Api::RentalsReceivedController < ApplicationController

  def index
    @rentals = Rental.includes(:book, :requested_by, :requested_from)
      .where("dest_user = #{current_user.id}")
    render "api/rentals/index"
  end

end
