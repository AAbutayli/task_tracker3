defmodule TaskTracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :desc, :string
    field :done, :boolean, default: false
    field :name, :string
    field :time, :integer
    field :user_id, :id

    has_many :users, TaskTracker3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :desc, :done, :time])
    |> validate_required([:name, :desc, :done, :time])
  end
end
