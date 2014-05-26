class UsersController < ApplicationController

  before_action :require_signed_in!, :only => [:show]
  before_action :require_signed_out!, :only => [:create, :new]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:notices] = ["Welcome #{@user.email}!"]
      sign_in(@user)
      redirect_to user_url(@user)
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    if params.include?(:id)
      @user = User.find(params[:id])
      if current_user.id != @user.id
        render :friend_show
      end
    else
      redirect_to user_url(current_user)
    end


    # if the user requested is the current user, then return current page,
    # else if friends, then return a separate show page,
    #     - will need to know the current_user, and be able to log controller
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
