import './style.css'
import Reload from '../../assets/Reload.svg'

export default function LoadingModal(){
    return(
        <div className="LoadingModal">
            <div className="modalBox">
                <img src={Reload} alt="loading Icon" />
            </div>
        </div>
    )
}