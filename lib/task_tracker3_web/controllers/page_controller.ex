defmodule TaskTracker3Web.PageController do
  use TaskTracker3Web, :controller

  def index(conn, _params) do
    tasks = TaskTracker3.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :name, :desc, :done, :time])))
    render conn, "index.html", tasks: tasks
  end  
  
  def index(conn, _params) do
    render(conn, "index.html")
  end
end
