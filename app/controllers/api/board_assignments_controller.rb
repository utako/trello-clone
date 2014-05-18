module Api
  class BoardAssignmentsController < ApiController
    def create
      @board_assignment = BoardAssignment.new()
      new_member = User.find_by_email(board_assignment_params[:email])
      @board_assignment.user_id = new_member.id
      @board_assignment.board_id = board_assignment_params[:board_id]
      if @board_assignment.save
        render partial: "api/boards/board", locals: { board: @board_assignment.board }
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
