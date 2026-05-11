import z, { email, minLength } from "zod";

export const authBaseSchema = z.object({
    userName: z.string().min(1, "ユーザー名を入力してください"),
    password: z.string().min(6, "パスワードを入力してください")
});

export type SignInSchema = z.infer<typeof authBaseSchema>

export const singUpSchema = authBaseSchema.extend({
    email: z.string()
        .min(1, "メールアドレスを入力してください")
        .email("メールアドレスの形式が正しくありません")
})
export type SingUpSchema = z.infer<typeof singUpSchema>