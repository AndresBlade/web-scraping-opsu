import React from 'react'
import jsonUniversities from '../../data/universities.json'

const Universities = () => {
    return (
        <div className='universities-container'>
            {jsonUniversities.map((university) => {
                // code to render each university
                return (
                    <div key={university.id} className='universities-card'>
                        <h2>Nombre de la universidad: {university.name}</h2>
                        <h3>Tipo de gestion: {university.management}</h3>
                        {university.location.map((location)=>{
                            return(
                                <div key={location.id}>
                                <h2>Locacion: {location.name}</h2>
                                </div>
                            )
                        })}
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Universities
