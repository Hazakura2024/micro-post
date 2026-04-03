import {
    createContext,
    type Dispatch,
    type SetStateAction,
} from "react";
import type { PostType } from "../types/Post";

export const PostListContext = createContext(
    {} as {
        postList: PostType[];
        searchWord: string
        setSearchWord: React.Dispatch<React.SetStateAction<string>>
        searchName: string
        setSearchName: React.Dispatch<React.SetStateAction<string>>
        page: number
        setPage: React.Dispatch<React.SetStateAction<number>>
        setPostList: Dispatch<SetStateAction<PostType[]>>;
        getPostList: (start?: number, record?: number, word?: string, user_name?: string) => Promise<void>;
        isLoading: boolean;
        setIsLoading: Dispatch<React.SetStateAction<boolean>>;
        refreshCurrent: () => void
    },
);