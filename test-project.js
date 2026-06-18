async function testProjectCreation() {
  try {
    // 1. Register a test user
    const email = `testuser_${Date.now()}@example.com`;
    console.log('Registering user:', email);
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: email,
        password: 'password123'
      })
    });
    const regData = await regRes.json();
    if (!regRes.ok) throw new Error(JSON.stringify(regData));
    
    const token = regData.token;
    console.log('Got token:', token);
    
    // 2. Create a project
    const newProject = {
      name: 'Test Project',
      description: 'No description provided.',
      status: 'Planning',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'Medium'
    };
    
    console.log('Creating project...');
    const projRes = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newProject)
    });
    const projData = await projRes.json();
    if (!projRes.ok) throw new Error(JSON.stringify(projData));
    
    console.log('Project created successfully!');
    console.log(projData);
  } catch (err) {
    console.error('ERROR OCCURRED:');
    console.error(err.message);
  }
}

testProjectCreation();
