import React, { useEffect, useContext, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ProductContext } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import GET_APP_SETTINGS from './graphql/query.getAppSettings.gql'

const CSS_HANDLES = [
  'specificationValue',
] as const

function TagComponent(){
  const { handles } = useCssHandles(CSS_HANDLES)

  const { product: {specificationGroups} }: any = useContext(ProductContext)
  const [currentSpecification, setCurrentSpecification]: any = useState(null)

  const { data: settings }: any = useQuery(GET_APP_SETTINGS, {
    variables: {
      app: "capacitacionio.add-to-cart-app",
      version: "0.x"
    },
  })

  useEffect(() => {
    let appSettings: any= null;

    if(settings){
      appSettings = JSON.parse(settings?.appSettings?.message)
      console.log('appSettings: ', appSettings)
    }

    const allSpecifications  = specificationGroups.find((item: any) => item.name === 'allSpecifications')

    if (allSpecifications?.specifications.length > 0) {
      const search = allSpecifications?.specifications.find(({name}: any) => name === appSettings?.specification)
      setCurrentSpecification(search)
    }
  }, [specificationGroups, settings])


  return currentSpecification ? (
    <div>
      <p>{currentSpecification?.name}:
        <span className={`${handles.specificationValue}`}>{` ${currentSpecification?.values?.[0]}`}</span>
      </p>
    </div>
  ) : (
    <></>
  )
}

export default TagComponent
