import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Album, Banknote, Drama, HandCoins, Skull, Star, Sword, Timer, TrafficCone } from "lucide-react";
import { useParams } from "react-router-dom"
import { GenreTypes } from "../types/genre-types";
const ApiKey = import.meta.env.VITE_API_KEY

export function MovieDetails() {
    const { id } = useParams()
    const formatCurrency = (number: number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "usd",
        });
    };

    const { data: movie, isFetching } = useQuery({
        queryKey: ['moviedetails'], queryFn: async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}`);
            return response.data;
        }, staleTime: 60000, refetchOnMount: 'always',
    })
    return (
        <>
            {isFetching ?
                <p>Loading...</p> :
                <div className="flex flex-col justify-center m-auto lg:w-1/2 md:w-[90%] w-[85%]  gap-2 my-2">
                    <h1 className="text-center text-3xl p-2">{movie.title} {movie.vote_average && <span className="flex flex-row text-xl text-muted-foreground justify-center items-center gap-3 my-2"><Star strokeWidth={1} /> {movie.vote_average.toFixed(2)}</span>}</h1>
                    <img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : `/nomoviebannerlarge.png`} className="rounded-lg" />

                    {movie.overview ?
                        <div className="flex flex-col items-center gap-2 border rounded-md p-4 my-2">
                            <p className="flex flex-row items-center justify-center gap-2 text-xl">
                                <Album />
                                Description:
                            </p>
                            <p className="text-base text-center">{movie.overview}</p>
                        </div>
                        : <></>}

                    {movie.genres.length > 0 ?
                        <div className="flex flex-col items-center gap-2 border rounded-md p-4 text-xl">
                            <p className="flex flex-row items-center justify-center gap-2">
                                <Drama />
                                Genres:
                            </p>
                            <div className="flex flex-row flex-wrap gap-4 font-thin justify-center">
                                {movie.genres.map((genre: GenreTypes) => {
                                    if (genre.name === 'Drama') {
                                        return <p key={genre.name} className="flex flex-row items-center gap-2"><Drama />{genre.name}</p>
                                    } else if (genre.name === 'Crime') {
                                        return <p key={genre.name} className="flex flex-row items-center gap-2"><Sword />{genre.name}</p>
                                    } else if (genre.name === 'Thriller') {
                                        return <p key={genre.name} className="flex flex-row items-center gap-2"><Sword />{genre.name}</p>
                                    } else if (genre.name === 'Horror') {
                                        return <p key={genre.name} className="flex flex-row items-center gap-2"><Skull />{genre.name}</p>
                                    }
                                    else return <p key={genre.name} className="flex flex-row items-center gap-2"><TrafficCone />{genre.name}</p>
                                })}
                            </div>
                        </div>
                        : <></>}

                    {movie.runtime ?
                        <div className="border rounded-md p-4 justify-center flex">
                            <div className="flex flex-row  gap-2 mx-2 text-xl items-center">
                                <Timer />
                                <p>Duration: </p>
                                <p className="font-light">{movie.runtime} minutes.</p>
                            </div>
                        </div>
                        : <></>}

                    {movie.revenue && movie.budget ?
                        <div className="flex items-center text-xl justify-center flex-wrap gap-4 p-4 border rounded-md overflow-auto">
                            <div className="flex flex-row gap-2 mx-2 items-center">
                                <HandCoins />
                                <p>Income:</p>
                                <p className="font-light">{formatCurrency(movie.revenue)}</p>
                            </div>
                            <div className="flex flex-row gap-2 mx-2 items-center">
                                <Banknote />
                                <p>Budget:</p>
                                <p className="font-light">{formatCurrency(movie.budget)}</p>
                            </div>
                        </div> : <></>}
                </div>
            }
        </>
    )
}