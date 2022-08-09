import getPhotoUrl from "get-photo-url"
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../dexie'
import { Waveform } from '@uiball/loaders'


const Gallery = () => {
    const allPhotos = useLiveQuery(() => db.gallery.toArray(), [])

    //Function to add photo from file
    const addPhoto = async () => {
        db.gallery.add({
            url: await getPhotoUrl('#addPhotoInput')
        })
    }

    //Function to delete a photo
    const removePhoto =(id) => {
        db.gallery.delete(id)
    }

    //Function to delete all photos at once
    const deletePhotos = () => {
        allPhotos.forEach(item => {
            db.gallery.delete(item.id)
            .then(() =>{
                console.log("Database successfully item")
            }).catch((err) => {
                console.log(err, " Could not delete item")
            })
        });
    }

    
    return (
        <>
            <input type ="file" name = "photo" id = "addPhotoInput" />
            <label htmlFor="addPhotoInput" onClick={addPhoto}>
                <i className="add-photo-button fas fa-plus-square"></i>
            </label>
            <button htmlFor= "deleteAllPhoto" onClick={() => deletePhotos()}>
                <i className="delete-all fa-solid fa-trash"></i>
            </button>
            

            <section className="gallery">
                {!allPhotos && <Waveform size={90} lineWeight ={3.5} speed={1} color ="black"/>}
                {allPhotos.length === 0 ? <div className="null-photo">No Photos here</div>:<></>}
                {allPhotos?.map((photo) => (
                    <div className="item" key={photo.id}>
                        <img src ={photo.url} className="item-image" alt=''></img>
                        <button className="delete-button" onClick ={() => removePhoto(photo.id)}>Delete</button>
                    </div> 
                ))}
                
            </section>
        </>
     )
}
 
export default Gallery;