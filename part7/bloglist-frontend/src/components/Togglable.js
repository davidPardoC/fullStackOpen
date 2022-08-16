import React, { forwardRef, useImperativeHandle } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import './Togglable.css'
import { Button } from '@chakra-ui/react'

const Togglable = forwardRef(
  ({ children, label = '', showButton = true }, refs) => {
    const ref = useRef()
    const [childHeight, setChildHeight] = useState(0)
    const [visible, setVisible] = useState(false)

    const toggleVisisble = () => {
      setVisible(!visible)
    }
    useEffect(() => {
      const childHeightRaw = ref.current.clientHeight + 120
      const childHeight = `${childHeightRaw / 16}rem`
      setChildHeight(childHeight)
    }, [])

    useImperativeHandle(refs, () => {
      return {
        toggleVisisble,
        visible,
      }
    })

    return (
      <div>
        <div
          className="content"
          style={{ maxHeight: visible ? childHeight : 0 }}
        >
          <div ref={ref}>{children}</div>
        </div>
        {showButton && (
          <Button onClick={toggleVisisble} colorScheme="linkedin">
            {!visible ? label : 'Cancel'}
          </Button>
        )}
      </div>
    )
  }
)

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  label: PropTypes.string,
  showButton: PropTypes.bool,
}

export default Togglable
