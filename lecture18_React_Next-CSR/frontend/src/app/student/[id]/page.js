

// 1st method:- 
// export default ({params}) => {
//     const { id } = params;
//     return(
//         <>
//             <h1>Dynamic Routing {id}</h1>
//         </>
//     )
// }



// 2nd method:- 
"use client" // if we use any hook in a page.js then we need to make that page client page
import { useParams } from "next/navigation" // this is a hook that will make the querry param available
export default () => {
    const params = useParams();
    const {id} = params;
    return(
        <>
            <h1>Dynamic Routing {id}</h1>
        </>
    )
}