import React from 'react'
import { Button } from '../button'

const Header = () => {
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
        <img src="/logo.svg" alt="" />
        <div>
            <Button>Sign in </Button>
        </div>
    </div>
  )
}

export default Header