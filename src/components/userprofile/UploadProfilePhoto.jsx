import { updateProfile } from "firebase/auth";
import React, { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthUserContext } from "../../Context/AuthContextApi";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Helper/Spinner";



const UploadProfilePhoto = () => {
  let {authUser} = useContext(AuthUserContext)
  let navigate = useNavigate();

  let [photoFile, setPhotoFile] = useState("");
  let [photoPreview, setPhotoPreview] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

  let handleFileInputChange = (e) => {
    let file = e.target.files[0];
    setPhotoFile(file);
    //  console.log(file);
    //constructor - URL.createObject(url) - this will accept one file  --> this will create the photo preview
    setPhotoPreview(URL.createObjectURL(file));
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      if (!photoFile) {
        toast.error("Please select a file to upload");
        setIsLoading(false);
        return;
      }

      let fileData = new FormData();
      fileData.append("file", photoFile);
      fileData.append("upload_preset", "Battlefield-MUSIC");
      fileData.append("cloud_name", "djxnv5fgd");

      //!promise
      let response = await fetch(
        "https://api.cloudinary.com/v1_1/djxnv5fgd/image/upload",
        {
          method: "Post",
          body: fileData,
        }
      );

      let result = await response.json();
      let imageUrl = result.url;

      //update the profile
      await updateProfile (authUser, {
        photoURL: imageUrl
      })
      toast.success("Profile Photo Updated Successfully");
      navigate("/user/profile")
    }
    
    
    catch (error) {
      toast.error("Error Uploading Profile Photo");
      
      toast(console.log(error));
    }
    setIsLoading(false);
    
  };
  return (
    <section className="w-[100%] h-[calc(100vh-70px)] flex flex-col justify-center items-center ml-[250px]">
      <article className="flex flex-col justify-center items-center w-[35%] text-black  bg-white/30 py-6 rounded-2xl">
        <header className="text-4xl font-semibold mb-4">
          <h1>Upload Profile Photo</h1>
        </header>

        {photoPreview === null ? (
          <>
            <div className="w-[150px] h-[150px] bg-white/40 text-lg font-semibold border-4 border-white/20 rounded-full mb-4 flex justify-center items-center">
              No File Selected
            </div>
          </>
        ) : (
          <>
            <img
              className="w-[150px] h-[150px] border-2 rounded-full mb-4 flex justify-center items-center hover:transform-3d hover:scale-180 transform duration-1000 ease-in-out "
              src={photoPreview}
            />
          </>
        )}
      </article>
      <br />

      <main className="flex flex-col items-center bg-white/30 w-[55] px-6 py-7 text-black rounded-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-2">
            <label
              htmlFor="file"
              className="text-2xl font-semibold cursor-pointer"
            >
              Choose a file
            </label>
          </div>

          <input
            type="file"
            id="file"
            name="photoFile"
            accept="image/*"
            onChange={handleFileInputChange}
            className="mb-4 border border-black/30 p-2 rounded-md cursor-pointer"
          />
          <div>
            <button
              type="submit"
              className="bg-rose-600 text-lg font-semibold text-white px-4 py-2 rounded-md hover:bg-rose-500"
            >Upload
            </button>
          </div>
        </form>
 
      </main>
      {isLoading && (
        <section className="w-full h-full bg-cover bg-center bg-black/50 fixed top-0 left-0 flex items-center justify-center cursor-pointer">
          <Spinner />
        </section>
      )}
    </section>
  );
};

export default UploadProfilePhoto;
