### Managing User Roles in a Firebase App with Google Sign-in

Implementing role-based access control in a Firebase application using Google Sign-in is a common requirement for managing user permissions and tailoring the user experience. While Firebase Authentication doesn't have a built-in concept of user roles, it provides the necessary tools to implement a robust role management system. There are two primary and effective methods to achieve this: utilizing a database like Cloud Firestore or the Realtime Database, or employing Firebase's Custom Claims feature.

### Method 1: Storing Roles in a Database (Firestore or Realtime Database)

This approach is straightforward and involves creating a separate collection in your database to store user roles.

**1. Setting up the Database:**

After a user signs in with Google for the first time, you can create a document for them in a Firestore collection (e.g., `users`). This document will store their role alongside their unique user ID (UID) provided by Firebase Authentication.

**Example Firestore Data Structure:**

```
/users/{uid}
  - email: "user@example.com"
  - role: "editor"
```

**2. Assigning Roles:**

You can assign roles to users in several ways:

*   **Default Role on Sign-up:** When a new user is created, you can assign them a default role (e.g., "subscriber") using a Cloud Function that triggers on user creation.
*   **Manual Assignment:** You can build an admin panel in your application where an administrator can manually assign or update user roles in the database.

**3. Enforcing Access with Security Rules:**

Firebase Security Rules are essential for controlling access to your data based on the user's role stored in the database. You can write rules that check the user's role before allowing read or write operations.

**Example Firestore Security Rules:**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read their own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Only allow users with the 'admin' or 'editor' role to write to a 'posts' collection
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'editor'];
    }
  }
}
```

**4. Client-Side UI Control:**

On the client-side of your application, you can fetch the user's role from the database after they sign in. This information can then be used to conditionally render UI elements, such as showing an admin dashboard only to users with the "admin" role.
