module Api
  class UsersController < ApiController
    def show
      @user = User.find(params[:id])
      if @user
        render partial: "api/", locals: { board: @board_assignment.board }
      else
        render json: {errors: @board_assignment.errors.full_messages }
      end
    end
    
    private
    
    def board_assignment_params
      params.require(:board_assignment).permit(:email, :board_id)
    end
  end
end
