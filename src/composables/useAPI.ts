import { createFetch } from "@vueuse/core";

const BASE_URL: string = import.meta.env.VITE_API_URL;

export const useAPI = createFetch({
    baseUrl: BASE_URL + "/",
    options: {
        beforeFetch(ctx) {
            const accessToken = localStorage.getItem("accessToken") || "";
            ctx.options.headers = {
                ...ctx.options.headers,
                Autorization: `Bearer ${accessToken}`,
            };
            return ctx;
        },

        afterFetch(ctx) {
            const { headers } = ctx.response;
            headers.has("X-Total-Count") && (ctx.data.total = headers.get("X-Total-Count"));
            return ctx;
        }
    }
});