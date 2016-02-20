require 'test_helper'

class TodolistControllerTest < ActionController::TestCase
  test "should get index" do
    get :index3
    assert_response :success
  end

end
