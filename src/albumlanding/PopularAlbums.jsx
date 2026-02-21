import React, { useEffect, useState } from "react";
import { __DB } from "../backend/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import { FaMusic } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Spinner from "../Helper/Spinner";

const PopularAlbums = () => {
  const [albums, setAlbums] = useState([]); // Fix: Initialize as an empty array

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        let albumCollectionRef = collection(__DB, "music_albums");
        let getAlbums = await getDocs(albumCollectionRef);

        let albumData = getAlbums.docs.map((album) => ({
          id: album.id,
          ...album.data(), // Ensure correct data structure
        }));

        console.log("Fetched Album Data:", albumData); // Debugging
        setAlbums(albumData);
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <section className="w-[80vw]">
      <article className="w-full">
        <header className="w-full p-5 flex items-center gap-3">
          <span className="text-3xl text-black">
            <FaMusic />
          </span>
          <h1 className="text-3xl text-black font-bold">Popular Albums</h1>
        </header>

        <main className="w-full flex items-center gap-5 flex-wrap">
          {albums.length > 0 ? (
            albums.map((album, index) => (
              <NavLink 
                to={`album-details/${album?.albumTitle}`}
                key={album.id}
                state={album}>
                <div className="w-[260px] h-[330px] ml-2 bg-white/30 p-4 rounded-lg hover:bg-white/30 hover:ring-2 hover:ring-[white]">
                  <img
                    src={album?.albumThumbnail}
                    alt={album?.albumTitle}
                    className="w-full h-[250px] object-cover rounded-lg hover:scale-105 transition-all duration-100 ease-linear"
                    onError={(e) => {
                      console.warn("Image failed to load:", e.target.src);
                      e.target.src = "https://via.placeholder.com/250"; // Fallback Image
                    }}
                  />
                  <h1 className="py-2 text-center font-semibold text-lg mt-2 rounded font-semibold text-black">
                    {album?.albumTitle || "Unknown Title"}
                  </h1>
                </div>
              </NavLink>
            ))
          ) : (
            <section className="w-[100%] h-[100vh] fixed top-0 left-[7%] flex justify-center items-center">
              <Spinner />
            </section>
          )}
        </main>
      </article>
    </section>
  );
};

export default PopularAlbums;
