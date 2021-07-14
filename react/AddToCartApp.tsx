import React from 'react'
import { Button } from 'vtex.styleguide'

function AddToCartApp({children, target}: any){

  return target === 'pdp' ? (
    <div>
      <Button>Ver detalle del producto</Button>
    </div>
  ) : (
    <div>
      {children[0]}
    </div>
  )
}

export default AddToCartApp
