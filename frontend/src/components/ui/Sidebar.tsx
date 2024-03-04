import React, { useState } from 'react';
import Estados from '../../data/Estados.json';
import estados from '../../assets/estados.png';
import gestion from '../../assets/gestion.png';
import Gestion from '../../data/Gestion.json';
const Sidebar = () => {
    const [stateSelect, setStateSelect] = useState({
        Amazonas : false,
        Anzoategui : false,
        Apure : false,
        Aragua : false,
        Barinas : false,
        Bolivar : false,
        Carabobo : false,
        Cojedes : false,
        DeltaAmacuro : false,
        DistritoCapital : false,
        Falcon : false,
        Guarico : false,
        Lara : true,
        Merida : false,
        Miranda : false,
        Monagas : false,
        NuevaEsparta : false,
        Portuguesa : false,
        Sucre : false,
        Tachira : false,
        Trujillo : false,
        Vargas : false,
        Yaracuy : false,
        Zulia : false,

    })
    const [stateFilter, setStateFilter] = useState([]);


    const [gestionSelect, setGestionSelect] = useState({
        publico: false,
        privado: false,
    })
    const handleOnCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStateSelect({
            ...stateSelect,
            [e.target.value]: e.target.checked
            }
        )
    }

    return (
    <div>
        <aside className='sidebar'>
        <div className='sidebar__hover'>
                <div className='sidebar__flex'>
                    <img src={gestion} alt="gestion" />
                    <h2>Gestion</h2>
                </div>
                <ul className='principal'>
                    <li className='sidebar__list'>
                        {Gestion.Gestion.tipo.map((gestion) => {
                            return (
                                <li className='sidebar__list-li'>
                                    <input 
                                        type="radio" 
                                        name="gestion" 
                                        id={gestion.id} 
                                        className='sidebar__li-item' 
                                        title={gestion.nombre} 
                                        value={gestion.nombre} />
                                    <label htmlFor={gestion.id}>{gestion.nombre}</label>
                                </li>
                            );
                        })}
                    </li>
                </ul>
                
            </div>
            <div className='sidebar__hover sidebar__hover-vh'>
                <div className='sidebar__flex'>
                    <img src={estados} alt="estados" />
                    <h2>Estados</h2>
                </div>
                <ul className='principal'>
                    <li className='sidebar__list'>
                    {Estados.Venezuela.estados.map((estado) => {
                        // Code to render each estado item
                        return (
                            <li className="sidebar__list-li">
                                <input
                                    onChange={handleOnCheckbox}
                                    className="sidebar__li-item"
                                    type="checkbox"
                                    name={estado.nombre}
                                    id={estado.id}
                                    title={estado.nombre}
                                    value={estado.nombre}
                                />
                                <label htmlFor={estado.id}>{estado.nombre}</label>
                            </li>
                        );
                    })}
                    </li>
                </ul>
            </div>
        </aside>
    </div>
    );
};

export default Sidebar;
