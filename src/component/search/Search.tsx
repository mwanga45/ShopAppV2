import "./search.css"
import { FaSearch } from "react-icons/fa";
export const Search = ()=>{
    return(
        <div className="search-container">
            <p><FaSearch color="black" size={30}/></p>
            <input type="text" name="search" placeholder="Search"/>
        </div>
    )
}