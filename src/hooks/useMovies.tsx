import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { GenreResponseProps, Movie } from "../interfaces";
import { api } from "../services/api";

interface MoviesProviderProps {
    children: ReactNode,
}

interface MovieContextData {
    movies: Movie[],
    genres: GenreResponseProps[],
    handleClickButton: (id: number) => void,
    selectedGenre: GenreResponseProps
    selectedGenreId: number,
}

const MovieContext = createContext<MovieContextData>({} as MovieContextData);

export function MoviesProvider({ children }: MoviesProviderProps) {
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
          setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
          setMovies(response.data);
        });
    
        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
          setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <MovieContext.Provider value={{ genres, movies, handleClickButton, selectedGenreId, selectedGenre }}>
            { children }
        </MovieContext.Provider>
    );
}

export function useMovies() {
    const context = useContext(MovieContext);

    return context;
}