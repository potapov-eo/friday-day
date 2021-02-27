export const getResponseError = (e:any)=>e.response
    ? e.response.data.error
    : (e.message + ', more details in the console')