import React, {useContext} from 'react'; 
import {ModalContext} from '../../context/ModalContext';

const StudentDetail = () => {
    const { data } = useContext(ModalContext);

    return(
        <div>
          <h3>{(data.profile.fullName.firstName ?? "") + " " + (data.profile.fullName.lastName ?? "")}</h3>

        </div>
    )
}

export default StudentDetail; 