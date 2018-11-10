defmodule TaskTracker3.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :admin, :boolean, default: false
    field :email, :string
    has_many :tasks, TaskTracker3.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email])
    |> unique_constraint(:email)
    |> validate_required([:email])
  end
end
