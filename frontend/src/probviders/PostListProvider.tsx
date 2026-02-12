import { Dispatch, SetStateAction, useMemo, useState, createContext } from "react";
import { PostType } from "../types/Post";

export const PostListContext = createContext(
    {} as {
        postList: PostType[];
        setPostList: Dispatch<SetStateAction<PostType[]>>;
    }
);

export const PostListProvider = (props: any) => {
    const { children } = props;
    const [postList, setPostList] = useState<PostType[]>([]);
    const value = useMemo(() => ({ postList, setPostList }), [postList, setPostList]);
    return (
        <PostListContext.Provider value={value}>
            {children}
        </PostListContext.Provider>
    )
}