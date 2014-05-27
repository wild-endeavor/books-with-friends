class Api::RentalsController < ApplicationController

  def index
    @rentals = Rental.includes(:book, :requested_by, :requested_from)
      .where("source_user = #{current_user.id}")
  end

  def create
    today = Time.now.to_date
    @rental = Rental.new(rental_params)
    @rental.due_date = today + Integer(params[:duration]) * 7
    @rental.source_user = current_user.id
    @rental.status = "N"

    if @rental.save
      render :json => @rental
    else
      render :json => @rental.errors.full_messages, :status => :unprocessable_entity
    end
  end

  # This update action handle both requests made (can cancel) and rental requests
  # received (can approve, reject, mark as delivered)
  def update
    @rental = Rental.find(params[:id])
    # changing from New to Approved
    if @rental && @rental.status == "N" && rental_params[:status] == "A"
      if @rental.dest_user == current_user.id
        @book = @rental.book
        @overlapping = @rental.overlapping_requests
        
        @overlapping.update_all(:status => "J")
        @rental.status = "A"
        @rental.approve_date = Time.new
        if @rental.save
          @book.available = "F"
          @book.save
          render :json => @rental
        else
          render :json => @rental.errors.full_messages, :status => :unprocessable_entity
        end
      else
        @rental.errors.add(:permissioning, "Not the owner of this request")
        render :json => @rental.errors.full_messages, :status => :unprocessable_entity
      end

    # changing from Approved to Delivered
    elsif @rental && @rental.status == "A" && rental_params[:status] == "D"
      if @rental.dest_user == current_user.id
        @rental.status = "D"
        @rental.delivery_date = Time.new
        if @rental.save
          render :json => @rental
        else
          render :json => @rental.errors.full_messages, :status => :unprocessable_entity
        end
      else
        @rental.errors.add(:permissioning, "Not the owner of this request")
        render :json => @rental.errors.full_messages, :status => :unprocessable_entity
      end

    # changing from Delivered to Returned
    elsif @rental && @rental.status == "D" && rental_params[:status] == "R"
      if @rental.dest_user == current_user.id
        @book = @rental.book
        
        @rental.status = "R"
        @rental.return_date = Time.new
        if @rental.save
          @book.available = "T"
          @book.save
          render :json => @rental
        else
          render :json => @rental.errors.full_messages, :status => :unprocessable_entity
        end
      else
        @rental.errors.add(:permissioning, "Not the owner of this request")
        render :json => @rental.errors.full_messages, :status => :unprocessable_entity
      end
    else
      console.log("BAD TRANSACTION")
      render :json => ["Unknown transaction"], :status => :unprocessable_entity
    end

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
