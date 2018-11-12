defmodule TaskTracker3Web.SessionController do
    use TaskTracker3Web, :controller
  
  #   def create(conn, %{"email" => email}) do
  #     user = TaskTracker3.Users.get_user_by_email(email)
  #     if user do
  #       conn
  #       |> put_session(:user_id, user.id)
  #       |> put_flash(:info, "Welcome back #{user.email}")
  #       |> redirect(to: Routes.page_path(conn, :index))
  #     else
  #       conn
  #       |> put_flash(:error, "Login failed.")
  #       |> redirect(to: Routes.page_path(conn, :index))
  #     end
  #   end
  
  #   def delete(conn, _params) do
  #     conn
  #     |> delete_session(:user_id)
  #     |> put_flash(:info, "Logged out.")
  #     |> redirect(to: Routes.page_path(conn, :index))
  #   end
  # end

  def create(conn, %{"email" => email}) do
    user = TaskTracker3.Users.get_user_by_email(email)
    resp = %{
        data: %{
          token: Phoenix.Token.sign(TaskTracker3Web.Endpoint, "user_id", user.id),
          user_id: user.id,
        }
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:created, Jason.encode!(resp))
  
  end
end