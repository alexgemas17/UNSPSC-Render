import React, { useEffect, useState } from 'react'
import { Category } from './Category'
import { TreeStructure } from './tree'

export const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()

    //Comparer Function    
    function GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    } 

    const getJSONFromAPI = React.useCallback ((urlAPI) => {
        fetch(urlAPI)
        .then(response => response.json())
        .then(data => { 
            const JSON = data.sort(GetSortOrder('code'))

            const treeData = new TreeStructure()
            for (let index = 0; index < JSON.length; index++) {
                treeData.AddNode(JSON[index])
            }
            setIsLoading(false)
            setData(treeData)
        })
    },[])

    useEffect(() => {
        getJSONFromAPI('https://gist.githubusercontent.com/jakobt/8b44844ae0101949d7117a37f2d44161/raw/452dc8193f3279b36c7aa78f0c6d15b8114e3800/flatlist.json')
    }, [getJSONFromAPI])


    if( isLoading || !data ){
        return <>
            Loading...
        </>
    }

    return (
        <div>
            <h1> UNSPSC Render </h1>

            {
                data.children.map( (data, key) => ( <Category key={key} header={data.text} rows={data.children} /> ) )
            }            
        </div>
    )
}


/*
<ul>
    <li> Lista </li>
    <Category header={child.text} rows={child.children} />
    <li> Otra listaa</li>
</ul>


*/