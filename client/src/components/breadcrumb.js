import React from 'react'
import { Link } from "react-router-dom";
export default function ({
    titlePage,
    crumbs
}) {
    return (
        <div className="breadcrumb">
            <div className="container">
                <h1>{titlePage}</h1>
                <ul>
                    {
                        crumbs?.map((item,key) => {
                            if(key == crumbs.length -1) 
                            return <li>{item.label}</li>
                            else
                            return <Link to={item.path}><li>{item.label}</li></Link>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
