import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";
import { PostType } from "../types/Post";
import { getList } from "../api/Post";
import { UserContext } from "./UserProvider";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { toast } from "react-toastify";

export const PostListContext = createContext(
  {} as {
    postList: PostType[];
    setPostList: Dispatch<SetStateAction<PostType[]>>;
    getPostList: (start: number | void, record: number | void) => Promise<void>
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

  const { userInfo } = useContext(UserContext);

  const getPostList = async (start: number | void, record: number | void) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const posts = await getList(userInfo.token, start, record);

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
    () => ({ postList, setPostList, getPostList, isLoading, setIsLoading }),
    [postList, setPostList, isLoading],
  );
  return (
    <PostListContext.Provider value={value}>
      {children}
    </PostListContext.Provider>
  );
};
