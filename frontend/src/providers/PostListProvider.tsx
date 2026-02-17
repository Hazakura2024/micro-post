import { Dispatch, SetStateAction, useMemo, useState, createContext, useContext } from "react";
import { PostType } from "../types/Post";
import { getList } from "../api/Post";
import { UserContext, UserProvider } from "./UserProvider";

export const PostListContext = createContext(
    {} as {
        postList: PostType[];
        setPostList: Dispatch<SetStateAction<PostType[]>>;
        getPostList: () => Promise<void>;
    }
);

export const PostListProvider = (props: any) => {
    const { children } = props;
    const [postList, setPostList] = useState<PostType[]>([]);

    const { userInfo } = useContext(UserContext)

    const getPostList = async () => {
        const posts = await getList(userInfo.token);
        console.log(posts)

        if (posts) {
            const formattedPosts = posts.map((p: any) => (
                {
                    id: p.id,
                    user_name: p.user_name,
                    content: p.content,
                    created_at: new Date(p.created_at),
                }
            )
            )
            setPostList(formattedPosts)
        }

    }


    const value = useMemo(() => ({ postList, setPostList, getPostList }), [postList, setPostList]);
    return (
        <PostListContext.Provider value={value}>
            {children}
        </PostListContext.Provider>
    )
}