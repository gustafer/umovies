import { Link } from "react-router-dom";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Check, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Navbar() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    function handleSearch(e: any) {
        e.preventDefault()
        navigate(`/search?q=${search}&page=1`)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <nav className="flex flex-row gap-4 p-2 justify-between items-center border-b sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Link className="flex text-2xl gap-3 bg-background/75 flex-row border rounded-md h-[40px] px-2 text-center items-center justify-center" to={"/"}>
                <img src="/logo.svg" width={30} /> UMovies
            </Link>
            <div className="flex justify-center items-center gap-4">
                <ModeToggle />
                <Dialog>
                    <DialogTrigger>
                        <Button variant={"outline"} size={"icon"} className="bg-background/75 w-10">
                            <Search className="scale-75" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Search for a movie:</DialogTitle>
                            <DialogDescription>
                                <form onSubmit={handleSearch} className="flex flex-row gap-3">
                                    <Input value={search} onChange={(e) => setSearch(e.target.value)} />
                                    <DialogClose asChild>
                                            <Button type="submit" size={"icon"} variant={"outline"}><Check /></Button>
                                    </DialogClose>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </nav>
    )
}