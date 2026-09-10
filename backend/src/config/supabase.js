import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function connectSupabase(){
    try{
       const {error} = await supabase.from("users").select("id").limit(1);
       if (error){
        throw error;
       }
       console.log ("Supabase is Connected ✅")
    }
    catch(error){
        console.error("Supabase Connection Error ❌", error)
        throw error;
    }
}