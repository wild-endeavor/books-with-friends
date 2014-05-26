class Api::RentalsController < ApplicationController
  def create
    p params
    @rental = Rental.new(rental_params)
    @rental.source_user = current_user.id
    @rental.status = "N"

    if @rental.save
      render :json => @rental
    else
      render :json => @rental.errors.full_messages, :status => :unprocessable_entity
    end
  end

  def update
    @rental = Rental.find(params[:id])
    @rental.update_attributes(rental_params)
    render :json => @rental
  end

  private
  def rental_params
    params.require(:rental).permit(
      :source_user,
      :dest_user,
      :approve_date,
      :delivery_date,
      :due_date,
      :status,
      :message,
      :google_id
    )
  end


end
