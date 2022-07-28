import instagram from  '../assets/instagram.png'

const  Nav = () => {
    return ( 
        <nav>
            <button className='Logo'>
                <img src =  {instagram} alt ="logo" />
            </button>
            <input type = "text" className = "search" placeholder = "search" />
            <span className = "nav-links">
                <button>
                <i className="fa-solid fa-house-chimney"/>
                </button>
                <button>
                <i className ="fa-solid fa-message"/>
                </button>
                <button>
                <i className="fa-solid fa-compass"/>
                </button>
                <button>
                <i className="fa-solid fa-heart"/>
                </button>

            </span>
        </nav>
     );
}
 
export default Nav ;