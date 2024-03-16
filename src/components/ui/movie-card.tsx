import { Star } from "lucide-react";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { IMovieCard } from "../../types/movie-card-types"

export function MovieCard({ response }: IMovieCard) {
    const checkImageExist = response.poster_path ? `https://image.tmdb.org/t/p/w500/${response.poster_path}` : '/nomoviebanner.png'
    return (
        <div className="flex flex-col w-[15rem] p-4 border rounded-md ">
            <div className="overflow-clip text-ellipsis">
                <img src={checkImageExist} className="rounded-md h-[309px] w-[206px]"  />
                <div className="flex flex-row gap-2 justify-between items-center m-auto">
                    <h2 className="text-xl whitespace-nowrap text-ellipsis overflow-clip m-auto text-center my-1">{response.title}</h2>
                    <h3 className="flex flex-row items-center text-muted-foreground gap-1">{response.vote_average && response.vote_average.toFixed(2)}<Star strokeWidth={1.25} size={15} /></h3>
                </div>
            </div>
            <Link to={`/movie/${response.id}`} className="block "> <Button variant={"outline"} className="w-full" >Details</Button></Link>
        </div>
    )
}