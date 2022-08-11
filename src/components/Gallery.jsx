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
            <section className="gallery">
                {!allPhotos && <Waveform size={90} lineWeight ={3.5} speed={1} color ="black"/>}
                {
                    allPhotos && allPhotos.length > 0 ? (
                    allPhotos.map(photo=>{
                    return (
                    <div className="item" key ={photo.id}>
                         <img src ={photo.url} className="item-image" alt='import'></img>
                        <button className="delete-button" onClick ={() => removePhoto(photo.id)}>Delete</button>
                    </div>
                    )})
                    ): (<div className="null-photo">Add Photos here</div>)
                }
            </section>
            <section className="buttons">
                <input type ="file" name = "photo" id = "addPhotoInput" />
                <label htmlFor="addPhotoInput" onClick={addPhoto}>
                    <i className="add-photo-button fas fa-plus-square"></i>
                </label>
                <button htmlFor= "deleteAllPhoto" onClick={() => deletePhotos()}>
                    <i className="delete-all fa-solid fa-trash"></i>
                </button>
            </section>
        </>
     )
}
 
export default Gallery;