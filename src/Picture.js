import fireImage from './fireemoji.png'
import './Picture.css'

export default function FireImage() {
    return (
        <div className="fireImageBox">
            <img width="125px" src={fireImage} alt="FireEmojiImage" />
        </div>
    )
    
}