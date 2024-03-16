import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MovieCard } from '@/components/ui/movie-card';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IMovieResponse } from '@/types/movie-card-types'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { SkeletonGroup } from './ui/skeleton-group';
import { useSearchParams } from 'react-router-dom';

export function TopRatedMovies() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [pageQuery, setPageQuery] = useState(1)

    const page = useMemo(() => searchParams.get("page") != null ? Number(searchParams.get("page")) : 1, [searchParams, setSearchParams]);


    const ApiKey = import.meta.env.VITE_API_KEY

    const { data: movies, isFetching } = useQuery({
        queryKey: [page], queryFn: async () => {
            return (await axios.get<IMovieResponse>(`https://api.themoviedb.org/3/movie/top_rated?page=${page}&api_key=${ApiKey}`)).data;
        }, refetchOnWindowFocus: false,
    });

    const pagesLeft = useMemo(() => movies && movies.total_pages - page, [movies, page]);


    function nextPage() {
        if (movies && page > movies.total_pages) return
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSearchParams({ page: (page + 1).toString()})
    }

    function previousPage() {
        if (page === 1) return
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSearchParams({ page: (page - 1).toString()})
    }

    function handlePageQuery(e: any) {
        e.preventDefault();
        if (movies && pageQuery > movies.total_pages || pageQuery < 1) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSearchParams({ page: pageQuery.toString()})
    }

    return (
        <>
            {isFetching ?
                <SkeletonGroup title="Top rated movies..." />
                :
                <>
                    {movies && movies.total_results > 0 ?
                        <>
                            <div className="text-2xl text-center p-2"> Top rated movies: </div>
                            <p className="text-muted-foreground text-sm text-center">( Page: {page} )</p>
                            <div className="flex flex-row gap-4 p-2 flex-wrap justify-center items-center">
                                {movies && movies.results.map((movie, idx) => {
                                    return (
                                        <MovieCard id={movie.id} response={movie} key={idx} />
                                    )
                                })}
                                <Pagination>
                                    <PaginationContent>
                                        {page !== 1 && <PaginationItem>
                                            <Button onClick={previousPage} variant={"ghost"} className="text-muted-foreground"><ChevronLeftIcon />Previous</Button>
                                        </PaginationItem>}
                                        <PaginationItem>
                                            <Popover>
                                                <PopoverTrigger><Button variant={'secondary'}>{page}</Button></PopoverTrigger>
                                                <PopoverContent>
                                                    <div>
                                                        <form className="flex space-x-2 my-4" onSubmit={handlePageQuery} >
                                                            <Input type="number" placeholder="2" value={pageQuery} onChange={(e) => setPageQuery(Number(e.target.value))} />
                                                            <Button variant={"outline"} type="submit">Confirm</Button>
                                                        </form>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            {movies.total_pages}
                                        </PaginationItem>
                                        <PaginationItem>
                                            {(pagesLeft && pagesLeft > 0) ?
                                                <Button onClick={nextPage} variant={"ghost"} className="text-muted-foreground">Next<ChevronRightIcon /></Button>: <></>}
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                                <p className='text-center text-muted-foreground my-4'>Pages left: {pagesLeft}</p>
                            </div>
                        </>
                        :
                        <div className="text-muted-foreground text-2xl text-center my-8">Not Found</div>
                    }
                </>
            }
        </>
    )
}
