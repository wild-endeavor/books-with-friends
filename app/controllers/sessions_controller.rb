class SessionsController < ApplicationController
  before_action :require_signed_out!, :only => [:create, :new]
  before_action :require_signed_in!, :only => [:destory]

  def new
    @user = User.new
    @guest_logins = {
      "Alice" => "alice@swift.com",
      "Eve" => "eve@swift.com",
      "Bob" => "bob@swift.com",
      "Amy" => "amy@tardis.com",
      "Rory" => "rory@tardis.com"
    }
  end


  def create
    @user = User.find_by_credentials(
      user_params[:email],
      user_params[:password]
    )

    if @user
      sign_in(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = ["Invalid credentials."]
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
