"use client";
import { signOut, useSession } from "next-auth/react";

function Page() {
  const { data: session } = useSession();

  return (
    <div>
      dashboard
      {session ? (
        <>
          <p>Signed in as {JSON.stringify(session)}</p>
          <button className="bg-green-400" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}

export default Page;
