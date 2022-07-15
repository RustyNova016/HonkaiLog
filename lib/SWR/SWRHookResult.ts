export interface SWRHookResult<datatype extends object> {
    data?: datatype,
    isError?: Error
    isLoading: boolean
}