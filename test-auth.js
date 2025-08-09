const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tcrgcmtstwppdqmchkrp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjcmdjbXRzdHdwcGRxbWNoa3JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MjAzMzgsImV4cCI6MjA3MDI5NjMzOH0.10XDKX7s-Jkx3T9E4Q95UJojecuYXEv2_agJqLnAgR4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🧪 Testing Supabase Connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Connection successful!');
    console.log('📊 Database response:', data);
    
    // Test auth endpoints
    console.log('\n🔐 Testing Auth Endpoints...');
    
    // Test signup (this will create a test user)
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    
    console.log(`📝 Attempting to create test user: ${testEmail}`);
    
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Test User'
        }
      }
    });
    
    if (signupError) {
      console.error('❌ Signup failed:', signupError.message);
      return false;
    }
    
    console.log('✅ Test user created successfully!');
    console.log('👤 User ID:', signupData.user?.id);
    
    // Test signin
    console.log('\n🔑 Testing signin...');
    
    const { data: signinData, error: signinError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    });
    
    if (signinError) {
      console.error('❌ Signin failed:', signinError.message);
      return false;
    }
    
    console.log('✅ Signin successful!');
    console.log('🔑 Session created:', !!signinData.session);
    
    // Test profile creation
    console.log('\n👤 Testing profile creation...');
    
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', signupData.user.id)
      .single();
    
    if (profileError) {
      console.error('❌ Profile fetch failed:', profileError.message);
      return false;
    }
    
    console.log('✅ Profile created automatically!');
    console.log('📋 Profile data:', profileData);
    
    // Clean up - delete test user
    console.log('\n🧹 Cleaning up test user...');
    
    const { error: deleteError } = await supabase.auth.admin.deleteUser(signupData.user.id);
    
    if (deleteError) {
      console.log('⚠️  Could not delete test user (this is normal for non-admin keys):', deleteError.message);
    } else {
      console.log('✅ Test user deleted successfully');
    }
    
    console.log('\n🎉 All authentication tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return false;
  }
}

// Run the test
testConnection().then(success => {
  if (success) {
    console.log('\n🚀 Authentication system is LIVE and working!');
    process.exit(0);
  } else {
    console.log('\n💥 Authentication system has issues that need to be fixed.');
    process.exit(1);
  }
});
