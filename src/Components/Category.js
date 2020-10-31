import React, { useState } from 'react'

export const Category = ({ header, rows }) => {
    const [isVisible, setIsVisible] = useState(false)

    const setRender = () => {
        setIsVisible( !isVisible )
    }

    return (
        <ul>
            <li onClick={setRender} style={{cursor:'pointer'}}> {header} </li>
            {
                (isVisible && rows.length > 0) && (
                    <ul>
                        {
                            rows.map( (row, key) => (
                                <Category key={key} header={row.text} rows={row.children} />
                            ))
                        }
                    </ul>
                )
            }
        </ul>
    )
}
