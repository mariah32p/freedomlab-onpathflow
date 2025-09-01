/*
  # Add trigger for automatic profile creation

  1. Database Function
    - Creates `handle_new_user()` function to insert profile on user creation
    - Uses security definer to bypass RLS during profile creation
    
  2. Database Trigger  
    - Triggers `handle_new_user()` after insert on auth.users
    - Automatically creates profile for every new user signup
    
  3. Security
    - Function runs with elevated privileges to create profile
    - Ensures every user gets a profile record automatically
*/

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, plan, subscription_status)
  VALUES (new.id, new.email, 'standard', 'not_started');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();