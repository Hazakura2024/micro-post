import { useSearchParams } from "react-router-dom";
import type { PostType } from "../../../types/Post";
import { getList } from "../../../api/Post";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const usePostList = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("page") ?? "1");
    const searchName = searchParams.get("name") ?? "";
    const searchWord = searchParams.get("word") ?? "";

    const searchSchema = z.object({
        searchWord: z.string().optional(),
        searchName: z.string().optional()
    })
    type SearchSchema = z.infer<typeof searchSchema>;


    const {
        register,
        handleSubmit,
        reset,
    } = useForm<SearchSchema>({
        resolver: zodResolver(searchSchema),
        defaultValues: { searchWord: "", searchName: "" }
    })


    const {
        data: postList = [], // data: のところに成功した戻り値が自動で入る
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["post", { page, searchName, searchWord }],
        queryFn: async () => {
            const posts = await getList((page - 1) * 10, undefined, searchWord, searchName);

            if (!posts) return [];

            return posts.map((p: PostType) => ({
                id: p.id,
                user_id: p.user_id,
                user_name: p.user_name,
                user_icon: p.user_icon,
                content: p.content,
                created_at: new Date(p.created_at),
            }));
        }
    });

    const onClickReload = () => {
        refetch()
    };

    const onClickClear = () => {
        setSearchParams({});
        reset()
    }

    const onClickNext = () => {
        if (isLoading || postList.length < 10) return;
        const currentPage = Number(searchParams.get("page") ?? "1");
        const nextParams = new URLSearchParams(searchParams)
        nextParams.set("page", `${currentPage + 1}`);
        setSearchParams(nextParams)
    }

    const onClickBack = () => {
        if (isLoading || page < 2) return;
        const currentPage = Number(searchParams.get("page") ?? "1");
        const nextParams = new URLSearchParams(searchParams)
        nextParams.set("page", `${currentPage - 1}`);
        setSearchParams(nextParams)
    }

    const onSubmit = (data: SearchSchema) => {
        const params: Record<string, string> = {};
        params.page = "1";
        if (data.searchName.trim()) params.name = data.searchName.trim();
        if (data.searchWord.trim()) params.word = data.searchWord.trim();
        setSearchParams(params);
    }

    const isDisableNextButton = isLoading || postList.length < 10;
    const isDisableBackButton = isLoading || page < 2;
    return {
        isLoading,
        onClickReload,
        onClickClear,
        onClickBack,
        isDisableBackButton,
        isDisableNextButton,
        onClickNext,
        postList,
        register,
        handleSubmit: handleSubmit(onSubmit),
    }
}