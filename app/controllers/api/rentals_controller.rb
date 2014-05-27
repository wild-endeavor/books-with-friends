class Api::RentalsController < ApplicationController

  def index
    @rentals = Rental.where("source_user = #{current_user.id} OR dest_user = #{current_user.id}")
    render :json => @rentals
  end

  def create
    p params
    today = Time.now.to_date
    @rental = Rental.new(rental_params)
    @rental.due_date = today + Integer(params[:duration]) * 7
    @rental.source_user = current_user.id
    @rental.status = "N"
    p @rental

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

  def overlapping_rentals

  end

  private
  def rental_params
    params.require(:rental).permit(
      :source_user,
      :dest_user,
      :approve_date,
      :delivery_date,
      :due_date,
      :duration,
      :status,
      :message,
      :google_id,
      :book_id
    )
  end


end
