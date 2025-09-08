const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Triggered when a new user is created
exports.setDefaultUserRole = functions.auth.user().onCreate(async (user) => {
  try {
    const db = admin.firestore().databaseId('management-data');
    const userRef = db.collection('management-users').doc(user.uid);
    
    // Check if user already exists in management-users collection
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      // User doesn't exist in management-users, create with default role
      await userRef.set({
        email: user.email,
        displayName: user.displayName || '',
        role: 'subscriber', // Default role
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastSignIn: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`Created management user record for: ${user.email}`);
    } else {
      // User exists, just update last sign-in time
      await userRef.update({
        lastSignIn: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`Updated last sign-in for existing user: ${user.email}`);
    }
  } catch (error) {
    console.error('Error in setDefaultUserRole:', error);
  }
});

// Additional function to handle existing users on sign-in
exports.handleUserSignIn = functions.https.onCall(async (data, context) => {
  try {
    // Check if user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const uid = context.auth.uid;
    const email = context.auth.token.email;
    const displayName = context.auth.token.name || '';

    const db = admin.firestore().databaseId('management-data');
    const userRef = db.collection('management-users').doc(uid);
    
    // Check if user exists in management-users collection
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      // User doesn't exist in management-users, create with default role
      await userRef.set({
        email: email,
        displayName: displayName,
        role: 'subscriber', // Default role
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastSignIn: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`Created management user record for existing user: ${email}`);
      return { message: 'User record created', role: 'subscriber' };
    } else {
      // User exists, just update last sign-in time
      await userRef.update({
        lastSignIn: admin.firestore.FieldValue.serverTimestamp()
      });
      const userData = userDoc.data();
      console.log(`Updated last sign-in for user: ${email}`);
      return { message: 'User record updated', role: userData.role };
    }
  } catch (error) {
    console.error('Error in handleUserSignIn:', error);
    throw new functions.https.HttpsError('internal', 'Internal error occurred');
  }
});

// Triggered when ANY user signs in (new or existing)
exports.updateUserSignIn = functions.auth.user().beforeSignIn(async (user, context) => {
  const db = admin.firestore().databaseId('management-data');
  const userRef = db.collection('management-users').doc(user.uid);
  
  // Check if user document exists
  const userDoc = await userRef.get();
  
  if (userDoc.exists) {
    // Update last sign-in time for existing users
    await userRef.update({
      lastSignIn: admin.firestore.FieldValue.serverTimestamp(),
      email: user.email // Update email in case it changed
    });
  } else {
    // Create document for users who might not have one
    await userRef.set({
      email: user.email,
      role: 'subscriber',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastSignIn: admin.firestore.FieldValue.serverTimestamp()
    });
  }
});
