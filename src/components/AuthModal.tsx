import React from 'react'

type props = {
  open: boolean,
  onClose: () => void

}
const AuthModal = ({open, onClose}: props) => {
  return (
    <div>AuthModal</div>
  )
}

export default AuthModal