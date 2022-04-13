import React, {useContext} from 'react'; 
import {ModalContext} from '../../context/ModalContext';

const TeacherDetail = () => {
    const { data }:any = useContext(ModalContext);

    return(
        <div>
          { (typeof data !== "undefined" &&  'profile' in data) &&
            <h3>{(data.profile.fullName?.firstName ?? "") + " " + (data.profile.fullName?.lastName ?? "")}</h3>
            
          }
        </div>
    )
}

export default TeacherDetail; 