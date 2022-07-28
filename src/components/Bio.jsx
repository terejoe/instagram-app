import { useEffect, useState } from "react"
import getPhotoUrl from "get-photo-url"
import profilePic from "../assets/profilepic.svg"
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../dexie'


const Bio = () => {
    // const [userDetails, setUserDetails] = useState({
    //     name:'Tere-joe',
    //     about: 'Building Newdev.io - Learn to code and connect with the best minds'
    // })

    const userDetails = useLiveQuery(() => db.bio.get('info'), [])

    const [editFormIsOpen, setEditFormIsOpen] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState(profilePic)
    
    //For Data To Persist
    useEffect (() =>{
        const setDataFromDb = async () => {
            //to get the data from my database
            // const userDetailsFromDb = await db.bio.get('info')
            const profilePhotoFromDb = await db.bio.get('profilePhoto')

            //data from my database persists
            // userDetailsFromDb && setUserDetails(userDetailsFromDb)
            profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb)
        }
        setDataFromDb()
    }, [])
    
    //Function to update my bio details
    const updateUserDetails = async (event) =>{
        event.preventDefault()
        const objectData = {
            name: event.target.nameOfUser.value,
            about: event.target.aboutUser.value
        }   
        // setUserDetails(objectData)
            
        await db.bio.put(objectData, 'info')
        setEditFormIsOpen(false)
    }

    //Function to update my profile picture
    const updateProfilePhoto = async () =>{
        const newProfilePhoto = await getPhotoUrl("#profilePhotoInput")
        //get selected photo
        //update selected photo
        setProfilePhoto(newProfilePhoto)
        await db.bio.put(newProfilePhoto, 'profilePhoto')
    }


    const editForm = (
        <form action=""  className = "edit-bio-form" onSubmit = {(e) => updateUserDetails(e)}>
            <input type="text" id = "" name ="nameOfUser" defaultValue = {userDetails?.name}placeholder="Your name" />
            <input type="text" id = "" name = "aboutUser" defaultValue = {userDetails?.about}placeholder="About you" />
            <br />
            <button onClick = {() => setEditFormIsOpen(false)}type = "button" className="cancel-button">Cancel</button>
            <button type = "submit" className="save-button">Save</button>
        </form>
    )

    const editButton = <button onClick = {() => setEditFormIsOpen(true)}>Edit</button>

    return ( 
        <section className="bio">
            <input type='file' accept ='image/*' name ='photo' id ='profilePhotoInput'/>
            <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
                <div className="profile-photo" role ="button" title ="Click to edit photo">
                    <img src = {profilePhoto} alt = " Profile"></img>
                </div>
            </label>
            <div className="profile-info">
                <p className="name">{userDetails?.name}</p>
                <p className="about">{userDetails?.about}</p>
                {editFormIsOpen ? editForm: editButton}
            </div>
        </section>
     );
}
 
export default Bio;