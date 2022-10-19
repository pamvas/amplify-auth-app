// import { Amplify } from 'aws-amplify';
// import { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

// import awsExports from './aws-exports';
// Amplify.configure(awsExports);

// function App() {


// console.log(result); // SUCCESS

//   return (
//     <Authenticator socialProviders={['amazon']}>
//       {({ signOut, user }) => (
//         <main>
//           <h1>Hello {user.username}</h1>
//           <button onClick={signOut}>Sign out</button>
//         </main>
//       )}
//     </Authenticator>
//   );
  
// }

import React, { useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';


Amplify.configure(awsconfig);

function App() {
  const poolData = {
    UserPoolId: 'user_pool',
    ClientId: 'client_id'
  };

const userPool = new CognitoUserPool(poolData);
const authenticatedUser =  userPool.getCurrentUser();

if (authenticatedUser != null) {
  authenticatedUser.getSession(function(err, session) {
  if (err) {
  alert(err)
  return
  }
  console.log('session validity: ' + session.isValid())

const attributeList = [];
const attribute = new CognitoUserAttribute({
    Name: 'phone_number',
    Value: '+12128601234',
});

attributeList.push(attribute);

authenticatedUser.updateAttributes(attributeList, function(err, result) {
  if (err) {
    alert(err.message || JSON.stringify(err))
    return
  }
  console.log('call result: ' + result)
})
})
}
    return (
      <Authenticator socialProviders={['amazon']}>
             {({ signOut, user }) => (
               <main>
                 <h1>Hello {user.attributes.email}</h1>
                 <h1>{user.attributes.phone_number}</h1>
                 <button onClick={signOut}>Sign out</button>
               </main>
             )}
           </Authenticator>
  );
}

export default App;
