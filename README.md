This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Amplify Settings MEMO
### Auth
```
$ amplify add auth
 Do you want to use the default authentication and security configuration? Manual configuration
 Select the authentication/authorization services that you want to use: User Sign-Up, Sign-In, connected with AWS IAM controls (Enables per-user Storage features for images or other content, Analytics, and more)
 Please enter a name for your identity pool. botui_identitypool
 Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) No
 Do you want to enable 3rd party authentication providers in your identity pool? Yes
 Select the third party identity providers you want to configure for your identity pool:
 Please provide a friendly name for your resource that will be used to label this category in the project: botui
 Please provide a name for your user pool: botui_userpool
 How do you want users to be able to sign in? Email
 Do you want to add User Pool Groups? Yes
 Provide a name for your user pool group: customer
 Do you want to add another User Pool Group? Yes
 Provide a name for your user pool group: admin
 Do you want to add another User Pool Group? No
 Sort the user pool groups in order of preference · customer, admin
 Do you want to add an admin queries API? No
 Multifactor authentication (MFA) user login options: OFF
 Email based user registration/forgot password: Enabled (Requires per-user email entry at registration)
 Please specify an email verification subject: 確認コードをお知らせします
 Please specify an email verification message: こんにちは。<br>検証を完了するには次の確認コードを使用してください。<br><br>確認コード<br>{####}
 Do you want to override the default password policy for this User Pool? Yes
 Enter the minimum password length for this User Pool: 8
 Select the password character requirements for your userpool:
 What attributes are required for signing up? Email
 Specify the app's refresh token expiration period (in days): 30
 Do you want to specify the user attributes this app can read and write? No
 Do you want to enable any of the following capabilities? Add User to Group
 Do you want to use an OAuth flow? No
 Do you want to configure Lambda Triggers for Cognito? No
 Enter the name of the group to which users will be added. customer
 Do you want to edit your add-to-group function now? Yes
```

### API
```
$ amplify add api
 Please select from one of the below mentioned services: GraphQL
 Provide API name: botui
 Choose the default authorization type for the API: Amazon Cognito User Pool
 Do you want to configure advanced settings for the GraphQL API? No, I am done.
 Do you have an annotated GraphQL schema? No
 Choose a schema template: Single object with fields (e.g., “Todo” with ID, name, description)
```

### Storage
```
$ amplify add storage
 Please select from one of the below mentioned services: Content (Images, audio, video, etc.)
 Please provide a friendly name for your resource that will be used to label this category in the project: contents
 Please provide bucket name: botui
 Restrict access by? Auth/Guest Users
 Who should have access?: Auth and guest users
 What kind of access do you want for Authenticated users? create/update, read, delete
 What kind of access do you want for Guest users? read
 Do you want to add a Lambda Trigger for your S3 Bucket? No
```