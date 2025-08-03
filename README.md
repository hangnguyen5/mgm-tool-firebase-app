## Steps to Deploy Firebase Hosting

1. **Install Firebase CLI**  
    ```bash
    npm install -g firebase-tools
    ```

2. **Login to Firebase**  
    ```bash
    firebase login
    ```

3. **Initialize Firebase in your project**  
    ```bash
    firebase init
    ```
    - Select **Hosting**.
    - Choose your Firebase project (e.g., `ds-hdsvn-cloud-coe-lab`).
    - Set your public directory (e.g., `public`).
    - Configure as a single-page app if needed.

4. **Build your app**  
    *(If using a framework, run the build command, e.g., `npm run build`)*

5. **Deploy to Firebase Hosting**  
    ```bash
    firebase deploy --only hosting:hdsvn-coe-management-platform
    ```

6. **Access your site**  
    - After deployment, Firebase will provide a hosting URL.

7. **Troubleshooting**
    - To test locally, you could go to the `public/js/utils/viewLoader.js` file and adjust the base path if necessary:
    ```javascript
        // To local testing, you might need to adjust this
        const basePath = window.location.pathname.includes('/public/') ? 'views/' : '/public/views/';
    ```