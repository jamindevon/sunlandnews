import { createClient } from '@supabase/supabase-js'

// Supabase client configuration
// Add your Supabase URL and anon key to .env.local when ready:
// NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create Supabase client or use placeholder
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : {
      from: (table) => ({
        insert: async (data) => {
          console.log(`[PLACEHOLDER] Would insert into ${table}:`, data)
          return { data: { id: Date.now(), ...data }, error: null }
        },
        select: async (columns = '*') => {
          console.log(`[PLACEHOLDER] Would select ${columns} from ${table}`)
          return { data: [], error: null }
        }
      })
    }

// Database helper functions
export async function createSignup(email) {
  try {
    console.log('Attempting to save signup:', email);
    
    const { data, error } = await supabase
      .from('signups')
      .insert({
        email
        // Let Supabase handle created_at automatically
      })
      .select()  // Return the inserted data
    
    if (error) {
      console.error('Supabase signup error:', error);
      throw error;
    }
    
    console.log('Signup saved successfully:', data);
    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Error creating signup:', error)
    // Return a more graceful fallback
    return { 
      success: false, 
      error: error.message,
      data: { id: null, email } // Don't return a fake timestamp ID
    }
  }
}

export async function createQuizResponse(signupId, email, responses) {
  try {
    console.log('Attempting to save quiz response:', { signupId, email, responses });
    
    const insertData = {
      email,
      q1_interest: responses.q1_interest,
      q2_lived: responses.q2_lived,
      q3_value: responses.q3_value,
      q4_sms: responses.q4_sms,
      q5_support: responses.q5_support,
    };
    
    // Add phone number if provided
    if (responses.phone_number && responses.phone_number.trim()) {
      insertData.phone_number = responses.phone_number.trim();
    }
    
    // Only add signup_id if it exists and is a valid UUID format
    if (signupId && 
        signupId !== 'null' && 
        signupId !== null && 
        signupId !== 'undefined' &&
        typeof signupId === 'string' &&
        signupId.length > 10 && // Basic check for UUID length
        signupId.includes('-')) { // Basic check for UUID format
      insertData.signup_id = signupId;
    } else {
      console.log('Invalid or missing signup_id, proceeding without it:', signupId);
    }
    
    console.log('Final insert data:', insertData);
    
    const { data, error } = await supabase
      .from('quiz_responses')
      .insert(insertData)
      .select()  // Return the inserted data
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Quiz response saved successfully:', data);
    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Error creating quiz response:', error)
    return { success: false, error: error.message }
  }
} 