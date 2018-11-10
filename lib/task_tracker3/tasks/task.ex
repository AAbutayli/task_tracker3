defmodule TaskTracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :desc, :string
    field :done, :boolean, default: false
    field :name, :string
    field :time, :integer


    belongs_to :user, TaskTracker3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :desc, :done, :user_id])
    |> unique_constraint(:name)
    |> validate_required([:name, :desc])
  end
end
