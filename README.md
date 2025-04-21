Task Management API
Welcome to the Task Management API! 🚀 This API helps you manage tasks, users, and more. Below you'll find the details to get started with testing some of the endpoints using cURL.

🚀 Test API Endpoints with cURL
Start testing by creating users and tasks! Just copy and paste the commands into your terminal, and voilà — you’re good to go!

1. Create a New User 🧑‍💻
To create a new user, send a POST request to /api/users with the following data:

bash
Copy
Edit
curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d "{\"name\":\"John Doe\", \"email\":\"johnasf@example.com\", \"role\":\"ASSIGNER\"}"
This will create a user with the following details:

Name: John Doe

Email: johnasf@example.com

Role: ASSIGNER

You can replace the values in the name, email, and role fields as needed!

2. Create a New Task 📝
Next, let’s create a task. To do that, send a POST request to /tasks:

bash
Copy
Edit
curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d "{\"title\":\"new Task 1\",\"description\":\"This is the new task.\",\"priority\":\"MEDIUM\",\"dueDate\":\"2025-05-10T10:00:00Z\",\"assignerId\":\"687a6559-6535-4726-94a1-d763b973c3eb\",\"doerId\":\"4c6f4d4e-a3f5-4762-8585-d6d74518caf5\"}"
This will create a task with the following information:

Title: new Task 1

Description: This is the new task.

Priority: Medium

Due Date: May 10, 2025, 10:00 AM (UTC)

Assigner ID: 687a6559-6535-4726-94a1-d763b973c3eb

Doer ID: 4c6f4d4e-a3f5-4762-8585-d6d74518caf5
