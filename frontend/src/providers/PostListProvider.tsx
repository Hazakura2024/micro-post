import React, {
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";
import type {
  Dispatch,
  SetStateAction,
} from "react";
import type { PostType } from "../types/Post";
import { getList } from "../api/Post";
import { UserContext } from "./UserProvider";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { toast } from "react-toastify";

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
  },
);

export const PostListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchWord, setSearchWord] = useState("");
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);

  const { userInfo } = useContext(UserContext);

  const getPostList = async (start?: number, record?: number, word?: string, user_name?: string) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const posts = await getList(userInfo.token, start, record, word, user_name);

      if (posts) {
        const formattedPosts = posts.map((p: PostType) => ({
          id: p.id,
          user_id: p.user_id,
          user_name: p.user_name,
          content: p.content,
          created_at: new Date(p.created_at),
        }));
        setPostList(formattedPosts);
      }
    } catch (error: unknown) {
      const msg = extractErrorMessage(error, "投稿が取得できません");
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({ postList, setPostList, getPostList, isLoading, setIsLoading, searchWord, setSearchWord, searchName, setSearchName, page, setPage }),
    [postList, setPostList, isLoading, searchName, setSearchWord, page],
  );
  return (
    <PostListContext.Provider value={value}>
      {children}
    </PostListContext.Provider>
  );
};
