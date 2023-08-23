import React from "react";

function UserInfo (name, birthday, email) {
  return (
    <>
      <p>User: {name}</p>
      <p>Birthday: {birthday}</p>
      <p>Email: {email}</p>
    </>
  );
}

export default UserInfo;
