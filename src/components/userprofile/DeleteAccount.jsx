import React from "react";

const DeleteAccount = () => {
  //! We will write the logic for the delete account

  return (
    <section className="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      <article className="w-[60%] bg-white/30 ml-[550px] rounded-t-md px-4 text-black">
        <header className="w-full">
          <h1 className="text-3xl font-bold uppercase py-8 px-4">
            Deleting Account
          </h1>
        </header>
        <div className="py-2 px-4 text-lg">
          <p>
            Deleting your account will remove all of your information from our
            database.
          </p>
          <p>This cannot be recover.</p>
        </div>
      </article>
      <main className="w-[60%] bg-white/30 rounded-lg mt-1 ml-[550px] px-4">
        <form>
          <div className="py-2 px-4 text-lg text-black">
            <label htmlFor="confirmText">
              To confirm this, type
              <code className="bg-white/60 text-red-600 font-semibold rounded-xl p-2 mx-2">"DELETE"</code>
            </label>
          </div>
          <div className="mb-6 px-4 py-2 text-lg flex justify-between items-center">
            <input
              type="text"
              name="confirmText"
              id="confirmText"
              className="px-2 py-2 bg-white outline-none rounded-md font-semibold focus:ring-2 focus:ring-red-600 text-red-600"
            />
            <button
              className="bg-rose-600 px-3 py-2 rounded font-semibold cursor-pointer">
              Delete
            </button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default DeleteAccount;