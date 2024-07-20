import { SWRConfiguration } from "swr";

const configRevalidateFalse: SWRConfiguration ={
    revalidateOnFocus: false,

}
const configRevalidateTrue: SWRConfiguration = {
    revalidateOnFocus: true
}
export { configRevalidateFalse }