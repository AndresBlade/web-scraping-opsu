import React from 'react'
import jsonUniversities from '../../data/universities.json'
import univeristyPNG from '../../assets/university.png'

interface Form {
    searchName: string;
    states: {value: string, content: string, checked: boolean}[];
    managementType: null | string;
}


const Universities = ({searchName,states,managementType}:Form) => {
    
    return (
        <div className='universities-container'>
            {jsonUniversities.filter(university => (university.name.includes(searchName) || university.location.some(location =>{
                return(
                location.name.includes(searchName))}) || university.location.some(location=>location.career.some(career=>career.name.includes(searchName)))) && (((university.management.toUpperCase() === "PUBLICA" ? "1" : "2") === managementType) ||  managementType === null)).map((university) => {
                // code to render each university
                return (
                    <div key={university.id} className='universities-card' >
                        <div className='universities-card__image'>
                            <img src={univeristyPNG} alt="university " className='universities-card__image_png' />
                        </div>
                        <div className='universities-card__info'>
                            <h2><span>Nombre de la universidad:</span> {university.name}</h2>
                            <h2><span>Tipo de gestion:</span> {university.management}</h2>
                            {/* {university.location.map((location)=>{
                                return(
                                    <div key={location.id} className='universities-card__location'>
                                    <h2>{location.name}</h2>
                                    </div>
                                )
                            })} */}
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Universities
