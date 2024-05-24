CREATE TABLE IF NOT EXISTS public.todo_items (
  id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  deleted_at timestamp 
)