import {Provider} from "next-auth/providers";
import GitHubProvider from "next-auth/providers/github";
import {z} from "zod";

const GithubProviderOptionsZod = z.object({
    clientId: z.string(),
    clientSecret: z.string()
})
const GithubProviderOptions = GithubProviderOptionsZod.parse({
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
});
export const AuthProviders: Provider[] = [
    GitHubProvider(GithubProviderOptions)
];