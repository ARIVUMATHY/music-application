import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { GlobalAudioPlayer } from '../Context/AudioPlayerContext';

const AlbumDetails = () => {
    let location = useLocation();
    let { songs, setSongs, isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex } = useContext(GlobalAudioPlayer);
    // console.log(location);
    let albumData = location?.state
    console.log("Album Data: ", albumData);

    let songList = albumData?.songs;
    console.log("Song List: ", songList);

    let handleSongChange = (index) => {
        setSongs(songList);
        setCurrentSongIndex(index)
        if (currentSongIndex === index) {
            setIsPlaying(!isPlaying)
        } else {
            setIsPlaying(true);
        }
    }

    return (
        <section className='w-full h-[calc(100vh-70px)] flex flex-col ml-[-11px] items-center mt-10'>
            <article className='w-[94%] flex gap-2 h-[400px] bg-rose-600/50 rounded-lg px-5 py-6 hover:bg-rose-500/50'>
                <aside className='basis-[20%] h-[350px] relative'>
                    <img
                        src={albumData?.albumThumbnail}
                        alt={albumData?.albumTitle}
                        className='h-full w-full object-cover rounded ' />
                    <span className='py-1 px-2 bg-white/30 text-black text-sm rounded-md absolute top-[-7px] left-[-10px]'>
                        {albumData?.albumType}
                    </span>
                </aside>
                <aside className='basis-[80%] h-[350px] text-black'>
                    <h1 className='text-3xl font-semibold tracking-wider text-center'>{albumData?.albumTitle}</h1>
                    <p className='text-lg px-2 py-1 text-justify'>
                        <span className='font-semibold'>Description:</span>
                        <span className='px-1 text-black/70 italic'>{albumData?.albumDesc}</span>
                    </p>
                    <p className='text-lg px-2 py-1 text-justify'>
                        <span className='font-semibold'>Release Date:</span>
                        <span className='px-1 text-black/70 italic'>{albumData?.albumReleaseDate}</span>
                    </p>
                    <p className='text-lg px-2 py-1 text-justify'>
                        <span className='font-semibold'>Language:</span>
                        <span className='px-1 text-black/70 italic'>{albumData?.albumLang}</span>
                    </p>
                    <p className='text-lg px-2 py-1 text-justify'>
                        <span className='font-semibold'>Starcast:</span>
                        <span className='px-1 text-black/70 italic'>{albumData?.albumStarcast}</span>
                    </p>
                    <p className='text-lg px-2 py-1 text-justify'>
                        <span className='font-semibold'>Director:</span>
                        <span className='px-1 text-black/70 italic'>{albumData?.albumDirector}</span>
                    </p>
                    <p className='text-lg px-2 py-1 text-justify'>
                        <span className='font-semibold'>Number of Tracks:</span>
                        <span className='px-1 text-black/70 italic'>{albumData?.albumSongsCount}</span>
                    </p>
                </aside>
            </article>
            <main className='text-black mt-5 w-full'>
                <header className='w-full '>
                    <h1 className='text-3xl font-semibold ml-8'>Song Collection</h1>
                </header>
                <table className='ml-8 w-[95%] mb-20'>
                    <thead>
                        <tr className='bg-rose-600/50 hover:bg-rose-500/50'>
                            <td className='px-6 py-2 text-lg font-semibold'>Track Number</td>
                            <td className='px-6 py-2 text-lg font-semibold'>Poster</td>
                            <td className='px-6 py-2 text-lg font-semibold'>Song Name</td>
                            <td className='px-6 py-2 text-lg font-semibold'>Singer</td>
                            <td className='px-6 py-2 text-lg font-semibold'>Music Director</td>
                            <td className='px-6 py-2 text-lg font-semibold'>Duration</td>
                            <td className='px-6 py-2 text-lg font-semibold'>Size</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            songList.length > 0 ? (songList.map((song, index) => {
                                return (
                                    <tr 
                                        onClick={
                                            () => handleSongChange(index)
                                        } 
                                        key={index} 
                                        className='bg-white/20 font-semibold cursor-pointer hover:border hover:bg-white/30'
                                    >
                                        <td className='text-center'>{index + 1}</td>
                                        <td className='flex justify-center items-center mt-2'>
                                            <img
                                                src={song?.songThumbnail}
                                                alt={song?.songTitle}
                                                className='w-[100px] h-[150px] mb-2 rounded' />
                                        </td>
                                        <td className='px-2 text-lg'>{song?.songTitle}</td>
                                        <td className='px-1 text-lg'>{song?.songSingers}</td>
                                        <td className='px-1 text-lg'>{song?.songMusicDirector}</td>
                                        <td className='text-lg text-center'>{song?.duration} </td>
                                        <td className='text-lg text-center'>{song?.size}</td>
                                    </tr>)
                            })) : (<p className='text-center text-lg'>Song Collection is Not Found!</p>)
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </main>
        </section>
    )
}

export default AlbumDetails